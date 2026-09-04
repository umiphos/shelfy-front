import { useEffect, useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'


function Productos() {
  const navigate = useNavigate()

  const [catalog, setCatalog] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')


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

        return fetch(
          `http://127.0.0.1:8000/api/products/${data.id}`,
        )
      })
      .then((response) => {
        if (!response) return
        return response.json()
      })
      .then((data) => {
        if (data) {
          setProducts(data)
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


  async function handleDelete(productId) {
    const response = await fetch(
      `http://127.0.0.1:8000/api/products/${productId}`,
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


  if (loading) {
    return <main>Cargando...</main>
  }


  return (
    <main>
      <h1>Productos</h1>

      {catalog && (
        <p>
          Catálogo: {catalog.name}
        </p>
      )}

      <p>
        <Link to="/panel">
          Volver al panel
        </Link>
      </p>

      <p>
        <Link to="/productos/nuevo">
          Agregar producto
        </Link>
      </p>

      {message && (
        <p>{message}</p>
      )}

      {products.length === 0 ? (
        <p>
          Todavía no tienes productos.
        </p>
      ) : (
        <div>
          {products.map((product) => (
            <article key={product.id}>
              <h2>{product.name}</h2>

              <p>
                Precio: ${product.price}
              </p>

              <p>
                Categoría: {product.category}
              </p>

              <p>
                Cantidad: {product.quantity}
              </p>

              <Link
                to={`/productos/${product.id}/editar`}
              >
                Editar
              </Link>

              {' '}

              <button
                type="button"
                onClick={() =>
                  handleDelete(product.id)
                }
              >
                Eliminar
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}


export default Productos