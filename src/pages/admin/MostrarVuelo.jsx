import { Link, useParams } from 'react-router-dom'
import MapaAsientos from '../../components/MapaAsientos'
import { asientosDisponibles, nombreCiudad, obtenerDestinoPorId, obtenerReservas, obtenerVueloPorId } from '../../data/db'
import { formatearFecha, formatearPrecio } from '../../utils/reserva'

function MostrarVuelo() {
  const { id } = useParams()
  const vuelo = obtenerVueloPorId(id)

  if (!vuelo) {
    return <p>Vuelo no encontrado.</p>
  }

  const destino = obtenerDestinoPorId(vuelo.destinoId)
  const reservas = obtenerReservas().filter((r) => r.vueloId === vuelo.id)

  return (
    <div>
      <Link to="/admin/vuelos" className="small text-decoration-none">
        <i className="bi bi-arrow-left me-1"></i>Volver a vuelos
      </Link>
      <div className="d-flex justify-content-between align-items-center mt-2 mb-4">
        <h2 className="mb-0">Vuelo {vuelo.codigo}</h2>
        <Link to={'/admin/vuelos/' + vuelo.id + '/editar'} className="btn btn-fjf btn-sm">Editar</Link>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="tarjeta p-4 mb-4">
            <table className="table table-sm mb-0">
              <tbody>
                <tr><th>Ruta</th><td>{nombreCiudad(vuelo.origen)} → {nombreCiudad(vuelo.destino)}</td></tr>
                <tr><th>Fecha</th><td>{formatearFecha(vuelo.fecha)}</td></tr>
                <tr><th>Horario</th><td>{vuelo.horaSalida} – {vuelo.horaLlegada}</td></tr>
                <tr><th>Destino</th><td>{destino ? destino.nombre : '—'}</td></tr>
                <tr><th>Precio</th><td>{formatearPrecio(vuelo.precio)}</td></tr>
                <tr><th>Precio oferta</th><td>{vuelo.precioOferta ? formatearPrecio(vuelo.precioOferta) : '—'}</td></tr>
                <tr><th>Asientos</th><td>{asientosDisponibles(vuelo)} disponibles de {vuelo.capacidad}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="tarjeta p-4">
            <h5>Reservas de este vuelo</h5>
            {reservas.length === 0 ? (
              <p className="text-suave mb-0">Todavía no hay reservas.</p>
            ) : (
              <table className="table table-sm mb-0">
                <thead>
                  <tr><th>Código</th><th>Pasajero</th><th>Asientos</th><th>Estado</th></tr>
                </thead>
                <tbody>
                  {reservas.map((r) => (
                    <tr key={r.id}>
                      <td>{r.codigo}</td>
                      <td>{r.pasajero.nombre} {r.pasajero.apellidos}</td>
                      <td>{r.asientos.join(', ')}</td>
                      <td>{r.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="tarjeta p-4">
            <h5 className="mb-3">Ocupación</h5>
            <MapaAsientos
              capacidad={vuelo.capacidad}
              ocupados={vuelo.asientosOcupados}
              seleccionados={[]}
              onCambiar={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MostrarVuelo
