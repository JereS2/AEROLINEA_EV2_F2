import VueloCard from './VueloCard'

function ListaVuelos({ vuelos }) {
  if (vuelos.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-search display-6 text-suave"></i>
        <p className="mt-3 text-suave">No hay vuelos disponibles para tu búsqueda.</p>
      </div>
    )
  }

  return (
    <div className="row g-4">
      {vuelos.map((vuelo) => (
        <div className="col-md-6 col-lg-4" key={vuelo.id}>
          <VueloCard vuelo={vuelo} />
        </div>
      ))}
    </div>
  )
}

export default ListaVuelos
