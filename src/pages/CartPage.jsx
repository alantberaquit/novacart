import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router'

function CartPage() {
  return (
    <section
      className="mx-auto grid min-h-[65dvh] max-w-7xl place-items-center px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="cart-title"
    >
      <div className="max-w-lg text-center">
        <span
          className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-50 text-brand-700"
          aria-hidden="true"
        >
          <ShoppingCart size={29} />
        </span>

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
          Shopping cart
        </p>

        <h1
          id="cart-title"
          className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl"
        >
          Your cart is empty
        </h1>

        <p className="mt-4 text-pretty leading-7 text-slate-600">
          Cart state, quantity controls, totals and local storage persistence
          will be added after the product catalog is working.
        </p>

        <Link
          to="/products"
          className="mt-7 inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-600"
        >
          Browse products
        </Link>
      </div>
    </section>
  )
}

export default CartPage