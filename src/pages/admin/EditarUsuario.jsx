import { Link, useNavigate, useParams } from 'react-router-dom'
import FormularioUsuario from '../../components/FormularioUsuario'
import { editarUsuario, obtenerUsuarioPorId } from '../../data/db'

function EditarUsuario() {
  const { id } = useParams()
  const navigate = useNavigate()
  const usuario = obtenerUsuarioPorId(id)

  if (!usuario) {
    return <p>Usuario no encontrado.</p>
  }

  function guardar(datos) {
    editarUsuario(id, datos)
    navigate('/admin/usuarios')
  }

  return (
    <div>
      <Link to="/admin/usuarios" className="small text-decoration-none">
        <i className="bi bi-arrow-left me-1"></i>Volver a usuarios
      </Link>
      <h2 className="mt-2 mb-4">Editar usuario {usuario.nombre} {usuario.apellido}</h2>
      <div className="tarjeta p-4">
        <FormularioUsuario usuarioInicial={usuario} onGuardar={guardar} />
      </div>
    </div>
  )
}

export default EditarUsuario
