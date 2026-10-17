import { describe, expect, it } from 'vitest'
import { calcularTotal, generarCodigoReserva, pagoAprobado } from '../utils/reserva'
import { validarCorreo, validarTarjeta } from '../utils/validaciones'

describe('cálculos de la reserva', () => {
  it('calcula el total con 2 pasajes y 1 maleta de bodega', () => {
    expect(calcularTotal(40000, 2, 1)).toBe(95000)
  })

  it('genera un código de reserva con el formato FJF-XXXXX', () => {
    const codigo = generarCodigoReserva()
    expect(codigo).toMatch(/^FJF-[A-Z0-9]{5}$/)
  })

  it('rechaza el pago si la tarjeta termina en 0000', () => {
    expect(pagoAprobado('4111 1111 1111 0000')).toBe(false)
    expect(pagoAprobado('4111 1111 1111 1111')).toBe(true)
  })
})

describe('validaciones', () => {
  it('valida el formato del correo', () => {
    expect(validarCorreo('pedro@correo.cl')).toBe(true)
    expect(validarCorreo('pedro.correo')).toBe(false)
  })

  it('la tarjeta debe tener 16 dígitos', () => {
    expect(validarTarjeta('1234 5678 9012 3456')).toBe(true)
    expect(validarTarjeta('1234')).toBe(false)
  })
})
