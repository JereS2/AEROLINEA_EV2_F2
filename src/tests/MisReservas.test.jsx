import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import MisReservas from '../pages/tienda/MisReservas'
import { agregarReserva, obtenerVueloPorId } from '../data/db'
import { renderizarPagina, simularSesion } from './utilidadesTest'

const pedro = { id: 2, nombre: 'Pedro', apellido: 'Soto', email: 'pedro@correo.cl', rol: 'pasajero' }

function crearReservaDePedro() {
  agregarReserva({
    codigo: 'FJF-PEDRO',
    usuarioEmail: 'pedro@correo.cl',
    vueloId: 3,
    asientos: ['6A'],
    maletasBodega: 0,
    pasajero: { nombre: 'Pedro', apellidos: 'Soto', correo: 'pedro@correo.cl' },
    total: 47990,
  })
}

describe('MisReservas', () => {
  it('si el usuario no tiene reservas muestra un mensaje', () => {
    simularSesion(pedro)
    renderizarPagina(<MisReservas />)
    expect(screen.getByText('Todavía no tienes reservas.')).toBeInTheDocument()
  })

  it('muestra las reservas del usuario conectado', () => {
    simularSesion(pedro)
    crearReservaDePedro()
    renderizarPagina(<MisReservas />)

    expect(screen.getByText('FJF-PEDRO')).toBeInTheDocument()
    expect(screen.getByText('Confirmada')).toBeInTheDocument()
  })

  it('al cancelar cambia el estado y libera el asiento', async () => {
    simularSesion(pedro)
    crearReservaDePedro()
    // mock: simulamos que el usuario acepta el mensaje de confirmación
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    renderizarPagina(<MisReservas />)

    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(screen.getByText('Cancelada')).toBeInTheDocument()
    expect(obtenerVueloPorId(3).asientosOcupados).not.toContain('6A')
    window.confirm.mockRestore()
  })
})
