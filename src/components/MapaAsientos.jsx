const LETRAS = ['A', 'B', 'C', 'D', 'E', 'F']

function MapaAsientos({ capacidad, ocupados, seleccionados, onCambiar }) {
  const filas = Math.ceil(capacidad / LETRAS.length)
  const numerosFilas = []
  for (let i = 1; i <= filas; i++) {
    numerosFilas.push(i)
  }

  function claseAsiento(asiento) {
    if (ocupados.includes(asiento)) {
      return 'asiento ocupado'
    }
    if (seleccionados.includes(asiento)) {
      return 'asiento seleccionado'
    }
    return 'asiento libre'
  }

  return (
    <div>
      <div className="avion">
        {numerosFilas.map((fila) => (
          <div className="fila-asientos" key={fila}>
            {LETRAS.map((letra, indice) => {
              const asiento = fila + letra
              return (
                <div key={asiento} className="d-flex align-items-center">
                  <button
                    type="button"
                    className={claseAsiento(asiento)}
                    disabled={ocupados.includes(asiento)}
                    onClick={() => onCambiar(asiento)}
                  >
                    {asiento}
                  </button>
                  {indice === 2 && <span className="pasillo">{fila}</span>}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="leyenda d-flex justify-content-center gap-3 small mt-3">
        <div><span style={{ background: '#d8e6f3' }}></span>Libre</div>
        <div><span style={{ background: 'var(--coral)' }}></span>Seleccionado</div>
        <div><span style={{ background: '#c9ced6' }}></span>Ocupado</div>
      </div>
    </div>
  )
}

export default MapaAsientos
