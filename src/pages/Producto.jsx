import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Nameplate from '../components/Nameplate'
import SiteFooter from '../components/SiteFooter'
import StatusBadge from '../components/StatusBadge'
import { API_BASE, imageUrl } from '../lib/api'
import { publicAvailability } from '../lib/availability'
import { whatsappOrderLink } from '../lib/whatsapp'


function Producto() {
  const { productId } = useParams()

  const [product, setProduct] = useState(null)
  const [images, setImages] = useState([])
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [categories, setCategories] = useState([])
  const [shared, setShared] = useState(false)


  useEffect(() => {
    async function loadProduct() {
      try {
        const productResponse = await fetch(
          `${API_BASE}/api/products/item/${productId}`,
        )

        if (!productResponse.ok) {
          setMessage('No se encontró el producto.')
          return
        }

        const productData = await productResponse.json()
        setProduct(productData)

        const imagesResponse = await fetch(
          `${API_BASE}/api/products/${productId}/images`,
        )

        if (imagesResponse.ok) {
          setImages(await imagesResponse.json())
        }

        const categoriesResponse = await fetch(
          `${API_BASE}/api/categories`,
        )

        if (categoriesResponse.ok) {
          setCategories(await categoriesResponse.json())
        }
      } catch {
        setMessage('No se pudo cargar el producto.')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [productId])


  async function handleShare() {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          url,
        })
      } catch {
        // el usuario canceló, no hacer nada
      }

      return
    }

    await navigator.clipboard.writeText(url)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }


  if (loading) {
    return (
      <>
        <Nameplate />
        <main className="page">
          <p className="loading">Cargando producto…</p>
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


  if (!product) {
    return null
  }


  const availability = publicAvailability(product)

  const categoryName =
    categories.find(
      (category) => category.id === product.category_id,
    )?.name || 'General / Otros'

  const mainImage = images[activeImage] || images[0]

  return (
    <>
      <Nameplate />

      <main className="page">
        <p style={{ marginBottom: 'var(--space-4)' }}>
          <button
            type="button"
            className="btn--text"
            onClick={() => window.history.back()}
          >
            Volver al catálogo
          </button>
        </p>

        <div className="spread">
          <div>
            <div className="spread__gallery-main">
              {mainImage ? (
                <img
                  src={imageUrl(mainImage.url)}
                  alt={product.name}
                />
              ) : (
                <div className="product-card__frame--empty">
                  Sin foto
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="spread__thumbs">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    className={
                      index === activeImage ? 'is-active' : ''
                    }
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={imageUrl(image.url)} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="spread__info">
            <p className="eyebrow">{categoryName}</p>

            <h1>{product.name}</h1>

            <p className="spread__price">${product.price}</p>

            <div className="spread__badges">
              <StatusBadge
                label={availability.label}
                variant={availability.variant}
              />
            </div>

            {product.description && (
              <p>{product.description}</p>
            )}

            {(product.characteristics ||
              product.color ||
              product.size ||
              product.shipping) && (
              <div className="spread__details">
                <dl>
                  {product.characteristics && (
                    <>
                      <dt>Características</dt>
                      <dd>{product.characteristics}</dd>
                    </>
                  )}

                  {product.color && (
                    <>
                      <dt>Color</dt>
                      <dd>{product.color}</dd>
                    </>
                  )}

                  {product.size && (
                    <>
                      <dt>Talla</dt>
                      <dd>{product.size}</dd>
                    </>
                  )}

                  {product.shipping && (
                    <>
                      <dt>Entrega</dt>
                      <dd>A domicilio disponible</dd>
                    </>
                  )}
                </dl>
              </div>
            )}

            <div className="spread__actions">
              {product.whatsapp && (
                <a
                  className="btn btn--whatsapp"
                  href={whatsappOrderLink(
                    product.whatsapp,
                    product.name,
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  Pedir por WhatsApp
                </a>
              )}

              <button
                type="button"
                className="btn btn--outline"
                onClick={handleShare}
              >
                {shared ? 'Enlace copiado' : 'Compartir'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}


export default Producto
