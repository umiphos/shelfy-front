import { Link } from 'react-router-dom'

function Login() {
  return (
    <main>
      <h1>Iniciar sesión</h1>
      <p>Accede a tu catálogo.</p>

      <form>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            name="email"
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            name="password"
          />
        </div>

        <button type="submit">
          Iniciar sesión
        </button>
      </form>

      <Link to="/registro">
        Crear una cuenta
      </Link>
    </main>
  )
}

export default Login