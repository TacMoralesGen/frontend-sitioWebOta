const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const cabinSchema = new Schema({
    typeName: {
      type: String,
      enum: ["TinyCabin", "CoupleRoom"],
      required: true,
    },
    number: {
      type: String,
      required: true,
      unique: true,
    },
    statusCabin: {
      type: String,
      enum: ["Disponible", "Ocupada", "Mantenimiento"],
      default: "Disponible",
      required: true,
    },
    statusHotTub: {
      type: String,
      enum: ["Disponible", "Mantenimiento"],
      default: "Disponible",
      required: true,
    },
    reservedDates: {
      type: [Date],
      default: [],
      required: true,
    },
    maxAdults: {
      type: Number,
      required: true,
    },
    maxChildrens: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    priceHotTubPerInstance: {
      type: Number,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String],
      default: [
        "Aire Acondicionado",
        "Baño Privado",
        "Ducha",
        "Estacionamiento Gratuito",
        "Secador de pelo",
        "Tinaja Caliente (costo adicional por uso)",
        "Toallas",
      ],
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    bedType: {
      type: String,
      required: true,
    }
  }, { timestamps: true });

  const Cabin = model("Cabin", cabinSchema);
  module.exports = Cabin;