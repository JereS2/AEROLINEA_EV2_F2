import { useState } from 'react'
import MensajeError from '../../components/MensajeError'
import { estaVacio, validarCorreo } from '../../utils/validaciones'

function Contacto() {
  const [datos, setDatos] = useState({ nombre: '', email: '', mensaje: '' })
  const [error, setError] = useState('')
  const [enviado, setEnviado] = useState(false)

  function cambiarCampo(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function enviarFormulario(e) {
    e.preventDefault()
    setError('')

    if (estaVacio(datos.nombre) || estaVacio(datos.email) || estaVacio(datos.mensaje)) {
      setError('Todos los campos son obligatorios.')
      return
    }

    if (!validarCorreo(datos.email)) {
      setError('Ingresa un correo institucional o comercial válido.')
      return
    }

    if (datos.mensaje.trim().length < 10) {
      setError('El mensaje debe tener al menos 10 caracteres.')
      return
    }

    setEnviado(true)
    setDatos({ nombre: '', email: '', mensaje: '' })
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="tarjeta p-4 p-md-5">
            <h1 className="h3 mb-2 text-center">Contáctanos</h1>
            <p className="text-suave text-center small mb-4">
              ¿Tienes dudas con tu reserva o necesitas asistencia? Envíanos tu mensaje.
            </p>

            {enviado && (
              <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                <div>
                  <strong>¡Mensaje enviado con éxito!</strong> Nos pondremos en contacto contigo a la brevedad.
                </div>
              </div>
            )}

            <MensajeError mensaje={error} />

            <form onSubmit={enviarFormulario} noValidate>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Ej. Juan Pérez"
                  value={datos.nombre}
                  onChange={cambiarCampo}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="ejemplo@correo.cl"
                  value={datos.email}
                  onChange={cambiarCampo}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Mensaje</label>
                <textarea
                  name="mensaje"
                  rows="4"
                  className="form-control"
                  placeholder="Escribe tu consulta o requerimiento aquí (mínimo 10 caracteres)..."
                  value={datos.mensaje}
                  onChange={cambiarCampo}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-fjf w-100 py-2 mt-2">
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacto