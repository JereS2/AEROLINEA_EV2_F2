import { Link } from 'react-router-dom'
import { obtenerBlogs } from '../../data/db'

function Blog() {
  const blogs = obtenerBlogs()

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="h2 mb-1">Blog de Viajes</h1>
        <p className="text-suave mb-0">Consejos, guías y tips para que disfrutes al máximo tu próxima aventura.</p>
      </div>

      <div className="row g-4">
        {blogs.map((articulo) => (
          <div className="col-12 col-md-6" key={articulo.id}>
            <div className="tarjeta p-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <span className="badge bg-light text-dark mb-2">{articulo.fecha}</span>
                <h3 className="h5 mb-2">{articulo.titulo}</h3>
                <p className="text-suave small mb-3">{articulo.resumen}</p>
              </div>
              <Link to={'/blog/' + articulo.id} className="btn btn-fjf btn-sm align-self-start">
                Leer artículo &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog