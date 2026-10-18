import { Link, useParams } from 'react-router-dom'
import { nombreCiudad, obtenerReservaPorCodigo, obtenerVueloPorId } from '../../data/db'
import { formatearFecha, formatearPrecio, PRECIO_EQUIPAJE_BODEGA } from '../../utils/reserva'

function MostrarReserva() {
  const { codigo } = useParams()
  const reserva = obtenerReservaPorCodigo(codigo)

  if (!reserva) {
    return <p>Reserva no encontrada.</p>
  }

  const vuelo = obtenerVueloPorId(reserva.vueloId)
  const totalEquipaje = reserva.maletasBodega * PRECIO_EQUIPAJE_BODEGA
  const totalPasajes = reserva.total - totalEquipaje

  return (
    <div>
      <Link to="/admin/reservas" className="small text-decoration-none no-imprimir">
        <i className="bi bi-arrow-left me-1"></i>Volver a reservas
      </Link>

      <div className="tarjeta p-4 mt-2" style={{ maxWidth: 720 }}>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <div className="logo text-dark">FJF <span>Airlines</span></div>
            <div className="small text-suave">Boleta de compra</div>
          </div>
          <div className="text-end">
            <div className="fw-bold">{reserva.codigo}</div>
            <div className="small text-suave">Fecha: {formatearFecha(reserva.fechaReserva)}</div>
            <span className={reserva.estado === 'Confirmada' ? 'badge bg-success' : 'badge bg-secondary'}>{reserva.estado}</span>
          </div>
        </div>

        <h6>Pasajero</h6>
        <p className="mb-3">
          {reserva.pasajero.nombre} {reserva.pasajero.apellidos}<br />
          <span className="text-suave">{reserva.pasajero.correo}</span>
        </p>

        {vuelo && (
          <>
            <h6>Vuelo</h6>
            <p className="mb-3">
              {vuelo.codigo} · {nombreCiudad(vuelo.origen)} → {nombreCiudad(vuelo.destino)}<br />
              <span className="text-suave">{formatearFecha(vuelo.fecha)} · {vuelo.horaSalida} – {vuelo.horaLlegada}</span>
            </p>
          </>
        )}

        <table className="table table-sm">
          <thead>
            <tr><th>Detalle</th><th className="text-end">Monto</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Pasajes ({reserva.asientos.length}) — asientos {reserva.asientos.join(', ')}</td>
              <td className="text-end">{formatearPrecio(totalPasajes)}</td>
            </tr>
            <tr>
              <td>Maletas de bodega ({reserva.maletasBodega})</td>
              <td className="text-end">{formatearPrecio(totalEquipaje)}</td>
            </tr>
            <tr>
              <th>Total pagado</th>
              <th className="text-end">{formatearPrecio(reserva.total)}</th>
            </tr>
          </tbody>
        </table>

        <button className="btn btn-fjf-azul btn-sm no-imprimir" onClick={() => window.print()}>
          <i className="bi bi-printer me-1"></i>Imprimir boleta
        </button>
      </div>
    </div>
  )
}

export default MostrarReserva
