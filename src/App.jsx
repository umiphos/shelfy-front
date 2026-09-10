import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import Home from './pages/Home'
import Registro from './pages/Registro'
import Login from './pages/Login'
import Panel from './pages/Panel'
import Productos from './pages/Productos'
import ProductoForm from './pages/ProductoForm'
import Producto from './pages/Producto'
import Catalogo from './pages/Catalogo'
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/registro"
          element={<Registro />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/panel"
          element={<Panel />}
        />

        <Route
          path="/productos"
          element={<Productos />}
        />

        <Route
          path="/productos/nuevo"
          element={<ProductoForm />}
        />

        <Route
          path="/productos/:productId/editar"
          element={<ProductoForm />}
        />

        <Route
          path="/productos/:productId"
          element={<Producto />}
        />

        <Route
          path="/catalogo/:slug"
          element={<Catalogo />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}


export default App