import { useState } from 'react'
import { estaVacio, validarCorreo, validarPassword } from '../utils/validaciones'
import MensajeError from './MensajeError'

function FormularioUsuario({ usuarioInicial, onGuardar }) {
  const esEdicion = Boolean(usuarioInicial)
  const [usuario, setUsuario] = useState({
    nombre: usuarioInicial?.nombre || '',
    apellido: usuarioInicial?.apellido || '',
    email: usuarioInicial?.email || '',
    password: '',
    rol: usuarioInicial?.rol || 'pasajero',
  })
  const [error, setError] = useState('')

  function cambiarCampo(e) {
    setUsuario({ ...usuario, [e.target.name]: e.target.value })
  }

  function enviar(e) {
    e.preventDefault()

    if (estaVacio(usuario.nombre) || estaVacio(usuario.apellido)) {
      setError('Ingresa el nombre y el apellido.')
      return
    }
    if (!validarCorreo(usuario.email.trim())) {
      setError('Ingresa un correo válido.')
      return
    }
    if ((!esEdicion || usuario.password) && !validarPassword(usuario.password)) {
      setError('La contraseña debe tener entre 4 y 10 caracteres.')
      return
    }
    if (!['pasajero', 'admin'].includes(usuario.rol)) {
      setError('Selecciona un rol válido.')
      return
    }

    const datos = {
      nombre: usuario.nombre.trim(),
      apellido: usuario.apellido.trim(),
      email: usuario.email.trim().toLowerCase(),
      rol: usuario.rol,
    }
    if (!esEdicion || usuario.password) {
      datos.password = usuario.password
    }

    setError('')
    onGuardar(datos)
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
            value={usuario.nombre}
            onChange={cambiarCampo}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input
            id="apellido"
            name="apellido"
            className="form-control"
            value={usuario.apellido}
            onChange={cambiarCampo}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            value={usuario.email}
            onChange={cambiarCampo}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            value={usuario.password}
            onChange={cambiarCampo}
            required={!esEdicion}
            autoComplete="new-password"
          />
          {esEdicion && (
            <div className="form-text">Déjala vacía para conservar la contraseña actual.</div>
          )}
          <div className="form-text">Debe tener entre 4 y 10 caracteres.</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="rol" className="form-label">Rol</label>
          <select
            id="rol"
            name="rol"
            className="form-select"
            value={usuario.rol}
            onChange={cambiarCampo}
          >
            <option value="pasajero">Pasajero</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-fjf mt-4">
        <i className="bi bi-save me-2"></i>Guardar usuario
      </button>
    </form>
  )
}

export default FormularioUsuario
