// Datos de ejemplo que se cargan la primera vez que se abre la página.
// Después de eso, los datos se leen y guardan en localStorage (ver db.js).

export const ciudades = [
  { codigo: 'ARI', nombre: 'Arica' },
  { codigo: 'IQQ', nombre: 'Iquique' },
  { codigo: 'CJC', nombre: 'Calama' },
  { codigo: 'ANF', nombre: 'Antofagasta' },
  { codigo: 'LSC', nombre: 'La Serena' },
  { codigo: 'SCL', nombre: 'Santiago' },
  { codigo: 'CCP', nombre: 'Concepción' },
  { codigo: 'PMC', nombre: 'Puerto Montt' },
  { codigo: 'PUQ', nombre: 'Punta Arenas' },
  { codigo: 'IPC', nombre: 'Isla de Pascua' },
  { codigo: 'LIM', nombre: 'Lima' },
  { codigo: 'EZE', nombre: 'Buenos Aires' },
]

export const destinosIniciales = [
  {
    id: 1,
    nombre: 'Norte',
    descripcion: 'Desierto, playas y cielos limpios para mirar estrellas.',
    icono: 'bi-sun',
  },
  {
    id: 2,
    nombre: 'Centro',
    descripcion: 'Ciudades, viñas y la costa más cerca de la capital.',
    icono: 'bi-buildings',
  },
  {
    id: 3,
    nombre: 'Sur',
    descripcion: 'Lagos, volcanes y la Patagonia más austral.',
    icono: 'bi-tree',
  },
  {
    id: 4,
    nombre: 'Internacional',
    descripcion: 'Vuelos directos a las principales capitales de la región.',
    icono: 'bi-globe-americas',
  },
]

export const vuelosIniciales = [
  { id: 1, codigo: 'FJF101', origen: 'SCL', destino: 'CJC', fecha: '2026-11-05', horaSalida: '07:30', horaLlegada: '09:35', capacidad: 36, precio: 54990, precioOferta: null, destinoId: 1, asientosOcupados: ['1A', '1B', '2C', '4F', '5D'] },
  { id: 2, codigo: 'FJF102', origen: 'SCL', destino: 'ARI', fecha: '2026-11-07', horaSalida: '10:15', horaLlegada: '12:45', capacidad: 36, precio: 69990, precioOferta: 49990, destinoId: 1, asientosOcupados: ['3A', '3B'] },
  { id: 3, codigo: 'FJF103', origen: 'SCL', destino: 'ANF', fecha: '2026-11-10', horaSalida: '18:40', horaLlegada: '20:50', capacidad: 36, precio: 47990, precioOferta: null, destinoId: 1, asientosOcupados: [] },
  { id: 4, codigo: 'FJF201', origen: 'SCL', destino: 'LSC', fecha: '2026-11-06', horaSalida: '08:00', horaLlegada: '09:00', capacidad: 30, precio: 32990, precioOferta: 24990, destinoId: 2, asientosOcupados: ['1A', '1C', '2A', '2B', '2C', '2D', '3A', '3B', '3C', '3D', '4A', '4B', '4C', '4D', '4E', '4F', '5A', '5B', '5C', '5D', '5E', '5F', '1B', '1D', '1E', '1F'] },
  { id: 5, codigo: 'FJF202', origen: 'SCL', destino: 'CCP', fecha: '2026-11-12', horaSalida: '13:20', horaLlegada: '14:25', capacidad: 30, precio: 35990, precioOferta: null, destinoId: 2, asientosOcupados: ['2E'] },
  { id: 6, codigo: 'FJF301', origen: 'SCL', destino: 'PMC', fecha: '2026-11-08', horaSalida: '06:50', horaLlegada: '08:40', capacidad: 36, precio: 59990, precioOferta: 44990, destinoId: 3, asientosOcupados: ['1A', '6F'] },
  { id: 7, codigo: 'FJF302', origen: 'SCL', destino: 'PUQ', fecha: '2026-11-14', horaSalida: '09:30', horaLlegada: '12:55', capacidad: 36, precio: 89990, precioOferta: null, destinoId: 3, asientosOcupados: [] },
  { id: 8, codigo: 'FJF303', origen: 'CCP', destino: 'PMC', fecha: '2026-11-20', horaSalida: '16:10', horaLlegada: '17:20', capacidad: 30, precio: 41990, precioOferta: null, destinoId: 3, asientosOcupados: [] },
  { id: 9, codigo: 'FJF401', origen: 'SCL', destino: 'LIM', fecha: '2026-11-15', horaSalida: '11:00', horaLlegada: '14:30', capacidad: 36, precio: 149990, precioOferta: 119990, destinoId: 4, asientosOcupados: ['1A', '1B', '1C'] },
  { id: 10, codigo: 'FJF402', origen: 'SCL', destino: 'EZE', fecha: '2026-11-18', horaSalida: '15:45', horaLlegada: '18:50', capacidad: 36, precio: 129990, precioOferta: null, destinoId: 4, asientosOcupados: ['5A'] },
  { id: 11, codigo: 'FJF403', origen: 'SCL', destino: 'IPC', fecha: '2026-11-22', horaSalida: '08:30', horaLlegada: '12:10', capacidad: 36, precio: 199990, precioOferta: null, destinoId: 4, asientosOcupados: [] },
]

export const usuariosIniciales = [
  { id: 1, nombre: 'Admin', apellido: 'FJF', email: 'admin@fjf.cl', password: 'admin123', rol: 'admin', fechaRegistro: '2026-08-01' },
  { id: 2, nombre: 'Pedro', apellido: 'Soto', email: 'pedro@correo.cl', password: '1234', rol: 'pasajero', fechaRegistro: '2026-09-10' },
]

export const reservasIniciales = []

export const blogsIniciales = [
  {
    id: 1,
    titulo: '5 lugares imperdibles en San Pedro de Atacama',
    fecha: '15 de marzo, 2026',
    resumen: 'Desde el Valle de la Luna hasta los Géiseres del Tatio, descubre lo mejor del desierto más árido del mundo.',
    contenido: 'San Pedro de Atacama es uno de los destinos turísticos más fascinantes de Chile. Ofrece paisajes lunares, salares infinitos y lagunas altiplánicas. Lugares imperdibles: 1. Valle de la Luna. 2. Géiseres del Tatio al amanecer. 3. Lagunas Escondidas de Baltinache con alta salinidad. 4. Salar de Atacama y Laguna Chaxa con flamencos. 5. Valle de la Muerte ideal para trekking. Recuerda hidratarte y aclimatarte a la altura.'
  },
  {
    id: 2,
    titulo: 'Qué llevar en tu equipaje de mano',
    fecha: '2 de abril, 2026',
    resumen: 'Aprende a optimizar el espacio de tu maleta de cabina y evita cobros sorpresa en el aeropuerto.',
    contenido: 'Viajar con equipaje de mano ahorra tiempo valioso. Recomendaciones clave: 1. Documentación accesible como carnet y tarjeta de embarque. 2. Artículos electrónicos como notebooks y baterías siempre en cabina. 3. Líquidos en envases de hasta 100 ml en bolsa transparente. 4. Una prenda de abrigo por el frío en cabina. 5. Medicamentos con receta en su empaque original.'
  }
]
