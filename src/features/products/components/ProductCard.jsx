import {
  useQueryClient,
} from '@tanstack/react-query'
import {
  PackageCheck,
  Star,
} from 'lucide-react'
import { Link } from 'react-router'
import { productQueryOptions } from '../queries/productsQuery.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function formatCategory(category = '') {
  return category
    .split('-')
    .filter(Boolean)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(' ')
}

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {number} price
 * @property {number} discountPercentage
 * @property {number} rating
 * @property {number} stock
 * @property {string=} brand
 * @property {string} thumbnail
 */

/**
 * @param {{ product: Product }} props
 */
function ProductCard({ product }) {
  const queryClient = useQueryClient()

  const {
    id,
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    thumbnail,
  } = product

  const productPath = `/products/${id}`

  const stockLabel =
    stock > 0
      ? `${stock} available`
      : 'Out of stock'

  function prefetchProduct() {
    void queryClient.prefetchQuery(
      productQueryOptions(id),
    )
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl">
      <Link
        to={productPath}
        onMouseEnter={prefetchProduct}
        onFocus={prefetchProduct}
        className="relative block overflow-hidden bg-slate-100"
        aria-label={`View details for ${title}`}
      >
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-contain p-6 transition duration-500 group-hover:scale-105"
        />

        {discountPercentage > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-brand-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
            {discountPercentage.toFixed(0)}% off
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
              {formatCategory(category)}
            </p>

            <h2 className="mt-2 line-clamp-2 text-lg font-extrabold leading-snug text-slate-950">
              <Link
                to={productPath}
                onMouseEnter={prefetchProduct}
                onFocus={prefetchProduct}
                className="transition hover:text-brand-700"
              >
                {title}
              </Link>
            </h2>
          </div>

          <div
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700"
            aria-label={`Rated ${rating.toFixed(1)} out of 5`}
          >
            <Star
              size={14}
              fill="currentColor"
              aria-hidden="true"
            />

            {rating.toFixed(1)}
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <PackageCheck
            size={16}
            className={
              stock > 0
                ? 'text-emerald-600'
                : 'text-rose-600'
            }
            aria-hidden="true"
          />

          <span>{stockLabel}</span>
        </div>

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500">
                {brand || 'Unbranded'}
              </p>

              <p className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                {currencyFormatter.format(price)}
              </p>
            </div>

            <button
              type="button"
              disabled={stock <= 0}
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard