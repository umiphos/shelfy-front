import { useEffect, useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'

import Nameplate from '../components/Nameplate'
import SiteFooter from '../components/SiteFooter'
import StatusBadge from '../components/StatusBadge'
import { API_BASE, getStoredUser, imageUrl } from '../lib/api'
import { ownerAvailability } from '../lib/availability'


function Productos() {
  const navigate = useNavigate()

  const [catalog, setCatalog] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [images, setImages] = useState({})

  useEffect(() => {
    const user = getStoredUser()

    if (!user) {
      navigate('/login')
      return
    }

    fetch(`${API_BASE}/api/catalogs/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          navigate('/panel')
          return
        }

        setCatalog(data)

        return fetch(
          `${API_BASE}/api/products/${data.id}`,
        )
      })
      .then((response) => {
        if (!response) return
        return response.json()
      })
      .then((data) => {
        if (data) {
          setProducts(data)
          loadImages(data)
        }
      })
      .catch(() => {
        setMessage(
          'No se pudieron cargar los productos.',
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }, [navigate])


  async function loadImages(products) {
    const imageMap = {}

    for (const product of products) {
      const response = await fetch(
        `${API_BASE}/api/products/${product.id}/images`,
      )

      if (!response.ok) {
        continue
      }

      imageMap[product.id] = await response.json()
    }

    setImages(imageMap)
  }


  async function handleDelete(productId, productName) {
    const confirmed = window.confirm(
      `Eliminar "${productName}" es permanente y no se puede deshacer. ¿Continuar?`,
    )

    if (!confirmed) {
      return
    }

    const response = await fetch(
      `${API_BASE}/api/products/${productId}`,
      {
        method: 'DELETE',
      },
    )

    if (!response.ok) {
      setMessage(
        'No se pudo eliminar el producto.',
      )

      return
    }

    setProducts(
      products.filter(
        (product) => product.id !== productId,
      ),
    )
  }


  return (
    <>
      <Nameplate>
        <Link to="/panel">Panel</Link>
        <Link to="/productos/nuevo">Agregar producto</Link>
      </Nameplate>

      <main className="page">
        <p className="eyebrow">
          {catalog?.name || 'Productos'}
        </p>

        <h1>Mis productos</h1>

        {message && (
          <p className="message message--error">{message}</p>
        )}

        {loading ? (
          <p className="loading">Cargando productos…</p>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <h3>Todavía no tienes productos</h3>
            <p>
              Agrega el primero y aparecerá en tu catálogo
              público de inmediato.
            </p>
            <Link to="/productos/nuevo" className="btn btn--primary">
              Agregar producto
            </Link>
          </div>
        ) : (
          <div className="owner-list">
            {products.map((product) => {
              const availability = ownerAvailability(product)
              const cover = images[product.id]?.[0]

              return (
                <article className="owner-row" key={product.id}>
                  <div
                    className={
                      cover
                        ? 'owner-row__thumb'
                        : 'owner-row__thumb owner-row__thumb--empty'
                    }
                  >
                    {cover ? (
                      <img
                        src={imageUrl(cover.url)}
                        alt={product.name}
                      />
                    ) : (
                      'Sin foto'
                    )}
                  </div>

                  <div>
                    <p className="owner-row__name">
                      {product.name}
                    </p>

                    <div className="owner-row__meta">
                      <span>${product.price}</span>
                      <span>{product.category}</span>
                      <StatusBadge
                        label={availability.label}
                        variant={availability.variant}
                      />
                    </div>
                  </div>

                  <div className="owner-row__actions">
                    <Link
                      to={`/productos/${product.id}/editar`}
                      className="btn--text"
                    >
                      Editar
                    </Link>

                    <button
                      type="button"
                      className="btn--text btn--danger"
                      onClick={() =>
                        handleDelete(product.id, product.name)
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  )
}


export default Productos
