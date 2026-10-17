import { createContext, useContext, useEffect, useState } from 'react'

// Guarda la reserva que el pasajero está armando (como el "carrito" de una tienda)
const ReservaContext = createContext()

const reservaVacia = { vueloId: null, asientos: [], maletasBodega: 0 }

function leerReservaGuardada() {
  const guardada = localStorage.getItem('reservaActual')
  if (guardada) {
    return JSON.parse(guardada)
  }
  return reservaVacia
}

export function ReservaProvider({ children }) {
  const [reserva, setReserva] = useState(leerReservaGuardada)

  useEffect(() => {
    localStorage.setItem('reservaActual', JSON.stringify(reserva))
  }, [reserva])

  function elegirVuelo(vueloId) {
    if (reserva.vueloId !== vueloId) {
      setReserva({ vueloId: vueloId, asientos: [], maletasBodega: 0 })
    }
  }

  function cambiarAsiento(asiento) {
    if (reserva.asientos.includes(asiento)) {
      const asientos = reserva.asientos.filter((a) => a !== asiento)
      setReserva({ ...reserva, asientos: asientos })
    } else {
      setReserva({ ...reserva, asientos: [...reserva.asientos, asiento] })
    }
  }

  function cambiarMaletas(cantidad) {
    setReserva({ ...reserva, maletasBodega: cantidad })
  }

  function limpiarReserva() {
    setReserva(reservaVacia)
  }

  return (
    <ReservaContext.Provider
      value={{ reserva, elegirVuelo, cambiarAsiento, cambiarMaletas, limpiarReserva }}
    >
      {children}
    </ReservaContext.Provider>
  )
}

export function useReserva() {
  return useContext(ReservaContext)
}
