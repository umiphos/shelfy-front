import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
  const location = useLocation()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: `${location.pathname}${location.search}` },
      })
    }
  }, [isAuthenticated, isLoading, location, loginWithRedirect])

  if (isLoading || !isAuthenticated) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-20 text-center text-sm text-ink/55">
        Verificando tu sesión…
      </main>
    )
  }

  return <Outlet />
}
