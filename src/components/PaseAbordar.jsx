import { QRCodeSVG } from 'qrcode.react'
import { nombreCiudad } from '../data/db'
import { formatearFecha } from '../utils/reserva'

function PaseAbordar({ reserva, vuelo }) {
  return (
    <div className="pase">
      <div className="pase-encabezado d-flex justify-content-between align-items-center">
        <span className="logo">FJF <span>Airlines</span></span>
        <span className="small">PASE DE ABORDAR</span>
      </div>

      <div className="pase-cuerpo">
        <div className="pase-datos">
          <div className="ruta mb-3">
            <div>
              <div className="codigo-ciudad">{vuelo.origen}</div>
              <div className="small text-suave">{nombreCiudad(vuelo.origen)}</div>
            </div>
            <div className="linea"><i className="bi bi-airplane-fill"></i></div>
            <div className="text-end">
              <div className="codigo-ciudad">{vuelo.destino}</div>
              <div className="small text-suave">{nombreCiudad(vuelo.destino)}</div>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-6">
              <div className="dato-label">Pasajero</div>
              <div className="dato-valor">{reserva.pasajero.nombre} {reserva.pasajero.apellidos}</div>
            </div>
            <div className="col-6">
              <div className="dato-label">Vuelo</div>
              <div className="dato-valor">{vuelo.codigo}</div>
            </div>
            <div className="col-4">
              <div className="dato-label">Fecha</div>
              <div className="dato-valor">{formatearFecha(vuelo.fecha)}</div>
            </div>
            <div className="col-4">
              <div className="dato-label">Salida</div>
              <div className="dato-valor">{vuelo.horaSalida}</div>
            </div>
            <div className="col-4">
              <div className="dato-label">Asientos</div>
              <div className="dato-valor">{reserva.asientos.join(', ')}</div>
            </div>
          </div>
        </div>

        <div className="pase-qr">
          <QRCodeSVG value={reserva.codigo} size={130} />
          <div className="dato-label mt-2">Código de reserva</div>
          <div className="dato-valor">{reserva.codigo}</div>
        </div>
      </div>
    </div>
  )
}

export default PaseAbordar
