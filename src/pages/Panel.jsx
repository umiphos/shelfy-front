import { useEffect, useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'


function Panel() {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [catalog, setCatalog] = useState(null)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)


  useEffect(() => {
    const storedUser =
      localStorage.getItem('user')

    if (!storedUser) {
      navigate('/login')
      return
    }

    const currentUser =
      JSON.parse(storedUser)

    setUser(currentUser)

    fetch(
      `http://127.0.0.1:8000/api/catalogs/${currentUser.id}`,
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error()
        }

        return response.json()
      })
      .then((data) => {
        setCatalog(data)
      })
      .catch(() => {
        setMessage(
          'No se pudo cargar el catálogo.',
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }, [navigate])


  async function handleCreateCatalog(event) {
    event.preventDefault()

    setMessage('')
    setSaving(true)

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/catalogs',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            user_id: user.id,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        setMessage(
          data.detail ||
            'No fue posible crear el catálogo.',
        )

        return
      }

      setCatalog(data)
      setName('')
      setMessage(
        'Catálogo creado correctamente.',
      )
    } catch {
      setMessage(
        'No se pudo conectar con el servidor.',
      )
    } finally {
      setSaving(false)
    }
  }


  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/login')
  }


  if (loading) {
    return (
      <main>
        <p>Cargando...</p>
      </main>
    )
  }


  return (
    <main>
      <h1>Panel</h1>

      {user && (
        <p>
          Usuario: {user.email}
        </p>
      )}

      {!catalog ? (
        <>
          <h2>Crear catálogo</h2>

          <form
            onSubmit={handleCreateCatalog}
          >
            <div>
              <label htmlFor="catalog-name">
                Nombre del catálogo
              </label>

              <input
                id="catalog-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                required
              />
            </div>

            <button
              type="submit"
              disabled={saving}
            >
              {saving
                ? 'Creando...'
                : 'Crear catálogo'}
            </button>
          </form>
        </>
      ) : (
        <>
          <h2>{catalog.name}</h2>

          <p>
            Catálogo creado.
          </p>

          <p>
            Productos: 0
          </p>

          <button type="button">
            <Link to="/productos/nuevo">
              Agregar producto
            </Link>          
          </button>

          <button type="button">
            Ver catálogo público
          </button>

          <p>
            <Link to="/productos">
              Ver productos
            </Link>
          </p>
        </>
      )}

      {message && (
        <p>
          {message}
        </p>
      )}

      <p>
        <Link to="/panel">
          Panel
        </Link>
      </p>

      <button
        type="button"
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
    </main>
  )
}


export default Panel