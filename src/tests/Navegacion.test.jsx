import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import App from '../App'
import { AuthProvider } from '../context/AuthContext'
import { ReservaProvider } from '../context/ReservaContext'
import { agregarReserva, obtenerVuelos } from '../data/db'
import { simularSesion } from './utilidadesTest'

const admin = { id: 1, nombre: 'Admin', apellido: 'FJF', email: 'admin@fjf.cl', rol: 'admin', fechaRegistro: '2026-08-01' }

// Renderiza la aplicación completa partiendo en una ruta
function abrir(ruta) {
  render(
    <AuthProvider>
      <ReservaProvider>
        <MemoryRouter initialEntries={[ruta]}>
          <App />
        </MemoryRouter>
      </ReservaProvider>
    </AuthProvider>,
  )
}

describe('Navegación del sitio', () => {
  it('la portada muestra el buscador y las ofertas', () => {
    abrir('/')
    expect(screen.getByText('Tu próximo viaje empieza aquí')).toBeInTheDocument()
    expect(screen.getByText('Ofertas de la semana')).toBeInTheDocument()
  })

  it('una ruta que no existe muestra la página 404', () => {
    abrir('/ruta-inventada')
    expect(screen.getByText('Esta página no existe')).toBeInTheDocument()
  })

  it('la página Nosotros muestra los valores de la aerolínea', () => {
    abrir('/nosotros')
    expect(screen.getByText('Nuestros valores')).toBeInTheDocument()
  })

  it('la página de pago con error permite volver a intentar', () => {
    abrir('/pago-error')
    expect(screen.getByText('No se pudo realizar el pago')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Volver a intentar' })).toBeInTheDocument()
  })

  it('el detalle del blog muestra el artículo elegido', () => {
    abrir('/blog/2')
    expect(screen.getByText('Qué llevar en tu equipaje de mano')).toBeInTheDocument()
  })
})

describe('Búsqueda de vuelos', () => {
  it('al buscar por destino solo muestra los vuelos a esa ciudad', async () => {
    abrir('/vuelos')
    await userEvent.selectOptions(screen.getByLabelText('Destino'), 'PMC')
    await userEvent.click(screen.getByRole('button', { name: /Buscar vuelos/ }))

    // hay 2 vuelos a Puerto Montt en los datos de ejemplo
    expect(screen.getByText('2 vuelos encontrados')).toBeInTheDocument()
  })

  it('no permite buscar con el mismo origen y destino', async () => {
    abrir('/vuelos')
    await userEvent.selectOptions(screen.getByLabelText('Origen'), 'SCL')
    await userEvent.selectOptions(screen.getByLabelText('Destino'), 'SCL')
    await userEvent.click(screen.getByRole('button', { name: /Buscar vuelos/ }))

    expect(screen.getByRole('alert')).toHaveTextContent('no pueden ser iguales')
  })
})

describe('Inicio de sesión', () => {
  it('el administrador entra y llega al dashboard', async () => {
    abrir('/login')
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'admin@fjf.cl')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'admin123')
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(screen.getByText('Resumen general de FJF Airlines.')).toBeInTheDocument()
  })

  it('un pasajero entra y vuelve a la portada', async () => {
    abrir('/login')
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'pedro@correo.cl')
    await userEvent.type(screen.getByLabelText('Contraseña'), '1234')
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(screen.getByText('Tu próximo viaje empieza aquí')).toBeInTheDocument()
  })
})

describe('Panel de administración', () => {
  it('el listado de vuelos permite eliminar un vuelo', async () => {
    simularSesion(admin)
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    abrir('/admin/vuelos')

    await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0])

    expect(screen.getByText('Vuelo FJF101 eliminado.')).toBeInTheDocument()
    expect(obtenerVuelos().length).toBe(10)
    window.confirm.mockRestore()
  })

  it('la vista de vuelos críticos muestra el vuelo casi lleno', () => {
    simularSesion(admin)
    abrir('/admin/vuelos/criticos')
    expect(screen.getByText('FJF201')).toBeInTheDocument()
  })

  it('el detalle de un vuelo muestra su ocupación', () => {
    simularSesion(admin)
    abrir('/admin/vuelos/4')
    expect(screen.getByText('Vuelo FJF201')).toBeInTheDocument()
    expect(screen.getByText('4 disponibles de 30')).toBeInTheDocument()
  })

  it('la boleta muestra el detalle y el total pagado', () => {
    simularSesion(admin)
    agregarReserva({
      codigo: 'FJF-BOLET',
      usuarioEmail: 'pedro@correo.cl',
      vueloId: 3,
      asientos: ['1A', '1B'],
      maletasBodega: 1,
      pasajero: { nombre: 'Pedro', apellidos: 'Soto', correo: 'pedro@correo.cl' },
      total: 110980,
    })
    abrir('/admin/reservas/FJF-BOLET')

    expect(screen.getByText('Boleta de compra')).toBeInTheDocument()
    expect(screen.getByText('$95.980')).toBeInTheDocument()
    expect(screen.getByText('$110.980')).toBeInTheDocument()
  })

  it('los reportes muestran las ventas por destino', () => {
    simularSesion(admin)
    abrir('/admin/reportes')
    expect(screen.getByText('Ventas por destino')).toBeInTheDocument()
    expect(screen.getByText('Internacional')).toBeInTheDocument()
  })

  it('el perfil muestra los datos del administrador conectado', () => {
    simularSesion(admin)
    abrir('/admin/perfil')
    expect(screen.getAllByText('admin@fjf.cl').length).toBeGreaterThan(0)
  })

  it('la tabla de destinos muestra cada zona con su descripción', () => {
    simularSesion(admin)
    abrir('/admin/destinos')
    expect(screen.getByText('Lagos, volcanes y la Patagonia más austral.')).toBeInTheDocument()
  })

  it('la tabla de usuarios muestra las cuentas registradas', () => {
    simularSesion(admin)
    abrir('/admin/usuarios')
    expect(screen.getByText('pedro@correo.cl')).toBeInTheDocument()
  })
})
