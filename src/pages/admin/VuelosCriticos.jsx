import { Link } from 'react-router-dom'
import { asientosDisponibles, obtenerVuelosCriticos } from '../../data/db'
import { formatearFecha } from '../../utils/reserva'

// Vuelos con 5 asientos disponibles o menos
function VuelosCriticos() {
  const vuelos = obtenerVuelosCriticos()

  return (
    <div>
      <Link to="/admin/vuelos" className="small text-decoration-none">
        <i className="bi bi-arrow-left me-1"></i>Volver a vuelos
      </Link>
      <h2 className="mt-2 mb-1">Vuelos críticos</h2>
      <p className="text-suave mb-4">Vuelos con 5 asientos disponibles o menos.</p>

      <div className="tarjeta p-3 table-responsive">
        <table className="table align-middle mb-0">
          <thead>
            <tr><th>Código</th><th>Ruta</th><th>Fecha</th><th>Disponibles</th><th></th></tr>
          </thead>
          <tbody>
            {vuelos.map((vuelo) => (
              <tr key={vuelo.id}>
                <td className="fw-semibold">{vuelo.codigo}</td>
                <td>{vuelo.origen} → {vuelo.destino}</td>
                <td>{formatearFecha(vuelo.fecha)}</td>
                <td><span className="badge bg-danger">{asientosDisponibles(vuelo)}</span></td>
                <td className="text-end">
                  <Link to={'/admin/vuelos/' + vuelo.id} className="btn btn-outline-secondary btn-sm">Ver</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {vuelos.length === 0 && <p className="text-center text-suave my-3">No hay vuelos críticos.</p>}
      </div>
    </div>
  )
}

export default VuelosCriticos
