const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reservationSchema = new Schema({
  documentTypeClient: {
    type: String,
    required: true,
    enum: ["RUT", "Pasaporte", "ID Extranjero"],
  },
  documentNumberClient: {
    type: String,
    required: true,
  },
  nameClient: {
    type: String,
    required: true,
  },
  countryOfResidence: {
    type: String,
    required: true,
  },
  phoneClient: {
    type: String,
    required: true,
  },
  emailClient: {
    type: String,
    required: true,
  },
  checkinDate: {
    type: Date,
    required: true,
  },
  checkoutDate: {
    type: Date,
    required: true,
  },
  statusReservation: {
    type: String,
    enum: ["Pendiente", "Confirmada", "Fallida", "Completada", "Anulada"],
    default: "Pendiente",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  }
}, { timestamps: true });

const Reservation = model("Reservation", reservationSchema);

module.exports = Reservation;