// Solo se muestra si recibe un mensaje
function MensajeError({ mensaje }) {
  if (!mensaje) {
    return null
  }

  return (
    <div className="alert alert-danger py-2" role="alert">
      <i className="bi bi-exclamation-circle me-2"></i>
      {mensaje}
    </div>
  )
}

export default MensajeError
