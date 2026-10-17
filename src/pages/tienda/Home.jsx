import { Link, useNavigate } from 'react-router-dom'
import BuscadorVuelos from '../../components/BuscadorVuelos'
import VueloCard from '../../components/VueloCard'
import { obtenerDestinos, obtenerVuelosEnOferta } from '../../data/db'

function Home() {
  const navigate = useNavigate()
  const destinos = obtenerDestinos()
  const ofertas = obtenerVuelosEnOferta().slice(0, 3)

  function buscar(filtros) {
    const parametros = new URLSearchParams(filtros)
    navigate('/vuelos?' + parametros.toString())
  }

  return (
    <>
      <section className="portada">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <span className="badge bg-light text-dark mb-3">Nuevas rutas al sur de Chile</span>
              <h1>Tu próximo viaje empieza aquí</h1>
              <p className="lead opacity-75">
                Vuelos a todo Chile y la región, con asientos a elección y tu pase de abordar al instante.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="buscador">
          <h5 className="mb-3"><i className="bi bi-airplane me-2 text-coral"></i>Busca tu vuelo</h5>
          <BuscadorVuelos onBuscar={buscar} />
        </div>
      </div>

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h2 className="mb-1">Destinos</h2>
            <p className="text-suave mb-0">Elige una zona y mira los vuelos disponibles.</p>
          </div>
          <Link to="/destinos" className="small fw-semibold text-decoration-none text-coral text-nowrap">Ver todos</Link>
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
      </section>

      <section className="container pb-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h2 className="mb-1">Ofertas de la semana</h2>
            <p className="text-suave mb-0">Precios especiales por tiempo limitado.</p>
          </div>
          <Link to="/ofertas" className="small fw-semibold text-decoration-none text-coral text-nowrap">Ver ofertas</Link>
        </div>
        <div className="row g-4">
          {ofertas.map((vuelo) => (
            <div className="col-md-6 col-lg-4" key={vuelo.id}>
              <VueloCard vuelo={vuelo} />
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-4">
        <div className="row g-3 text-center">
          <div className="col-md-4">
            <div className="tarjeta p-4 h-100">
              <i className="bi bi-grid-3x3-gap fs-2 text-coral"></i>
              <h6 className="mt-2">Elige tu asiento</h6>
              <p className="small text-suave mb-0">Mira el mapa del avión y escoge dónde sentarte.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="tarjeta p-4 h-100">
              <i className="bi bi-suitcase2 fs-2 text-coral"></i>
              <h6 className="mt-2">Equipaje de mano incluido</h6>
              <p className="small text-suave mb-0">Agrega maletas de bodega solo si las necesitas.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="tarjeta p-4 h-100">
              <i className="bi bi-qr-code fs-2 text-coral"></i>
              <h6 className="mt-2">Pase de abordar digital</h6>
              <p className="small text-suave mb-0">Recíbelo al pagar, con código QR y listo para imprimir.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
