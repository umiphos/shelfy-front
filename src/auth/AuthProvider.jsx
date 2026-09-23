import { Auth0Provider } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const audience = import.meta.env.VITE_AUTH0_AUDIENCE

function MissingAuth0Configuration() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-5 text-ink">
      <div className="max-w-lg rounded-3xl border border-red-200 bg-red-50 p-8">
        <h1 className="font-display text-2xl font-bold">Auth0 no está configurado</h1>
        <p className="mt-3 text-sm leading-6 text-red-800">
          Define VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID y VITE_AUTH0_AUDIENCE.
        </p>
      </div>
    </main>
  )
}

export default function AuthProvider({ children }) {
  const navigate = useNavigate()

  if (!domain || !clientId || !audience) {
    return <MissingAuth0Configuration />
  }

  function handleRedirect(appState) {
    navigate(appState?.returnTo || '/panel', { replace: true })
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience,
        redirect_uri: window.location.origin,
        scope: 'openid profile email',
      }}
      onRedirectCallback={handleRedirect}
    >
      {children}
    </Auth0Provider>
  )
}
