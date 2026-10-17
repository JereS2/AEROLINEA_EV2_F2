import { Link, useParams } from 'react-router-dom'
import ListaVuelos from '../../components/ListaVuelos'
import { obtenerDestinoPorId, obtenerVuelosPorDestino } from '../../data/db'

function DetalleDestino() {
  const { id } = useParams()
  const destino = obtenerDestinoPorId(id)
  const vuelos = obtenerVuelosPorDestino(id)

  if (!destino) {
    return (
      <div className="container py-5 text-center">
        <h2>Destino no encontrado</h2>
        <p className="text-suave">El destino que buscas no existe o fue retirado.</p>
        <Link to="/destinos" className="btn btn-fjf">Volver a destinos</Link>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <div className="mb-4">
        <Link to="/destinos" className="small text-decoration-none text-coral mb-2 d-inline-block">
          &larr; Volver a todos los destinos
        </Link>
        <div className="d-flex align-items-center gap-3">
          <i className={'bi ' + destino.icono + ' fs-1 text-coral'}></i>
          <div>
            <h1 className="h2 mb-1">{destino.nombre}</h1>
            <p className="text-suave mb-0">{destino.descripcion}</p>
          </div>
        </div>
      </div>

      <h3 className="h4 mt-4 mb-3">Vuelos disponibles hacia {destino.nombre}</h3>
      <ListaVuelos vuelos={vuelos} />
    </div>
  )
}

export default DetalleDestino