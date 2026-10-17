import { Link, useNavigate, useParams } from 'react-router-dom'
import FormularioVuelo from '../../components/FormularioVuelo'
import { editarVuelo, obtenerVueloPorId } from '../../data/db'

function EditarVuelo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const vuelo = obtenerVueloPorId(id)

  if (!vuelo) {
    return <p>Vuelo no encontrado.</p>
  }

  function guardar(datos) {
    editarVuelo(id, datos)
    navigate('/admin/vuelos/' + id)
  }

  return (
    <div>
      <Link to="/admin/vuelos" className="small text-decoration-none">
        <i className="bi bi-arrow-left me-1"></i>Volver a vuelos
      </Link>
      <h2 className="mt-2 mb-4">Editar vuelo {vuelo.codigo}</h2>
      <div className="tarjeta p-4">
        <FormularioVuelo vueloInicial={vuelo} onGuardar={guardar} />
      </div>
    </div>
  )
}

export default EditarVuelo
