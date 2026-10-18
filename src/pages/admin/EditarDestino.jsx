import { Link, useNavigate, useParams } from 'react-router-dom'
import FormularioDestino from '../../components/FormularioDestino'
import { editarDestino, obtenerDestinoPorId } from '../../data/db'

function EditarDestino() {
  const { id } = useParams()
  const navigate = useNavigate()
  const destino = obtenerDestinoPorId(id)

  if (!destino) {
    return <p>Destino no encontrado.</p>
  }

  function guardar(datos) {
    editarDestino(id, datos)
    navigate('/admin/destinos')
  }

  return (
    <div>
      <Link to="/admin/destinos" className="small text-decoration-none">
        <i className="bi bi-arrow-left me-1"></i>Volver a destinos
      </Link>
      <h2 className="mt-2 mb-4">Editar destino {destino.nombre}</h2>
      <div className="tarjeta p-4">
        <FormularioDestino destinoInicial={destino} onGuardar={guardar} />
      </div>
    </div>
  )
}

export default EditarDestino
