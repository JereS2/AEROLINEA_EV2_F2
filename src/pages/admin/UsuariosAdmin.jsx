import { useState } from 'react'
import { Link } from 'react-router-dom'
import { eliminarUsuario, obtenerUsuarios } from '../../data/db'

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState(obtenerUsuarios())
  const [mensaje, setMensaje] = useState('')

  function eliminar(usuario) {
    const confirmar = window.confirm('¿Eliminar al usuario ' + usuario.nombre + ' ' + usuario.apellido + '?')
    if (confirmar) {
      eliminarUsuario(usuario.id)
      setUsuarios(obtenerUsuarios())
      setMensaje('Usuario ' + usuario.nombre + ' ' + usuario.apellido + ' eliminado.')
    }
  }

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h2 className="mb-0">Usuarios</h2>
        <Link to="/admin/usuarios/nuevo" className="btn btn-fjf btn-sm">
          <i className="bi bi-plus-lg me-1"></i>Nuevo usuario
        </Link>
      </div>

      {mensaje && <div className="alert alert-success py-2">{mensaje}</div>}

      <div className="tarjeta p-3 table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Fecha de registro</th>
              <th className="text-end"></th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="fw-semibold">{usuario.nombre} {usuario.apellido}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
                <td>{usuario.fechaRegistro}</td>
                <td className="text-end text-nowrap">
                  <Link
                    to={'/admin/usuarios/' + usuario.id}
                    className="btn btn-outline-secondary btn-sm me-1"
                  >
                    Ver
                  </Link>
                  <Link
                    to={'/admin/usuarios/' + usuario.id + '/editar'}
                    className="btn btn-outline-primary btn-sm me-1"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => eliminar(usuario)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {usuarios.length === 0 && (
          <p className="text-center text-suave my-3">No hay usuarios registrados.</p>
        )}
      </div>
    </div>
  )
}

export default UsuariosAdmin
