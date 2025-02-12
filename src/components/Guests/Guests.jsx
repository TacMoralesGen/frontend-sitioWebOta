import React, { useState, useEffect } from 'react';

const Guests = ({ tipoCabaña, capacidad, actualizarTotales }) => {
  const [adultos, setAdultos] = useState(0);
  const [ninos, setNinos] = useState(0);

  // Función que maneja el cambio en el número de adultos
  const handleAdultosChange = (e) => {
    const nuevosAdultos = parseInt(e.target.value);

    if (tipoCabaña === "tinyCabin") {
      // Para Tiny Cabin  máximo de adultos  2
      if (nuevosAdultos <= 2) {
        setAdultos(nuevosAdultos);
        
        setNinos(prev => nuevosAdultos === 1 ? Math.min(prev, 3) : Math.min(prev, 2));
      }
    } else {
      
      if (nuevosAdultos <= capacidad) {
        setAdultos(nuevosAdultos);
        setNinos(prev => Math.min(prev, capacidad - nuevosAdultos));
      }
    }
  };

  // Cambio en el número de niños
  const handleNinosChange = (e) => {
    const nuevosNinos = parseInt(e.target.value);

    if (tipoCabaña === "tinyCabin") {
      // Restricciones para Tiny Cabin
      if (adultos === 1) {
        if (nuevosNinos <= 3) setNinos(nuevosNinos); // 1 adulto => max 3 niños
      } else if (adultos === 2) {
        if (nuevosNinos <= 2) setNinos(nuevosNinos); // 2 adultos => max 2 niños
      }
    } else {
      // Lógica para otras habitaciones
      if (nuevosNinos <= capacidad - adultos) setNinos(nuevosNinos);
    }
  };

  useEffect(() => {
    actualizarTotales(adultos, ninos);
  }, [adultos, ninos, actualizarTotales]);

  return (
    <div className="col-md-6">
      <div className="d-flex justify-content-between">
        <div>
          <label>Adultos</label>
          <select value={adultos} onChange={handleAdultosChange}>
            {[...Array(3)].map((_, index) => (
              <option key={index} value={index}>{index}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Niños</label>
          <select value={ninos} onChange={handleNinosChange}>
            {[...Array(adultos === 1 ? 4 : 3)].map((_, index) => (
              <option key={index} value={index}>{index}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Guests;
