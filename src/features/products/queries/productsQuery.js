import {
  queryOptions,
  useQuery,
} from '@tanstack/react-query'
import {
  getProductCategories,
  getProducts,
} from '../api/productsApi.js'

export const productKeys = {
  all: ['products'],

  lists: () => [
    ...productKeys.all,
    'list',
  ],

  list: ({
    limit,
    skip,
    search,
    category,
    sortBy,
    order,
  }) => [
    ...productKeys.lists(),
    {
      limit,
      skip,
      search,
      category,
      sortBy,
      order,
    },
  ],

  categories: () => [
    ...productKeys.all,
    'categories',
  ],
}

export function productsQueryOptions({
  limit = 12,
  skip = 0,
  search = '',
  category = '',
  sortBy = '',
  order = 'asc',
} = {}) {
  const queryParameters = {
    limit,
    skip,
    search: search.trim(),
    category,
    sortBy,
    order,
  }

  return queryOptions({
    queryKey: productKeys.list(queryParameters),

    queryFn: ({ signal }) =>
      getProducts({
        ...queryParameters,
        signal,
      }),
  })
}

export function productCategoriesQueryOptions() {
  return queryOptions({
    queryKey: productKeys.categories(),

    queryFn: ({ signal }) =>
      getProductCategories({
        signal,
      }),
  })
}

export function useProducts(options = {}) {
  return useQuery(productsQueryOptions(options))
}

export function useProductCategories() {
  return useQuery(productCategoriesQueryOptions())
}