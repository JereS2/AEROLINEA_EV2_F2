import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import RutaProtegida from '../components/RutaProtegida'
import { AuthProvider } from '../context/AuthContext'

function renderizarEn(ruta) {
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={[ruta]}>
        <Routes>
          <Route path="/" element={<p>Inicio</p>} />
          <Route path="/login" element={<p>Página de login</p>} />
          <Route path="/admin" element={<RutaProtegida soloAdmin><p>Panel admin</p></RutaProtegida>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  )
}

describe('RutaProtegida', () => {
  it('sin sesión redirige al login', () => {
    renderizarEn('/admin')
    expect(screen.getByText('Página de login')).toBeInTheDocument()
  })

  it('un pasajero no puede entrar al panel admin', () => {
    // mock de sesión: guardamos un pasajero como si hubiera iniciado sesión
    localStorage.setItem('usuarioActual', JSON.stringify({ nombre: 'Pedro', rol: 'pasajero' }))
    renderizarEn('/admin')
    expect(screen.getByText('Inicio')).toBeInTheDocument()
  })

  it('un admin sí puede entrar', () => {
    localStorage.setItem('usuarioActual', JSON.stringify({ nombre: 'Admin', rol: 'admin' }))
    renderizarEn('/admin')
    expect(screen.getByText('Panel admin')).toBeInTheDocument()
  })
})
