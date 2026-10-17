import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AdminLayout() {
  const { usuario, cerrarSesion } = useAuth()
  const navigate = useNavigate()

  function salir() {
    cerrarSesion()
    navigate('/')
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-md-3 col-lg-2 admin-sidebar p-3">
          <div className="logo mb-4">FJF <span>Admin</span></div>
          <nav className="nav flex-column">
            <NavLink className="nav-link" to="/admin" end><i className="bi bi-speedometer2"></i>Dashboard</NavLink>
            <NavLink className="nav-link" to="/admin/reservas"><i className="bi bi-receipt"></i>Reservas</NavLink>
            <NavLink className="nav-link" to="/admin/vuelos"><i className="bi bi-airplane"></i>Vuelos</NavLink>
            <NavLink className="nav-link" to="/admin/destinos"><i className="bi bi-geo-alt"></i>Destinos</NavLink>
            <NavLink className="nav-link" to="/admin/usuarios"><i className="bi bi-people"></i>Usuarios</NavLink>
            <NavLink className="nav-link" to="/admin/reportes"><i className="bi bi-bar-chart"></i>Reportes</NavLink>
            <NavLink className="nav-link" to="/admin/perfil"><i className="bi bi-person"></i>Perfil</NavLink>
          </nav>
          <hr className="border-secondary" />
          <Link to="/" className="btn btn-outline-light btn-sm w-100 mb-2">
            <i className="bi bi-shop me-1"></i>Ver sitio
          </Link>
          <button className="btn btn-danger btn-sm w-100" onClick={salir}>
            <i className="bi bi-box-arrow-right me-1"></i>Cerrar sesión
          </button>
        </aside>

        <main className="col-md-9 col-lg-10 p-4">
          <p className="text-suave small mb-4">Conectado como {usuario.nombre} ({usuario.email})</p>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
