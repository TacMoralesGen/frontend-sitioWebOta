const ReservationCabin = require("../models/reservationCabin.model");


const createNewReservationCabin = async (req, res) => {
    try {

        const newReservationCabin = await ReservationCabin.create(req, body);      

        res.status(201).json({
            message: "Reserva de cabina creada con éxito",
            reservationCabin: newReservationCabin
        });
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error al crear la reserva de cabina",
            error: error.message
        });
    }
};

const getAllReservationCabins = async (req, res) => {
    try {
        const reservationCabins = await ReservationCabin.find().populate('cabin').populate('reservation');
        res.status(200).json({
            reservationCabins
        });
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error al obtener las reservas de cabinas",
            error: error.message
        });
    }
};

module.exports = { createNewReservationCabin, getAllReservationCabins };