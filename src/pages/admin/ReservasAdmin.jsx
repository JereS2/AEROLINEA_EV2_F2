import { useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerReservas, obtenerVueloPorId } from '../../data/db'
import { formatearPrecio } from '../../utils/reserva'

function ReservasAdmin() {
  const [filtro, setFiltro] = useState('Todas')

  let reservas = obtenerReservas()
  if (filtro !== 'Todas') {
    reservas = reservas.filter((r) => r.estado === filtro)
  }

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h2 className="mb-0">Reservas</h2>
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="filtro" className="small text-suave">Estado</label>
          <select id="filtro" className="form-select form-select-sm w-auto" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option>Todas</option>
            <option>Confirmada</option>
            <option>Cancelada</option>
          </select>
        </div>
      </div>

      <div className="tarjeta p-3 table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>Código</th>
              <th>Pasajero</th>
              <th>Vuelo</th>
              <th>Asientos</th>
              <th>Total</th>
              <th>Estado</th>
              <th className="text-end">Boleta</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => {
              const vuelo = obtenerVueloPorId(reserva.vueloId)
              return (
                <tr key={reserva.id}>
                  <td className="fw-semibold">{reserva.codigo}</td>
                  <td>{reserva.pasajero.nombre} {reserva.pasajero.apellidos}</td>
                  <td>{vuelo ? vuelo.codigo + ' (' + vuelo.origen + ' → ' + vuelo.destino + ')' : '—'}</td>
                  <td>{reserva.asientos.join(', ')}</td>
                  <td>{formatearPrecio(reserva.total)}</td>
                  <td>
                    <span className={reserva.estado === 'Confirmada' ? 'badge bg-success' : 'badge bg-secondary'}>
                      {reserva.estado}
                    </span>
                  </td>
                  <td className="text-end">
                    <Link to={'/admin/reservas/' + reserva.codigo} className="btn btn-outline-secondary btn-sm">Ver boleta</Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {reservas.length === 0 && <p className="text-center text-suave my-3">No hay reservas para mostrar.</p>}
      </div>
    </div>
  )
}

export default ReservasAdmin
