import ListaVuelos from '../../components/ListaVuelos'
import { obtenerVuelosEnOferta } from '../../data/db'

function Ofertas() {
  const vuelosOferta = obtenerVuelosEnOferta()

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="h2 mb-1">Vuelos en Oferta</h1>
        <p className="text-suave mb-0">Aprovecha nuestras tarifas especiales con descuento en vuelos seleccionados.</p>
      </div>

      <ListaVuelos vuelos={vuelosOferta} />
    </div>
  )
}

export default Ofertas