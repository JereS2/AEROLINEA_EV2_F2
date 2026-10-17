// EJEMPLO de listado con CRUD. Copiar este patrón para Destinos y Usuarios.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { asientosDisponibles, eliminarVuelo, obtenerVuelos } from '../../data/db'
import { formatearFecha, formatearPrecio } from '../../utils/reserva'

function VuelosAdmin() {
  const [vuelos, setVuelos] = useState(obtenerVuelos())
  const [mensaje, setMensaje] = useState('')

  function eliminar(vuelo) {
    const confirmar = window.confirm('¿Eliminar el vuelo ' + vuelo.codigo + '?')
    if (confirmar) {
      eliminarVuelo(vuelo.id)
      setVuelos(obtenerVuelos())
      setMensaje('Vuelo ' + vuelo.codigo + ' eliminado.')
    }
  }

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h2 className="mb-0">Vuelos</h2>
        <div className="d-flex gap-2">
          <Link to="/admin/vuelos/criticos" className="btn btn-outline-danger btn-sm">
            <i className="bi bi-exclamation-triangle me-1"></i>Vuelos críticos
          </Link>
          <Link to="/admin/vuelos/nuevo" className="btn btn-fjf btn-sm">
            <i className="bi bi-plus-lg me-1"></i>Nuevo vuelo
          </Link>
        </div>
      </div>

      {mensaje && <div className="alert alert-success py-2">{mensaje}</div>}

      <div className="tarjeta p-3 table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>Código</th>
              <th>Ruta</th>
              <th>Fecha</th>
              <th>Salida</th>
              <th>Disponibles</th>
              <th>Precio</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vuelos.map((vuelo) => (
              <tr key={vuelo.id}>
                <td className="fw-semibold">{vuelo.codigo}</td>
                <td>{vuelo.origen} → {vuelo.destino}</td>
                <td>{formatearFecha(vuelo.fecha)}</td>
                <td>{vuelo.horaSalida}</td>
                <td>{asientosDisponibles(vuelo)} / {vuelo.capacidad}</td>
                <td>{formatearPrecio(vuelo.precio)}</td>
                <td className="text-end text-nowrap">
                  <Link to={'/admin/vuelos/' + vuelo.id} className="btn btn-outline-secondary btn-sm me-1">Ver</Link>
                  <Link to={'/admin/vuelos/' + vuelo.id + '/editar'} className="btn btn-outline-primary btn-sm me-1">Editar</Link>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => eliminar(vuelo)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {vuelos.length === 0 && <p className="text-center text-suave my-3">No hay vuelos registrados.</p>}
      </div>
    </div>
  )
}

export default VuelosAdmin
