import { useEffect, useState } from 'react'
import {
  Link,
  useParams,
} from 'react-router-dom'


function Producto() {
  const { productId } = useParams()

  const [product, setProduct] = useState(null)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')


  useEffect(() => {
    async function loadProduct() {
      try {
        const productResponse = await fetch(
          `http://127.0.0.1:8000/api/products/item/${productId}`,
        )

        if (!productResponse.ok) {
          setMessage(
            'No se encontró el producto.',
          )

          return
        }

        const productData =
          await productResponse.json()

        setProduct(productData)

        const imagesResponse = await fetch(
          `http://127.0.0.1:8000/api/products/${productId}/images`,
        )

        if (imagesResponse.ok) {
          const imagesData =
            await imagesResponse.json()

          setImages(imagesData)
        }
      } catch {
        setMessage(
          'No se pudo cargar el producto.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [productId])


  if (loading) {
    return (
      <main>
        <p>Cargando...</p>
      </main>
    )
  }


  if (message) {
    return (
      <main>
        <p>{message}</p>

        <Link to="/productos">
          Volver a productos
        </Link>
      </main>
    )
  }


  if (!product) {
    return null
  }


  return (
    <main>
      <p>
        <Link to="/productos">
          Volver a productos
        </Link>
      </p>

      <h1>{product.name}</h1>

      {images.length > 0 && (
        <div>
          {images.map((image) => (
            <img
              key={image.id}
              src={`http://127.0.0.1:8000${image.url}`}
              alt={product.name}
              width="200"
            />
          ))}
        </div>
      )}

      <p>
        Precio: ${product.price}
      </p>

      <p>
        Categoría: {product.category}
      </p>

      <p>
        Cantidad: {product.quantity}
      </p>

      {product.description && (
        <p>
          Descripción: {product.description}
        </p>
      )}

      {product.characteristics && (
        <p>
          Características: {product.characteristics}
        </p>
      )}

      {product.color && (
        <p>
          Color: {product.color}
        </p>
      )}

      {product.size && (
        <p>
          Talla: {product.size}
        </p>
      )}

      {product.shipping && (
        <p>
          Permite envío
        </p>
      )}

      {product.whatsapp && (
        <p>
          WhatsApp: {product.whatsapp}
        </p>
      )}
    </main>
  )
}


export default Producto