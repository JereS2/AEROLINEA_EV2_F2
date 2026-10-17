import { Link } from 'react-router-dom'

function PagoError() {
  return (
    <div className="container py-5">
      <div className="tarjeta p-5 text-center mx-auto" style={{ maxWidth: 560 }}>
        <i className="bi bi-x-circle-fill display-4 text-danger"></i>
        <h1 className="mt-3">No se pudo realizar el pago</h1>
        <p className="text-suave">
          Tu tarjeta fue rechazada. No se hizo ningún cobro y tus asientos siguen guardados en tu reserva.
        </p>
        <div className="d-flex justify-content-center gap-2 mt-4">
          <Link to="/checkout" className="btn btn-fjf">Volver a intentar</Link>
          <Link to="/reserva" className="btn btn-outline-secondary">Revisar mi reserva</Link>
        </div>
      </div>
    </div>
  )
}

export default PagoError
