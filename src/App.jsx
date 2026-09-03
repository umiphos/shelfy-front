import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Registro from './pages/Registro'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/registro" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App