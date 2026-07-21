import {
  AlertCircle,
  PackageSearch,
  RefreshCw,
} from 'lucide-react'
import ProductCard from '../features/products/components/ProductCard.jsx'
import ProductCardSkeleton from '../features/products/components/ProductCardSkeleton.jsx'
import { useProducts } from '../features/products/queries/productsQuery.js'

const PRODUCTS_PER_PAGE = 12

const skeletonItems = Array.from(
  { length: PRODUCTS_PER_PAGE },
  (_, index) => index,
)

function ProductsPage() {
  const {
    data,
    error,
    isError,
    isFetching,
    isPending,
    refetch,
  } = useProducts({
    limit: PRODUCTS_PER_PAGE,
    skip: 0,
  })

  const products = data?.products ?? []
  const totalProducts = data?.total ?? 0

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      aria-labelledby="products-title"
    >
      <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            Product catalog
          </p>

          <h1
            id="products-title"
            className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
          >
            Explore products
          </h1>

          <p className="mt-4 max-w-2xl text-pretty leading-7 text-slate-600">
            Browse products loaded from the DummyJSON API. Search, filtering,
            sorting and pagination will be added in the next stages.
          </p>
        </div>

        {!isPending && !isError && (
          <div
            className="flex items-center gap-2 text-sm text-slate-500"
            aria-live="polite"
          >
            {isFetching && (
              <RefreshCw
                size={15}
                className="animate-spin text-brand-600"
                aria-hidden="true"
              />
            )}

            <span>
              {isFetching
                ? 'Refreshing products…'
                : `${totalProducts} products available`}
            </span>
          </div>
        )}
      </div>

      {isPending && (
        <>
          <p className="sr-only" role="status">
            Loading products.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {skeletonItems.map((item) => (
              <ProductCardSkeleton key={item} />
            ))}
          </div>
        </>
      )}

      {isError && (
        <div
          className="mt-8 rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center sm:p-12"
          role="alert"
        >
          <span
            className="mx-auto grid size-14 place-items-center rounded-2xl bg-rose-100 text-rose-700"
            aria-hidden="true"
          >
            <AlertCircle size={27} />
          </span>

          <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
            We couldn’t load the products
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
            {error?.message ??
              'An unexpected error occurred while loading the catalog.'}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-600"
          >
            <RefreshCw size={18} aria-hidden="true" />
            Try again
          </button>
        </div>
      )}

      {!isPending && !isError && products.length === 0 && (
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-soft sm:p-12">
          <span
            className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-700"
            aria-hidden="true"
          >
            <PackageSearch size={27} />
          </span>

          <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
            No products found
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
            The catalog did not return any products for this request.
          </p>
        </div>
      )}

      {!isPending && !isError && products.length > 0 && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductsPage