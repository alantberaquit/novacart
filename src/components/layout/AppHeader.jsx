import { ShoppingBag, ShoppingCart } from 'lucide-react'
import { NavLink } from 'react-router'

const getNavigationClass = ({ isActive }) => {
  const baseClasses =
    'rounded-lg px-3 py-2 text-sm font-semibold transition-colors'

  const stateClasses = isActive
    ? 'bg-brand-50 text-brand-700'
    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'

  return `${baseClasses} ${stateClasses}`
}

function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          end
          className="group inline-flex items-center gap-2.5"
          aria-label="NovaCart home"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-brand-600 text-white shadow-sm transition-transform group-hover:-rotate-3 group-hover:scale-105">
            <ShoppingBag
              size={19}
              strokeWidth={2.25}
              aria-hidden="true"
            />
          </span>

          <span className="hidden text-lg font-black tracking-tight text-slate-950 sm:inline">
            NovaCart
          </span>
        </NavLink>

        <nav
          className="flex items-center gap-1"
          aria-label="Primary navigation"
        >
          <NavLink to="/" end className={getNavigationClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={getNavigationClass}>
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              [
                'ml-1 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition',
                isActive
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-950 text-white hover:bg-brand-600',
              ].join(' ')
            }
          >
            <ShoppingCart size={17} aria-hidden="true" />

            <span className="hidden sm:inline">Cart</span>

            <span
              className="grid min-w-5 place-items-center rounded-full bg-white/15 px-1.5 text-xs"
              aria-label="0 items in cart"
            >
              0
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader