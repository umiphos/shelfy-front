import { Link } from 'react-router-dom'

import Nameplate from '../components/Nameplate'
import SiteFooter from '../components/SiteFooter'
import StatusBadge from '../components/StatusBadge'


const DEMO_CATALOG_URL = 'https://precioinbox.com/catalogo/dummy'

const FEATURES = [
  {
    title: 'Catálogo público en segundos',
    body: 'Da de alta tus productos con fotos, precio y categoría. Tu catálogo queda listo en una URL que puedes compartir de inmediato.',
  },
  {
    title: 'Pedidos directo a WhatsApp',
    body: 'Cada producto tiene un botón de "Pedir por WhatsApp" que abre la conversación con el mensaje ya redactado. Sin apps nuevas para tus clientes.',
  },
  {
    title: 'Disponibilidad clara',
    body: 'Marca cada producto como disponible, últimas piezas o agotado. Tus clientes lo ven antes de preguntar.',
  },
  {
    title: 'Panel para administrar todo',
    body: 'Edita productos, organiza categorías y controla qué se muestra públicamente desde un panel simple, sin curva de aprendizaje.',
  },
]


function Home() {
  return (
    <>
      <Nameplate>
        <Link to="/login">Iniciar sesión</Link>
        <Link to="/registro">Crear cuenta</Link>
      </Nameplate>

      <main className="page landing">
        <section className="landing__hero">
          <div className="landing__hero-copy">
            <p className="eyebrow">
              Catálogo digital para negocios locales
            </p>

            <h1>
              Tu catálogo, siempre a la mano de tus
              clientes.
            </h1>

            <p className="lede">
              Crea tu catálogo en minutos, compártelo por
              WhatsApp y deja que tus clientes vean
              disponibilidad y precios sin tener que
              preguntarte primero.
            </p>

            <div className="landing__cta">
              <a
                href={DEMO_CATALOG_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn--outline"
              >
                Ver catálogo de ejemplo
              </a>

              <Link to="/registro" className="btn btn--primary">
                Crear mi catálogo
              </Link>
            </div>
          </div>

          <div className="landing__hero-visual" aria-hidden="true">
            <div className="product-card landing__mock-card">
              <div className="product-card__frame">
                <div className="product-card__frame--empty">
                  Foto del producto
                </div>

                <StatusBadge
                  className="product-card__badge"
                  label="Disponible"
                  variant="available"
                />
              </div>

              <p className="product-card__name">
                Producto de ejemplo
              </p>

              <div className="product-card__meta">
                <span className="product-card__price">
                  $249
                </span>
                <span>Categoría</span>
              </div>
            </div>
          </div>
        </section>

        <section className="landing__features">
          <p className="eyebrow">Cómo funciona</p>
          <h2>Todo lo que necesitas, nada de lo que no.</h2>

          <div className="landing__feature-grid">
            {FEATURES.map((feature) => (
              <div className="landing__feature" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="landing__cta-band">
          <h2>¿Listo para armar tu catálogo?</h2>

          <p className="lede">
            Regístrate gratis y comparte tu primer catálogo
            hoy mismo.
          </p>

          <div className="landing__cta">
            <a
              href={DEMO_CATALOG_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn--outline"
            >
              Ver catálogo de ejemplo
            </a>

            <Link to="/registro" className="btn btn--primary">
              Crear mi catálogo
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter note="Catálogo digital por WhatsApp" />
    </>
  )
}


export default Home
