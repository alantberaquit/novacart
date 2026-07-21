import {
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { CATALOG_SORT_OPTIONS } from '../hooks/useProductCatalogParams.js'

function ProductCatalogControls({
  search,
  category,
  sort,
  categories = [],
  categoriesPending = false,
  categoriesError = false,
  hasActiveParameters,
  onSearch,
  onCategoryChange,
  onSortChange,
  onReset,
}) {
  function handleSearchSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const searchValue = String(
      formData.get('search') ?? '',
    )

    onSearch(searchValue)
  }

  return (
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft sm:p-6">
      <div className="flex items-center gap-3">
        <span
          className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"
          aria-hidden="true"
        >
          <SlidersHorizontal size={20} />
        </span>

        <div>
          <h2 className="font-extrabold text-slate-950">
            Refine the catalog
          </h2>

          <p className="mt-0.5 text-sm text-slate-500">
            Search, filter, and sort the product results.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <form
          onSubmit={handleSearchSubmit}
          className="min-w-0"
          role="search"
        >
          <label
            htmlFor="product-search"
            className="text-sm font-bold text-slate-700"
          >
            Search products
          </label>

          <div className="relative mt-2">
            <Search
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />

            <input
              key={search}
              id="product-search"
              name="search"
              type="search"
              defaultValue={search}
              placeholder="Search by product name"
              autoComplete="off"
              className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-24 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            />

            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
              {search && (
                <button
                  type="button"
                  onClick={() => onSearch('')}
                  className="grid size-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
                  aria-label="Clear product search"
                >
                  <X
                    size={16}
                    aria-hidden="true"
                  />
                </button>
              )}

              <button
                type="submit"
                className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white transition hover:bg-brand-600"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        <div>
          <label
            htmlFor="product-category"
            className="text-sm font-bold text-slate-700"
          >
            Category
          </label>

          <select
            id="product-category"
            value={category}
            onChange={(event) =>
              onCategoryChange(event.target.value)
            }
            disabled={categoriesPending || categoriesError}
            className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition hover:border-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
          >
            <option value="">
              {categoriesPending
                ? 'Loading categories…'
                : categoriesError
                  ? 'Categories unavailable'
                  : 'All categories'}
            </option>

            {!categoriesPending &&
              !categoriesError &&
              categories.map((categoryOption) => (
                <option
                  key={categoryOption.slug}
                  value={categoryOption.slug}
                >
                  {categoryOption.name}
                </option>
              ))}
          </select>

          {categoriesError && (
            <p className="mt-2 text-xs font-medium text-rose-700">
              The category list could not be loaded.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="product-sort"
            className="text-sm font-bold text-slate-700"
          >
            Sort by
          </label>

          <select
            id="product-sort"
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value)
            }
            className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition hover:border-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          >
            {CATALOG_SORT_OPTIONS.map((sortOption) => (
              <option
                key={sortOption.value}
                value={sortOption.value}
              >
                {sortOption.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveParameters && (
        <div className="mt-5 flex justify-end border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <X
              size={17}
              aria-hidden="true"
            />

            Clear all
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductCatalogControls