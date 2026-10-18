import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Contacto from '../pages/tienda/Contacto'
import Ofertas from '../pages/tienda/Ofertas'
import DetalleDestino from '../pages/tienda/DetalleDestino'
import DetalleVuelo from '../pages/tienda/DetalleVuelo'
import PagoExitoso from '../pages/tienda/PagoExitoso'
import { agregarReserva } from '../data/db'
import { renderizarPagina } from './utilidadesTest'

describe('Contacto', () => {
  it('muestra un error si el correo no es válido', async () => {
    render(<Contacto />)
    await userEvent.type(screen.getByPlaceholderText('Ej. Juan Pérez'), 'Ana Rojas')
    await userEvent.type(screen.getByPlaceholderText('ejemplo@correo.cl'), 'ana.correo')
    await userEvent.type(screen.getByPlaceholderText(/Escribe tu consulta/), 'Necesito cambiar mi vuelo')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(screen.getByRole('alert')).toHaveTextContent('correo')
  })

  it('con datos válidos confirma el envío y limpia el formulario', async () => {
    render(<Contacto />)
    const nombre = screen.getByPlaceholderText('Ej. Juan Pérez')
    await userEvent.type(nombre, 'Ana Rojas')
    await userEvent.type(screen.getByPlaceholderText('ejemplo@correo.cl'), 'ana@correo.cl')
    await userEvent.type(screen.getByPlaceholderText(/Escribe tu consulta/), 'Necesito cambiar mi vuelo')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(screen.getByText(/Mensaje enviado con éxito/)).toBeInTheDocument()
    expect(nombre).toHaveValue('')
  })
})

describe('Ofertas', () => {
  it('muestra solo los vuelos que tienen precio de oferta', () => {
    render(
      <MemoryRouter>
        <Ofertas />
      </MemoryRouter>,
    )
    // en los datos de ejemplo hay 4 vuelos con precio de oferta
    expect(screen.getAllByRole('link', { name: 'Ver vuelo' }).length).toBe(4)
  })
})

describe('DetalleDestino', () => {
  it('muestra un mensaje si el destino no existe', () => {
    renderizarPagina(<DetalleDestino />, { ruta: '/destinos/99', patron: '/destinos/:id' })
    expect(screen.getByText('Destino no encontrado')).toBeInTheDocument()
  })

  it('muestra los vuelos del destino elegido', () => {
    renderizarPagina(<DetalleDestino />, { ruta: '/destinos/3', patron: '/destinos/:id' })
    expect(screen.getByText('Vuelos disponibles hacia Sur')).toBeInTheDocument()
  })
})

describe('DetalleVuelo', () => {
  it('al elegir asientos guarda el vuelo en la reserva y va a Mi reserva', async () => {
    renderizarPagina(<DetalleVuelo />, { ruta: '/vuelos/6', patron: '/vuelos/:id', otrasRutas: ['/reserva'] })

    await userEvent.click(screen.getByRole('button', { name: 'Elegir asientos' }))

    expect(screen.getByText('Página /reserva')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('reservaActual')).vueloId).toBe(6)
  })

  it('muestra un mensaje si el vuelo no existe', () => {
    renderizarPagina(<DetalleVuelo />, { ruta: '/vuelos/999', patron: '/vuelos/:id' })
    expect(screen.getByText('Vuelo no encontrado')).toBeInTheDocument()
  })
})

describe('PagoExitoso', () => {
  it('muestra el código de la reserva y el pase de abordar', () => {
    agregarReserva({
      codigo: 'FJF-ABCDE',
      usuarioEmail: 'pedro@correo.cl',
      vueloId: 3,
      asientos: ['4C'],
      maletasBodega: 0,
      pasajero: { nombre: 'Pedro', apellidos: 'Soto', correo: 'pedro@correo.cl' },
      total: 47990,
    })
    renderizarPagina(<PagoExitoso />, { ruta: '/pago-exitoso/FJF-ABCDE', patron: '/pago-exitoso/:codigo' })

    expect(screen.getByText('¡Compra realizada!')).toBeInTheDocument()
    expect(screen.getByText('PASE DE ABORDAR')).toBeInTheDocument()
    expect(screen.getAllByText('FJF-ABCDE').length).toBeGreaterThan(0)
  })
})
