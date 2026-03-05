'use client';

import { startTransition, useActionState, useCallback, useState } from 'react';

/**
 * A custom hook that enhances the useActionState hook with
 * - reset function.
 * - payload state.
 * @param action - The action to be performed.
 * @param initialState - The initial state of the action.
 * @param permalink - The permalink of the action.
 * @link https://www.nico.fyi/blog/reset-state-from-react-useactionstate
 * @returns Array of [state, submit function, isPending, reset function, and payload].
 */
export function useResettableActionState<State, Payload>(
    action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
    initialState: Awaited<State>,
    permalink?: string
): [
    state: Awaited<State>,
    dispatch: (payload: Payload | null) => void,
    isPending: boolean,
    reset: () => void,
    payload: Payload | null
] {
    // Store the current payload
    const [payload, setPayload] = useState<Payload | null>(null);
    
    // Use React's useActionState hook with a wrapped action function
    const [state, actionSubmit, isPending] = useActionState(
        async (state: Awaited<State>, payload: Payload | null) => {
            // If no payload is provided, reset to initial state
            if (!payload) {
                return initialState;
            }
            // Otherwise, call the original action with state and payload
            const data = await action(state, payload);
            return data;
        },
        initialState,
        permalink
    );

    // Wrapper for the action submit function that also updates payload state
    const submit: typeof actionSubmit = useCallback(
        (payload: Payload | null) => {
            setPayload(payload);
            actionSubmit(payload);
        },
        [actionSubmit]
    );

    // Reset function that clears the state by submitting null payload
    const reset = useCallback(() => {
        startTransition(() => {
            submit(null);
        });
    }, [submit]);

    return [state, submit, isPending, reset, payload];
}
