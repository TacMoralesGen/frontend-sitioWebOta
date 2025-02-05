import "./Checkout.css";
import Header from "../../components/Header/Header";
import { useState } from "react";
import ReserveDetails from "../../components/ReserveDetails/ReserveDetails";
import ReserveResume from "../../components/ReserveResume/ReserveResume";
import Footer from "../../components/Footer/Footer";


const Checkout = () => {
  const [habitaciones, setHabitaciones] = useState([
    {
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
      subtotal: 160900, // Inicializamos el subtotal de la habitación
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
      subtotal: 919000, // Inicializamos el subtotal de la habitación
    },
  ]);

  const [serviciosAdicionales, setServiciosAdicionales] = useState([]); // Estado para servicios adicionales global

  // Función que actualiza los servicios adicionales
  const actualizarServiciosAdicionales = (index, servicios) => {
    const updatedHabitaciones = [...habitaciones];
    updatedHabitaciones[index] = {
      ...updatedHabitaciones[index],
      servicios,
    };
    setHabitaciones(updatedHabitaciones);

    // Actualizamos el estado global de servicios adicionales
    const nuevosServiciosAdicionales = updatedHabitaciones
      .map((habitacion) => habitacion.servicios)
      .flat();

    setServiciosAdicionales(nuevosServiciosAdicionales);

    // Actualizamos el subtotal de esa habitación
    const nuevoSubtotal =
      updatedHabitaciones[index].precioBase +
      (updatedHabitaciones[index].precioTinaja || 0);
    updatedHabitaciones[index].subtotal = nuevoSubtotal; // Actualizamos el subtotal en la habitación
    setHabitaciones(updatedHabitaciones);
  };

  // Función para actualizar los totales de adultos y niños
  const actualizarTotales = (index, adultos, ninos) => {
    const updatedHabitaciones = [...habitaciones];
    updatedHabitaciones[index] = {
      ...updatedHabitaciones[index],
      adultos,
      ninos,
    };
    setHabitaciones(updatedHabitaciones);
  };

  // Calculamos el total de la reserva sumando los subtotales de todas las habitaciones
  const calcularTotalReserva = () => {
    return habitaciones.reduce(
      (acc, habitacion) => acc + habitacion.subtotal,
      0
    );
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          {/* Mostrar detalles de las habitaciones */}
          <div className="col-12 col-lg-8 mb-4">
            {habitaciones.map((habitacion, index) => (
              <ReserveDetails
                key={index}
                precioBase={habitacion.precioBase}
                precioTinaja={habitacion.precioTinaja}
                nombreHabitacion={habitacion.nombreHabitacion}
                capacidad={habitacion.capacidad}
                detalles={habitacion.detalles}
                servicios={habitacion.servicios}
                actualizarTotales={(adultos, ninos) =>
                  actualizarTotales(index, adultos, ninos)
                }
                actualizarServiciosAdicionales={(servicios) =>
                  actualizarServiciosAdicionales(index, servicios)
                }
                totalAdultos={habitacion.adultos}
                totalNinos={habitacion.ninos}
              />
            ))}
          </div>
          {/* Mostrar resumen de la reserva */}
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
              totalReserva={calcularTotalReserva()} // Sumar los subtotales y pasarlos a ReserveResume
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
