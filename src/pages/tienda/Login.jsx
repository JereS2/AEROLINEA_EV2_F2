import { Link, useNavigate } from 'react-router-dom'
import LoginForm from '../../components/LoginForm'
import { useAuth } from '../../context/AuthContext'
import { buscarUsuarioPorEmail } from '../../data/db'

function Login() {
  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()

  function ingresar(email, password) {
    const correcto = iniciarSesion(email, password)
    if (correcto) {
      const usuario = buscarUsuarioPorEmail(email)
      if (usuario.rol === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    }
    return correcto
  }

  return (
    <div className="container py-5">
      <div className="tarjeta p-4 p-md-5 mx-auto" style={{ maxWidth: 460 }}>
        <h2 className="mb-1">Iniciar sesión</h2>
        <p className="text-suave mb-4">Ingresa para ver tus reservas.</p>
        <LoginForm onIngresar={ingresar} />
        <p className="small text-center mt-3 mb-0">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </div>

      <div className="small text-suave text-center mt-3">
        Cuentas de prueba: admin@fjf.cl / admin123 — pedro@correo.cl / 1234
      </div>
    </div>
  )
}

export default Login
