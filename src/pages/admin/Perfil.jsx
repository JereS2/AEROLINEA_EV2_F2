import { useAuth } from '../../context/AuthContext'
import { formatearFecha } from '../../utils/reserva'

function Perfil() {
  const { usuario } = useAuth()

  return (
    <div>
      <h2 className="mb-4">Perfil</h2>
      <div className="tarjeta p-4" style={{ maxWidth: 520 }}>
        <div className="d-flex align-items-center gap-3 mb-4">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold fs-4"
            style={{ width: 64, height: 64, background: 'var(--azul)' }}
          >
            {usuario.nombre.charAt(0)}
          </div>
          <div>
            <h4 className="mb-0">{usuario.nombre} {usuario.apellido}</h4>
            <span className="badge bg-secondary text-capitalize">{usuario.rol}</span>
          </div>
        </div>
        <table className="table table-sm mb-0">
          <tbody>
            <tr><th>Correo</th><td>{usuario.email}</td></tr>
            <tr><th>Rol</th><td className="text-capitalize">{usuario.rol}</td></tr>
            <tr><th>Fecha de registro</th><td>{formatearFecha(usuario.fechaRegistro)}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Perfil
