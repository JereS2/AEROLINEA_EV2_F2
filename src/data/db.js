// "Base de datos" simulada: guarda todo en localStorage del navegador.
import {
  ciudades,
  destinosIniciales,
  vuelosIniciales,
  usuariosIniciales,
  reservasIniciales,
  blogsIniciales,
} from './datosIniciales'

function leer(clave, datosIniciales) {
  const guardado = localStorage.getItem(clave)
  if (guardado) {
    return JSON.parse(guardado)
  }
  return datosIniciales
}

function guardar(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos))
}

function siguienteId(lista) {
  if (lista.length === 0) {
    return 1
  }
  let mayor = 0
  for (const item of lista) {
    if (item.id > mayor) {
      mayor = item.id
    }
  }
  return mayor + 1
}

// ---------- CIUDADES ----------

export function obtenerCiudades() {
  return ciudades
}

export function nombreCiudad(codigo) {
  const ciudad = ciudades.find((c) => c.codigo === codigo)
  if (ciudad) {
    return ciudad.nombre
  }
  return codigo
}

// ---------- VUELOS ----------

export function obtenerVuelos() {
  return leer('vuelos', vuelosIniciales)
}

export function obtenerVueloPorId(id) {
  const vuelos = obtenerVuelos()
  return vuelos.find((v) => v.id === Number(id))
}

export function agregarVuelo(vuelo) {
  const vuelos = obtenerVuelos()
  const nuevo = { ...vuelo, id: siguienteId(vuelos), asientosOcupados: [] }
  vuelos.push(nuevo)
  guardar('vuelos', vuelos)
  return nuevo
}

export function editarVuelo(id, datos) {
  const vuelos = obtenerVuelos()
  const actualizados = vuelos.map((v) => {
    if (v.id === Number(id)) {
      return { ...v, ...datos, id: v.id }
    }
    return v
  })
  guardar('vuelos', actualizados)
}

export function eliminarVuelo(id) {
  const vuelos = obtenerVuelos()
  const restantes = vuelos.filter((v) => v.id !== Number(id))
  guardar('vuelos', restantes)
}

export function asientosDisponibles(vuelo) {
  return vuelo.capacidad - vuelo.asientosOcupados.length
}

export function buscarVuelos(origen, destino, fecha) {
  let vuelos = obtenerVuelos()
  if (origen) {
    vuelos = vuelos.filter((v) => v.origen === origen)
  }
  if (destino) {
    vuelos = vuelos.filter((v) => v.destino === destino)
  }
  if (fecha) {
    vuelos = vuelos.filter((v) => v.fecha === fecha)
  }
  return vuelos
}

export function obtenerVuelosEnOferta() {
  return obtenerVuelos().filter((v) => v.precioOferta)
}

export function obtenerVuelosCriticos() {
  return obtenerVuelos().filter((v) => asientosDisponibles(v) <= 5)
}

// ---------- DESTINOS (categorías) ----------

export function obtenerDestinos() {
  return leer('destinos', destinosIniciales)
}

export function obtenerDestinoPorId(id) {
  return obtenerDestinos().find((d) => d.id === Number(id))
}

export function obtenerVuelosPorDestino(destinoId) {
  return obtenerVuelos().filter((v) => v.destinoId === Number(destinoId))
}

export function agregarDestino(destino) {
  const destinos = obtenerDestinos()
  const nuevo = { ...destino, id: siguienteId(destinos) }
  destinos.push(nuevo)
  guardar('destinos', destinos)
  return nuevo
}

export function editarDestino(id, datos) {
  const destinos = obtenerDestinos().map((d) => {
    if (d.id === Number(id)) {
      return { ...d, ...datos, id: d.id }
    }
    return d
  })
  guardar('destinos', destinos)
}

export function eliminarDestino(id) {
  const destinos = obtenerDestinos().filter((d) => d.id !== Number(id))
  guardar('destinos', destinos)
}

// ---------- USUARIOS ----------

export function obtenerUsuarios() {
  return leer('usuarios', usuariosIniciales)
}

export function obtenerUsuarioPorId(id) {
  return obtenerUsuarios().find((u) => u.id === Number(id))
}

export function buscarUsuarioPorEmail(email) {
  return obtenerUsuarios().find((u) => u.email === email.toLowerCase())
}

export function agregarUsuario(usuario) {
  const usuarios = obtenerUsuarios()
  const nuevo = {
    ...usuario,
    email: usuario.email.toLowerCase(),
    id: siguienteId(usuarios),
    rol: usuario.rol || 'pasajero',
    fechaRegistro: new Date().toISOString().slice(0, 10),
  }
  usuarios.push(nuevo)
  guardar('usuarios', usuarios)
  return nuevo
}

export function editarUsuario(id, datos) {
  const usuarios = obtenerUsuarios().map((u) => {
    if (u.id === Number(id)) {
      return { ...u, ...datos, id: u.id }
    }
    return u
  })
  guardar('usuarios', usuarios)
}

export function eliminarUsuario(id) {
  const usuarios = obtenerUsuarios().filter((u) => u.id !== Number(id))
  guardar('usuarios', usuarios)
}

// ---------- RESERVAS ----------

export function obtenerReservas() {
  return leer('reservas', reservasIniciales)
}

export function obtenerReservaPorCodigo(codigo) {
  return obtenerReservas().find((r) => r.codigo === codigo)
}

export function obtenerReservasDeUsuario(email) {
  return obtenerReservas().filter((r) => r.usuarioEmail === email)
}

export function agregarReserva(reserva) {
  const reservas = obtenerReservas()
  const nueva = {
    ...reserva,
    id: siguienteId(reservas),
    estado: 'Confirmada',
    fechaReserva: new Date().toISOString().slice(0, 10),
  }
  reservas.push(nueva)
  guardar('reservas', reservas)

  // los asientos reservados quedan ocupados en el vuelo
  const vuelo = obtenerVueloPorId(reserva.vueloId)
  if (vuelo) {
    editarVuelo(vuelo.id, {
      asientosOcupados: [...vuelo.asientosOcupados, ...reserva.asientos],
    })
  }
  return nueva
}

export function cancelarReserva(codigo) {
  const reserva = obtenerReservaPorCodigo(codigo)
  if (!reserva || reserva.estado === 'Cancelada') {
    return false
  }

  const reservas = obtenerReservas().map((r) => {
    if (r.codigo === codigo) {
      return { ...r, estado: 'Cancelada' }
    }
    return r
  })
  guardar('reservas', reservas)

  // se liberan los asientos
  const vuelo = obtenerVueloPorId(reserva.vueloId)
  if (vuelo) {
    const libres = vuelo.asientosOcupados.filter((a) => !reserva.asientos.includes(a))
    editarVuelo(vuelo.id, { asientosOcupados: libres })
  }
  return true
}

// ---------- BLOG ----------

export function obtenerBlogs() {
  return blogsIniciales
}

export function obtenerBlogPorId(id) {
  return blogsIniciales.find((b) => b.id === Number(id))
}
