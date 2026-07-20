function App() {
  return (
    <main className="grid min-h-dvh place-items-center bg-slate-950 px-6 py-16 text-white">
      <section className="mx-auto max-w-2xl text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-violet-400">
          NovaCart
        </p>

        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
          Tailwind CSS is working.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-slate-300 sm:text-lg">
          We now have a modern React and Tailwind foundation for building our
          responsive product catalog.
        </p>

        <button
          type="button"
          className="mt-8 rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:-translate-y-0.5 hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 active:translate-y-0"
        >
          Explore products
        </button>
      </section>
    </main>
  )
}

export default App