import {
  Minus,
  Plus,
  Trash2,
} from 'lucide-react'
import { Link } from 'react-router'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function CartItem({
  item,
  onQuantityChange,
  onRemove,
}) {
  const {
    id,
    title,
    price,
    thumbnail,
    brand,
    stock,
    quantity,
  } = item

  const itemTotal = price * quantity
  const isAtMinimum = quantity <= 1
  const isAtMaximum = quantity >= stock

  function handleQuantityInput(event) {
    const nextQuantity = Number.parseInt(
      event.target.value,
      10,
    )

    if (!Number.isInteger(nextQuantity)) {
      return
    }

    onQuantityChange(id, nextQuantity)
  }

  return (
    <article className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft sm:grid-cols-[120px_minmax(0,1fr)] sm:p-5">
      <Link
        to={`/products/${id}`}
        className="overflow-hidden rounded-xl bg-slate-100"
        aria-label={`View details for ${title}`}
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            decoding="async"
            className="aspect-square h-full w-full object-contain p-3"
          />
        ) : (
          <span className="grid aspect-square place-items-center px-3 text-center text-xs font-semibold text-slate-500">
            Image unavailable
          </span>
        )}
      </Link>

      <div className="flex min-w-0 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
              {brand || 'Unbranded'}
            </p>

            <h2 className="mt-2 text-lg font-extrabold leading-snug text-slate-950">
              <Link
                to={`/products/${id}`}
                className="transition hover:text-brand-700"
              >
                {title}
              </Link>
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {currencyFormatter.format(price)} each
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRemove(id)}
            className="grid size-10 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-rose-50 hover:text-rose-700"
            aria-label={`Remove ${title} from cart`}
          >
            <Trash2
              size={18}
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <label
              htmlFor={`cart-quantity-${id}`}
              className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500"
            >
              Quantity
            </label>

            <div className="mt-2 inline-flex items-center rounded-xl border border-slate-300 bg-white">
              <button
                type="button"
                onClick={() =>
                  onQuantityChange(
                    id,
                    quantity - 1,
                  )
                }
                disabled={isAtMinimum}
                className="grid size-10 place-items-center rounded-l-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 disabled:cursor-not-allowed disabled:text-slate-300"
                aria-label={`Decrease quantity of ${title}`}
              >
                <Minus
                  size={16}
                  aria-hidden="true"
                />
              </button>

              <input
                id={`cart-quantity-${id}`}
                type="number"
                min="1"
                max={stock}
                value={quantity}
                onChange={handleQuantityInput}
                className="h-10 w-14 border-x border-slate-300 bg-white text-center text-sm font-bold text-slate-950 outline-none focus:bg-brand-50"
                aria-describedby={`cart-stock-${id}`}
              />

              <button
                type="button"
                onClick={() =>
                  onQuantityChange(
                    id,
                    quantity + 1,
                  )
                }
                disabled={isAtMaximum}
                className="grid size-10 place-items-center rounded-r-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 disabled:cursor-not-allowed disabled:text-slate-300"
                aria-label={`Increase quantity of ${title}`}
              >
                <Plus
                  size={16}
                  aria-hidden="true"
                />
              </button>
            </div>

            <p
              id={`cart-stock-${id}`}
              className="mt-2 text-xs text-slate-500"
            >
              Maximum {stock} available
            </p>
          </div>

          <div className="sm:text-right">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Item total
            </p>

            <p className="mt-1 text-2xl font-black tracking-tight text-slate-950">
              {currencyFormatter.format(itemTotal)}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CartItem