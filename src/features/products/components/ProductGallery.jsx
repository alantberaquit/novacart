import { useState } from 'react'

function ProductGallery({
  images = [],
  productTitle,
}) {
  const validImages = [
    ...new Set(images.filter(Boolean)),
  ]

  const [selectedImage, setSelectedImage] =
    useState('')

  const activeImage = validImages.includes(
    selectedImage,
  )
    ? selectedImage
    : validImages[0] ?? ''

  if (validImages.length === 0) {
    return (
      <div className="grid aspect-square place-items-center rounded-3xl border border-slate-200 bg-slate-100 px-6 text-center text-sm font-semibold text-slate-500">
        Product image unavailable
      </div>
    )
  }

  const activeImageIndex =
    validImages.indexOf(activeImage)

  return (
    <div>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
        <img
          src={activeImage}
          alt={`${productTitle} view ${activeImageIndex + 1}`}
          className="aspect-square w-full object-contain p-8 sm:p-12"
        />
      </div>

      {validImages.length > 1 && (
        <div
          className="mt-4 grid grid-cols-4 gap-3 sm:gap-4"
          aria-label={`${productTitle} image gallery`}
        >
          {validImages.map((image, index) => {
            const isSelected =
              image === activeImage

            return (
              <button
                key={image}
                type="button"
                onClick={() =>
                  setSelectedImage(image)
                }
                aria-label={`Show ${productTitle} image ${index + 1}`}
                aria-pressed={isSelected}
                className={
                  isSelected
                    ? 'overflow-hidden rounded-2xl border-2 border-brand-600 bg-white shadow-sm ring-4 ring-brand-100'
                    : 'overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-brand-300 hover:shadow-sm'
                }
              >
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full object-contain p-3 sm:p-4"
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ProductGallery