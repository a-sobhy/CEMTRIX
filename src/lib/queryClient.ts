import { QueryClient } from '@tanstack/react-query';

// ─── Shared QueryClient ───────────────────────────────────────────────────────
// One singleton instance, imported by both main.tsx (provider) and
// any utility that needs to imperatively invalidate / prefetch queries.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Keep successful data fresh for 5 minutes before a background refetch
      staleTime: 5 * 60 * 1_000,
      // Cache data for 10 minutes after the last subscriber unmounts
      gcTime: 10 * 60 * 1_000,
      // Do not hammer the server on window focus by default
      refetchOnWindowFocus: false,
      // Retry once on failure (network blip)
      retry: 1,
    },
    mutations: {
      // Surface errors by default; individual hooks can override
      throwOnError: false,
    },
  },
});
