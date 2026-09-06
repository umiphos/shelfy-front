import { useEffect, useState } from 'react'
import {
  Link,
  useParams,
} from 'react-router-dom'


function Catalogo() {
  const { slug } = useParams()
  const [catalog, setCatalog] = useState(null)
  const [products, setProducts] = useState([])
  const [images, setImages] = useState({})
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')


  useEffect(() => {
    async function loadCatalog() {
      try {
        const catalogResponse = await fetch(
          `http://127.0.0.1:8000/api/catalogs/public/${slug}`,
        )

        if (!catalogResponse.ok) {
          setMessage(
            'No se encontró el catálogo.',
          )

          return
        }

        const catalogData =
          await catalogResponse.json()

        if (!catalogData) {
          setMessage(
            'No se encontró el catálogo.',
          )

          return
        }

        setCatalog(catalogData)

        const productsResponse = await fetch(
          `http://127.0.0.1:8000/api/products/${catalogData.id}`,
        )

        if (!productsResponse.ok) {
          setMessage(
            'No se pudieron cargar los productos.',
          )

          return
        }

        const productsData =
          await productsResponse.json()

        setProducts(productsData)

        const imageMap = {}

        for (const product of productsData) {
          const imagesResponse = await fetch(
            `http://127.0.0.1:8000/api/products/${product.id}/images`,
          )

          if (!imagesResponse.ok) {
            continue
          }

          imageMap[product.id] =
            await imagesResponse.json()
        }

        setImages(imageMap)
      } catch {
        setMessage(
          'No se pudo cargar el catálogo.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadCatalog()
  }, [slug])


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
      </main>
    )
  }


  if (!catalog) {
    return null
  }


  return (
    <main>
      <h1>{catalog.name}</h1>

      {products.filter(
        (product) => product.status !== 'hidden',
      ).length === 0 ? (
        <p>
          Este catálogo todavía no tiene productos publicados.
        </p>
      ) : (
        <div>
        {products
          .filter(
            (product) => product.status !== 'hidden',
          )
          .map((product) => (
            <article key={product.id}>
              {images[product.id]?.length > 0 && (
                <img
                  src={`http://127.0.0.1:8000${images[product.id][0].url}`}
                  alt={product.name}
                  width="200"
                />
              )}

              <h2>{product.name}</h2>

              {product.status === 'sold_out' && (
                <p>
                  Agotado
                </p>
              )}

              <Link
                to={`/productos/${product.id}`}
              >
                Ver producto
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}


export default Catalogo