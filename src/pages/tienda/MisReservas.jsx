import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { cancelarReserva, obtenerReservasDeUsuario, obtenerVueloPorId } from '../../data/db'
import { formatearFecha, formatearPrecio } from '../../utils/reserva'

function MisReservas() {
  const { usuario } = useAuth()
  const [reservas, setReservas] = useState(obtenerReservasDeUsuario(usuario.email))
  const [mensaje, setMensaje] = useState('')

  function cancelar(codigo) {
    const confirmar = window.confirm('¿Cancelar la reserva ' + codigo + '? Los asientos quedarán libres.')
    if (confirmar) {
      cancelarReserva(codigo)
      setReservas(obtenerReservasDeUsuario(usuario.email))
      setMensaje('La reserva ' + codigo + ' fue cancelada.')
    }
  }

  return (
    <div className="container py-5">
      <h1 className="mb-1">Mis reservas</h1>
      <p className="text-suave mb-4">Revisa tus compras, descarga tu pase o cancela una reserva.</p>

      {mensaje && <div className="alert alert-success py-2">{mensaje}</div>}

      {reservas.length === 0 ? (
        <div className="tarjeta p-5 text-center">
          <i className="bi bi-ticket-perforated display-5 text-suave"></i>
          <p className="mt-3 text-suave">Todavía no tienes reservas.</p>
          <Link to="/vuelos" className="btn btn-fjf">Buscar vuelos</Link>
        </div>
      ) : (
        <div className="tarjeta p-3 table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Código</th>
                <th>Vuelo</th>
                <th>Fecha</th>
                <th>Asientos</th>
                <th>Total</th>
                <th>Estado</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => {
                const vuelo = obtenerVueloPorId(reserva.vueloId)
                return (
                  <tr key={reserva.id}>
                    <td className="fw-semibold">{reserva.codigo}</td>
                    <td>{vuelo ? vuelo.origen + ' → ' + vuelo.destino : '—'}</td>
                    <td>{vuelo ? formatearFecha(vuelo.fecha) : '—'}</td>
                    <td>{reserva.asientos.join(', ')}</td>
                    <td>{formatearPrecio(reserva.total)}</td>
                    <td>
                      <span className={reserva.estado === 'Confirmada' ? 'badge bg-success' : 'badge bg-secondary'}>
                        {reserva.estado}
                      </span>
                    </td>
                    <td className="text-end text-nowrap">
                      {reserva.estado === 'Confirmada' && (
                        <>
                          <Link to={'/pago-exitoso/' + reserva.codigo} className="btn btn-outline-secondary btn-sm me-1">
                            Ver pase
                          </Link>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => cancelar(reserva.codigo)}>
                            Cancelar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default MisReservas
