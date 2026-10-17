import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import MensajeError from '../components/MensajeError'

describe('MensajeError', () => {
  it('no muestra nada si no hay error', () => {
    render(<MensajeError mensaje="" />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('muestra el mensaje cuando hay un error', () => {
    render(<MensajeError mensaje="Correo inválido" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Correo inválido')
  })
})
