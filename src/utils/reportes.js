// Cálculos para el dashboard y los reportes del administrador

export function reservasConfirmadas(reservas) {
  return reservas.filter((r) => r.estado === 'Confirmada')
}

export function totalVendido(reservas) {
  let total = 0
  for (const reserva of reservasConfirmadas(reservas)) {
    total += reserva.total
  }
  return total
}

export function porcentajeOcupacion(vuelo) {
  if (vuelo.capacidad === 0) {
    return 0
  }
  return Math.round((vuelo.asientosOcupados.length / vuelo.capacidad) * 100)
}

// Devuelve una fila por destino con sus reservas, pasajes e ingresos
export function ventasPorDestino(reservas, vuelos, destinos) {
  const confirmadas = reservasConfirmadas(reservas)

  return destinos.map((destino) => {
    let cantidadReservas = 0
    let pasajes = 0
    let ingresos = 0

    for (const reserva of confirmadas) {
      const vuelo = vuelos.find((v) => v.id === reserva.vueloId)
      if (vuelo && vuelo.destinoId === destino.id) {
        cantidadReservas++
        pasajes += reserva.asientos.length
        ingresos += reserva.total
      }
    }

    return { destino: destino.nombre, reservas: cantidadReservas, pasajes: pasajes, ingresos: ingresos }
  })
}
