import { useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'


function Login() {
  const navigate = useNavigate()

  const [message, setMessage] = useState('')


  async function handleSubmit(event) {
    event.preventDefault()

    setMessage('')

    const formData = new FormData(event.target)

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/login',
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
            'Error al iniciar sesión.',
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
    }
  }


  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <span className="brand">CATÁLOGO</span>

          <h1>Bienvenido</h1>

          <p>
            Inicia sesión para administrar tu catálogo.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
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

          <div>
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
            <p className="message">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="primary-button"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="auth-footer">
          <span>¿Todavía no tienes una cuenta?</span>

          <Link to="/registro">
            Crear una cuenta
          </Link>
        </div>
      </section>
    </main>
  )
}


export default Login