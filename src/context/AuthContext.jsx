import { createContext, useContext, useState } from 'react'
import { agregarUsuario, buscarUsuarioPorEmail } from '../data/db'

const AuthContext = createContext()

function leerUsuarioGuardado() {
  const guardado = localStorage.getItem('usuarioActual')
  if (guardado) {
    return JSON.parse(guardado)
  }
  return null
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerUsuarioGuardado)

  function iniciarSesion(email, password) {
    const encontrado = buscarUsuarioPorEmail(email)
    if (!encontrado || encontrado.password !== password) {
      return false
    }
    setUsuario(encontrado)
    localStorage.setItem('usuarioActual', JSON.stringify(encontrado))
    return true
  }

  function registrar(datos) {
    if (buscarUsuarioPorEmail(datos.email)) {
      return false
    }
    const nuevo = agregarUsuario(datos)
    setUsuario(nuevo)
    localStorage.setItem('usuarioActual', JSON.stringify(nuevo))
    return true
  }

  function cerrarSesion() {
    setUsuario(null)
    localStorage.removeItem('usuarioActual')
  }

  const esAdmin = usuario !== null && usuario.rol === 'admin'

  return (
    <AuthContext.Provider value={{ usuario, esAdmin, iniciarSesion, registrar, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
