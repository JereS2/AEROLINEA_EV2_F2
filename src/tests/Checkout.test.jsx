import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Checkout from '../pages/tienda/Checkout'
import { obtenerReservas, obtenerVueloPorId } from '../data/db'
import { renderizarPagina, simularReserva, simularSesion } from './utilidadesTest'

const rutasDestino = ['/pago-exitoso/:codigo', '/pago-error', '/vuelos']

function renderizarCheckout() {
  renderizarPagina(<Checkout />, { ruta: '/checkout', patron: '/checkout', otrasRutas: rutasDestino })
}

async function completarFormulario(numeroTarjeta) {
  await userEvent.type(screen.getByLabelText('Nombre'), 'Ana')
  await userEvent.type(screen.getByLabelText('Apellidos'), 'Rojas')
  await userEvent.type(screen.getByLabelText('Correo'), 'ana@correo.cl')
  await userEvent.type(screen.getByLabelText('Número de tarjeta'), numeroTarjeta)
  await userEvent.type(screen.getByLabelText('Titular'), 'Ana Rojas')
  await userEvent.type(screen.getByLabelText('Vencimiento'), '08/28')
  await userEvent.type(screen.getByLabelText('CVV'), '123')
}

describe('Checkout', () => {
  it('sin reserva en curso muestra que no hay nada que pagar', () => {
    renderizarCheckout()
    expect(screen.getByText('No hay nada que pagar todavía')).toBeInTheDocument()
  })

  it('con sesión iniciada completa solos los datos del pasajero', () => {
    simularSesion({ id: 2, nombre: 'Pedro', apellido: 'Soto', email: 'pedro@correo.cl', rol: 'pasajero' })
    simularReserva(3, ['2A'])
    renderizarCheckout()

    expect(screen.getByLabelText('Nombre')).toHaveValue('Pedro')
    expect(screen.getByLabelText('Correo')).toHaveValue('pedro@correo.cl')
  })

  it('muestra un error si la tarjeta no tiene 16 dígitos', async () => {
    simularReserva(3, ['2A'])
    renderizarCheckout()

    await completarFormulario('1234')
    await userEvent.click(screen.getByRole('button', { name: /Pagar ahora/ }))

    expect(screen.getByRole('alert')).toHaveTextContent('16 dígitos')
  })

  it('si la tarjeta termina en 0000 redirige a la página de pago con error', async () => {
    simularReserva(3, ['2A'])
    renderizarCheckout()

    await completarFormulario('4111111111110000')
    await userEvent.click(screen.getByRole('button', { name: /Pagar ahora/ }))

    expect(screen.getByText('Página /pago-error')).toBeInTheDocument()
    expect(obtenerReservas().length).toBe(0)
  })

  it('con pago aprobado guarda la reserva, ocupa los asientos y redirige a compra exitosa', async () => {
    simularReserva(3, ['2A', '2B'], 1)
    renderizarCheckout()

    await completarFormulario('4111111111111111')
    await userEvent.click(screen.getByRole('button', { name: /Pagar ahora/ }))

    expect(screen.getByText('Página /pago-exitoso/:codigo')).toBeInTheDocument()
    const reserva = obtenerReservas()[0]
    expect(reserva.total).toBe(47990 * 2 + 15000)
    expect(obtenerVueloPorId(3).asientosOcupados).toEqual(['2A', '2B'])
  })
})
