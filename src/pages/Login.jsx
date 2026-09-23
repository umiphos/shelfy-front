import { useAuth0 } from '@auth0/auth0-react'
import { ArrowLeft, LogIn, ShieldCheck } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter'
import { Button, Card } from '../components/UI'

export default function Login() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  if (!isLoading && isAuthenticated) return <Navigate to="/panel" replace />

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-ink/60 hover:text-ink">
          <ArrowLeft size={16} /> Precio Inbox
        </Link>
      </div>
      <main className="mx-auto grid max-w-5xl gap-10 px-5 pb-16 pt-6 sm:px-6 lg:grid-cols-5 lg:items-center">
        <section className="lg:col-span-2">
          <span className="grid size-12 place-items-center rounded-2xl bg-ink text-paper"><LogIn /></span>
          <p className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-brand">Tu mostrador</p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-tight">Vuelve a tu catálogo.</h1>
          <p className="mt-4 text-sm leading-6 text-ink-soft">Administra productos, fotos, precios y disponibilidad desde un solo lugar.</p>
          <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-ink/60">
            <ShieldCheck size={17} className="text-brand" /> Acceso protegido por Auth0
          </div>
        </section>
        <Card className="p-6 sm:p-8 lg:col-span-3">
          <h2 className="font-display text-2xl font-bold">Iniciar sesión</h2>
          <p className="mt-2 text-sm text-ink-soft">Usa tu correo y contraseña para acceder a tu catálogo.</p>
          <Button
            type="button"
            className="mt-7 w-full"
            disabled={isLoading}
            onClick={() => loginWithRedirect({ appState: { returnTo: '/panel' } })}
          >
            {isLoading ? 'Verificando sesión…' : 'Continuar de forma segura'}
          </Button>
          <p className="mt-6 text-center text-sm text-ink/55">
            ¿No tienes cuenta? <Link to="/registro" className="font-semibold text-brand hover:underline">Crea una</Link>
          </p>
        </Card>
      </main>
      <SiteFooter />
    </div>
  )
}
