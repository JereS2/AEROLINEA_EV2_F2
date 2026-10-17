import { useState } from 'react'
import MensajeError from './MensajeError'

const destinoVacio = {
  nombre: '',
  descripcion: '',
  icono: 'bi-globe-americas',
}

function FormularioDestino({ destinoInicial, onGuardar }) {
  const [destino, setDestino] = useState({ ...destinoVacio, ...destinoInicial })
  const [error, setError] = useState('')

  function cambiarCampo(e) {
    setDestino({ ...destino, [e.target.name]: e.target.value })
  }

  function enviar(e) {
    e.preventDefault()

    if (!destino.nombre.trim()) {
      setError('El nombre del destino es obligatorio.')
      return
    }
    if (!destino.descripcion.trim()) {
      setError('La descripción del destino es obligatoria.')
      return
    }

    setError('')
    onGuardar({
      ...destino,
      nombre: destino.nombre.trim(),
      descripcion: destino.descripcion.trim(),
      icono: destino.icono.trim(),
    })
  }

  return (
    <form onSubmit={enviar} noValidate>
      <MensajeError mensaje={error} />

      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            className="form-control"
            value={destino.nombre}
            onChange={cambiarCampo}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="icono" className="form-label">Ícono de Bootstrap</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className={'bi ' + destino.icono} aria-hidden="true"></i>
            </span>
            <input
              id="icono"
              name="icono"
              className="form-control"
              value={destino.icono}
              onChange={cambiarCampo}
              placeholder="bi-globe-americas"
            />
          </div>
          <div className="form-text">Escribe el nombre del ícono, por ejemplo: bi-sun.</div>
        </div>
        <div className="col-12">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            className="form-control"
            rows="3"
            value={destino.descripcion}
            onChange={cambiarCampo}
            required
          />
        </div>
      </div>

      <button type="submit" className="btn btn-fjf mt-4">
        <i className="bi bi-save me-2"></i>Guardar destino
      </button>
    </form>
  )
}

export default FormularioDestino
