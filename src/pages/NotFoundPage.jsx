import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section
      className="mx-auto grid min-h-[65dvh] max-w-7xl place-items-center px-4 py-16 text-center sm:px-6 lg:px-8"
      aria-labelledby="not-found-title"
    >
      <div className="max-w-xl">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-600">
          Error 404
        </p>

        <h1
          id="not-found-title"
          className="mt-4 text-balance text-5xl font-black tracking-tight text-slate-950 sm:text-6xl"
        >
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-pretty leading-7 text-slate-600">
          The page may have been moved, deleted, or the address may be
          incorrect.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-600"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Return home
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage