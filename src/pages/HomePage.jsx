import {
  ArrowRight,
  BadgeCheck,
  Search,
  Sparkles,
  Truck,
} from 'lucide-react'
import { Link } from 'react-router'

const benefits = [
  {
    title: 'Curated products',
    description: 'Explore a clean and organized catalog powered by live data.',
    icon: BadgeCheck,
  },
  {
    title: 'Fast discovery',
    description: 'Search, filter and sort products without unnecessary friction.',
    icon: Search,
  },
  {
    title: 'Simple shopping',
    description: 'Build a persistent cart and manage products across the app.',
    icon: Truck,
  },
]

function HomePage() {
  return (
    <>
      <section className="overflow-hidden bg-slate-950 text-white">
        <div className="relative mx-auto grid min-h-[calc(100dvh-4rem)] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div
            className="pointer-events-none absolute -right-32 top-12 size-80 rounded-full bg-brand-500/25 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-brand-200 backdrop-blur">
              <Sparkles size={15} aria-hidden="true" />
              Modern product discovery
            </div>

            <h1 className="max-w-3xl text-balance text-5xl font-black tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Find products that fit your world.
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-300">
              Browse a responsive catalog, discover product details and build
              your cart through a modern React shopping experience.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-brand-900/30 transition hover:-translate-y-0.5 hover:bg-brand-400"
              >
                Explore products
                <ArrowRight size={18} aria-hidden="true" />
              </Link>

              <a
                href="#benefits"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                Learn more
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block" aria-hidden="true">
            <div className="rotate-3 rounded-[2rem] border border-white/10 bg-white/[0.08] p-5 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-white p-5 text-slate-950">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-brand-100 via-white to-sky-100" />

                <div className="mt-5">
                  <div className="h-3 w-24 rounded-full bg-brand-100" />
                  <div className="mt-3 h-5 w-3/4 rounded-full bg-slate-900" />
                  <div className="mt-2 h-4 w-1/2 rounded-full bg-slate-200" />

                  <div className="mt-6 flex items-center justify-between">
                    <div className="h-7 w-24 rounded-full bg-slate-900" />
                    <div className="size-11 rounded-xl bg-brand-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="benefits"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
        aria-labelledby="benefits-title"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            Built for discovery
          </p>

          <h2
            id="benefits-title"
            className="mt-3 text-balance text-3xl font-black tracking-tight text-slate-950 sm:text-4xl"
          >
            A small project with real frontend architecture.
          </h2>

          <p className="mt-4 text-pretty leading-7 text-slate-600">
            NovaCart will demonstrate reusable components, routing, API state,
            URL filters, persistent cart data and accessible interactions.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon

            return (
              <article
                key={benefit.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon size={21} aria-hidden="true" />
                </span>

                <h3 className="mt-5 text-lg font-extrabold text-slate-950">
                  {benefit.title}
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  {benefit.description}
                </p>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default HomePage