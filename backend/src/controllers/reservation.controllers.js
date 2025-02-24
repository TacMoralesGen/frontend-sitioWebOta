const Reservation = require("../models/reservation.model");


const createNewReservation = async (req, res) => {
    try {

        const newReservation = await Reservation.create(req.body);

        res.status(201).json({
            message: "Reserva creada con éxito",
            reservation: newReservation
        });
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error al crear la reserva",
            error: error.message
        });
    }
};

const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json({
            reservations
        });
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error al obtener las reservas",
            error: error.message
        });
    }
};

const getReservedDates = async (req, res) => {
    try {
        // Filtrar solo reservas confirmadas y devolver solo checkinDate y checkoutDate
        const reservations = await Reservation.find(
            { statusReservation: "Confirmada" },
            "checkinDate checkoutDate"
        );

        res.status(200).json({
            reservedDates: reservations
        });
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error al obtener las fechas reservadas",
            error: error.message
        });
    }
};

module.exports = { createNewReservation,getAllReservations, getReservedDates };