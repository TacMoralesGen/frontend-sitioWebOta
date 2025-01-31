import "./SelectDates.css";
import SelectDate from './Select-date/SelectDate'

const SelectDates = () => {
  return (
    <section className="date-section">
      <form className="row justify-content-center">
        <section className="col-auto text-center d-flex flex-column select-date-container">
          {/* <label htmlFor="llegada">Llegada</label>
          <input
            type="date"
            name="llegada"
            id="llegada"
            placeholder="Fecha llegada"
          /> */}
          <label htmlFor="salida">Fecha Llegada / Check In</label>
          <SelectDate />    
        </section>
        <section className="col-auto text-center d-flex flex-column select-date-container">
          {/* <label htmlFor="salida">Salida</label>
          <input
            type="date"
            name="salida"
            id="salida"
            placeholder="Fecha salida"
          /> */}
          <label htmlFor="salida">Fecha Salida / Check Out</label>
          <SelectDate />    
        </section>
        <section className="col-auto text-center">
          <label htmlFor="reservar">Disponibilidad</label>
          <button className="reserve-button" id="reservar">
            Reservar &gt;
          </button>
        </section>
      </form>
    </section>
  );
};

export default SelectDates;
