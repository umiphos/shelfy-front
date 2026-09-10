import { useEffect, useRef, useState } from 'react'


function OrderDemo() {
  const [step, setStep] = useState(0)
  const timeouts = useRef([])


  function play() {
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []

    setStep(0)

    timeouts.current.push(
      setTimeout(() => setStep(1), 700),
    )

    timeouts.current.push(
      setTimeout(() => setStep(2), 1500),
    )
  }


  useEffect(() => {
    const initial = setTimeout(play, 500)
    return () => {
      clearTimeout(initial)
      timeouts.current.forEach(clearTimeout)
    }
  }, [])


  return (
    <div className="order-demo">
      <div
        className={
          step >= 1
            ? 'order-demo__card is-tapped'
            : 'order-demo__card'
        }
      >
        <div className="product-card__frame">
          <div className="product-card__frame--empty">
            Foto del producto
          </div>

          <span className="order-demo__tap-ripple" />
        </div>

        <p className="product-card__name">Producto de ejemplo</p>

        <div className="product-card__meta">
          <span className="product-card__price">$249</span>
          <span>Categoría</span>
        </div>
      </div>

      <div
        className={
          step >= 2
            ? 'order-demo__bubble is-visible'
            : 'order-demo__bubble'
        }
      >
        <p className="order-demo__bubble-text">
          Hola 👋 quiero pedir:
          <br />
          <strong>Producto de ejemplo — $249</strong>
        </p>
      </div>

      <button
        type="button"
        className="order-demo__replay"
        onClick={play}
      >
        Ver de nuevo
      </button>
    </div>
  )
}


export default OrderDemo
