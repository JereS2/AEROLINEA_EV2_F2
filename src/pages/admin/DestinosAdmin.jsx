import { useState } from 'react'
import { Link } from 'react-router-dom'
import { eliminarDestino, obtenerDestinos, obtenerVuelosPorDestino } from '../../data/db'

function DestinosAdmin() {
  const [destinos, setDestinos] = useState(obtenerDestinos())
  const [mensaje, setMensaje] = useState('')

  function eliminar(destino) {
    const confirmar = window.confirm('¿Eliminar el destino ' + destino.nombre + '?')
    if (confirmar) {
      eliminarDestino(destino.id)
      setDestinos(obtenerDestinos())
      setMensaje('Destino ' + destino.nombre + ' eliminado.')
    }
  }

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h2 className="mb-0">Destinos</h2>
        <Link to="/admin/destinos/nuevo" className="btn btn-fjf btn-sm">
          <i className="bi bi-plus-lg me-1"></i>Nuevo destino
        </Link>
      </div>

      {mensaje && <div className="alert alert-success py-2">{mensaje}</div>}

      <div className="tarjeta p-3 table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Cantidad de vuelos</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {destinos.map((destino) => (
              <tr key={destino.id}>
                <td className="fw-semibold">{destino.nombre}</td>
                <td>{destino.descripcion}</td>
                <td>{obtenerVuelosPorDestino(destino.id).length}</td>
                <td className="text-end text-nowrap">
                  <Link
                    to={'/admin/destinos/' + destino.id + '/editar'}
                    className="btn btn-outline-primary btn-sm me-1"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => eliminar(destino)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {destinos.length === 0 && (
          <p className="text-center text-suave my-3">No hay destinos registrados.</p>
        )}
      </div>
    </div>
  )
}

export default DestinosAdmin
