import { obtenerDestinos, obtenerReservas, obtenerVuelos } from '../../data/db'
import { formatearPrecio } from '../../utils/reserva'
import { porcentajeOcupacion, reservasConfirmadas, totalVendido, ventasPorDestino } from '../../utils/reportes'

function Reportes() {
  const reservas = obtenerReservas()
  const vuelos = obtenerVuelos()
  const ventas = ventasPorDestino(reservas, vuelos, obtenerDestinos())
  const canceladas = reservas.length - reservasConfirmadas(reservas).length

  // vuelos ordenados de mayor a menor ocupación
  const ocupacion = [...vuelos].sort((a, b) => porcentajeOcupacion(b) - porcentajeOcupacion(a))

  return (
    <div>
      <h2 className="mb-1">Reportes</h2>
      <p className="text-suave mb-4">Ventas y ocupación calculadas con las reservas guardadas.</p>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="tarjeta p-3">
            <div className="small text-suave">Total vendido</div>
            <div className="precio">{formatearPrecio(totalVendido(reservas))}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="tarjeta p-3">
            <div className="small text-suave">Reservas confirmadas</div>
            <div className="precio">{reservasConfirmadas(reservas).length}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="tarjeta p-3">
            <div className="small text-suave">Reservas canceladas</div>
            <div className="precio">{canceladas}</div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="tarjeta p-3 table-responsive">
            <h5 className="mb-3">Ventas por destino</h5>
            <table className="table table-sm mb-0">
              <thead>
                <tr><th>Destino</th><th className="text-end">Reservas</th><th className="text-end">Pasajes</th><th className="text-end">Ingresos</th></tr>
              </thead>
              <tbody>
                {ventas.map((fila) => (
                  <tr key={fila.destino}>
                    <td>{fila.destino}</td>
                    <td className="text-end">{fila.reservas}</td>
                    <td className="text-end">{fila.pasajes}</td>
                    <td className="text-end">{formatearPrecio(fila.ingresos)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="tarjeta p-3">
            <h5 className="mb-3">Ocupación de vuelos</h5>
            {ocupacion.map((vuelo) => (
              <div className="mb-2" key={vuelo.id}>
                <div className="d-flex justify-content-between small">
                  <span>{vuelo.codigo} · {vuelo.origen} → {vuelo.destino}</span>
                  <span>{porcentajeOcupacion(vuelo)}%</span>
                </div>
                <div className="progress" style={{ height: 8 }}>
                  <div className="progress-bar bg-warning" style={{ width: porcentajeOcupacion(vuelo) + '%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reportes
