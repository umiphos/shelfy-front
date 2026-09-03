import { useState } from 'react'

function App() {
  const [page, setPage] = useState('registro')

  return (
    <main>
      {page === 'registro' && (
        <section>
          <h1>Registro</h1>
          <button onClick={() => setPage('login')}>
            Ir a login
          </button>
        </section>
      )}

      {page === 'login' && (
        <section>
          <h1>Login</h1>
          <button onClick={() => setPage('registro')}>
            Volver a registro
          </button>
        </section>
      )}
    </main>
  )
}

export default App