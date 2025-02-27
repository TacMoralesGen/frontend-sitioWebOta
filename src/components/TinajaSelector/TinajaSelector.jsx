/* eslint-disable react/prop-types */
import { isSameDay, format} from "date-fns";
import { MONTHSSHORT, numberWithDot } from "../../scripts/utils"

const TinajaSelector = ({ cabinNumber, precioTinaja, manageFechasTinajas, fechas, fechasSeleccionadas }) => {
  
  // const [diasSeleccionados, setDiasSeleccionados] = useState(new Set()); // Para almacenar los días seleccionados

  // Función para manejar la selección de días
  const seleccionarDia = (dia) => {
    const newDias = [...fechasSeleccionadas];
    const index = newDias.findIndex(oldDia => isSameDay(oldDia, dia))
    if (index !== -1) newDias.splice(index, 1);
    else newDias.push(dia);
    console.log(newDias);
    console.log("cabinNumber en seleccionarDia:", cabinNumber);
    manageFechasTinajas(cabinNumber, newDias);// Multiplicamos los días seleccionados por el precio de la tinaja
  };

  return (
    <div className="tinaja-selector">
      {/* <div className="mt-3"> */}
        <p><strong>Tinaja Caliente</strong> (CLP${numberWithDot(precioTinaja)} por uso)</p>
      {/* </div> */}
      {(
        <div className="mt-3">
          <p>Selecciona los días para el uso de la tinaja caliente:</p>
          <div className="calendar">
            {fechas.map((dia) => (
              <button 
                key={dia+cabinNumber} 
                className={`btn ${fechasSeleccionadas.findIndex(oldDia => isSameDay(oldDia, dia)) !== -1 ? 'btn-primary' : 'btn-light'} m-1`} 
                onClick={() => seleccionarDia(dia)}
              >
                {`${format(dia,"dd")}-${MONTHSSHORT[format(dia,"MMMM")]}`}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TinajaSelector;
