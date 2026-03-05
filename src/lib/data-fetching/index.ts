import { swrAdapter } from './swr-adapter';
import type { DataFetchingAdapter } from './types';

// Get the active adapter from environment variable or default to 'swr'
const ACTIVE_ADAPTER = process.env.NEXT_PUBLIC_DATA_FETCHING_ADAPTER || 'swr';

// Define available data fetching adapters
const adapters: Record<string, DataFetchingAdapter> = {
    swr: swrAdapter,
}

// Export the selected adapter or fallback to swrAdapter if the selected one isn't available
export const dataFetcher = adapters[ACTIVE_ADAPTER] || swrAdapter;

// Re-export types for external use
export type { DataFetchingAdapter, DataFetchingHookResult } from './types' 