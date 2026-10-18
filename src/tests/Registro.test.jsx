import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Registro from '../pages/tienda/Registro'
import { buscarUsuarioPorEmail } from '../data/db'
import { renderizarPagina } from './utilidadesTest'

async function llenar(email, password, confirmar) {
  await userEvent.type(screen.getByLabelText('Nombre'), 'Ana')
  await userEvent.type(screen.getByLabelText('Apellido'), 'Rojas')
  await userEvent.type(screen.getByLabelText('Correo electrónico'), email)
  await userEvent.type(screen.getByLabelText('Contraseña'), password)
  await userEvent.type(screen.getByLabelText('Confirmar contraseña'), confirmar)
  await userEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }))
}

function renderizarRegistro() {
  renderizarPagina(<Registro />, { ruta: '/registro', patron: '/registro', otrasRutas: ['/'] })
}

describe('Registro', () => {
  it('muestra un error si las contraseñas no coinciden', async () => {
    renderizarRegistro()
    await llenar('ana@correo.cl', '1234', '9999')
    expect(screen.getByRole('alert')).toHaveTextContent('no coinciden')
  })

  it('no permite registrar un correo que ya existe', async () => {
    renderizarRegistro()
    await llenar('pedro@correo.cl', '1234', '1234')
    expect(screen.getByRole('alert')).toHaveTextContent('Ya existe una cuenta')
  })

  it('con datos válidos crea la cuenta, inicia sesión y vuelve al inicio', async () => {
    renderizarRegistro()
    await llenar('ana@correo.cl', '1234', '1234')

    expect(screen.getByText('Página /')).toBeInTheDocument()
    expect(buscarUsuarioPorEmail('ana@correo.cl').rol).toBe('pasajero')
    expect(JSON.parse(localStorage.getItem('usuarioActual')).email).toBe('ana@correo.cl')
  })
})
