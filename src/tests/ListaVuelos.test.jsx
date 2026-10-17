import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import ListaVuelos from '../components/ListaVuelos'
import { vuelosIniciales } from '../data/datosIniciales'

function renderizarLista(vuelos) {
  render(
    <MemoryRouter>
      <ListaVuelos vuelos={vuelos} />
    </MemoryRouter>,
  )
}

describe('ListaVuelos', () => {
  it('muestra una tarjeta por cada vuelo', () => {
    renderizarLista(vuelosIniciales)
    const botones = screen.getAllByRole('link', { name: 'Ver vuelo' })
    expect(botones.length).toBe(vuelosIniciales.length)
  })

  it('muestra un mensaje cuando no hay vuelos', () => {
    renderizarLista([])
    expect(screen.getByText(/No hay vuelos disponibles/)).toBeInTheDocument()
  })
})
