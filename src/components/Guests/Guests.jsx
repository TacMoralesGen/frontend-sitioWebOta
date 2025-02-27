/* eslint-disable react/prop-types */
import { useState} from 'react';
import { generateNumberOptionsElements } from '../../scripts/utils';

const Guests = ({ cabinNumber, tipoCabana, manageGuests }) => {
  const maxNinosInicial = tipoCabana === "Tiny Cabin" ? 3 : 1 
  const [maxNinos, setMaxNinos] = useState(maxNinosInicial)

  // Función que maneja el cambio en el número de adultos
  const handleAdultosChange = (e) => {
    const nuevosAdultos = parseInt(e.target.value);
    let newMaxNinos;
    if (tipoCabana === "Tiny Cabin"){
      newMaxNinos = nuevosAdultos === 1 ? 3 : nuevosAdultos === 2 ? 2 : null; 
    } else if (tipoCabana === "Couple Room"){
      newMaxNinos = nuevosAdultos === 1 ? 1 : nuevosAdultos === 2 ? 0 : null; 
    }
    setMaxNinos(newMaxNinos)
    manageGuests(cabinNumber, true, nuevosAdultos)
  };

  const handleNinosChange = (e) => {
    const nuevosNinos = parseInt(e.target.value);
    manageGuests(cabinNumber, false, nuevosNinos)
  };

  // useEffect(() => {
  //   actualizarHuespedes(adultos, ninos);
  // }, [adultos, ninos, actualizarHuespedes]); //???

  return (
    <div className="col-md-6 mt-4">
      <div className="d-flex justify-content-between">
        <div className='d-flex flex-column w-50 me-2  '>
          <label className='form-label fw-bold'>Adultos</label>
          <select className='form-select' onChange={handleAdultosChange}>
            {generateNumberOptionsElements(1,2)}
          </select>
        </div>
        <div className='d-flex flex-column w-50'>
          <label className='form-label fw-bold'>Niños</label>
          <select className='form-select' onChange={handleNinosChange}>
            {generateNumberOptionsElements(0, maxNinos)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Guests;
