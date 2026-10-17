import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MensajeError from '../../components/MensajeError'
import { useAuth } from '../../context/AuthContext'
import { estaVacio, validarCorreo, validarPassword } from '../../utils/validaciones'

function Registro() {
  const { registrar } = useAuth()
  const navigate = useNavigate()

  const [datos, setDatos] = useState({ nombre: '', apellido: '', email: '', password: '', confirmar: '' })
  const [error, setError] = useState('')

  function cambiarCampo(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function enviar(e) {
    e.preventDefault()

    if (estaVacio(datos.nombre) || estaVacio(datos.apellido)) {
      setError('Ingresa tu nombre y apellido.')
      return
    }
    if (!validarCorreo(datos.email)) {
      setError('Ingresa un correo válido.')
      return
    }
    if (!validarPassword(datos.password)) {
      setError('La contraseña debe tener entre 4 y 10 caracteres.')
      return
    }
    if (datos.password !== datos.confirmar) {
      setError('Las contraseñas no coinciden.')
      return
    }

    const creado = registrar({
      nombre: datos.nombre,
      apellido: datos.apellido,
      email: datos.email,
      password: datos.password,
    })
    if (!creado) {
      setError('Ya existe una cuenta con ese correo.')
      return
    }
    navigate('/')
  }

  return (
    <div className="container py-5">
      <form className="tarjeta p-4 p-md-5 mx-auto" style={{ maxWidth: 520 }} onSubmit={enviar} noValidate>
        <h2 className="mb-1">Crear cuenta</h2>
        <p className="text-suave mb-4">Regístrate para reservar más rápido.</p>

        <MensajeError mensaje={error} />

        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input id="nombre" name="nombre" className="form-control" value={datos.nombre} onChange={cambiarCampo} />
          </div>
          <div className="col-md-6">
            <label htmlFor="apellido" className="form-label">Apellido</label>
            <input id="apellido" name="apellido" className="form-control" value={datos.apellido} onChange={cambiarCampo} />
          </div>
          <div className="col-12">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input id="email" name="email" type="email" className="form-control" value={datos.email} onChange={cambiarCampo} />
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input id="password" name="password" type="password" className="form-control" value={datos.password} onChange={cambiarCampo} />
          </div>
          <div className="col-md-6">
            <label htmlFor="confirmar" className="form-label">Confirmar contraseña</label>
            <input id="confirmar" name="confirmar" type="password" className="form-control" value={datos.confirmar} onChange={cambiarCampo} />
          </div>
        </div>

        <button type="submit" className="btn btn-fjf w-100 mt-4">Crear cuenta</button>
        <p className="small text-center mt-3 mb-0">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  )
}

export default Registro
