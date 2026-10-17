import { Link } from 'react-router-dom'

function NoEncontrada() {
  return (
    <div className="container py-5 text-center">
      <div className="display-1 fw-bold text-coral">404</div>
      <h2>Esta página no existe</h2>
      <p className="text-suave">Puede que el enlace esté mal escrito o que la página se haya movido.</p>
      <Link to="/" className="btn btn-fjf">Volver al inicio</Link>
    </div>
  )
}

export default NoEncontrada
