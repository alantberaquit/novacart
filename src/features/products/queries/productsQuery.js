import {
  queryOptions,
  useQuery,
} from '@tanstack/react-query'
import {
  getProductById,
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

  details: () => [
    ...productKeys.all,
    'detail',
  ],

  detail: (productId) => [
    ...productKeys.details(),
    String(productId),
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

export function productQueryOptions(productId) {
  const normalizedProductId = String(
    productId ?? '',
  ).trim()

  return queryOptions({
    queryKey: productKeys.detail(
      normalizedProductId,
    ),

    queryFn: ({ signal }) =>
      getProductById({
        productId: normalizedProductId,
        signal,
      }),

    enabled: Boolean(normalizedProductId),
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
  return useQuery(
    productsQueryOptions(options),
  )
}

export function useProduct(productId) {
  return useQuery(
    productQueryOptions(productId),
  )
}

export function useProductCategories() {
  return useQuery(
    productCategoriesQueryOptions(),
  )
}