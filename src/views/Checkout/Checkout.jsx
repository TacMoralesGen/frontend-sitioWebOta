import "./Checkout.css";
import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import ReserveDetails from "../../components/ReserveDetails/ReserveDetails";
import ReserveResume from "../../components/ReserveResume/ReserveResume";
import Footer from "../../components/Footer/Footer";
import ContactInformationForm from "../../components/Contact-information-form/ContactInformationForm";
import TermsConditions from "../../components/Terms-conditions/TermsConditions";
import SectionMap from "../../components/Map/Map";


const Checkout = () => {
  const [habitaciones, setHabitaciones] = useState([
    {
      id: 1,
      precioBase: 160900,
      precioTinaja: 60000,
      nombreHabitacion: "Tiny Cabin",
      capacidad: 4,
      detalles: [
        "Vista: Lago General Carrera - Patagonia Chilena.",
        "Tamaño: 25m².",
        "Camas: (1) Cama Queen - (2) Literas.",
        "Comodidades: Aire Acondicionado, Ducha, Baño privado, Toallas, Secador de pelo.",
        "Estacionamiento: Gratuito.",
      ],
      servicios: ["No incluye desayuno"],
      fechaEntrada: "Martes, 28 Enero, 2025 desde las 15:00hrs",
      fechaSalida: "Lunes, 03 Febrero, 2025 hasta las 10:00am",
      duracionNoches: 6,
      adultos: 0,
      ninos: 0,
      subtotal: 160900,
    },
    {
      precioBase: 91900,
      precioTinaja: 45000,
      nombreHabitacion: "Couple Room",
      capacidad: 2,
      detalles: [
        "Vista: Lago General Carrera - Patagonia Chilena.",
        "Tamaño: 14m².",
        "Camas: (1) Cama Queen",
        "Comodidades: Aire Acondicionado, Ducha, Baño privado, Toallas, Secador de pelo.",
        "Estacionamiento: Gratuito.",
      ],
      servicios: ["No incluye servicio adicional"],
      fechaEntrada: "Viernes, 30 Enero, 2025 desde las 15:00hrs",
      fechaSalida: "Martes, 03 Febrero, 2025 hasta las 10:00am",
      duracionNoches: 6,
      adultos: 0,
      ninos: 0,
      subtotal: 91900,
    },
  ]);

  const agregarHabitacion = (nuevaHabitacion) => {
    setHabitaciones([...habitaciones, { ...nuevaHabitacion, id: habitaciones.length + 1 }]);
  };

  const actualizarSubtotal = (index, nuevoSubtotal) => {
    const updatedHabitaciones = [...habitaciones];
    updatedHabitaciones[index].subtotal = nuevoSubtotal;
    setHabitaciones(updatedHabitaciones);
  };

  const actualizarTotales = (index, adultos, ninos) => {
    const updatedHabitaciones = [...habitaciones];
    updatedHabitaciones[index] = {
      ...updatedHabitaciones[index],
      adultos,
      ninos,
    };
    setHabitaciones(updatedHabitaciones);
  };

  // Calcular el total de la reserva sumando los subtotales de todas las habitaciones
  const totalReserva = habitaciones.reduce(
    (acc, habitacion) => acc + habitacion.subtotal,
    0
  );

  useEffect(() => {
    // Recalcular el totalReserva cada vez que cambien los subtotales
  }, [habitaciones]); // Esto garantiza que el total se recalcule cuando cambien las habitaciones


  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 mb-4">
            {habitaciones.map((habitacion, index) => (
              <ReserveDetails
                key={habitacion.nombreHabitacion} // Usando nombreHabitacion como clave única
                precioBase={habitacion.precioBase}
                precioTinaja={habitacion.precioTinaja}
                nombreHabitacion={habitacion.nombreHabitacion}
                capacidad={habitacion.capacidad}
                detalles={habitacion.detalles}
                servicios={habitacion.servicios}
                tipoCabaña={habitacion.tipo}
                subtotal={habitacion.subtotal}
                actualizarSubtotal={(nuevoSubtotal) => actualizarSubtotal(index, nuevoSubtotal)}
                actualizarTotales={(adultos, ninos) => actualizarTotales(index, adultos, ninos)}
              />
            ))}
            <button className="btn btn-primary mt-3" onClick={() => agregarHabitacion({
              precioBase: 91900,
              precioTinaja: 45000,
              nombreHabitacion: "Couple Room",
              capacidad: 2,
              detalles: [
                "Vista: Lago General Carrera - Patagonia Chilena.",
                "Tamaño: 14m².",
                "Camas: (1) Cama Queen",
                "Comodidades: Aire Acondicionado, Ducha, Baño privado, Toallas, Secador de pelo.",
                "Estacionamiento: Gratuito.",
              ],
              servicios: ["No incluye servicio adicional"],
              fechaEntrada: "Viernes, 30 Enero, 2025 desde las 15:00hrs",
              fechaSalida: "Martes, 03 Febrero, 2025 hasta las 10:00am",
              duracionNoches: 6,
              adultos: 0,
              ninos: 0,
              subtotal: 91900,
              tipo: "coupleRoom",
            })}>
              Agregar Cabaña Couple Room
            </button>
          </div>

          <div className="col-12 col-lg-4 mb-4">
            <ReserveResume
              habitaciones={habitaciones}
              totalAdultos={habitaciones.reduce(
                (acc, habitacion) => acc + habitacion.adultos,
                0
              )}
              totalNinos={habitaciones.reduce(
                (acc, habitacion) => acc + habitacion.ninos,
                0
              )}
              serviciosAdicionales={serviciosAdicionales}
              totalReserva={totalReserva} 
            />
          </div>
        </div>
        <ContactInformationForm />
      </div>
      <TermsConditions />
      <SectionMap />
      <Footer />
    </>
  );
};

export default Checkout;
