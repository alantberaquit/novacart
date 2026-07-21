import { QueryClient } from '@tanstack/react-query'

const MINUTE = 60 * 1000

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * MINUTE,
      gcTime: 30 * MINUTE,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})