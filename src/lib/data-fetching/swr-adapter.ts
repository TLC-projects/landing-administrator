import useSWR from 'swr';

import { DataFetchingAdapter, DataFetchingConfig, DataFetchingHookResult } from './types';

const defaultFetcher = (url: string) => fetch(url).then((res) => res.json());

export const swrAdapter: DataFetchingAdapter = {
  useQuery: <T>(
    key: string | null,
    fetcher = defaultFetcher,
    config: DataFetchingConfig = {}
  ): DataFetchingHookResult<T> => {
    const { data, error, isLoading, mutate, isValidating } = useSWR<T>(key, fetcher, {
      revalidateOnFocus: config.revalidateOnFocus,
      revalidateOnReconnect: config.revalidateOnReconnect,
      refreshInterval: config.refreshInterval,
      dedupingInterval: config.dedupingInterval
    });

    return {
      data,
      loading: isLoading,
      error: error?.message || null,
      mutate,
      isValidating
    };
  }
};
