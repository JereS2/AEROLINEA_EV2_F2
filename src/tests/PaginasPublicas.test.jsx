import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Destinos from '../pages/tienda/Destinos'
import Blog from '../pages/tienda/Blog'
import Contacto from '../pages/tienda/Contacto'

describe('Pruebas Unitarias - Páginas Públicas (Estudiante 2)', () => {
  // Test 1: Destinos carga correctamente y renderiza el título principal
  it('renderiza la página de Destinos con su título y opciones', () => {
    render(
      <MemoryRouter>
        <Destinos />
      </MemoryRouter>
    )
    expect(screen.getByText('Nuestros Destinos')).toBeInTheDocument()
  })

  // Test 2: Blog lista las publicaciones disponibles
  it('renderiza la lista de artículos en el Blog de viajes', () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    )
    expect(screen.getByText('Blog de Viajes')).toBeInTheDocument()
    expect(screen.getByText(/5 lugares imperdibles en San Pedro/i)).toBeInTheDocument()
  })

  // Test 3: Contacto valida campos obligatorios antes de enviar
  it('muestra mensaje de error en Contacto si se envía el formulario vacío', () => {
    render(<Contacto />)
    const botonEnviar = screen.getByRole('button', { name: /enviar mensaje/i })
    
    fireEvent.click(botonEnviar)

    expect(screen.getByText('Todos los campos son obligatorios.')).toBeInTheDocument()
  })
})