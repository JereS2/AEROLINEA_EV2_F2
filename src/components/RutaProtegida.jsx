import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Si no hay sesión manda al login. Si la ruta es solo para admin y el usuario no lo es, manda al inicio.
function RutaProtegida({ children, soloAdmin }) {
  const { usuario, esAdmin } = useAuth()

  if (!usuario) {
    return <Navigate to="/login" />
  }

  if (soloAdmin && !esAdmin) {
    return <Navigate to="/" />
  }

  return children
}

export default RutaProtegida
