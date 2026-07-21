import {
  AlertCircle,
  ArrowLeft,
  BadgeCheck,
  Box,
  PackageCheck,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react'
import {
  Link,
  useParams,
} from 'react-router'
import { useCart } from '../features/cart/useCart.js'
import ProductGallery from '../features/products/components/ProductGallery.jsx'
import { useProduct } from '../features/products/queries/productsQuery.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
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

function formatReviewDate(date) {
  if (!date) {
    return ''
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return ''
  }

  return dateFormatter.format(parsedDate)
}

function ProductDetailsSkeleton() {
  return (
    <section
      className="mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      aria-label="Loading product details"
    >
      <div className="h-5 w-44 rounded-full bg-slate-200" />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
        <div>
          <div className="aspect-square rounded-3xl bg-slate-200" />

          <div className="mt-4 grid grid-cols-4 gap-4">
            {Array.from(
              { length: 4 },
              (_, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-2xl bg-slate-200"
                />
              ),
            )}
          </div>
        </div>

        <div>
          <div className="h-4 w-28 rounded-full bg-brand-100" />

          <div className="mt-4 h-10 w-4/5 rounded-xl bg-slate-200" />

          <div className="mt-3 h-10 w-3/5 rounded-xl bg-slate-200" />

          <div className="mt-6 h-6 w-36 rounded-full bg-amber-100" />

          <div className="mt-7 h-11 w-40 rounded-xl bg-slate-300" />

          <div className="mt-7 space-y-3">
            <div className="h-4 w-full rounded-full bg-slate-200" />
            <div className="h-4 w-full rounded-full bg-slate-200" />
            <div className="h-4 w-4/5 rounded-full bg-slate-200" />
          </div>

          <div className="mt-8 h-14 w-full rounded-2xl bg-slate-300" />

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {Array.from(
              { length: 4 },
              (_, index) => (
                <div
                  key={index}
                  className="h-24 rounded-2xl bg-slate-200"
                />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductDetailsPage() {
  const { productId } = useParams()
  const { addItem } = useCart()

  const {
    data: product,
    error,
    isError,
    isPending,
    refetch,
  } = useProduct(productId)

  if (isPending) {
    return <ProductDetailsSkeleton />
  }

  if (isError) {
    const isNotFound = error?.status === 404

    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
        <span
          className="mx-auto grid size-16 place-items-center rounded-2xl bg-rose-100 text-rose-700"
          aria-hidden="true"
        >
          <AlertCircle size={30} />
        </span>

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-rose-700">
          {isNotFound
            ? 'Product not found'
            : 'Catalog error'}
        </p>

        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          {isNotFound
            ? 'This product is unavailable'
            : 'We couldn’t load this product'}
        </h1>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
          {isNotFound
            ? 'The product may have been removed, or the link may contain an invalid product ID.'
            : error?.message ??
              'An unexpected error occurred while loading the product details.'}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-600"
          >
            <ArrowLeft
              size={18}
              aria-hidden="true"
            />

            Back to products
          </Link>

          {!isNotFound && (
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
            >
              <RefreshCw
                size={18}
                aria-hidden="true"
              />

              Try again
            </button>
          )}
        </div>
      </section>
    )
  }

  const {
    title,
    description,
    category,
    price,
    discountPercentage = 0,
    rating = 0,
    stock = 0,
    brand,
    sku,
    thumbnail,
    images = [],
    tags = [],
    dimensions,
    weight,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    returnPolicy,
    minimumOrderQuantity,
    reviews = [],
  } = product

  const galleryImages = [
    thumbnail,
    ...images,
  ].filter(Boolean)

  const hasDiscount =
    discountPercentage > 0 &&
    discountPercentage < 100

  const originalPrice = hasDiscount
    ? price / (1 - discountPercentage / 100)
    : null

  const isInStock = stock > 0

  function handleAddToCart() {
    addItem(product)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <nav
        className="flex flex-wrap items-center gap-2 text-sm text-slate-500"
        aria-label="Breadcrumb"
      >
        <Link
          to="/"
          className="transition hover:text-brand-700"
        >
          Home
        </Link>

        <span aria-hidden="true">/</span>

        <Link
          to="/products"
          className="transition hover:text-brand-700"
        >
          Products
        </Link>

        <span aria-hidden="true">/</span>

        <span
          className="max-w-64 truncate font-semibold text-slate-800"
          aria-current="page"
        >
          {title}
        </span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:gap-14">
        <ProductGallery
          images={galleryImages}
          productTitle={title}
        />

        <div>
          <Link
            to={`/products?category=${encodeURIComponent(category)}`}
            className="inline-flex rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-700 transition hover:bg-brand-100"
          >
            {formatCategory(category)}
          </Link>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {title}
          </h1>

          <p className="mt-3 text-sm font-semibold text-slate-500">
            {brand || 'Unbranded'}
            {sku && ` · SKU ${sku}`}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-700"
              aria-label={`Rated ${rating.toFixed(1)} out of 5`}
            >
              <Star
                size={16}
                fill="currentColor"
                aria-hidden="true"
              />

              {rating.toFixed(1)}
            </div>

            <span className="text-sm text-slate-500">
              {reviews.length}{' '}
              {reviews.length === 1
                ? 'review'
                : 'reviews'}
            </span>

            <span
              className={
                isInStock
                  ? 'inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-700'
                  : 'inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-sm font-bold text-rose-700'
              }
            >
              <PackageCheck
                size={16}
                aria-hidden="true"
              />

              {availabilityStatus ||
                (isInStock
                  ? 'In stock'
                  : 'Out of stock')}
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-end gap-3">
            <p className="text-4xl font-black tracking-tight text-slate-950">
              {currencyFormatter.format(price)}
            </p>

            {originalPrice && (
              <p className="pb-1 text-lg font-semibold text-slate-400 line-through">
                {currencyFormatter.format(
                  originalPrice,
                )}
              </p>
            )}

            {hasDiscount && (
              <span className="mb-1 rounded-full bg-brand-600 px-3 py-1 text-sm font-bold text-white">
                {discountPercentage.toFixed(0)}% off
              </span>
            )}
          </div>

          <p className="mt-7 text-pretty text-base leading-8 text-slate-600">
            {description}
          </p>

          {tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!isInStock}
            aria-label={`Add ${title} to cart`}
            className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 text-base font-black text-white transition hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <Box
              size={20}
              aria-hidden="true"
            />

            {isInStock
              ? 'Add to cart'
              : 'Currently unavailable'}
          </button>

          <p className="mt-3 text-center text-sm text-slate-500">
            {isInStock
              ? `${stock} units currently available`
              : 'Check back later for availability'}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-4">
              <Truck
                size={21}
                className="text-brand-700"
                aria-hidden="true"
              />

              <h2 className="mt-3 font-extrabold text-slate-950">
                Shipping
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {shippingInformation ||
                  'Shipping information unavailable.'}
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-4">
              <ShieldCheck
                size={21}
                className="text-brand-700"
                aria-hidden="true"
              />

              <h2 className="mt-3 font-extrabold text-slate-950">
                Warranty
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {warrantyInformation ||
                  'Warranty information unavailable.'}
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-4">
              <RotateCcw
                size={21}
                className="text-brand-700"
                aria-hidden="true"
              />

              <h2 className="mt-3 font-extrabold text-slate-950">
                Returns
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {returnPolicy ||
                  'Return information unavailable.'}
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-4">
              <BadgeCheck
                size={21}
                className="text-brand-700"
                aria-hidden="true"
              />

              <h2 className="mt-3 font-extrabold text-slate-950">
                Ordering
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Minimum quantity:{' '}
                <span className="font-bold text-slate-800">
                  {minimumOrderQuantity ?? 1}
                </span>
              </p>
            </article>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-8 border-t border-slate-200 pt-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
        <section aria-labelledby="specifications-title">
          <h2
            id="specifications-title"
            className="text-2xl font-black tracking-tight text-slate-950"
          >
            Product specifications
          </h2>

          <dl className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex justify-between gap-4 border-b border-slate-200 px-5 py-4">
              <dt className="text-sm font-semibold text-slate-500">
                Category
              </dt>

              <dd className="text-right text-sm font-bold text-slate-900">
                {formatCategory(category)}
              </dd>
            </div>

            <div className="flex justify-between gap-4 border-b border-slate-200 px-5 py-4">
              <dt className="text-sm font-semibold text-slate-500">
                Brand
              </dt>

              <dd className="text-right text-sm font-bold text-slate-900">
                {brand || 'Unbranded'}
              </dd>
            </div>

            <div className="flex justify-between gap-4 border-b border-slate-200 px-5 py-4">
              <dt className="text-sm font-semibold text-slate-500">
                SKU
              </dt>

              <dd className="text-right text-sm font-bold text-slate-900">
                {sku || 'Not provided'}
              </dd>
            </div>

            <div className="flex justify-between gap-4 border-b border-slate-200 px-5 py-4">
              <dt className="text-sm font-semibold text-slate-500">
                Weight
              </dt>

              <dd className="text-right text-sm font-bold text-slate-900">
                {weight != null
                  ? `${weight} units`
                  : 'Not provided'}
              </dd>
            </div>

            <div className="flex justify-between gap-4 px-5 py-4">
              <dt className="text-sm font-semibold text-slate-500">
                Dimensions
              </dt>

              <dd className="text-right text-sm font-bold text-slate-900">
                {dimensions
                  ? `${dimensions.width} × ${dimensions.height} × ${dimensions.depth}`
                  : 'Not provided'}
              </dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="reviews-title">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2
                id="reviews-title"
                className="text-2xl font-black tracking-tight text-slate-950"
              >
                Customer reviews
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Feedback provided by DummyJSON customers.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 font-bold text-amber-700">
              <Star
                size={16}
                fill="currentColor"
                aria-hidden="true"
              />

              {rating.toFixed(1)} average
            </div>
          </div>

          {reviews.length > 0 ? (
            <div className="mt-6 grid gap-4">
              {reviews.map(
                (review, index) => (
                  <article
                    key={`${review.reviewerEmail ?? 'review'}-${index}`}
                    className="rounded-2xl border border-slate-200 bg-white p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-extrabold text-slate-950">
                          {review.reviewerName ||
                            'Anonymous customer'}
                        </h3>

                        {review.date && (
                          <p className="mt-1 text-xs text-slate-500">
                            {formatReviewDate(
                              review.date,
                            )}
                          </p>
                        )}
                      </div>

                      <div
                        className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-bold text-amber-700"
                        aria-label={`Rated ${review.rating} out of 5`}
                      >
                        <Star
                          size={14}
                          fill="currentColor"
                          aria-hidden="true"
                        />

                        {review.rating}
                      </div>
                    </div>

                    <p className="mt-4 leading-7 text-slate-600">
                      {review.comment}
                    </p>
                  </article>
                ),
              )}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-center">
              <p className="text-slate-600">
                This product does not have any reviews yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </section>
  )
}

export default ProductDetailsPage