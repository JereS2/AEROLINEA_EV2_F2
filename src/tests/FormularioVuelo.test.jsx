import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FormularioVuelo from '../components/FormularioVuelo'

async function llenar(origen, destino) {
  await userEvent.type(screen.getByLabelText('Código de vuelo'), 'fjf500')
  await userEvent.selectOptions(screen.getByLabelText('Origen'), origen)
  await userEvent.selectOptions(screen.getByLabelText('Destino'), destino)
  fireEvent.change(screen.getByLabelText('Fecha'), { target: { value: '2099-12-31' } })
  fireEvent.change(screen.getByLabelText('Hora de salida'), { target: { value: '10:00' } })
  fireEvent.change(screen.getByLabelText('Hora de llegada'), { target: { value: '12:00' } })
  await userEvent.type(screen.getByLabelText('Precio'), '50000')
  await userEvent.selectOptions(screen.getByLabelText('Destino (categoría)'), '3')
  await userEvent.click(screen.getByRole('button', { name: /Guardar vuelo/ }))
}

describe('FormularioVuelo', () => {
  it('muestra un error si el origen y el destino son iguales', async () => {
    const onGuardar = vi.fn()
    render(<FormularioVuelo onGuardar={onGuardar} />)

    await llenar('SCL', 'SCL')

    expect(screen.getByRole('alert')).toHaveTextContent('no pueden ser iguales')
    expect(onGuardar).not.toHaveBeenCalled()
  })

  it('con datos válidos llama a onGuardar con números y el código en mayúsculas', async () => {
    const onGuardar = vi.fn()
    render(<FormularioVuelo onGuardar={onGuardar} />)

    await llenar('SCL', 'PMC')

    expect(onGuardar).toHaveBeenCalledTimes(1)
    const vuelo = onGuardar.mock.calls[0][0]
    expect(vuelo.codigo).toBe('FJF500')
    expect(vuelo.precio).toBe(50000)
    expect(vuelo.capacidad).toBe(36)
    expect(vuelo.destinoId).toBe(3)
  })

  it('muestra un error si el código tiene menos de 3 caracteres', async () => {
    render(<FormularioVuelo onGuardar={() => {}} />)
    await userEvent.type(screen.getByLabelText('Código de vuelo'), 'F1')
    await userEvent.click(screen.getByRole('button', { name: /Guardar vuelo/ }))
    expect(screen.getByRole('alert')).toHaveTextContent('al menos 3 caracteres')
  })
})
