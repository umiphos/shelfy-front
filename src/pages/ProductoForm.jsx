import { useEffect, useState } from 'react'
import {
  useNavigate,
  useParams,
} from 'react-router-dom'


function ProductoForm() {
  const navigate = useNavigate()
  const { productId } = useParams()

  const editing = Boolean(productId)

  const [catalog, setCatalog] = useState(null)

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    quantity: '',
    description: '',
    characteristics: '',
    color: '',
    size: '',
    shipping: false,
    whatsapp: '',
  })

  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState([])
  const [imageMessage, setImageMessage] = useState('')
  const [existingImages, setExistingImages] = useState([])

  useEffect(() => {
    const storedUser =
      localStorage.getItem('user')

    if (!storedUser) {
      navigate('/login')
      return
    }

    const user = JSON.parse(storedUser)

    fetch(
      `http://127.0.0.1:8000/api/catalogs/${user.id}`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          navigate('/panel')
          return
        }

        setCatalog(data)

        if (editing) {
          return fetch(
            `http://127.0.0.1:8000/api/products/item/${productId}`,
          )
            .then((response) => response.json())
            .then((product) => {
              setForm({
                name: product.name,
                price: product.price,
                category: product.category,
                quantity: product.quantity,
                description:
                  product.description || '',
                characteristics:
                  product.characteristics || '',
                color: product.color || '',
                size: product.size || '',
                shipping: product.shipping,
                whatsapp: product.whatsapp || '',
              })

              return fetch(
                `http://127.0.0.1:8000/api/products/${productId}/images`,
              )
            })
            .then((response) => response.json())
            .then((data) => {
              setExistingImages(data)
            })
        }
      })
      .catch(() => {
        setMessage(
          'No se pudo cargar la información.',
        )
      })
  }, [
    navigate,
    editing,
    productId,
  ])


  function handleChange(event) {
    const { name, value, type, checked } =
      event.target

    setForm({
      ...form,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    })
  }


  async function handleSubmit(event) {
    event.preventDefault()

    if (!catalog) {
      return
    }

    setSaving(true)
    setMessage('')

    const payload = {
      catalog_id: catalog.id,
      name: form.name,
      price: Number(form.price),
      category: form.category,
      quantity: Number(form.quantity),
      description: form.description || null,
      characteristics:
        form.characteristics || null,
      color: form.color || null,
      size: form.size || null,
      shipping: form.shipping,
      whatsapp: form.whatsapp || null,
    }

    try {
      const response = await fetch(
        editing
          ? `http://127.0.0.1:8000/api/products/${productId}`
          : 'http://127.0.0.1:8000/api/products',
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
          `http://127.0.0.1:8000/api/products/${data.id}/images`,
          {
            method: 'POST',
            body: formData,
          },
        )

        if (!imageResponse.ok) {
          const imageData =
            await imageResponse.json()

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
    <main>
      <h1>
        {editing
          ? 'Editar producto'
          : 'Agregar producto'}
      </h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>
            Precio
          </label>

          <input
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>
            Categoría
          </label>

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>
            Cantidad
          </label>

          <input
            name="quantity"
            type="number"
            min="0"
            step="1"
            value={form.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>
            Descripción
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>
            Características
          </label>

          <textarea
            name="characteristics"
            value={form.characteristics}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>
            Color
          </label>

          <input
            name="color"
            value={form.color}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>
            Talla
          </label>

          <input
            name="size"
            value={form.size}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>
            <input
              name="shipping"
              type="checkbox"
              checked={form.shipping}
              onChange={handleChange}
            />

            Permite envío
          </label>
        </div>

        <div>
          <label>
            WhatsApp
          </label>

          <input
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="images">
            Imágenes
          </label>
          {existingImages.length > 0 && (
            <div>
              <p>Imágenes actuales:</p>

            {existingImages.map((image) => (
              <div key={image.id}>
                <img
                  src={`http://127.0.0.1:8000${image.url}`}
                  alt=""
                  width="150"
                />

                <button
                  type="button"
                  onClick={async () => {
                    const response = await fetch(
                      `http://127.0.0.1:8000/api/products/images/${image.id}`,
                      {
                        method: 'DELETE',
                      },
                    )

                    if (!response.ok) {
                      setImageMessage(
                        'No se pudo eliminar la imagen.',
                      )

                      return
                    }

                    setExistingImages(
                      existingImages.filter(
                        (item) => item.id !== image.id,
                      ),
                    )
                  }}
                >
                  Eliminar imagen
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
            onChange={(event) => {
              const selected = Array.from(
                event.target.files,
              )

              if (
                existingImages.length + selected.length > 5
              ) {
                setImageMessage(
                  `El producto puede tener máximo 5 imágenes. Actualmente tienes ${existingImages.length}.`,
                )

                return
              }

              setImageMessage('')
              setImages(selected)
            }}
          />

          {images.length > 0 && (
            <p>
              {images.length} imagen(es) seleccionada(s)
            </p>
          )}

          {imageMessage && (
            <p>
              {imageMessage}
            </p>
          )}
        </div>

        {message && (
          <p>{message}</p>
        )}

        <button
          type="submit"
          disabled={saving}
        >
          {saving
            ? 'Guardando...'
            : 'Guardar producto'}
        </button>
      </form>
    </main>
  )
}


export default ProductoForm