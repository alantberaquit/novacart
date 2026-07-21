import {
  queryOptions,
  useQuery,
} from '@tanstack/react-query'
import { getProducts } from '../api/productsApi.js'

export const productKeys = {
  all: ['products'],

  lists: () => [
    ...productKeys.all,
    'list',
  ],

  list: ({ limit, skip }) => [
    ...productKeys.lists(),
    {
      limit,
      skip,
    },
  ],
}

export function productsQueryOptions({
  limit = 12,
  skip = 0,
} = {}) {
  return queryOptions({
    queryKey: productKeys.list({
      limit,
      skip,
    }),

    queryFn: ({ signal }) =>
      getProducts({
        limit,
        skip,
        signal,
      }),
  })
}

export function useProducts(options = {}) {
  return useQuery(productsQueryOptions(options))
}