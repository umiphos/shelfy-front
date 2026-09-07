import { useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'

import SiteFooter from '../components/SiteFooter'
import { API_BASE } from '../lib/api'


function Login() {
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)


  async function handleSubmit(event) {
    event.preventDefault()

    setMessage('')
    setSaving(true)

    const formData = new FormData(event.target)

    try {
      const response = await fetch(
        `${API_BASE}/api/login`,
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
            'Correo o contraseña incorrectos.',
        )

        return
      }

      localStorage.setItem(
        'user',
        JSON.stringify({
          id: data.id,
          email: data.email,
        }),
      )

      navigate('/panel')
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

        <h1 className="auth-page__mark">
          Iniciar sesión
        </h1>

        <p className="auth-page__lede">
          Accede a tu catálogo.
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
              autoComplete="current-password"
              required
            />
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
            {saving ? 'Entrando...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="auth-page__foot">
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="link">
            Crea una
          </Link>
        </p>
      </div>

      <SiteFooter />
    </>
  )
}


export default Login
