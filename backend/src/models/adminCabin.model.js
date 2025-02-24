// adminCabin.model.js
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const adminCabinSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["Disponible", "Reservada", "Ocupada"],
      default: "Disponible",
    },
  },
  {
    timestamps: true, // crea campos createdAt y updatedAt automáticamente
  }
);

const AdminCabin = model("AdminCabin", adminCabinSchema);

module.exports = AdminCabin;