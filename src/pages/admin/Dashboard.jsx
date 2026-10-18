import { Link } from 'react-router-dom'
import { obtenerReservas, obtenerUsuarios, obtenerVuelos, obtenerVuelosCriticos } from '../../data/db'
import { formatearPrecio } from '../../utils/reserva'
import { reservasConfirmadas, totalVendido } from '../../utils/reportes'

const accesos = [
  { ruta: '/admin/reservas', icono: 'bi-receipt', titulo: 'Reservas', texto: 'Compras realizadas y sus boletas.' },
  { ruta: '/admin/vuelos', icono: 'bi-airplane', titulo: 'Vuelos', texto: 'Crear, editar y eliminar vuelos.' },
  { ruta: '/admin/destinos', icono: 'bi-geo-alt', titulo: 'Destinos', texto: 'Zonas que agrupan los vuelos.' },
  { ruta: '/admin/usuarios', icono: 'bi-people', titulo: 'Usuarios', texto: 'Cuentas de pasajeros y administradores.' },
  { ruta: '/admin/reportes', icono: 'bi-bar-chart', titulo: 'Reportes', texto: 'Ventas por destino y ocupación.' },
  { ruta: '/admin/perfil', icono: 'bi-person', titulo: 'Perfil', texto: 'Datos de tu cuenta.' },
]

function Dashboard() {
  const reservas = obtenerReservas()
  const confirmadas = reservasConfirmadas(reservas)
  const vuelos = obtenerVuelos()
  const usuarios = obtenerUsuarios()
  const criticos = obtenerVuelosCriticos()

  const tarjetas = [
    { titulo: 'Reservas confirmadas', valor: confirmadas.length, icono: 'bi-receipt', color: 'bg-primary' },
    { titulo: 'Vuelos', valor: vuelos.length, icono: 'bi-airplane', color: 'bg-success' },
    { titulo: 'Usuarios', valor: usuarios.length, icono: 'bi-people', color: 'bg-warning' },
    { titulo: 'Total vendido', valor: formatearPrecio(totalVendido(reservas)), icono: 'bi-cash-coin', color: 'bg-danger' },
  ]

  return (
    <div>
      <h2 className="mb-1">Dashboard</h2>
      <p className="text-suave mb-4">Resumen general de FJF Airlines.</p>

      <div className="row g-3 mb-4">
        {tarjetas.map((t) => (
          <div className="col-sm-6 col-xl-3" key={t.titulo}>
            <div className={'rounded-3 p-3 text-white ' + t.color}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="small opacity-75">{t.titulo}</div>
                  <div className="fs-3 fw-bold">{t.valor}</div>
                </div>
                <i className={'bi ' + t.icono + ' fs-1 opacity-50'}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {criticos.length > 0 && (
        <div className="alert alert-warning d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-exclamation-triangle me-2"></i>
            Hay {criticos.length} vuelo(s) con 5 asientos disponibles o menos.
          </span>
          <Link to="/admin/vuelos/criticos" className="btn btn-sm btn-outline-dark">Ver vuelos críticos</Link>
        </div>
      )}

      <div className="row g-3">
        {accesos.map((a) => (
          <div className="col-sm-6 col-lg-4" key={a.ruta}>
            <Link to={a.ruta} className="tarjeta p-4 d-block text-decoration-none h-100">
              <i className={'bi ' + a.icono + ' fs-3 text-coral'}></i>
              <h5 className="mt-2 mb-1">{a.titulo}</h5>
              <p className="small text-suave mb-0">{a.texto}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
