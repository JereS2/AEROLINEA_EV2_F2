import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MensajeError from '../../components/MensajeError'
import ResumenReserva from '../../components/ResumenReserva'
import { useAuth } from '../../context/AuthContext'
import { useReserva } from '../../context/ReservaContext'
import { agregarReserva, obtenerVueloPorId } from '../../data/db'
import { calcularTotal, generarCodigoReserva, pagoAprobado, precioFinal } from '../../utils/reserva'
import { estaVacio, validarCorreo, validarCvv, validarTarjeta, validarVencimiento } from '../../utils/validaciones'

function Checkout() {
  const { usuario } = useAuth()
  const { reserva, limpiarReserva } = useReserva()
  const navigate = useNavigate()

  // si hay sesión iniciada, los datos del pasajero se completan solos
  const [datos, setDatos] = useState({
    nombre: usuario ? usuario.nombre : '',
    apellidos: usuario ? usuario.apellido : '',
    correo: usuario ? usuario.email : '',
    tarjeta: '',
    titular: '',
    vencimiento: '',
    cvv: '',
  })
  const [error, setError] = useState('')

  const vuelo = reserva.vueloId ? obtenerVueloPorId(reserva.vueloId) : null

  if (!vuelo || reserva.asientos.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>No hay nada que pagar todavía</h2>
        <p className="text-suave">Primero elige un vuelo y tus asientos.</p>
        <Link to="/vuelos" className="btn btn-fjf">Buscar vuelos</Link>
      </div>
    )
  }

  function cambiarCampo(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function validar() {
    if (estaVacio(datos.nombre) || estaVacio(datos.apellidos)) {
      return 'Ingresa el nombre y los apellidos del pasajero.'
    }
    if (!validarCorreo(datos.correo)) {
      return 'Ingresa un correo válido.'
    }
    if (!validarTarjeta(datos.tarjeta)) {
      return 'El número de tarjeta debe tener 16 dígitos.'
    }
    if (estaVacio(datos.titular)) {
      return 'Ingresa el nombre del titular de la tarjeta.'
    }
    if (!validarVencimiento(datos.vencimiento)) {
      return 'El vencimiento debe tener el formato MM/AA.'
    }
    if (!validarCvv(datos.cvv)) {
      return 'El CVV debe tener 3 dígitos.'
    }
    return ''
  }

  function pagar(e) {
    e.preventDefault()
    const mensaje = validar()
    if (mensaje) {
      setError(mensaje)
      return
    }

    if (!pagoAprobado(datos.tarjeta)) {
      navigate('/pago-error')
      return
    }

    const codigo = generarCodigoReserva()
    agregarReserva({
      codigo: codigo,
      usuarioEmail: usuario ? usuario.email : datos.correo,
      vueloId: vuelo.id,
      asientos: reserva.asientos,
      maletasBodega: reserva.maletasBodega,
      pasajero: { nombre: datos.nombre, apellidos: datos.apellidos, correo: datos.correo },
      total: calcularTotal(precioFinal(vuelo), reserva.asientos.length, reserva.maletasBodega),
    })
    limpiarReserva()
    navigate('/pago-exitoso/' + codigo)
  }

  return (
    <div className="container py-5">
      <h1 className="mb-1">Pago</h1>
      <p className="text-suave mb-4">Completa los datos del pasajero y de la tarjeta.</p>

      <div className="row g-4">
        <div className="col-lg-7">
          <form className="tarjeta p-4" onSubmit={pagar} noValidate>
            <MensajeError mensaje={error} />

            <h5 className="mb-3">Datos del pasajero</h5>
            {usuario && (
              <p className="small text-suave">
                <i className="bi bi-info-circle me-1"></i>Completamos tus datos porque iniciaste sesión.
              </p>
            )}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input id="nombre" name="nombre" className="form-control" value={datos.nombre} onChange={cambiarCampo} />
              </div>
              <div className="col-md-6">
                <label htmlFor="apellidos" className="form-label">Apellidos</label>
                <input id="apellidos" name="apellidos" className="form-control" value={datos.apellidos} onChange={cambiarCampo} />
              </div>
              <div className="col-12">
                <label htmlFor="correo" className="form-label">Correo</label>
                <input id="correo" name="correo" type="email" className="form-control" value={datos.correo} onChange={cambiarCampo} />
              </div>
            </div>

            <h5 className="mb-3">Tarjeta</h5>
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="tarjeta" className="form-label">Número de tarjeta</label>
                <input id="tarjeta" name="tarjeta" className="form-control" placeholder="1234 5678 9012 3456" value={datos.tarjeta} onChange={cambiarCampo} />
              </div>
              <div className="col-12">
                <label htmlFor="titular" className="form-label">Titular</label>
                <input id="titular" name="titular" className="form-control" value={datos.titular} onChange={cambiarCampo} />
              </div>
              <div className="col-6">
                <label htmlFor="vencimiento" className="form-label">Vencimiento</label>
                <input id="vencimiento" name="vencimiento" className="form-control" placeholder="MM/AA" value={datos.vencimiento} onChange={cambiarCampo} />
              </div>
              <div className="col-6">
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input id="cvv" name="cvv" className="form-control" placeholder="123" value={datos.cvv} onChange={cambiarCampo} />
              </div>
            </div>
            <p className="small text-suave mt-3 mb-0">
              Pago simulado: las tarjetas que terminan en 0000 son rechazadas.
            </p>

            <button type="submit" className="btn btn-fjf w-100 mt-4">
              <i className="bi bi-lock me-2"></i>Pagar ahora
            </button>
          </form>
        </div>

        <div className="col-lg-5">
          <ResumenReserva vuelo={vuelo} asientos={reserva.asientos} maletasBodega={reserva.maletasBodega} />
        </div>
      </div>
    </div>
  )
}

export default Checkout
