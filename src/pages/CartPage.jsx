import {
  ArrowRight,
  LockKeyhole,
  ShoppingBag,
  Trash2,
  Truck,
} from 'lucide-react'
import { Link } from 'react-router'
import CartItem from '../features/cart/components/CartItem.jsx'
import { useCart } from '../features/cart/useCart.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    isEmpty,
    setQuantity,
    removeItem,
    clearCart,
  } = useCart()

  if (isEmpty) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
        <span
          className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-50 text-brand-700"
          aria-hidden="true"
        >
          <ShoppingBag size={30} />
        </span>

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
          Your cart
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          Your cart is empty
        </h1>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
          Browse the NovaCart catalog and add products you would like to
          purchase.
        </p>

        <Link
          to="/products"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-600"
        >
          Browse products

          <ArrowRight
            size={18}
            aria-hidden="true"
          />
        </Link>
      </section>
    )
  }

  const itemLabel =
    itemCount === 1
      ? '1 item'
      : `${itemCount} items`

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            Shopping cart
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Review your cart
          </h1>

          <p
            className="mt-4 text-slate-600"
            aria-live="polite"
          >
            You currently have{' '}
            <span className="font-bold text-slate-900">
              {itemLabel}
            </span>{' '}
            in your cart.
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 transition hover:bg-rose-50 hover:text-rose-700 sm:self-auto"
        >
          <Trash2
            size={17}
            aria-hidden="true"
          />

          Clear cart
        </button>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-5">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={setQuantity}
              onRemove={removeItem}
            />
          ))}

          <Link
            to="/products"
            className="inline-flex w-fit items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
          >
            <ArrowRight
              size={17}
              className="rotate-180"
              aria-hidden="true"
            />

            Continue shopping
          </Link>
        </div>

        <aside
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft lg:sticky lg:top-24"
          aria-labelledby="order-summary-title"
        >
          <h2
            id="order-summary-title"
            className="text-2xl font-black tracking-tight text-slate-950"
          >
            Order summary
          </h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between gap-4 text-sm">
              <dt className="text-slate-500">
                Subtotal ({itemLabel})
              </dt>

              <dd className="font-bold text-slate-900">
                {currencyFormatter.format(subtotal)}
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 text-sm">
              <dt className="text-slate-500">
                Shipping
              </dt>

              <dd className="font-bold text-emerald-700">
                Free
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 text-sm">
              <dt className="text-slate-500">
                Estimated tax
              </dt>

              <dd className="font-semibold text-slate-500">
                Calculated later
              </dd>
            </div>

            <div className="flex items-end justify-between gap-4 border-t border-slate-200 pt-5">
              <dt>
                <span className="block font-black text-slate-950">
                  Estimated total
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  Before taxes
                </span>
              </dt>

              <dd className="text-3xl font-black tracking-tight text-slate-950">
                {currencyFormatter.format(subtotal)}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 font-black text-white transition hover:-translate-y-0.5 hover:bg-brand-600"
          >
            <LockKeyhole
              size={19}
              aria-hidden="true"
            />

            Proceed to checkout
          </button>

          <div className="mt-5 grid gap-3">
            <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
              <Truck
                size={19}
                className="mt-0.5 shrink-0 text-brand-700"
                aria-hidden="true"
              />

              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Free standard shipping
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Delivery estimates will be shown during checkout.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
              <LockKeyhole
                size={19}
                className="mt-0.5 shrink-0 text-brand-700"
                aria-hidden="true"
              />

              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Secure checkout
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Checkout functionality will be added in a later stage.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default CartPage