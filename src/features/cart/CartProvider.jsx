import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import {
  CART_ACTIONS,
  cartReducer,
} from './cartReducer.js'
import {
  loadCartItems,
  removeStoredCart,
  saveCartItems,
} from './cartStorage.js'
import { CartContext } from './cartContext.js'

function CartProvider({ children }) {
  const [items, dispatch] = useReducer(
    cartReducer,
    undefined,
    loadCartItems,
  )

  useEffect(() => {
    if (items.length === 0) {
      removeStoredCart()
      return
    }

    saveCartItems(items)
  }, [items])

  const addItem = useCallback(
    (product, quantity = 1) => {
      dispatch({
        type: CART_ACTIONS.addItem,
        payload: {
          product,
          quantity,
        },
      })
    },
    [],
  )

  const setQuantity = useCallback(
    (productId, quantity) => {
      dispatch({
        type: CART_ACTIONS.setQuantity,
        payload: {
          productId,
          quantity,
        },
      })
    },
    [],
  )

  const removeItem = useCallback(
    (productId) => {
      dispatch({
        type: CART_ACTIONS.removeItem,
        payload: {
          productId,
        },
      })
    },
    [],
  )

  const clearCart = useCallback(() => {
    dispatch({
      type: CART_ACTIONS.clear,
    })
  }, [])

  const itemCount = items.reduce(
    (total, item) =>
      total + item.quantity,
    0,
  )

  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0,
  )

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      isEmpty: items.length === 0,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    ],
  )

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider