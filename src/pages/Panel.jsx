import { useEffect, useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'

import Nameplate from '../components/Nameplate'
import SiteFooter from '../components/SiteFooter'
import { API_BASE, getStoredUser } from '../lib/api'


function Panel() {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [catalog, setCatalog] = useState(null)
  const [productCount, setProductCount] = useState(null)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)


  useEffect(() => {
    const currentUser = getStoredUser()

    if (!currentUser) {
      navigate('/login')
      return
    }

    setUser(currentUser)

    fetch(`${API_BASE}/api/catalogs/${currentUser.id}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error()
        }

        return response.json()
      })
      .then((data) => {
        setCatalog(data)

        if (data) {
          return fetch(
            `${API_BASE}/api/products/${data.id}`,
          )
            .then((response) =>
              response.ok ? response.json() : [],
            )
            .then((products) =>
              setProductCount(products.length),
            )
        }
      })
      .catch(() => {
        setMessage(
          'No se pudo cargar tu catálogo.',
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
        `${API_BASE}/api/catalogs`,
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
      setProductCount(0)
      setName('')
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
      <>
        <Nameplate />
        <main className="page">
          <p className="loading">Cargando tu panel…</p>
        </main>
      </>
    )
  }


  return (
    <>
      <Nameplate>
        {catalog && (
          <Link to={`/catalogo/${catalog.slug}`}>
            Ver catálogo público
          </Link>
        )}

        <button type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </Nameplate>

      <main className="page page--medium">
        <p className="eyebrow">Panel</p>

        {!catalog ? (
          <>
            <h1>Crea tu catálogo</h1>

            <p className="lede">
              Elige el nombre público con el que tus clientes
              te encontrarán. Podrás agregar productos en
              cuanto lo crees.
            </p>

            <form
              className="form"
              onSubmit={handleCreateCatalog}
              style={{ maxWidth: 420 }}
            >
              <div className="field">
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
                  placeholder="Ej. Tortillería Doña Lupe"
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
                className="btn btn--primary"
                disabled={saving}
              >
                {saving ? 'Creando...' : 'Crear catálogo'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1>{catalog.name}</h1>

            {message && (
              <p className="message message--error">
                {message}
              </p>
            )}

            <div className="stat-row">
              <div className="stat">
                <span className="stat__label">Estado</span>
                <span className="stat__value">
                  {catalog.active === false
                    ? 'Inactivo'
                    : 'Activo'}
                </span>
              </div>

              <div className="stat">
                <span className="stat__label">Productos</span>
                <span className="stat__value">
                  {productCount ?? '—'}
                </span>
              </div>

              <div className="stat">
                <span className="stat__label">
                  Enlace público
                </span>
                <span className="stat__value">
                  <Link
                    to={`/catalogo/${catalog.slug}`}
                    className="link"
                    style={{ fontSize: 'var(--fs-300)' }}
                  >
                    /{catalog.slug}
                  </Link>
                </span>
              </div>
            </div>

            <ul className="toc">
              <li className="toc__item">
                <Link to="/productos/nuevo">
                  Agregar producto
                </Link>
                <span className="toc__leader" />
                <span className="toc__hint">
                  Publica al instante
                </span>
              </li>

              <li className="toc__item">
                <Link to="/productos">Mis productos</Link>
                <span className="toc__leader" />
                <span className="toc__hint">
                  {productCount ?? 0} en total
                </span>
              </li>

              <li className="toc__item">
                <Link to={`/catalogo/${catalog.slug}`}>
                  Ver catálogo público
                </Link>
                <span className="toc__leader" />
                <span className="toc__hint">
                  Así lo ven tus clientes
                </span>
              </li>
            </ul>
          </>
        )}
      </main>

      <SiteFooter />
    </>
  )
}


export default Panel
