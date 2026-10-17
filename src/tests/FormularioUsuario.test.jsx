import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FormularioUsuario from '../components/FormularioUsuario'

describe('FormularioUsuario', () => {
  it('llama a onGuardar con los datos válidos', async () => {
    const onGuardar = vi.fn()
    render(<FormularioUsuario onGuardar={onGuardar} />)

    await userEvent.type(screen.getByLabelText('Nombre'), ' Ana ')
    await userEvent.type(screen.getByLabelText('Apellido'), ' Pérez ')
    await userEvent.type(screen.getByLabelText('Correo electrónico'), ' ANA@EJEMPLO.CL ')
    await userEvent.type(screen.getByLabelText('Contraseña'), '1234')
    await userEvent.type(screen.getByLabelText('Confirmar contraseña'), '1234')
    await userEvent.selectOptions(screen.getByLabelText('Rol'), 'admin')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar usuario' }))

    expect(onGuardar).toHaveBeenCalledWith({
      nombre: 'Ana',
      apellido: 'Pérez',
      email: 'ana@ejemplo.cl',
      password: '1234',
      rol: 'admin',
    })
  })

  it('muestra un error y no guarda si las contraseñas no coinciden', async () => {
    const onGuardar = vi.fn()
    render(<FormularioUsuario onGuardar={onGuardar} />)

    await userEvent.type(screen.getByLabelText('Nombre'), 'Ana')
    await userEvent.type(screen.getByLabelText('Apellido'), 'Pérez')
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'ana@ejemplo.cl')
    await userEvent.type(screen.getByLabelText('Contraseña'), '1234')
    await userEvent.type(screen.getByLabelText('Confirmar contraseña'), '12345')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar usuario' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Las contraseñas no coinciden.')
    expect(onGuardar).not.toHaveBeenCalled()
  })
})
