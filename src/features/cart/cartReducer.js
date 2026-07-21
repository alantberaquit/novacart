export const CART_ACTIONS = {
  addItem: 'cart/addItem',
  setQuantity: 'cart/setQuantity',
  removeItem: 'cart/removeItem',
  clear: 'cart/clear',
}

function normalizeStock(stock) {
  const numericStock = Number(stock)

  if (!Number.isFinite(numericStock)) {
    return 0
  }

  return Math.max(
    Math.floor(numericStock),
    0,
  )
}

function clampQuantity(quantity, stock) {
  const normalizedStock = normalizeStock(stock)
  const numericQuantity = Number(quantity)

  const normalizedQuantity =
    Number.isFinite(numericQuantity)
      ? Math.floor(numericQuantity)
      : 1

  return Math.min(
    Math.max(normalizedQuantity, 1),
    normalizedStock,
  )
}

export function createCartItem(
  product,
  quantity = 1,
) {
  if (!product || product.id == null) {
    return null
  }

  const stock = normalizeStock(product.stock)

  if (stock <= 0) {
    return null
  }

  return {
    id: product.id,
    title:
      product.title?.trim() ||
      'Untitled product',
    price: Number(product.price) || 0,
    thumbnail: product.thumbnail || '',
    brand: product.brand || '',
    stock,
    quantity: clampQuantity(
      quantity,
      stock,
    ),
  }
}

export function cartReducer(
  state,
  action,
) {
  switch (action.type) {
    case CART_ACTIONS.addItem: {
      const newItem = createCartItem(
        action.payload.product,
        action.payload.quantity,
      )

      if (!newItem) {
        return state
      }

      const existingItem = state.find(
        (item) => item.id === newItem.id,
      )

      if (!existingItem) {
        return [...state, newItem]
      }

      const nextQuantity = clampQuantity(
        existingItem.quantity +
          newItem.quantity,
        newItem.stock,
      )

      return state.map((item) =>
        item.id === newItem.id
          ? {
              ...newItem,
              quantity: nextQuantity,
            }
          : item,
      )
    }

    case CART_ACTIONS.setQuantity: {
      const {
        productId,
        quantity,
      } = action.payload

      return state.map((item) => {
        if (item.id !== productId) {
          return item
        }

        return {
          ...item,
          quantity: clampQuantity(
            quantity,
            item.stock,
          ),
        }
      })
    }

    case CART_ACTIONS.removeItem: {
      return state.filter(
        (item) =>
          item.id !== action.payload.productId,
      )
    }

    case CART_ACTIONS.clear:
      return []

    default:
      return state
  }
}