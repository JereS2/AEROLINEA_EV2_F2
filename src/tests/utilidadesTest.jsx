// Funciones de ayuda para renderizar páginas que usan sesión, reserva y rutas
import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { ReservaProvider } from '../context/ReservaContext'

// Simula que un usuario ya inició sesión
export function simularSesion(usuario) {
  localStorage.setItem('usuarioActual', JSON.stringify(usuario))
}

// Simula una reserva en curso (como el carrito de una tienda)
export function simularReserva(vueloId, asientos, maletasBodega = 0) {
  localStorage.setItem('reservaActual', JSON.stringify({ vueloId, asientos, maletasBodega }))
}

// Renderiza una página en una ruta y agrega rutas de destino para comprobar redirecciones
export function renderizarPagina(elemento, { ruta = '/', patron = '/', otrasRutas = [] } = {}) {
  return render(
    <AuthProvider>
      <ReservaProvider>
        <MemoryRouter initialEntries={[ruta]}>
          <Routes>
            <Route path={patron} element={elemento} />
            {otrasRutas.map((r) => (
              <Route key={r} path={r} element={<p>Página {r}</p>} />
            ))}
          </Routes>
        </MemoryRouter>
      </ReservaProvider>
    </AuthProvider>,
  )
}
