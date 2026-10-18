import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FormularioDestino from '../components/FormularioDestino'

describe('FormularioDestino', () => {
  it('muestra un error si el nombre está vacío', async () => {
    const onGuardar = vi.fn()
    render(<FormularioDestino onGuardar={onGuardar} />)

    await userEvent.type(screen.getByLabelText('Descripción'), 'Playas y cielos despejados.')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar destino' }))

    expect(screen.getByRole('alert')).toHaveTextContent('El nombre del destino es obligatorio.')
    expect(onGuardar).not.toHaveBeenCalled()
  })
})
