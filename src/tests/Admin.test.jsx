import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Dashboard from '../pages/admin/Dashboard'
import ReservasAdmin from '../pages/admin/ReservasAdmin'
import MostrarUsuario from '../pages/admin/MostrarUsuario'
import Navbar from '../components/Navbar'
import { agregarReserva, cancelarReserva } from '../data/db'
import { renderizarPagina, simularSesion } from './utilidadesTest'

function crearReserva(codigo) {
  agregarReserva({
    codigo: codigo,
    usuarioEmail: 'pedro@correo.cl',
    vueloId: 3,
    asientos: ['1A'],
    maletasBodega: 0,
    pasajero: { nombre: 'Pedro', apellidos: 'Soto', correo: 'pedro@correo.cl' },
    total: 47990,
  })
}

describe('Dashboard', () => {
  it('muestra la cantidad de vuelos y usuarios y avisa los vuelos críticos', () => {
    renderizarPagina(<Dashboard />)

    expect(screen.getByText('Vuelos', { selector: 'div.small' }).nextSibling).toHaveTextContent('11')
    expect(screen.getByText('Usuarios', { selector: 'div.small' }).nextSibling).toHaveTextContent('2')
    expect(screen.getByText(/1 vuelo\(s\) con 5 asientos disponibles o menos/)).toBeInTheDocument()
  })
})

describe('ReservasAdmin', () => {
  it('el filtro por estado muestra solo las reservas que corresponden', async () => {
    crearReserva('FJF-AAAAA')
    crearReserva('FJF-BBBBB')
    cancelarReserva('FJF-BBBBB')
    renderizarPagina(<ReservasAdmin />)
    expect(screen.getByText('FJF-BBBBB')).toBeInTheDocument()

    await userEvent.selectOptions(screen.getByLabelText('Estado'), 'Confirmada')

    expect(screen.getByText('FJF-AAAAA')).toBeInTheDocument()
    expect(screen.queryByText('FJF-BBBBB')).not.toBeInTheDocument()
  })
})

describe('MostrarUsuario', () => {
  it('si el usuario no tiene compras lo indica', () => {
    renderizarPagina(<MostrarUsuario />, { ruta: '/admin/usuarios/2', patron: '/admin/usuarios/:id' })
    expect(screen.getByText('Sin compras registradas.')).toBeInTheDocument()
  })

  it('muestra el historial de compras del usuario', () => {
    crearReserva('FJF-HISTO')
    renderizarPagina(<MostrarUsuario />, { ruta: '/admin/usuarios/2', patron: '/admin/usuarios/:id' })
    expect(screen.getByText('FJF-HISTO')).toBeInTheDocument()
  })
})

describe('Navbar', () => {
  it('sin sesión muestra los botones para entrar y crear cuenta', () => {
    renderizarPagina(<Navbar />)
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
    expect(screen.getByText('Crear cuenta')).toBeInTheDocument()
  })

  it('con sesión de admin muestra su nombre y el acceso al panel', () => {
    simularSesion({ id: 1, nombre: 'Admin', apellido: 'FJF', email: 'admin@fjf.cl', rol: 'admin' })
    renderizarPagina(<Navbar />)
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByText('Panel administrador')).toBeInTheDocument()
  })
})
