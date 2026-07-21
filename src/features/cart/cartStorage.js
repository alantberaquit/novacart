import { createCartItem } from './cartReducer.js'

export const CART_STORAGE_KEY = 'novacart.cart.v1'

function canUseLocalStorage() {
  return (
    typeof window !== 'undefined' &&
    window.localStorage
  )
}

function normalizeStoredItems(value) {
  if (!Array.isArray(value)) {
    return []
  }

  return value.reduce((items, storedItem) => {
    const normalizedItem = createCartItem(
      storedItem,
      storedItem?.quantity,
    )

    if (!normalizedItem) {
      return items
    }

    const existingItemIndex = items.findIndex(
      (item) => item.id === normalizedItem.id,
    )

    if (existingItemIndex === -1) {
      return [...items, normalizedItem]
    }

    const existingItem =
      items[existingItemIndex]

    const combinedItem = createCartItem(
      normalizedItem,
      existingItem.quantity +
        normalizedItem.quantity,
    )

    if (!combinedItem) {
      return items
    }

    return items.map((item, index) =>
      index === existingItemIndex
        ? combinedItem
        : item,
    )
  }, [])
}

export function loadCartItems() {
  if (!canUseLocalStorage()) {
    return []
  }

  try {
    const storedCart = window.localStorage.getItem(
      CART_STORAGE_KEY,
    )

    if (!storedCart) {
      return []
    }

    return normalizeStoredItems(
      JSON.parse(storedCart),
    )
  } catch {
    return []
  }
}

export function saveCartItems(items) {
  if (!canUseLocalStorage()) {
    return
  }

  try {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(items),
    )
  } catch {
    // Storage can fail when disabled, full,
    // or restricted by the browser.
  }
}

export function removeStoredCart() {
  if (!canUseLocalStorage()) {
    return
  }

  try {
    window.localStorage.removeItem(
      CART_STORAGE_KEY,
    )
  } catch {
    // Ignore unavailable browser storage.
  }
}