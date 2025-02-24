const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const paymentSchema = new Schema({
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "CLP",
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Crédito", "Débito"],
  },
  paymentOrigin: {
    type: String,
    required: true,
    enum: ["Nacional", "Extranjero"],
  },
  paymentStatus: {
    type: String,
    enum: ["Pendiente", "Completado", "Fallido"],
    default: "Pendiente",
  },
}, { timestamps: true });

const Payment = model ("Payment", paymentSchema);

module.exports = Payment;