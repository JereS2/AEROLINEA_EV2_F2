import { Link, useParams } from 'react-router-dom'
import PaseAbordar from '../../components/PaseAbordar'
import { obtenerReservaPorCodigo, obtenerVueloPorId } from '../../data/db'
import { formatearPrecio } from '../../utils/reserva'

function PagoExitoso() {
  const { codigo } = useParams()
  const reserva = obtenerReservaPorCodigo(codigo)
  const vuelo = reserva ? obtenerVueloPorId(reserva.vueloId) : null

  if (!reserva || !vuelo) {
    return (
      <div className="container py-5 text-center">
        <h2>No encontramos esa reserva</h2>
        <Link to="/" className="btn btn-fjf mt-3">Volver al inicio</Link>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <i className="bi bi-check-circle-fill display-4 text-success"></i>
        <h1 className="mt-2">¡Compra realizada!</h1>
        <p className="text-suave">
          Tu reserva <strong>{reserva.codigo}</strong> está confirmada. Total pagado:{' '}
          <strong>{formatearPrecio(reserva.total)}</strong>
        </p>
      </div>

      <PaseAbordar reserva={reserva} vuelo={vuelo} />

      <div className="text-center mt-4 no-imprimir">
        <button className="btn btn-fjf-azul me-2" onClick={() => window.print()}>
          <i className="bi bi-printer me-2"></i>Imprimir pase
        </button>
        <Link to="/" className="btn btn-outline-secondary">Volver al inicio</Link>
      </div>
    </div>
  )
}

export default PagoExitoso
