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

export async function getProducts({
  limit = 12,
  skip = 0,
  signal,
} = {}) {
  const searchParams = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
    select: PRODUCT_CARD_FIELDS.join(','),
  })

  return fetchJson(
    `${API_BASE_URL}/products?${searchParams.toString()}`,
    {
      signal,
    },
  )
}