import { useSearchParams } from 'react-router-dom'
import BuscadorVuelos from '../../components/BuscadorVuelos'
import ListaVuelos from '../../components/ListaVuelos'
import { buscarVuelos } from '../../data/db'

function Vuelos() {
  const [parametros, setParametros] = useSearchParams()

  const origen = parametros.get('origen') || ''
  const destino = parametros.get('destino') || ''
  const fecha = parametros.get('fecha') || ''

  const vuelos = buscarVuelos(origen, destino, fecha)

  function buscar(filtros) {
    setParametros(filtros)
  }

  return (
    <div className="container py-5">
      <h1 className="mb-1">Vuelos</h1>
      <p className="text-suave mb-4">Filtra por origen, destino o fecha.</p>

      <div className="tarjeta p-4 mb-4">
        <BuscadorVuelos onBuscar={buscar} valoresIniciales={{ origen, destino, fecha }} />
      </div>

      <p className="small text-suave">{vuelos.length} vuelos encontrados</p>
      <ListaVuelos vuelos={vuelos} />
    </div>
  )
}

export default Vuelos
