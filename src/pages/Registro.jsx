import { useState } from 'react'
import { Link } from 'react-router-dom'

function Registro() {
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    const formData = new FormData(event.target)

    const email = formData.get('email')
    const password = formData.get('password')

    const response = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      setMessage(`Registro recibido para ${data.email}`)
    } else {
      setMessage('No fue posible crear la cuenta.')
    }
  }

  return (
    <main>
      <h1>Crear cuenta</h1>
      <p>Regístrate para crear tu catálogo.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            name="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
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

      {message && <p>{message}</p>}

      <Link to="/login">
        Ya tengo una cuenta
      </Link>
    </main>
  )
}

export default Registro