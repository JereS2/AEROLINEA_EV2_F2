import { nombreCiudad } from '../data/db'
import { calcularTotal, formatearFecha, formatearPrecio, precioFinal, PRECIO_EQUIPAJE_BODEGA } from '../utils/reserva'

function ResumenReserva({ vuelo, asientos, maletasBodega }) {
  const precio = precioFinal(vuelo)
  const total = calcularTotal(precio, asientos.length, maletasBodega)

  return (
    <div className="tarjeta p-4">
      <h5 className="mb-3">Resumen de tu reserva</h5>
      <p className="mb-1 fw-semibold">
        {nombreCiudad(vuelo.origen)} → {nombreCiudad(vuelo.destino)}
      </p>
      <p className="small text-suave">
        {vuelo.codigo} · {formatearFecha(vuelo.fecha)} · {vuelo.horaSalida}
      </p>

      <table className="table table-sm small mb-2">
        <tbody>
          <tr>
            <td>Pasajes ({asientos.length} x {formatearPrecio(precio)})</td>
            <td className="text-end">{formatearPrecio(precio * asientos.length)}</td>
          </tr>
          <tr>
            <td>Asientos</td>
            <td className="text-end">{asientos.length > 0 ? asientos.join(', ') : '—'}</td>
          </tr>
          <tr>
            <td>Equipaje de mano</td>
            <td className="text-end">Incluido</td>
          </tr>
          <tr>
            <td>Maletas de bodega ({maletasBodega})</td>
            <td className="text-end">{formatearPrecio(maletasBodega * PRECIO_EQUIPAJE_BODEGA)}</td>
          </tr>
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center">
        <span className="fw-semibold">Total</span>
        <span className="precio">{formatearPrecio(total)}</span>
      </div>
    </div>
  )
}

export default ResumenReserva
