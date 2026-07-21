import { fetchJson } from '../../../lib/apiClient.js'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://dummyjson.com'

const PRODUCT_CARD_FIELDS = [
  'id',
  'title',
  'description',
  'category',
  'price',
  'discountPercentage',
  'rating',
  'stock',
  'brand',
  'thumbnail',
]

function getProductsEndpoint({
  search,
  category,
}) {
  const normalizedSearch = search?.trim()

  if (normalizedSearch) {
    return `${API_BASE_URL}/products/search`
  }

  if (category) {
    return `${API_BASE_URL}/products/category/${encodeURIComponent(category)}`
  }

  return `${API_BASE_URL}/products`
}

export async function getProducts({
  limit = 12,
  skip = 0,
  search = '',
  category = '',
  sortBy = '',
  order = 'asc',
  signal,
} = {}) {
  const normalizedSearch = search.trim()

  const searchParams = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
    select: PRODUCT_CARD_FIELDS.join(','),
  })

  if (normalizedSearch) {
    searchParams.set('q', normalizedSearch)
  }

  if (sortBy) {
    searchParams.set('sortBy', sortBy)
    searchParams.set('order', order)
  }

  const endpoint = getProductsEndpoint({
    search: normalizedSearch,
    category,
  })

  return fetchJson(
    `${endpoint}?${searchParams.toString()}`,
    {
      signal,
    },
  )
}

export async function getProductCategories({
  signal,
} = {}) {
  return fetchJson(
    `${API_BASE_URL}/products/categories`,
    {
      signal,
    },
  )
}

export async function getProductById({
  productId,
  signal,
}) {
  return fetchJson(
    `${API_BASE_URL}/products/${encodeURIComponent(productId)}`,
    {
      signal,
    },
  )
}