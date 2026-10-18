import { Link } from 'react-router-dom'
import { obtenerDestinos } from '../../data/db'

function Destinos() {
  const destinos = obtenerDestinos()

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="h2 mb-1">Nuestros Destinos</h1>
        <p className="text-suave mb-0">Descubre los increíbles lugares a los que volamos dentro y fuera de Chile.</p>
      </div>

      <div className="row g-3">
        {destinos.map((destino) => (
          <div className="col-6 col-lg-3" key={destino.id}>
            <Link to={'/destinos/' + destino.id} className="tarjeta-destino">
              <i className={'bi ' + destino.icono}></i>
              <h5>{destino.nombre}</h5>
              <p className="small opacity-75 mb-0">{destino.descripcion}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Destinos