import { useCart } from '../useCart.js'

function CartBadge() {
  const { itemCount } = useCart()

  if (itemCount <= 0) {
    return null
  }

  const displayedCount =
    itemCount > 99
      ? '99+'
      : itemCount

  return (
    <span
      className="absolute -right-2 -top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-brand-600 px-1.5 py-0.5 text-[10px] font-black leading-none text-white shadow-sm"
      aria-label={`${itemCount} ${
        itemCount === 1
          ? 'item'
          : 'items'
      } in cart`}
    >
      {displayedCount}
    </span>
  )
}

export default CartBadge