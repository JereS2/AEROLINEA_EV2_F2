import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useReserva } from '../context/ReservaContext'

function Navbar() {
  const { usuario, esAdmin, cerrarSesion } = useAuth()
  const { reserva } = useReserva()
  const navigate = useNavigate()

  function salir() {
    cerrarSesion()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-fjf py-3">
      <div className="container">
        <Link className="navbar-brand logo" to="/">
          <i className="bi bi-airplane-fill text-coral me-2"></i>
          FJF <span>Airlines</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/" end>Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/vuelos">Vuelos</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/destinos">Destinos</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/ofertas">Ofertas</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
          </ul>

          <div className="d-flex flex-wrap gap-2 align-items-center">
            <Link to="/reserva" className="btn btn-fjf btn-sm">
              <i className="bi bi-ticket-perforated me-1"></i>
              Mi reserva
              {reserva.asientos.length > 0 && (
                <span className="badge bg-light text-dark ms-2">{reserva.asientos.length}</span>
              )}
            </Link>

            {usuario ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light btn-sm dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {usuario.nombre}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/mis-reservas">Mis reservas</Link></li>
                  {esAdmin && (
                    <li><Link className="dropdown-item" to="/admin">Panel administrador</Link></li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={salir}>Cerrar sesión</button></li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm">Iniciar sesión</Link>
                <Link to="/registro" className="btn btn-light btn-sm">Crear cuenta</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
