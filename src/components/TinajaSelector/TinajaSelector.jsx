import React, { useState } from 'react';

const TinajaSelector = ({ precioBase, actualizarSubtotal, serviciosAdicionales, setServiciosAdicionales, precioTinaja }) => {
  const [tinajaSeleccionada, setTinajaSeleccionada] = useState(false); // Estado para el checkbox
  const [diasSeleccionados, setDiasSeleccionados] = useState(new Set()); // Para almacenar los días seleccionados

  // Función para manejar la selección del checkbox
  const handleCheckboxChange = () => {
    setTinajaSeleccionada(!tinajaSeleccionada);
    if (!tinajaSeleccionada) {
      setServiciosAdicionales(['Tinaja Caliente']); // Solo añadimos la Tinaja Caliente
    } else {
      setServiciosAdicionales([]); // Si no está seleccionada, eliminamos el servicio
    }
  };

  // Función para manejar la selección de días
  const seleccionarDia = (dia) => {
    const newDias = new Set(diasSeleccionados);
    if (newDias.has(dia)) {
      newDias.delete(dia);
    } else {
      newDias.add(dia);
    }
    setDiasSeleccionados(newDias);
    
    // Actualizamos el subtotal con el costo de la tinaja por cada día seleccionado
    const costoTinajaTotal = newDias.size * precioTinaja; // Multiplicamos los días seleccionados por el precio de la tinaja
    actualizarSubtotal(costoTinajaTotal); // Actualizamos el subtotal en ReserveDetails
  };

  return (
    <div className="tinaja-selector">
      <div className="mt-3">
        <label>Servicios Adicionales:</label>
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="tinajaCaliente" 
            checked={tinajaSeleccionada}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="tinajaCaliente">
            Tinaja Caliente (CLP${precioTinaja} por uso)
          </label>
        </div>
      </div>

      {/* Mostrar el calendario si el checkbox está marcado */}
      {tinajaSeleccionada && (
        <div className="mt-3">
          <p>Selecciona los días para el uso de la tinaja caliente:</p>
          <div className="calendar">
            {['2025-01-28','2025-01-29', '2025-01-30', '2025-01-31','2025-02-01','2025-02-02'].map((dia) => (
              <button 
                key={dia} 
                className={`btn ${diasSeleccionados.has(dia) ? 'btn-warning' : 'btn-light'}`} 
                onClick={() => seleccionarDia(dia)}
              >
                {dia}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TinajaSelector;
