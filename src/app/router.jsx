import { createBrowserRouter } from 'react-router'
import App from './App.jsx'
import CartPage from '../pages/CartPage.jsx'
import HomePage from '../pages/HomePage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import ProductDetailsPage from '../pages/ProductDetailsPage.jsx'
import ProductsPage from '../pages/ProductsPage.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'products',
        Component: ProductsPage,
      },
      {
        path: 'products/:productId',
        Component: ProductDetailsPage,
      },
      {
        path: 'cart',
        Component: CartPage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
])