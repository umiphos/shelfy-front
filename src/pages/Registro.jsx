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
    <main>
      <h1>Crear cuenta</h1>

      <p>
        Regístrate para crear tu catálogo.
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Correo electrónico
          </label>

          <input
            id="email"
            type="email"
            name="email"
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
            required
          />
        </div>

        <button type="submit">
          Crear cuenta
        </button>
      </form>

      {message && (
        <p>
          {message}
        </p>
      )}

      {success && (
        <Link to="/login">
          Iniciar sesión
        </Link>
      )}

      <br />

      <Link to="/login">
        Ya tengo una cuenta
      </Link>
    </main>
  )
}


export default Registro