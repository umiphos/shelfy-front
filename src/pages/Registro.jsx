import { useAuth0 } from '@auth0/auth0-react'
import { ArrowLeft, CheckCircle2, Mail, ShieldCheck } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter'
import { Button, Card } from '../components/UI'

export default function Registro() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  if (!isLoading && isAuthenticated) return <Navigate to="/panel" replace />

  const signup = () => loginWithRedirect({
    appState: { returnTo: '/panel' },
    authorizationParams: { screen_hint: 'signup' },
  })

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-ink/60 hover:text-ink">
          <ArrowLeft size={16} /> Precio Inbox
        </Link>
      </div>
      <main className="mx-auto grid max-w-5xl gap-10 px-5 pb-16 pt-6 sm:px-6 lg:grid-cols-5 lg:items-center">
        <section className="lg:col-span-2">
          <span className="grid size-12 place-items-center rounded-2xl bg-brand text-paper"><Mail /></span>
          <p className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-brand">Empieza aquí</p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-tight">Crea tu catálogo y ponlo a trabajar.</h1>
          <p className="mt-4 text-sm leading-6 text-ink-soft">Crea una cuenta segura con tu correo y comienza a publicar.</p>
          <div className="mt-7 space-y-3 text-sm text-ink-soft">
            {['Una URL pública para compartir.', 'Precios y disponibilidad visibles.', 'Pedidos directos por WhatsApp.'].map((benefit) => (
              <div className="flex gap-3" key={benefit}>
                <CheckCircle2 className="mt-0.5 shrink-0 text-brand" size={17} />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </section>
        <Card className="p-6 sm:p-8 lg:col-span-3">
          <span className="grid size-12 place-items-center rounded-full bg-sage/25 text-ink"><ShieldCheck /></span>
          <h2 className="mt-5 font-display text-2xl font-bold">Crear cuenta</h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">El registro y la verificación de tu cuenta se realizan de forma segura con Auth0.</p>
          <Button type="button" className="mt-7 w-full" disabled={isLoading} onClick={signup}>
            {isLoading ? 'Verificando sesión…' : 'Comenzar registro'}
          </Button>
          <p className="mt-6 text-center text-sm text-ink/55">
            ¿Ya tienes una cuenta? <Link to="/login" className="font-semibold text-brand hover:underline">Inicia sesión</Link>
          </p>
        </Card>
      </main>
      <SiteFooter />
    </div>
  )
}
