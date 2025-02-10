import React, { useState, useEffect } from 'react';

const Guests = ({ capacidad, actualizarTotales }) => {
  const [adultos, setAdultos] = useState(0);
  const [ninos, setNinos] = useState(0);

  // Función que maneja el cambio en el número de adultos
  const handleAdultosChange = (e) => {
    const nuevosAdultos = parseInt(e.target.value);
    
    // Limitar la cantidad de adultos a la capacidad máxima
    if (nuevosAdultos <= capacidad) {
      setAdultos(nuevosAdultos);

      // Limitar los niños a la capacidad restante después de seleccionar adultos
      setNinos(prev => Math.min(prev, capacidad - nuevosAdultos));
    }
  };

  const handleNinosChange = (e) => {
    const nuevosNinos = parseInt(e.target.value);

    // Limitar la cantidad de niños a la capacidad restante
    if (nuevosNinos <= capacidad - adultos) {
      setNinos(nuevosNinos);
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
            {[...Array(capacidad + 1)].map((_, index) => (
              <option key={index} value={index}>{index}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Niños</label>
          <select value={ninos} onChange={handleNinosChange}>
            {[...Array(capacidad - adultos + 1)].map((_, index) => (
              <option key={index} value={index}>{index}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Guests;
