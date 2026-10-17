// Página temporal para las vistas que todavía no están hechas.
function EnConstruccion({ titulo, responsable }) {
  return (
    <div className="container py-5 text-center">
      <i className="bi bi-cone-striped display-4 text-coral"></i>
      <h2 className="mt-3">{titulo}</h2>
      <p className="text-suave">Esta vista está en construcción.</p>
      {responsable && <p className="small text-suave">Responsable: {responsable}</p>}
    </div>
  )
}

export default EnConstruccion
