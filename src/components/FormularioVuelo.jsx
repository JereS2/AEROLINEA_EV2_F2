import { useState } from 'react'
import { obtenerCiudades, obtenerDestinos } from '../data/db'
import { fechaNoEsPasada } from '../utils/validaciones'
import MensajeError from './MensajeError'

const vueloVacio = {
  codigo: '',
  origen: '',
  destino: '',
  fecha: '',
  horaSalida: '',
  horaLlegada: '',
  capacidad: 36,
  precio: '',
  precioOferta: '',
  destinoId: '',
}

// Se usa tanto para crear un vuelo nuevo como para editar uno existente
function FormularioVuelo({ vueloInicial, onGuardar }) {
  const [vuelo, setVuelo] = useState(vueloInicial || vueloVacio)
  const [error, setError] = useState('')

  const ciudades = obtenerCiudades()
  const destinos = obtenerDestinos()

  function cambiarCampo(e) {
    setVuelo({ ...vuelo, [e.target.name]: e.target.value })
  }

  function validar() {
    if (vuelo.codigo.trim().length < 3) {
      return 'El código del vuelo debe tener al menos 3 caracteres.'
    }
    if (!vuelo.origen || !vuelo.destino) {
      return 'Debes elegir origen y destino.'
    }
    if (vuelo.origen === vuelo.destino) {
      return 'El origen y el destino no pueden ser iguales.'
    }
    if (!vuelo.fecha || !fechaNoEsPasada(vuelo.fecha)) {
      return 'La fecha no puede ser anterior a hoy.'
    }
    if (!vuelo.horaSalida || !vuelo.horaLlegada) {
      return 'Debes indicar la hora de salida y de llegada.'
    }
    const capacidad = Number(vuelo.capacidad)
    if (!Number.isInteger(capacidad) || capacidad < 10) {
      return 'La capacidad debe ser un número entero de al menos 10.'
    }
    if (vuelo.precio === '' || Number(vuelo.precio) < 0) {
      return 'El precio debe ser 0 o mayor.'
    }
    if (!vuelo.destinoId) {
      return 'Debes elegir un destino (categoría).'
    }
    return ''
  }

  function enviar(e) {
    e.preventDefault()
    const mensaje = validar()
    if (mensaje) {
      setError(mensaje)
      return
    }
    setError('')
    onGuardar({
      ...vuelo,
      codigo: vuelo.codigo.toUpperCase(),
      capacidad: Number(vuelo.capacidad),
      precio: Number(vuelo.precio),
      precioOferta: vuelo.precioOferta ? Number(vuelo.precioOferta) : null,
      destinoId: Number(vuelo.destinoId),
    })
  }

  return (
    <form onSubmit={enviar} noValidate>
      <MensajeError mensaje={error} />

      <div className="row g-3">
        <div className="col-md-4">
          <label htmlFor="codigo" className="form-label">Código de vuelo</label>
          <input id="codigo" name="codigo" className="form-control" value={vuelo.codigo} onChange={cambiarCampo} />
        </div>
        <div className="col-md-4">
          <label htmlFor="origen" className="form-label">Origen</label>
          <select id="origen" name="origen" className="form-select" value={vuelo.origen} onChange={cambiarCampo}>
            <option value="">Seleccionar</option>
            {ciudades.map((c) => <option key={c.codigo} value={c.codigo}>{c.nombre}</option>)}
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="destino" className="form-label">Destino</label>
          <select id="destino" name="destino" className="form-select" value={vuelo.destino} onChange={cambiarCampo}>
            <option value="">Seleccionar</option>
            {ciudades.map((c) => <option key={c.codigo} value={c.codigo}>{c.nombre}</option>)}
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="fecha" className="form-label">Fecha</label>
          <input id="fecha" name="fecha" type="date" className="form-control" value={vuelo.fecha} onChange={cambiarCampo} />
        </div>
        <div className="col-md-4">
          <label htmlFor="horaSalida" className="form-label">Hora de salida</label>
          <input id="horaSalida" name="horaSalida" type="time" className="form-control" value={vuelo.horaSalida} onChange={cambiarCampo} />
        </div>
        <div className="col-md-4">
          <label htmlFor="horaLlegada" className="form-label">Hora de llegada</label>
          <input id="horaLlegada" name="horaLlegada" type="time" className="form-control" value={vuelo.horaLlegada} onChange={cambiarCampo} />
        </div>
        <div className="col-md-3">
          <label htmlFor="capacidad" className="form-label">Capacidad</label>
          <input id="capacidad" name="capacidad" type="number" className="form-control" value={vuelo.capacidad} onChange={cambiarCampo} />
        </div>
        <div className="col-md-3">
          <label htmlFor="precio" className="form-label">Precio</label>
          <input id="precio" name="precio" type="number" className="form-control" value={vuelo.precio} onChange={cambiarCampo} />
        </div>
        <div className="col-md-3">
          <label htmlFor="precioOferta" className="form-label">Precio oferta (opcional)</label>
          <input id="precioOferta" name="precioOferta" type="number" className="form-control" value={vuelo.precioOferta || ''} onChange={cambiarCampo} />
        </div>
        <div className="col-md-3">
          <label htmlFor="destinoId" className="form-label">Destino (categoría)</label>
          <select id="destinoId" name="destinoId" className="form-select" value={vuelo.destinoId} onChange={cambiarCampo}>
            <option value="">Seleccionar</option>
            {destinos.map((d) => <option key={d.id} value={d.id}>{d.nombre}</option>)}
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-fjf mt-4">
        <i className="bi bi-save me-2"></i>Guardar vuelo
      </button>
    </form>
  )
}

export default FormularioVuelo
