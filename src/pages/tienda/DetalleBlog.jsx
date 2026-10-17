import { Link, useParams } from 'react-router-dom'
import { obtenerBlogPorId } from '../../data/db'

function DetalleBlog() {
  const { id } = useParams()
  const articulo = obtenerBlogPorId(id)

  if (!articulo) {
    return (
      <div className="container py-5 text-center">
        <h2>Artículo no encontrado</h2>
        <p className="text-suave">La publicación solicitada no está disponible.</p>
        <Link to="/blog" className="btn btn-fjf">Volver al blog</Link>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <div className="mb-4">
        <Link to="/blog" className="small text-decoration-none text-coral mb-2 d-inline-block">
          &larr; Volver a todos los artículos
        </Link>
        <span className="badge bg-light text-dark d-block w-auto mb-2" style={{ width: 'fit-content' }}>
          {articulo.fecha}
        </span>
        <h1 className="h2 mb-2">{articulo.titulo}</h1>
        <p className="lead text-suave">{articulo.resumen}</p>
      </div>

      <div className="tarjeta p-4 p-md-5">
        <p style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>
          {articulo.contenido}
        </p>
      </div>
    </div>
  )
}

export default DetalleBlog