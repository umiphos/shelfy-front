import { useState } from 'react'
import { Link } from 'react-router-dom'

import SiteFooter from '../components/SiteFooter'
import { API_BASE } from '../lib/api'


function Registro() {
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [saving, setSaving] = useState(false)


  async function handleSubmit(event) {
    event.preventDefault()

    setMessage('')
    setSuccess(false)
    setSaving(true)

    const formData = new FormData(event.target)

    try {
      const response = await fetch(
        `${API_BASE}/api/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password'),
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        setMessage(
          data.detail ||
            'No fue posible crear la cuenta.',
        )

        return
      }

      setSuccess(true)

      event.target.reset()
    } catch {
      setMessage(
        'No se pudo conectar con el servidor.',
      )
    } finally {
      setSaving(false)
    }
  }


  return (
    <>
      <div className="page page--narrow auth-page">
        <p className="eyebrow">Catálogo</p>

        {success ? (
          <>
            <h1 className="auth-page__mark">
              Revisa tu correo
            </h1>

            <p className="auth-page__lede">
              Te enviamos un enlace para verificar tu cuenta.
              Confírmalo y después inicia sesión para crear
              tu catálogo.
            </p>

            <Link to="/login" className="btn btn--primary">
              Ir a iniciar sesión
            </Link>
          </>
        ) : (
          <>
            <h1 className="auth-page__mark">
              Crear cuenta
            </h1>

            <p className="auth-page__lede">
              Regístrate para armar tu catálogo y compartirlo
              por WhatsApp.
            </p>

            <form className="form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="email">
                  Correo electrónico
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="password">
                  Contraseña
                </label>

                <input
                  id="password"
                  type="password"
                  name="password"
                  minLength="5"
                  autoComplete="new-password"
                  required
                />

                <p className="field__hint">
                  Mínimo 5 caracteres.
                </p>
              </div>

              {message && (
                <p className="message message--error">
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="btn btn--primary btn--block"
                disabled={saving}
              >
                {saving ? 'Creando cuenta...' : 'Crear cuenta'}
              </button>
            </form>

            <p className="auth-page__foot">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="link">
                Inicia sesión
              </Link>
            </p>
          </>
        )}
      </div>

      <SiteFooter />
    </>
  )
}


export default Registro
