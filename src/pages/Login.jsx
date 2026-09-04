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
    <main>
      <h1>Iniciar sesión</h1>

      <p>
        Accede a tu catálogo.
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
            required
          />
        </div>

        <button type="submit">
          Iniciar sesión
        </button>
      </form>

      {message && (
        <p>
          {message}
        </p>
      )}

      <Link to="/registro">
        Crear una cuenta
      </Link>
    </main>
  )
}


export default Login