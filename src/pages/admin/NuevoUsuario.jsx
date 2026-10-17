import { Link, useNavigate } from 'react-router-dom'
import FormularioUsuario from '../../components/FormularioUsuario'
import { agregarUsuario } from '../../data/db'

function NuevoUsuario() {
  const navigate = useNavigate()

  function guardar(usuario) {
    agregarUsuario(usuario)
    navigate('/admin/usuarios')
  }

  return (
    <div>
      <Link to="/admin/usuarios" className="small text-decoration-none">
        <i className="bi bi-arrow-left me-1"></i>Volver a usuarios
      </Link>
      <h2 className="mt-2 mb-4">Nuevo usuario</h2>
      <div className="tarjeta p-4">
        <FormularioUsuario onGuardar={guardar} />
      </div>
    </div>
  )
}

export default NuevoUsuario
