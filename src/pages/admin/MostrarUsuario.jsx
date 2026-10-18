import { Link, useParams } from 'react-router-dom'
import { obtenerReservasDeUsuario, obtenerUsuarioPorId, obtenerVueloPorId } from '../../data/db'
import { formatearFecha, formatearPrecio } from '../../utils/reserva'

function MostrarUsuario() {
  const { id } = useParams()
  const usuario = obtenerUsuarioPorId(id)

  if (!usuario) {
    return <p>Usuario no encontrado.</p>
  }

  const compras = obtenerReservasDeUsuario(usuario.email)

  return (
    <div>
      <Link to="/admin/usuarios" className="small text-decoration-none">
        <i className="bi bi-arrow-left me-1"></i>Volver a usuarios
      </Link>
      <div className="d-flex justify-content-between align-items-center mt-2 mb-4">
        <h2 className="mb-0">{usuario.nombre} {usuario.apellido}</h2>
        <Link to={'/admin/usuarios/' + usuario.id + '/editar'} className="btn btn-fjf btn-sm">Editar</Link>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="tarjeta p-4">
            <table className="table table-sm mb-0">
              <tbody>
                <tr><th>Correo</th><td>{usuario.email}</td></tr>
                <tr><th>Rol</th><td className="text-capitalize">{usuario.rol}</td></tr>
                <tr><th>Registro</th><td>{formatearFecha(usuario.fechaRegistro)}</td></tr>
                <tr><th>Compras</th><td>{compras.length}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="tarjeta p-4 table-responsive">
            <h5 className="mb-3">Historial de compras</h5>
            {compras.length === 0 ? (
              <p className="text-suave mb-0">Sin compras registradas.</p>
            ) : (
              <table className="table table-sm mb-0">
                <thead>
                  <tr><th>Código</th><th>Vuelo</th><th>Fecha</th><th>Asientos</th><th>Total</th><th>Estado</th></tr>
                </thead>
                <tbody>
                  {compras.map((reserva) => {
                    const vuelo = obtenerVueloPorId(reserva.vueloId)
                    return (
                      <tr key={reserva.id}>
                        <td>
                          <Link to={'/admin/reservas/' + reserva.codigo}>{reserva.codigo}</Link>
                        </td>
                        <td>{vuelo ? vuelo.origen + ' → ' + vuelo.destino : '—'}</td>
                        <td>{vuelo ? formatearFecha(vuelo.fecha) : '—'}</td>
                        <td>{reserva.asientos.join(', ')}</td>
                        <td>{formatearPrecio(reserva.total)}</td>
                        <td>{reserva.estado}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MostrarUsuario
