/* eslint-disable react/prop-types */
import { useState } from 'react';
import Guests from '../Guests/Guests'; 
import TinajaSelector from '../TinajaSelector/TinajaSelector';

const ReserveDetails = ({ 
  precioBase, 
  precioTinaja, 
  nombreHabitacion, 
  capacidad, 
  detalles, 
  servicios = [], 
  actualizarTotales, 
  totalAdultos,
  totalNinos,
  actualizarServiciosAdicionales
}) => {
  const [subtotal, setSubtotal] = useState(precioBase); // Subtotal que se actualizará
  const [serviciosAdicionales, setServiciosAdicionales] = useState(servicios); // Servicios adicionales

  // Función que actualiza el subtotal cuando se cambian los servicios adicionales
  const actualizarSubtotal = (costoAdicional) => {
    setSubtotal(precioBase + costoAdicional); // Aquí actualizamos el subtotal sumando el costo de la tinaja
  };

  return (
      <div className="col mb-3">
        <div className="card">
          <div className="card-body text-start">
            <h3 className="card-title fw-normal">Detalle de la reserva - {nombreHabitacion}</h3>

            {/* Primer bloque de detalles de la reserva */}
            <p className="card-text">
              <div className="container text-start">
                <div className="row">
                  <div className="col-6">
                    <span className="fw-bold">{nombreHabitacion} </span>  ({capacidad} Personas)
                  </div>
                </div>
              </div>
            </p>

            {/* Información del precio base */}
            <div className="mt-2 fw-bold" id="precioBase">
              CLP${precioBase}
            </div>

            {/* Aquí incluimos el componente de selección de adultos y niños */}
            <div className="row">
              <Guests 
                capacidad={capacidad} 
                totalAdultos={totalAdultos} 
                totalNinos={totalNinos}
                actualizarTotales={actualizarTotales}  
              />
            </div>

            {/* Integración del componente TinajaSelector */}
            <div className="mt-3">
              <TinajaSelector 
                precioTinaja={precioTinaja} // Asegúrate de que el precioTinaja se pase aquí
                actualizarSubtotal={actualizarSubtotal} // Pasamos la función para actualizar el subtotal
                serviciosAdicionales={serviciosAdicionales}
                setServiciosAdicionales={setServiciosAdicionales}
              />
            </div>

            {/* Subtotal Cabaña */}
            <div className="d-flex justify-content-between mt-3">
              <span className="h4">Sub Total Cabaña:</span>
              <span className="h4" id="subTotal">CLP${subtotal}</span>
            </div>

          </div>
        </div>
      </div>
  );
};

export default ReserveDetails;
