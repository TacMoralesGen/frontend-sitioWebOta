const Payment = require("../models/payment.model");

const createNewPayment = async (req, res) => {
    try {

        const newPayment = await Payment.create(req,body)

        res.status(201).json({
            message: "Pago realizado con éxito",
            payment: newPayment
        });
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error al realizar el pago",
            error: error.message
        });
    }
};

// Obtener todos los pagos realizados de las reservas que se han hecho y esten en la base de datos.
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json({
            payments
        });
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error al obtener los pagos",
            error: error.message
        });
    }
};

module.exports = { createNewPayment, getAllPayments };