import { Link } from 'react-router-dom'

function Registro() {
  return (
    <main>
      <h1>Crear cuenta</h1>
      <p>Regístrate para crear tu catálogo.</p>

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
          Crear cuenta
        </button>
      </form>

      <Link to="/login">
        Ya tengo una cuenta
      </Link>
    </main>
  )
}

export default Registro