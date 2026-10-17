import { Link, useNavigate } from 'react-router-dom'
import FormularioVuelo from '../../components/FormularioVuelo'
import { agregarVuelo } from '../../data/db'

function NuevoVuelo() {
  const navigate = useNavigate()

  function guardar(vuelo) {
    agregarVuelo(vuelo)
    navigate('/admin/vuelos')
  }

  return (
    <div>
      <Link to="/admin/vuelos" className="small text-decoration-none">
        <i className="bi bi-arrow-left me-1"></i>Volver a vuelos
      </Link>
      <h2 className="mt-2 mb-4">Nuevo vuelo</h2>
      <div className="tarjeta p-4">
        <FormularioVuelo onGuardar={guardar} />
      </div>
    </div>
  )
}

export default NuevoVuelo
