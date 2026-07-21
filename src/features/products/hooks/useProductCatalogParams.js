import { useCallback } from 'react'
import { useSearchParams } from 'react-router'

export const PRODUCTS_PER_PAGE = 12

export const CATALOG_SORT_OPTIONS = [
  {
    value: 'featured',
    label: 'Featured',
    sortBy: '',
    order: 'asc',
  },
  {
    value: 'price-asc',
    label: 'Price: Low to high',
    sortBy: 'price',
    order: 'asc',
  },
  {
    value: 'price-desc',
    label: 'Price: High to low',
    sortBy: 'price',
    order: 'desc',
  },
  {
    value: 'rating-desc',
    label: 'Rating: High to low',
    sortBy: 'rating',
    order: 'desc',
  },
  {
    value: 'title-asc',
    label: 'Name: A to Z',
    sortBy: 'title',
    order: 'asc',
  },
]

const sortOptionsByValue = new Map(
  CATALOG_SORT_OPTIONS.map((option) => [
    option.value,
    option,
  ]),
)

function parsePositiveInteger(value, fallback) {
  const parsedValue = Number.parseInt(value ?? '', 10)

  if (
    Number.isInteger(parsedValue) &&
    parsedValue > 0
  ) {
    return parsedValue
  }

  return fallback
}

export function useProductCatalogParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const search =
    searchParams.get('q')?.trim() ?? ''

  const requestedCategory =
    searchParams.get('category')?.trim() ?? ''

  const category = search
    ? ''
    : requestedCategory

  const requestedSort =
    searchParams.get('sort') ?? 'featured'

  const sortOption =
    sortOptionsByValue.get(requestedSort) ??
    sortOptionsByValue.get('featured')

  const page = parsePositiveInteger(
    searchParams.get('page'),
    1,
  )

  const limit = PRODUCTS_PER_PAGE
  const skip = (page - 1) * limit

  const updateSearchParams = useCallback(
    (updateParameters) => {
      setSearchParams((currentParameters) => {
        const nextParameters =
          new URLSearchParams(currentParameters)

        updateParameters(nextParameters)

        return nextParameters
      })
    },
    [setSearchParams],
  )

  const setSearch = useCallback(
    (value) => {
      const normalizedValue = value.trim()

      updateSearchParams((nextParameters) => {
        if (normalizedValue) {
          nextParameters.set('q', normalizedValue)
          nextParameters.delete('category')
        } else {
          nextParameters.delete('q')
        }

        nextParameters.delete('page')
      })
    },
    [updateSearchParams],
  )

  const setCategory = useCallback(
    (value) => {
      updateSearchParams((nextParameters) => {
        if (value) {
          nextParameters.set('category', value)
          nextParameters.delete('q')
        } else {
          nextParameters.delete('category')
        }

        nextParameters.delete('page')
      })
    },
    [updateSearchParams],
  )

  const setSort = useCallback(
    (value) => {
      const normalizedSort =
        sortOptionsByValue.has(value)
          ? value
          : 'featured'

      updateSearchParams((nextParameters) => {
        if (normalizedSort === 'featured') {
          nextParameters.delete('sort')
        } else {
          nextParameters.set('sort', normalizedSort)
        }

        nextParameters.delete('page')
      })
    },
    [updateSearchParams],
  )

  const setPage = useCallback(
    (value) => {
      const normalizedPage =
        parsePositiveInteger(String(value), 1)

      updateSearchParams((nextParameters) => {
        if (normalizedPage <= 1) {
          nextParameters.delete('page')
        } else {
          nextParameters.set(
            'page',
            String(normalizedPage),
          )
        }
      })
    },
    [updateSearchParams],
  )

  const resetCatalog = useCallback(() => {
    setSearchParams({})
  }, [setSearchParams])

  const hasActiveParameters =
    Boolean(search) ||
    Boolean(category) ||
    sortOption.value !== 'featured' ||
    page > 1

  return {
    searchParams,
    search,
    category,
    sort: sortOption.value,
    sortBy: sortOption.sortBy,
    order: sortOption.order,
    page,
    limit,
    skip,
    hasActiveParameters,
    setSearch,
    setCategory,
    setSort,
    setPage,
    resetCatalog,
  }
}