import { useState } from 'react'
import { obtenerCiudades } from '../data/db'
import MensajeError from './MensajeError'

function BuscadorVuelos({ onBuscar, valoresIniciales = {} }) {
  const [origen, setOrigen] = useState(valoresIniciales.origen || '')
  const [destino, setDestino] = useState(valoresIniciales.destino || '')
  const [fecha, setFecha] = useState(valoresIniciales.fecha || '')
  const [error, setError] = useState('')

  const ciudades = obtenerCiudades()

  function enviar(e) {
    e.preventDefault()
    if (origen && destino && origen === destino) {
      setError('El origen y el destino no pueden ser iguales.')
      return
    }
    setError('')
    onBuscar({ origen, destino, fecha })
  }

  return (
    <form onSubmit={enviar}>
      <div className="row g-3 align-items-end">
        <div className="col-md-3">
          <label htmlFor="origen" className="form-label small fw-semibold">Origen</label>
          <select id="origen" className="form-select" value={origen} onChange={(e) => setOrigen(e.target.value)}>
            <option value="">Cualquiera</option>
            {ciudades.map((c) => (
              <option key={c.codigo} value={c.codigo}>{c.nombre} ({c.codigo})</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="destino" className="form-label small fw-semibold">Destino</label>
          <select id="destino" className="form-select" value={destino} onChange={(e) => setDestino(e.target.value)}>
            <option value="">Cualquiera</option>
            {ciudades.map((c) => (
              <option key={c.codigo} value={c.codigo}>{c.nombre} ({c.codigo})</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="fecha" className="form-label small fw-semibold">Fecha de ida</label>
          <input id="fecha" type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div className="col-md-3 d-grid">
          <button type="submit" className="btn btn-fjf py-2">
            <i className="bi bi-search me-2"></i>Buscar vuelos
          </button>
        </div>
      </div>
      <div className="mt-3">
        <MensajeError mensaje={error} />
      </div>
    </form>
  )
}

export default BuscadorVuelos
