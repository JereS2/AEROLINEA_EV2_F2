function Boton({ texto, onClick, tipo = 'button', variante = 'fjf', deshabilitado = false }) {
  return (
    <button type={tipo} className={'btn btn-' + variante} onClick={onClick} disabled={deshabilitado}>
      {texto}
    </button>
  )
}

export default Boton
