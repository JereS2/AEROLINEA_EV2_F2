import { describe, expect, it } from 'vitest'
import { porcentajeOcupacion, totalVendido, ventasPorDestino } from '../utils/reportes'

const reservas = [
  { vueloId: 1, asientos: ['1A', '1B'], total: 100000, estado: 'Confirmada' },
  { vueloId: 2, asientos: ['3C'], total: 60000, estado: 'Confirmada' },
  { vueloId: 1, asientos: ['5F'], total: 50000, estado: 'Cancelada' },
]
const vuelos = [
  { id: 1, destinoId: 1, capacidad: 30, asientosOcupados: ['1A', '1B', '1C'] },
  { id: 2, destinoId: 3, capacidad: 30, asientosOcupados: [] },
]
const destinos = [
  { id: 1, nombre: 'Norte' },
  { id: 3, nombre: 'Sur' },
]

describe('reportes', () => {
  it('el total vendido no suma las reservas canceladas', () => {
    expect(totalVendido(reservas)).toBe(160000)
  })

  it('agrupa las ventas por destino', () => {
    const ventas = ventasPorDestino(reservas, vuelos, destinos)
    expect(ventas[0]).toEqual({ destino: 'Norte', reservas: 1, pasajes: 2, ingresos: 100000 })
    expect(ventas[1]).toEqual({ destino: 'Sur', reservas: 1, pasajes: 1, ingresos: 60000 })
  })

  it('calcula el porcentaje de ocupación de un vuelo', () => {
    expect(porcentajeOcupacion(vuelos[0])).toBe(10)
    expect(porcentajeOcupacion(vuelos[1])).toBe(0)
  })
})
