import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import MiReserva from '../pages/tienda/MiReserva'
import { renderizarPagina, simularReserva } from './utilidadesTest'

function renderizarMiReserva() {
  renderizarPagina(<MiReserva />, { ruta: '/reserva', patron: '/reserva', otrasRutas: ['/checkout', '/vuelos'] })
}

describe('MiReserva', () => {
  it('sin vuelo elegido muestra que no hay reserva', () => {
    renderizarMiReserva()
    expect(screen.getByText('Todavía no tienes una reserva')).toBeInTheDocument()
  })

  it('el botón para pagar está deshabilitado hasta elegir un asiento', async () => {
    simularReserva(3, [])
    renderizarMiReserva()
    const botonPagar = screen.getByRole('button', { name: 'Continuar al pago' })
    expect(botonPagar).toBeDisabled()

    await userEvent.click(screen.getByRole('button', { name: '1A' }))

    expect(botonPagar).toBeEnabled()
  })

  it('al elegir asientos y maletas se recalcula el total', async () => {
    simularReserva(3, [])
    renderizarMiReserva()

    await userEvent.click(screen.getByRole('button', { name: '1A' }))
    await userEvent.click(screen.getByRole('button', { name: '1B' }))
    await userEvent.selectOptions(screen.getByLabelText(/Maletas de bodega/), '1')

    // 2 pasajes de $47.990 + 1 maleta de $15.000
    expect(screen.getByText('$110.980')).toBeInTheDocument()
  })

  it('al hacer clic de nuevo en un asiento seleccionado lo quita', async () => {
    simularReserva(3, [])
    renderizarMiReserva()
    const asiento = screen.getByRole('button', { name: '1A' })

    await userEvent.click(asiento)
    expect(asiento).toHaveClass('seleccionado')
    await userEvent.click(asiento)

    expect(asiento).toHaveClass('libre')
  })

  it('continuar al pago lleva al checkout', async () => {
    simularReserva(3, ['1A'])
    renderizarMiReserva()

    await userEvent.click(screen.getByRole('button', { name: 'Continuar al pago' }))

    expect(screen.getByText('Página /checkout')).toBeInTheDocument()
  })
})
