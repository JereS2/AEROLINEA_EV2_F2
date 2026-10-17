import { describe, expect, it } from 'vitest'
import {
  agregarReserva,
  agregarVuelo,
  cancelarReserva,
  editarVuelo,
  eliminarVuelo,
  obtenerVueloPorId,
  obtenerVuelos,
} from '../data/db'

const vueloNuevo = {
  codigo: 'FJF999',
  origen: 'SCL',
  destino: 'PUQ',
  fecha: '2026-12-01',
  horaSalida: '10:00',
  horaLlegada: '13:30',
  capacidad: 30,
  precio: 80000,
  precioOferta: null,
  destinoId: 3,
}

describe('db.js - CRUD de vuelos', () => {
  it('agrega un vuelo nuevo con id y sin asientos ocupados', () => {
    const cantidadAntes = obtenerVuelos().length
    const creado = agregarVuelo(vueloNuevo)

    expect(obtenerVuelos().length).toBe(cantidadAntes + 1)
    expect(creado.id).toBeDefined()
    expect(creado.asientosOcupados).toEqual([])
  })

  it('edita el precio de un vuelo existente', () => {
    editarVuelo(1, { precio: 10000 })
    expect(obtenerVueloPorId(1).precio).toBe(10000)
  })

  it('elimina un vuelo', () => {
    eliminarVuelo(1)
    expect(obtenerVueloPorId(1)).toBeUndefined()
  })
})

describe('db.js - reservas', () => {
  it('al reservar se ocupan los asientos y al cancelar se liberan', () => {
    agregarReserva({
      codigo: 'FJF-TEST1',
      usuarioEmail: 'pedro@correo.cl',
      vueloId: 3,
      asientos: ['2A', '2B'],
      maletasBodega: 0,
      pasajero: { nombre: 'Pedro', apellidos: 'Soto', correo: 'pedro@correo.cl' },
      total: 95980,
    })
    expect(obtenerVueloPorId(3).asientosOcupados).toContain('2A')

    const cancelada = cancelarReserva('FJF-TEST1')
    expect(cancelada).toBe(true)
    expect(obtenerVueloPorId(3).asientosOcupados).not.toContain('2A')
  })
})
