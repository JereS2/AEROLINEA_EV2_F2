// EJEMPLO de página simple: un título, un texto y tarjetas armadas desde un arreglo con .map()
const valores = [
  { icono: 'bi-shield-check', titulo: 'Seguridad', texto: 'Cada vuelo cumple con las revisiones técnicas antes de despegar.' },
  { icono: 'bi-clock-history', titulo: 'Puntualidad', texto: 'Trabajamos para que salgas y llegues a la hora que prometimos.' },
  { icono: 'bi-emoji-smile', titulo: 'Buena atención', texto: 'Un equipo amable desde que compras hasta que aterrizas.' },
]

const cifras = [
  { valor: '12', texto: 'destinos' },
  { valor: '40+', texto: 'vuelos semanales' },
  { valor: '2026', texto: 'año de fundación' },
]

function Nosotros() {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-4 mb-5">
        <div className="col-lg-6">
          <h1>Sobre FJF Airlines</h1>
          <p className="lead text-suave">
            Somos una aerolínea chilena que conecta el norte, el centro y el sur del país, además de
            algunas capitales de Sudamérica.
          </p>
          <p className="text-suave">
            Queremos que reservar un vuelo sea simple: buscas, eliges tu asiento, pagas y recibes tu
            pase de abordar al instante.
          </p>
        </div>
        <div className="col-lg-6">
          <div className="row g-3 text-center">
            {cifras.map((cifra) => (
              <div className="col-4" key={cifra.texto}>
                <div className="tarjeta p-3">
                  <div className="precio">{cifra.valor}</div>
                  <div className="small text-suave">{cifra.texto}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="mb-4">Nuestros valores</h2>
      <div className="row g-4">
        {valores.map((valor) => (
          <div className="col-md-4" key={valor.titulo}>
            <div className="tarjeta p-4 h-100">
              <i className={'bi ' + valor.icono + ' fs-2 text-coral'}></i>
              <h5 className="mt-2">{valor.titulo}</h5>
              <p className="text-suave mb-0">{valor.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Nosotros
