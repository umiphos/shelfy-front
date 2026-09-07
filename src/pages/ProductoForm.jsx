import { useEffect, useState } from 'react'
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'

import Nameplate from '../components/Nameplate'
import SiteFooter from '../components/SiteFooter'
import { API_BASE, getStoredUser, imageUrl } from '../lib/api'


function ProductoForm() {
  const navigate = useNavigate()
  const { productId } = useParams()

  const editing = Boolean(productId)

  const [catalog, setCatalog] = useState(null)

  const [form, setForm] = useState({
    name: '',
    price: '',
    category_id: '',
    quantity: '',
    status: 'available',

    description: '',
    characteristics: '',
    color: '',
    size: '',
    shipping: false,
    whatsapp: '',
  })

  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState([])
  const [imageMessage, setImageMessage] = useState('')
  const [existingImages, setExistingImages] = useState([])
  const [categories, setCategories] = useState([])


  useEffect(() => {
    const user = getStoredUser()

    if (!user) {
      navigate('/login')
      return
    }

    fetch(`${API_BASE}/api/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch(() => {
        setMessage(
          'No se pudieron cargar las categorías.',
        )
      })

    fetch(`${API_BASE}/api/catalogs/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          navigate('/panel')
          return
        }

        setCatalog(data)

        if (editing) {
          return fetch(
            `${API_BASE}/api/products/item/${productId}`,
          )
            .then((response) => response.json())
            .then((product) => {
              setForm({
                name: product.name,
                price: product.price,
                category_id: product.category_id,
                quantity: product.quantity,
                status: product.status || 'available',
                description: product.description || '',
                characteristics:
                  product.characteristics || '',
                color: product.color || '',
                size: product.size || '',
                shipping: product.shipping,
                whatsapp: product.whatsapp || '',
              })

              return fetch(
                `${API_BASE}/api/products/${productId}/images`,
              )
            })
            .then((response) => response.json())
            .then((data) => setExistingImages(data))
        }
      })
      .catch(() => {
        setMessage(
          'No se pudo cargar la información.',
        )
      })
      .finally(() => setLoading(false))
  }, [navigate, editing, productId])


  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }


  function handleImageSelect(event) {
    const selected = Array.from(event.target.files)

    if (existingImages.length + selected.length > 5) {
      setImageMessage(
        `El producto puede tener máximo 5 imágenes. Actualmente tienes ${existingImages.length}.`,
      )

      return
    }

    setImageMessage('')
    setImages(selected)
  }


  async function handleRemoveExisting(imageId) {
    const response = await fetch(
      `${API_BASE}/api/products/images/${imageId}`,
      { method: 'DELETE' },
    )

    if (!response.ok) {
      setImageMessage('No se pudo eliminar la imagen.')
      return
    }

    setExistingImages(
      existingImages.filter((item) => item.id !== imageId),
    )
  }


  async function handleSubmit(event) {
    event.preventDefault()

    if (!catalog) {
      return
    }

    if (!editing && existingImages.length + images.length === 0) {
      setImageMessage(
        'Agrega al menos una imagen antes de publicar.',
      )

      return
    }

    setSaving(true)
    setMessage('')

    const payload = {
      catalog_id: catalog.id,
      name: form.name,
      price: Number(form.price),
      category_id: Number(form.category_id),
      quantity: Number(form.quantity),
      status: form.status,
      description: form.description || null,
      characteristics: form.characteristics || null,
      color: form.color || null,
      size: form.size || null,
      shipping: form.shipping,
      whatsapp: form.whatsapp || null,
    }

    try {
      const response = await fetch(
        editing
          ? `${API_BASE}/api/products/${productId}`
          : `${API_BASE}/api/products`,
        {
          method: editing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        setMessage(
          data.detail ||
            'No se pudo guardar el producto.',
        )

        return
      }

      for (const image of images) {
        const formData = new FormData()
        formData.append('file', image)

        const imageResponse = await fetch(
          `${API_BASE}/api/products/${data.id}/images`,
          {
            method: 'POST',
            body: formData,
          },
        )

        if (!imageResponse.ok) {
          const imageData = await imageResponse.json()

          setMessage(
            imageData.detail ||
              'No se pudo subir una de las imágenes.',
          )

          return
        }
      }

      navigate('/productos')
    } catch {
      setMessage(
        'No se pudo conectar con el servidor.',
      )
    } finally {
      setSaving(false)
    }
  }


  return (
    <>
      <Nameplate>
        <Link to="/productos">Mis productos</Link>
      </Nameplate>

      <main className="page page--medium">
        <p className="eyebrow">
          {editing ? 'Editar' : 'Nuevo producto'}
        </p>

        <h1>
          {editing ? 'Editar producto' : 'Agregar producto'}
        </h1>

        {loading ? (
          <p className="loading">Cargando…</p>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="price">Precio</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="quantity">Cantidad</label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  step="1"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="category">Categoría</label>
                <select
                  id="category"
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="status">Estado</label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="available">Disponible</option>
                  <option value="sold_out">Agotado</option>
                  <option value="hidden">Oculto</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="characteristics">
                Características
              </label>
              <textarea
                id="characteristics"
                name="characteristics"
                value={form.characteristics}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="color">Color</label>
                <input
                  id="color"
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label htmlFor="size">Talla</label>
                <input
                  id="size"
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="whatsapp">WhatsApp de contacto</label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                placeholder="Ej. 3121234567"
                value={form.whatsapp}
                onChange={handleChange}
              />
            </div>

            <div className="field field--checkbox">
              <input
                id="shipping"
                name="shipping"
                type="checkbox"
                checked={form.shipping}
                onChange={handleChange}
              />
              <label htmlFor="shipping">
                Permite entrega a domicilio
              </label>
            </div>

            <div className="field">
              <label htmlFor="images">
                Imágenes ({existingImages.length}/5)
              </label>

              {existingImages.length > 0 && (
                <div className="image-manager">
                  {existingImages.map((image, index) => (
                    <div
                      className={
                        index === 0
                          ? 'image-manager__item image-manager__item--main'
                          : 'image-manager__item'
                      }
                      key={image.id}
                    >
                      <img src={imageUrl(image.url)} alt="" />
                      <button
                        type="button"
                        className="image-manager__remove"
                        onClick={() =>
                          handleRemoveExisting(image.id)
                        }
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <input
                id="images"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleImageSelect}
              />

              <p className="field__hint">
                Mínimo 1, máximo 5. Hasta 2&nbsp;MB por imagen.
                La primera es la principal.
              </p>

              {images.length > 0 && (
                <p className="field__hint">
                  {images.length} imagen(es) lista(s) para subir.
                </p>
              )}

              {imageMessage && (
                <p className="message message--error">
                  {imageMessage}
                </p>
              )}
            </div>

            {message && (
              <p className="message message--error">{message}</p>
            )}

            <div className="actions-row">
              <button
                type="submit"
                className="btn btn--primary"
                disabled={saving}
              >
                {saving ? 'Guardando...' : 'Publicar'}
              </button>

              <Link to="/productos" className="btn--text">
                Cancelar
              </Link>
            </div>
          </form>
        )}
      </main>

      <SiteFooter />
    </>
  )
}


export default ProductoForm
