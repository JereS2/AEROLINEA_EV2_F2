import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import MapaAsientos from '../components/MapaAsientos'

describe('MapaAsientos', () => {
  it('al hacer clic en un asiento libre llama a onCambiar con ese asiento', async () => {
    const onCambiar = vi.fn()
    render(<MapaAsientos capacidad={12} ocupados={[]} seleccionados={[]} onCambiar={onCambiar} />)

    await userEvent.click(screen.getByRole('button', { name: '2B' }))

    expect(onCambiar).toHaveBeenCalledWith('2B')
  })

  it('los asientos ocupados están deshabilitados', () => {
    render(<MapaAsientos capacidad={12} ocupados={['1A']} seleccionados={[]} onCambiar={() => {}} />)
    expect(screen.getByRole('button', { name: '1A' })).toBeDisabled()
  })
})
