import { Outlet } from 'react-router'
import AppFooter from '../components/layout/AppFooter.jsx'
import AppHeader from '../components/layout/AppHeader.jsx'

function App() {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>

      <AppHeader />

      <main id="main-content">
        <Outlet />
      </main>

      <AppFooter />
    </div>
  )
}

export default App