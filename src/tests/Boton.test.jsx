import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Boton from '../components/Boton'

describe('Boton', () => {
  it('muestra el texto que recibe por props', () => {
    render(<Boton texto="Reservar" onClick={() => {}} />)
    expect(screen.getByRole('button', { name: 'Reservar' })).toBeInTheDocument()
  })

  it('ejecuta la función onClick al hacer clic', async () => {
    const funcionFalsa = vi.fn()
    render(<Boton texto="Reservar" onClick={funcionFalsa} />)

    await userEvent.click(screen.getByRole('button', { name: 'Reservar' }))

    expect(funcionFalsa).toHaveBeenCalledTimes(1)
  })
})
