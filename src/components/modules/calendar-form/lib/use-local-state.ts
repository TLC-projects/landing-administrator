import { useState } from "react";

/**
 * Returns a state and an updater function for the given initial value.
 * The returned state and updater function can be used to manage a local
 * state of a component.
 *
 * @template T
 * @param {T} initial the initial value of the state
 * @returns {[T, (v: T) => void]} an array containing the state and the
 * updater function
 */
export function useLocalState<T>(initial: T): [T, (v: T) => void] {
  const [val, setVal] = useState<T>(initial);
  return [val, setVal];
}