import { useState } from 'react'
import { estaVacio, validarCorreo } from '../utils/validaciones'
import MensajeError from './MensajeError'

// onIngresar recibe (email, password) y devuelve true si los datos son correctos
function LoginForm({ onIngresar }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function enviar(e) {
    e.preventDefault()

    if (estaVacio(email) || estaVacio(password)) {
      setError('Debes completar el correo y la contraseña.')
      return
    }
    if (!validarCorreo(email)) {
      setError('El formato del correo no es válido.')
      return
    }

    const correcto = onIngresar(email, password)
    if (!correcto) {
      setError('Correo o contraseña incorrectos.')
      return
    }
    setError('')
  }

  return (
    <form onSubmit={enviar} noValidate>
      <MensajeError mensaje={error} />

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo electrónico</label>
        <input
          id="email"
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input
          id="password"
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-fjf">Ingresar</button>
      </div>
    </form>
  )
}

export default LoginForm
