import { Link, useNavigate } from 'react-router-dom'
import MapaAsientos from '../../components/MapaAsientos'
import ResumenReserva from '../../components/ResumenReserva'
import { useReserva } from '../../context/ReservaContext'
import { obtenerVueloPorId } from '../../data/db'
import { formatearPrecio, PRECIO_EQUIPAJE_BODEGA } from '../../utils/reserva'

function MiReserva() {
  const { reserva, cambiarAsiento, cambiarMaletas, limpiarReserva } = useReserva()
  const navigate = useNavigate()

  const vuelo = reserva.vueloId ? obtenerVueloPorId(reserva.vueloId) : null

  if (!vuelo) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-ticket-perforated display-4 text-suave"></i>
        <h2 className="mt-3">Todavía no tienes una reserva</h2>
        <p className="text-suave">Busca un vuelo y elige tus asientos para comenzar.</p>
        <Link to="/vuelos" className="btn btn-fjf">Buscar vuelos</Link>
      </div>
    )
  }

  function cancelar() {
    limpiarReserva()
    navigate('/vuelos')
  }

  return (
    <div className="container py-5">
      <h1 className="mb-1">Mi reserva</h1>
      <p className="text-suave mb-4">Elige tus asientos y el equipaje que llevarás.</p>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="tarjeta p-4 mb-4">
            <h5 className="mb-3">1. Elige tus asientos</h5>
            <MapaAsientos
              capacidad={vuelo.capacidad}
              ocupados={vuelo.asientosOcupados}
              seleccionados={reserva.asientos}
              onCambiar={cambiarAsiento}
            />
          </div>

          <div className="tarjeta p-4">
            <h5 className="mb-3">2. Equipaje</h5>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" checked disabled id="mano" />
              <label className="form-check-label" htmlFor="mano">
                Equipaje de mano (hasta 10 kg) — incluido
              </label>
            </div>
            <label htmlFor="maletas" className="form-label">
              Maletas de bodega ({formatearPrecio(PRECIO_EQUIPAJE_BODEGA)} c/u)
            </label>
            <select
              id="maletas"
              className="form-select w-auto"
              value={reserva.maletasBodega}
              onChange={(e) => cambiarMaletas(Number(e.target.value))}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
        </div>

        <div className="col-lg-5">
          <ResumenReserva vuelo={vuelo} asientos={reserva.asientos} maletasBodega={reserva.maletasBodega} />
          <div className="d-grid gap-2 mt-3">
            <button
              className="btn btn-fjf"
              disabled={reserva.asientos.length === 0}
              onClick={() => navigate('/checkout')}
            >
              Continuar al pago
            </button>
            <button className="btn btn-outline-secondary" onClick={cancelar}>
              Cancelar reserva
            </button>
          </div>
          {reserva.asientos.length === 0 && (
            <p className="small text-suave mt-2">Selecciona al menos un asiento para continuar.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MiReserva
