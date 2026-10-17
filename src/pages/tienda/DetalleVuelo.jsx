import { Link, useNavigate, useParams } from 'react-router-dom'
import { asientosDisponibles, nombreCiudad, obtenerDestinoPorId, obtenerVueloPorId } from '../../data/db'
import { useReserva } from '../../context/ReservaContext'
import { formatearFecha, formatearPrecio } from '../../utils/reserva'

function DetalleVuelo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { elegirVuelo } = useReserva()

  const vuelo = obtenerVueloPorId(id)

  if (!vuelo) {
    return (
      <div className="container py-5 text-center">
        <h2>Vuelo no encontrado</h2>
        <Link to="/vuelos" className="btn btn-fjf mt-3">Volver a vuelos</Link>
      </div>
    )
  }

  const destino = obtenerDestinoPorId(vuelo.destinoId)
  const disponibles = asientosDisponibles(vuelo)

  function reservar() {
    elegirVuelo(vuelo.id)
    navigate('/reserva')
  }

  return (
    <div className="container py-5">
      <Link to="/vuelos" className="small text-decoration-none">
        <i className="bi bi-arrow-left me-1"></i>Volver a vuelos
      </Link>

      <div className="row g-4 mt-1">
        <div className="col-lg-8">
          <div className="tarjeta p-4">
            <div className="d-flex justify-content-between mb-3">
              <span className="text-suave">Vuelo {vuelo.codigo}</span>
              {destino && <span className="badge bg-secondary">{destino.nombre}</span>}
            </div>
            <div className="ruta mb-2">
              <span className="codigo-ciudad fs-1">{vuelo.origen}</span>
              <div className="linea"><i className="bi bi-airplane-fill"></i></div>
              <span className="codigo-ciudad fs-1">{vuelo.destino}</span>
            </div>
            <div className="d-flex justify-content-between text-suave">
              <span>{nombreCiudad(vuelo.origen)}</span>
              <span>{nombreCiudad(vuelo.destino)}</span>
            </div>

            <hr />

            <div className="row text-center g-3">
              <div className="col-6 col-md-3">
                <div className="dato-label">Fecha</div>
                <div className="dato-valor">{formatearFecha(vuelo.fecha)}</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="dato-label">Salida</div>
                <div className="dato-valor">{vuelo.horaSalida}</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="dato-label">Llegada</div>
                <div className="dato-valor">{vuelo.horaLlegada}</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="dato-label">Disponibles</div>
                <div className="dato-valor">{disponibles} de {vuelo.capacidad}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="tarjeta p-4">
            <p className="text-suave mb-1">Precio por pasajero</p>
            {vuelo.precioOferta && <div className="precio-anterior">{formatearPrecio(vuelo.precio)}</div>}
            <div className="precio fs-2">{formatearPrecio(vuelo.precioOferta || vuelo.precio)}</div>
            <ul className="list-unstyled small text-suave my-3">
              <li><i className="bi bi-check2 me-2 text-success"></i>Equipaje de mano incluido</li>
              <li><i className="bi bi-check2 me-2 text-success"></i>Elección de asiento</li>
              <li><i className="bi bi-check2 me-2 text-success"></i>Pase de abordar digital</li>
            </ul>
            <div className="d-grid">
              <button className="btn btn-fjf" onClick={reservar} disabled={disponibles === 0}>
                {disponibles === 0 ? 'Vuelo completo' : 'Elegir asientos'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetalleVuelo
