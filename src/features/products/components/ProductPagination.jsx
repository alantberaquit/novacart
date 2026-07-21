import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react'

function createPaginationItems(currentPage, totalPages) {
  const visiblePages = new Set([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ])

  const pageNumbers = [...visiblePages]
    .filter(
      (pageNumber) =>
        pageNumber >= 1 &&
        pageNumber <= totalPages,
    )
    .sort((firstPage, secondPage) => firstPage - secondPage)

  const paginationItems = []

  pageNumbers.forEach((pageNumber, index) => {
    const previousPageNumber = pageNumbers[index - 1]

    if (
      previousPageNumber &&
      pageNumber - previousPageNumber > 1
    ) {
      paginationItems.push(
        `ellipsis-${previousPageNumber}-${pageNumber}`,
      )
    }

    paginationItems.push(pageNumber)
  })

  return paginationItems
}

function ProductPagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / pageSize)

  if (totalPages <= 1) {
    return null
  }

  const paginationItems = createPaginationItems(
    currentPage,
    totalPages,
  )

  const firstVisibleItem =
    (currentPage - 1) * pageSize + 1

  const lastVisibleItem = Math.min(
    currentPage * pageSize,
    totalItems,
  )

  function changePage(nextPage) {
    const normalizedPage = Math.min(
      Math.max(nextPage, 1),
      totalPages,
    )

    onPageChange(normalizedPage)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <nav
      className="mt-10 flex flex-col gap-5 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between"
      aria-label="Product catalog pagination"
    >
      <p
        className="text-sm text-slate-500"
        aria-live="polite"
      >
        Showing{' '}
        <span className="font-bold text-slate-800">
          {firstVisibleItem}–{lastVisibleItem}
        </span>{' '}
        of{' '}
        <span className="font-bold text-slate-800">
          {totalItems}
        </span>{' '}
        products
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
        >
          <ChevronLeft
            size={17}
            aria-hidden="true"
          />

          <span className="hidden sm:inline">
            Previous
          </span>
        </button>

        {paginationItems.map((item) => {
          if (typeof item === 'string') {
            return (
              <span
                key={item}
                className="grid size-10 place-items-center text-slate-400"
                aria-hidden="true"
              >
                <MoreHorizontal size={18} />
              </span>
            )
          }

          const isCurrentPage = item === currentPage

          return (
            <button
              key={item}
              type="button"
              onClick={() => changePage(item)}
              aria-label={`Go to page ${item}`}
              aria-current={
                isCurrentPage
                  ? 'page'
                  : undefined
              }
              className={
                isCurrentPage
                  ? 'grid size-10 place-items-center rounded-xl bg-slate-950 text-sm font-black text-white shadow-sm'
                  : 'grid size-10 place-items-center rounded-xl border border-slate-300 bg-white text-sm font-bold text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700'
              }
            >
              {item}
            </button>
          )
        })}

        <button
          type="button"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
        >
          <span className="hidden sm:inline">
            Next
          </span>

          <ChevronRight
            size={17}
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  )
}

export default ProductPagination