import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import LoginForm from '../components/LoginForm'

describe('LoginForm', () => {
  it('actualiza el estado al escribir en los campos', async () => {
    render(<LoginForm onIngresar={() => true} />)
    const campoCorreo = screen.getByLabelText('Correo electrónico')

    await userEvent.type(campoCorreo, 'pedro@correo.cl')

    expect(campoCorreo).toHaveValue('pedro@correo.cl')
  })

  it('muestra un error si se envía vacío y no llama a onIngresar', async () => {
    const onIngresar = vi.fn()
    render(<LoginForm onIngresar={onIngresar} />)

    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Debes completar')
    expect(onIngresar).not.toHaveBeenCalled()
  })

  it('muestra un error si las credenciales son incorrectas', async () => {
    // mock: simulamos que el login falla
    const onIngresar = vi.fn().mockReturnValue(false)
    render(<LoginForm onIngresar={onIngresar} />)

    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'pedro@correo.cl')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'mala')
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(onIngresar).toHaveBeenCalledWith('pedro@correo.cl', 'mala')
    expect(screen.getByRole('alert')).toHaveTextContent('incorrectos')
  })
})
