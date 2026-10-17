import { Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RutaProtegida from './components/RutaProtegida'
import AdminLayout from './components/AdminLayout'

import Home from './pages/tienda/Home'
import Vuelos from './pages/tienda/Vuelos'
import DetalleVuelo from './pages/tienda/DetalleVuelo'
import Destinos from './pages/tienda/Destinos'
import DetalleDestino from './pages/tienda/DetalleDestino'
import Ofertas from './pages/tienda/Ofertas'
import MiReserva from './pages/tienda/MiReserva'
import Checkout from './pages/tienda/Checkout'
import PagoExitoso from './pages/tienda/PagoExitoso'
import PagoError from './pages/tienda/PagoError'
import Login from './pages/tienda/Login'
import Registro from './pages/tienda/Registro'
import MisReservas from './pages/tienda/MisReservas'
import Nosotros from './pages/tienda/Nosotros'
import Blog from './pages/tienda/Blog'
import DetalleBlog from './pages/tienda/DetalleBlog'
import Contacto from './pages/tienda/Contacto'
import NoEncontrada from './pages/tienda/NoEncontrada'

import Dashboard from './pages/admin/Dashboard'
import ReservasAdmin from './pages/admin/ReservasAdmin'
import MostrarReserva from './pages/admin/MostrarReserva'
import VuelosAdmin from './pages/admin/VuelosAdmin'
import NuevoVuelo from './pages/admin/NuevoVuelo'
import MostrarVuelo from './pages/admin/MostrarVuelo'
import EditarVuelo from './pages/admin/EditarVuelo'
import VuelosCriticos from './pages/admin/VuelosCriticos'
import DestinosAdmin from './pages/admin/DestinosAdmin'
import NuevoDestino from './pages/admin/NuevoDestino'
import EditarDestino from './pages/admin/EditarDestino'
import UsuariosAdmin from './pages/admin/UsuariosAdmin'
import NuevoUsuario from './pages/admin/NuevoUsuario'
import MostrarUsuario from './pages/admin/MostrarUsuario'
import EditarUsuario from './pages/admin/EditarUsuario'
import Reportes from './pages/admin/Reportes'
import Perfil from './pages/admin/Perfil'

function LayoutTienda() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<LayoutTienda />}>
        <Route path="/" element={<Home />} />
        <Route path="/vuelos" element={<Vuelos />} />
        <Route path="/vuelos/:id" element={<DetalleVuelo />} />
        <Route path="/destinos" element={<Destinos />} />
        <Route path="/destinos/:id" element={<DetalleDestino />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/reserva" element={<MiReserva />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pago-exitoso/:codigo" element={<PagoExitoso />} />
        <Route path="/pago-error" element={<PagoError />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/mis-reservas" element={<RutaProtegida><MisReservas /></RutaProtegida>} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<DetalleBlog />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>

      <Route path="/admin" element={<RutaProtegida soloAdmin><AdminLayout /></RutaProtegida>}>
        <Route index element={<Dashboard />} />
        <Route path="reservas" element={<ReservasAdmin />} />
        <Route path="reservas/:codigo" element={<MostrarReserva />} />
        <Route path="vuelos" element={<VuelosAdmin />} />
        <Route path="vuelos/nuevo" element={<NuevoVuelo />} />
        <Route path="vuelos/criticos" element={<VuelosCriticos />} />
        <Route path="vuelos/:id" element={<MostrarVuelo />} />
        <Route path="vuelos/:id/editar" element={<EditarVuelo />} />
        <Route path="destinos" element={<DestinosAdmin />} />
        <Route path="destinos/nuevo" element={<NuevoDestino />} />
        <Route path="destinos/:id/editar" element={<EditarDestino />} />
        <Route path="usuarios" element={<UsuariosAdmin />} />
        <Route path="usuarios/nuevo" element={<NuevoUsuario />} />
        <Route path="usuarios/:id" element={<MostrarUsuario />} />
        <Route path="usuarios/:id/editar" element={<EditarUsuario />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="perfil" element={<Perfil />} />
      </Route>
    </Routes>
  )
}

export default App
