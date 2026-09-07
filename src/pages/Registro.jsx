import { useState } from 'react'
import { Link } from 'react-router-dom'


function Registro() {
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)


  async function handleSubmit(event) {
    event.preventDefault()

    setMessage('')
    setSuccess(false)

    const formData = new FormData(event.target)

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/register',
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
      setMessage('Cuenta creada correctamente.')

      event.target.reset()
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

          <h1>Crear cuenta</h1>

          <p>
            Crea tu cuenta y comienza tu catálogo.
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
              minLength="5"
              autoComplete="new-password"
              required
            />

            <small className="field-help">
              Mínimo 5 caracteres.
            </small>
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
            Crear cuenta
          </button>
        </form>

        {success && (
          <div className="success-box">
            <p>
              Cuenta creada correctamente.
            </p>

            <Link to="/login">
              Iniciar sesión
            </Link>
          </div>
        )}

        <div className="auth-footer">
          <span>¿Ya tienes una cuenta?</span>

          <Link to="/login">
            Iniciar sesión
          </Link>
        </div>
      </section>
    </main>
  )
}


export default Registro