function ProductCardSkeleton() {
  return (
    <article
      className="flex h-full animate-pulse flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft"
      aria-hidden="true"
    >
      <div className="aspect-[4/3] bg-slate-200" />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="h-3 w-24 rounded-full bg-brand-100" />

            <div className="mt-3 h-5 w-4/5 rounded-full bg-slate-200" />

            <div className="mt-2 h-5 w-3/5 rounded-full bg-slate-200" />
          </div>

          <div className="h-6 w-14 shrink-0 rounded-full bg-amber-100" />
        </div>

        <div className="mt-4 space-y-2">
          <div className="h-4 w-full rounded-full bg-slate-200" />
          <div className="h-4 w-5/6 rounded-full bg-slate-200" />
        </div>

        <div className="mt-5 h-4 w-28 rounded-full bg-slate-200" />

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <div className="h-3 w-20 rounded-full bg-slate-200" />
            <div className="mt-2 h-7 w-24 rounded-full bg-slate-300" />
          </div>

          <div className="h-10 w-28 rounded-xl bg-slate-300" />
        </div>
      </div>
    </article>
  )
}

export default ProductCardSkeleton