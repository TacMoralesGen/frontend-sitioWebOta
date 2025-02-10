import React from 'react';

const ReserveResume = ({ habitaciones, totalAdultos, totalNinos, serviciosAdicionales, totalReserva }) => {
  const fechaEntrada = habitaciones[0]?.fechaEntrada || "Fecha no disponible";
  const fechaSalida = habitaciones[0]?.fechaSalida || "Fecha no disponible";
  const duracionEstadia = habitaciones[0]?.duracionNoches || 0;

  // Verificar si 'Tinaja Caliente' está incluido en los servicios adicionales
  const tinajaSeleccionada = Array.isArray(serviciosAdicionales) && serviciosAdicionales.includes('Tinaja Caliente') 
    ? 'Tinaja Caliente' 
    : 'No agrega servicio adicional';

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Resumen de la Reserva</h4>
          <ul className="list-unstyled text-start">
            <li>
              <strong>Cabañas:</strong>
              {habitaciones.map((habitacion) => (
                <div key={habitacion.id || habitacion.nombreHabitacion}> 
                  #{habitacion.id || habitacion.nombreHabitacion} {habitacion.nombreHabitacion} ({habitacion.capacidad} Personas)
                </div>
              ))}
            </li>
            <hr />

            <li>
              <strong>Fecha de reserva:</strong>
              <div className="row">
                <div className="col-md-6">
                  <strong>Entrada:</strong>
                  <div>{fechaEntrada}</div>
                </div>
                <div className="col-md-6">
                  <strong>Salida:</strong>
                  <div>{fechaSalida}</div>
                </div>
              </div>
            </li>

            <li className="mt-3">
              <strong>Duración total de la estadía:</strong> 
              <div>{duracionEstadia} noches</div>
            </li>
            <hr />

            <li><strong>Total de Huespedes:</strong></li>
            <li><strong>Adultos:</strong> <span>{totalAdultos}</span></li>
            <li><strong>Niños:</strong> <span>{totalNinos}</span></li>

            <hr />
            <li><strong>Servicios Adicionales:</strong></li>
            <li>{tinajaSeleccionada}</li>

            <hr />
            <li><strong>Total a pagar:</strong></li>
            <li id="precioTotal">
              CLP${totalReserva} <strong>IVA incluido</strong>
              <li id="mensajeIvaExento" style={{ display: 'none' }}>
                (*turistas extranjeros exentos de IVA)
              </li>
            </li>
            <div className="mt-4 text-center">
              <button type="button" className="btn btn-success opacity-50">Confirmar reserva</button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReserveResume;
