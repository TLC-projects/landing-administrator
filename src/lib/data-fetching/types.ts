

export interface DataFetchingHookResult<T> {
    data: T  | undefined;
    loading: boolean;
    error: string | null;
    mutate?: () => void;
    isValidating?: boolean;
}

export interface DataFetchingConfig {
    revalidateOnFocus?: boolean;
    revalidateOnReconnect?: boolean;
    refreshInterval?: number;
    dedupingInterval?: number;
}

export interface DataFetchingAdapter {
    useQuery: <T>(
        key: string | null,
        fetcher?: (key: string ) => Promise<T>,
        config?: DataFetchingConfig
    ) => DataFetchingHookResult<T>
}