export function estaVacio(texto) {
  return !texto || texto.trim() === ''
}

export function validarCorreo(correo) {
  if (estaVacio(correo) || correo.length > 100) {
    return false
  }
  const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return formato.test(correo)
}

export function validarPassword(password) {
  return password.length >= 4 && password.length <= 10
}

export function validarTarjeta(numero) {
  const soloNumeros = numero.replaceAll(' ', '')
  return /^[0-9]{16}$/.test(soloNumeros)
}

export function validarCvv(cvv) {
  return /^[0-9]{3}$/.test(cvv)
}

// formato MM/AA, por ejemplo 08/28
export function validarVencimiento(texto) {
  return /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(texto)
}

// true si la fecha (AAAA-MM-DD) es hoy o después
export function fechaNoEsPasada(fecha) {
  const hoy = new Date().toISOString().slice(0, 10)
  return fecha >= hoy
}
