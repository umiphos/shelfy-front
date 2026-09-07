import { useEffect, useMemo, useState } from 'react'
import {
  Link,
  useParams,
} from 'react-router-dom'

import Nameplate from '../components/Nameplate'
import SiteFooter from '../components/SiteFooter'
import StatusBadge from '../components/StatusBadge'
import { API_BASE, imageUrl } from '../lib/api'
import { publicAvailability } from '../lib/availability'


function Catalogo() {
  const { slug } = useParams()
  const [catalog, setCatalog] = useState(null)
  const [products, setProducts] = useState([])
  const [images, setImages] = useState({})
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')


  useEffect(() => {
    async function loadCatalog() {
      try {
        const catalogResponse = await fetch(
          `${API_BASE}/api/catalogs/public/${slug}`,
        )

        if (!catalogResponse.ok) {
          setMessage('No se encontró el catálogo.')
          return
        }

        const catalogData = await catalogResponse.json()

        if (!catalogData) {
          setMessage('No se encontró el catálogo.')
          return
        }

        setCatalog(catalogData)

        const productsResponse = await fetch(
          `${API_BASE}/api/products/${catalogData.id}`,
        )

        if (!productsResponse.ok) {
          setMessage('No se pudieron cargar los productos.')
          return
        }

        const productsData = await productsResponse.json()
        setProducts(productsData)

        const imageMap = {}

        for (const product of productsData) {
          const imagesResponse = await fetch(
            `${API_BASE}/api/products/${product.id}/images`,
          )

          if (!imagesResponse.ok) {
            continue
          }

          imageMap[product.id] = await imagesResponse.json()
        }

        setImages(imageMap)
      } catch {
        setMessage('No se pudo cargar el catálogo.')
      } finally {
        setLoading(false)
      }
    }

    loadCatalog()
  }, [slug])


  const visibleProducts = useMemo(
    () => products.filter((product) => product.status !== 'hidden'),
    [products],
  )

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(
        visibleProducts
          .map((product) => product.category)
          .filter(Boolean),
      ),
    )

    return ['Todos', ...unique]
  }, [visibleProducts])

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Todos') return visibleProducts

    return visibleProducts.filter(
      (product) => product.category === activeCategory,
    )
  }, [visibleProducts, activeCategory])


  if (loading) {
    return (
      <>
        <Nameplate />
        <main className="page">
          <p className="loading">Abriendo el catálogo…</p>
        </main>
      </>
    )
  }


  if (message) {
    return (
      <>
        <Nameplate />
        <main className="page">
          <div className="empty-state">
            <h3>{message}</h3>
          </div>
        </main>
      </>
    )
  }


  if (!catalog) {
    return null
  }


  return (
    <>
      <Nameplate />

      <main className="page">
        <div className="cover">
          <p className="eyebrow cover__eyebrow">Catálogo</p>
          <h1 className="cover__title">{catalog.name}</h1>
          <p className="cover__meta">
            {visibleProducts.length}{' '}
            {visibleProducts.length === 1
              ? 'producto'
              : 'productos'}
          </p>
        </div>

        {visibleProducts.length === 0 ? (
          <div className="empty-state">
            <h3>
              Este catálogo todavía no tiene productos
              publicados.
            </h3>
            <p>Vuelve pronto para ver las novedades.</p>
          </div>
        ) : (
          <>
            {categories.length > 2 && (
              <div className="filter-row">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={
                      category === activeCategory
                        ? 'is-active'
                        : ''
                    }
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            <div className="grid-products">
              {filteredProducts.map((product) => {
                const availability = publicAvailability(product)
                const cover = images[product.id]?.[0]

                return (
                  <Link
                    to={`/productos/${product.id}`}
                    className="product-card"
                    key={product.id}
                  >
                    <div className="product-card__frame">
                      {cover ? (
                        <img
                          src={imageUrl(cover.url)}
                          alt={product.name}
                        />
                      ) : (
                        <div className="product-card__frame--empty">
                          Sin foto
                        </div>
                      )}

                      <StatusBadge
                        className="product-card__badge"
                        label={availability.label}
                        variant={availability.variant}
                      />
                    </div>

                    <p className="product-card__name">
                      {product.name}
                    </p>

                    <div className="product-card__meta">
                      <span className="product-card__price">
                        ${product.price}
                      </span>
                      <span>{product.category}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </main>

      <SiteFooter note={`precioinbox.com/${catalog.slug}/catalogo`} />
    </>
  )
}


export default Catalogo
