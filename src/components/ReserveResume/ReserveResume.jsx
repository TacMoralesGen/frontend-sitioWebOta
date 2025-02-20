import React from 'react';

const ReserveResume = ({ 
  habitaciones, 
  totalAdultos, 
  totalNinos, 
  totalReserva  
}) => {
  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Resumen de la Reserva</h4>
          <ul className="list-unstyled text-start">
            {/* Bloque de cabañas */}
            <li>
              <strong>Cabañas:</strong>
              {habitaciones.map((habitacion, index) => (
                <div key={index}> 
                  {habitacion.nombreHabitacion} ({habitacion.capacidad} Personas)
                </div>
              ))}
            </li>
            <hr />


            <li>
              <strong>Fecha de reserva:</strong>
              <div className="row">
                <div className="col-md-6">
                  <strong>Entrada:</strong>
                  <div>{habitaciones[0]?.fechaEntrada || "Fecha no disponible"}</div>
                </div>
                <div className="col-md-6">
                  <strong>Salida:</strong>
                  <div>{habitaciones[0]?.fechaSalida || "Fecha no disponible"}</div>
                </div>
              </div>
            </li>

            <li className="mt-3">
              <strong>Duración total de la estadía:</strong> 
              <div>{habitaciones[0]?.duracionNoches || 0} noches</div>
            </li>
            <hr />

     
            <li><strong>Total de Huéspedes:</strong></li>
            <li><strong>Adultos:</strong> <span>{totalAdultos}</span></li>
            <li><strong>Niños:</strong> <span>{totalNinos}</span></li>

            <hr />
            {/* Servicios Adicionales */}
            <li><strong>Servicios Adicionales:</strong></li>
            <li>
              {habitaciones.some(habitacion => habitacion.subtotal > habitacion.precioBase) 
                ? 'Tinaja Caliente agregada'
                : 'No agrega servicio adicional'}
            </li>

            <hr />
            {/* Total a Pagar */}
            <li><strong>Total a pagar:</strong></li>
            <li id="precioTotal">
              CLP${totalReserva} <strong>IVA incluido</strong>
              {totalReserva > 0 && (
                <li id="mensajeIvaExento" style={{ display: 'block' }}>
                  (*turistas extranjeros exentos de IVA)
                </li>
              )}
            </li>

            {/* Botón de confirmación */}
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
