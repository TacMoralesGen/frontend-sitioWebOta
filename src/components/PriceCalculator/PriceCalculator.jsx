const PriceCalculator = ({ habitacion, actualizarHabitacion, pais }) => {
    const calcularSubtotal = () => {
      let subtotal = habitacion.precioBase;
      if (habitacion.tinajasSeleccionadas) {
        subtotal += habitacion.precioTinaja * habitacion.tinajasSeleccionadas;
      }
      if (pais !== "Chile") {
        subtotal *= 0.81; // Exención del 19% de IVA para turistas extranjeros
      }
      return Math.round(subtotal);
    };
  
    const subtotalCalculado = calcularSubtotal();
  
    actualizarHabitacion(habitacion.id, { subtotal: subtotalCalculado });
  
    return <p>Subtotal: ${subtotalCalculado.toLocaleString()}</p>;
  };
  
  export default PriceCalculator;
  