import { Link } from 'react-router-dom'
import { asientosDisponibles, nombreCiudad } from '../data/db'
import { formatearFecha, formatearPrecio } from '../utils/reserva'

function VueloCard({ vuelo }) {
  const disponibles = asientosDisponibles(vuelo)

  return (
    <div className="tarjeta p-3 p-md-4 h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="small text-suave">
          <i className="bi bi-calendar3 me-1"></i>
          {formatearFecha(vuelo.fecha)} · {vuelo.codigo}
        </span>
        {vuelo.precioOferta && <span className="badge badge-oferta">Oferta</span>}
      </div>

      <div className="ruta mb-1">
        <span className="codigo-ciudad">{vuelo.origen}</span>
        <div className="linea"><i className="bi bi-airplane-fill"></i></div>
        <span className="codigo-ciudad">{vuelo.destino}</span>
      </div>
      <div className="d-flex justify-content-between small text-suave mb-3">
        <span>{nombreCiudad(vuelo.origen)} · {vuelo.horaSalida}</span>
        <span>{nombreCiudad(vuelo.destino)} · {vuelo.horaLlegada}</span>
      </div>

      <div className="d-flex justify-content-between align-items-end">
        <div>
          {vuelo.precioOferta && (
            <div className="precio-anterior">{formatearPrecio(vuelo.precio)}</div>
          )}
          <div className="precio">{formatearPrecio(vuelo.precioOferta || vuelo.precio)}</div>
          <div className="small text-suave">{disponibles} asientos disponibles</div>
        </div>
        <Link to={'/vuelos/' + vuelo.id} className="btn btn-fjf-azul btn-sm">
          Ver vuelo
        </Link>
      </div>
    </div>
  )
}

export default VueloCard
