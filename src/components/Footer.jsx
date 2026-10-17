import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer-fjf py-4 mt-5">
      <div className="container">
        <div className="row g-3">
          <div className="col-md-5">
            <div className="logo mb-2">FJF <span>Airlines</span></div>
            <p className="small mb-0">Volamos por todo Chile y la región. Proyecto académico DSY1104 — Duoc UC.</p>
          </div>
          <div className="col-6 col-md-3">
            <h6 className="text-white">Navegación</h6>
            <ul className="list-unstyled small">
              <li><Link to="/vuelos">Vuelos</Link></li>
              <li><Link to="/ofertas">Ofertas</Link></li>
              <li><Link to="/destinos">Destinos</Link></li>
            </ul>
          </div>
          <div className="col-6 col-md-4">
            <h6 className="text-white">Ayuda</h6>
            <ul className="list-unstyled small">
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
              <li><Link to="/mis-reservas">Mis reservas</Link></li>
            </ul>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="small text-center mb-0">© 2026 FJF Airlines</p>
      </div>
    </footer>
  )
}

export default Footer
