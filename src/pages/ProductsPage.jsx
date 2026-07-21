import { PackageSearch } from 'lucide-react'

function ProductsPage() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="products-title"
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft sm:p-12">
        <span
          className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700"
          aria-hidden="true"
        >
          <PackageSearch size={24} />
        </span>

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
          Product catalog
        </p>

        <h1
          id="products-title"
          className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Explore products
        </h1>

        <p className="mt-4 max-w-2xl text-pretty leading-7 text-slate-600">
          Our live DummyJSON catalog will appear here after we create the API
          service, query hooks, loading states, filters and reusable product
          cards.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
              aria-hidden="true"
            >
              <div className="aspect-[4/3] animate-pulse bg-slate-200" />

              <div className="space-y-3 p-5">
                <div className="h-3 w-20 animate-pulse rounded-full bg-brand-100" />
                <div className="h-5 w-4/5 animate-pulse rounded-full bg-slate-200" />
                <div className="h-4 w-2/5 animate-pulse rounded-full bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsPage