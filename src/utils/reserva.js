export const PRECIO_EQUIPAJE_MANO = 0
export const PRECIO_EQUIPAJE_BODEGA = 15000

export function precioFinal(vuelo) {
  if (vuelo.precioOferta) {
    return vuelo.precioOferta
  }
  return vuelo.precio
}

export function calcularTotal(precioPasaje, cantidadAsientos, maletasBodega) {
  const pasajes = precioPasaje * cantidadAsientos
  const equipaje = maletasBodega * PRECIO_EQUIPAJE_BODEGA
  return pasajes + equipaje
}

export function formatearPrecio(valor) {
  return '$' + valor.toLocaleString('es-CL')
}

// genera un código como FJF-4K7Q2
export function generarCodigoReserva() {
  const letras = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let codigo = 'FJF-'
  for (let i = 0; i < 5; i++) {
    const posicion = Math.floor(Math.random() * letras.length)
    codigo += letras[posicion]
  }
  return codigo
}

// simulación de pago: las tarjetas que terminan en 0000 son rechazadas
export function pagoAprobado(numeroTarjeta) {
  const soloNumeros = numeroTarjeta.replaceAll(' ', '')
  return !soloNumeros.endsWith('0000')
}

export function formatearFecha(fecha) {
  const [anio, mes, dia] = fecha.split('-')
  return dia + '/' + mes + '/' + anio
}
