/* eslint-disable react/prop-types */
import { useState } from 'react';
import Guests from '../Guests/Guests';
import TinajaSelector from '../TinajaSelector/TinajaSelector';
import { numberWithDot } from '../../scripts/utils';

const ReserveDetails = ({ 
  keyValue,
  precioBase, 
  precioTinaja, 
  nombreHabitacion, 
  capacidad,
  detalles = [],
  reservationCabin,
  reservationRange,
  manageFechasTinajas,
  manageGuests
}) => {
  console.log("key o cabinNumber al renderizar reserveDetails: ", keyValue);
  // const [subtotal, setSubtotal] = useState(precioBase); // Subtotal inicial
  // const [serviciosAdicionales, setServiciosAdicionales] = useState(servicios); // Servicios adicionales
  const [isOpen, setIsOpen] = useState(false); // Estado para manejar el desplegable

  // Función para actualizar el subtotal cuando se seleccionan servicios adicionales
  // const manejarCambioSubtotal = (costoAdicional) => {
  //   const nuevoSubtotal = precioBase + costoAdicional;
  //   setSubtotal(nuevoSubtotal); 
  //   actualizarSubtotal(nuevoSubtotal); // Se envía el nuevo subtotal a Checkout.jsx
  // };

  // Función para alternar el estado del desplegable
  const toggleDetalles = () => setIsOpen(!isOpen);

  return (
    <div className="col mb-3">
      <div className="card rounded-0">
        <div className="card-body text-start">
          <h3 className="card-title fw-bold">Detalle de la reserva - {nombreHabitacion}</h3>

          {/* Primer bloque de detalles de la reserva */}
          <div className="card-text">
            <div className="container text-start">
              <div className="row">
                <div className="col-6">
                  <span className="fw-bold">{nombreHabitacion} </span> ({capacidad} Personas)
                </div>
                <div className="col-6 text-end">
                <span 
                className="btn d-inline-flex align-items-center gap-1 px-2 py-1 border rounded m-2"
                onClick={toggleDetalles} 
                aria-expanded={isOpen} 
                aria-controls="detallesCabaña"
                style={{ cursor: 'pointer' }}>
                  Ver detalles de cabaña
                  <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease-in-out" }}>
                    <path 
                    d="M2 6l6 6 6-6" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
                  </svg>
                </span>
                  <strong className="mt-2 fw-bold" id="precioBase">
                    CLP${numberWithDot(precioBase)}
                  </strong>
                </div>
              </div>

              {/* Detalles de la cabaña (desplegable) */}
              <div className={`collapse mt-3 ${isOpen ? 'show' : ''}`} id="detallesCabaña">
                <ul className="list-unstyled">
                  {detalles.map((detalle, index) => (
                    <li key={index}>{detalle}</li>
                  ))}
                </ul>
              </div>
            </div>


            {/* Nombre completo Huésped Representante */}
            <div className="col-8 fw-bold">
              <label htmlFor="clienteNombre" className="form-label">
              Nombre completo Huésped Representante:
              </label>
              <input
                type="text"
                id="clienteNombre"
                name="clienteNombre"
                className="form-control form-control-sm d-inline"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>
          </div>

          {/* Aquí incluimos el componente de selección de adultos y niños */}

          <div className="row col-6">
            <Guests 
              cabinNumber={keyValue}
              tipoCabana={nombreHabitacion}
              manageGuests={manageGuests}
            />
          </div>

          {/* Integración del componente TinajaSelector */}
          <div className="mt-3">
            <TinajaSelector 
              cabinNumber={keyValue}
              precioTinaja={precioTinaja} 
              manageFechasTinajas={manageFechasTinajas}
              fechas={reservationRange}
              fechasSeleccionadas={reservationCabin.datesHotTub}
            />
          </div>

          {/* Subtotal Cabaña */}
          <div className="d-flex justify-content-between mt-3">
            <span className="h5 fw-bold">Sub Total Cabaña:</span>
            <span className="h4" id="subTotal">CLP${numberWithDot(reservationCabin.priceHotTub + reservationCabin.priceCabin)}</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReserveDetails;
