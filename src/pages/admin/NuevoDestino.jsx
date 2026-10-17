import { Link, useNavigate } from 'react-router-dom'
import FormularioDestino from '../../components/FormularioDestino'
import { agregarDestino } from '../../data/db'

function NuevoDestino() {
  const navigate = useNavigate()

  function guardar(destino) {
    agregarDestino(destino)
    navigate('/admin/destinos')
  }

  return (
    <div>
      <Link to="/admin/destinos" className="small text-decoration-none">
        <i className="bi bi-arrow-left me-1"></i>Volver a destinos
      </Link>
      <h2 className="mt-2 mb-4">Nuevo destino</h2>
      <div className="tarjeta p-4">
        <FormularioDestino onGuardar={guardar} />
      </div>
    </div>
  )
}

export default NuevoDestino
