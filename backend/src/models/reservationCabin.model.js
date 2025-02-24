const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reservationCabinSchema = new Schema({
  cabin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cabin",
    required: true,
  },
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation",
    required: true,
  },
  adults: {
    type: Number,
    required: true,
  },
  childrens: {
    type: Number,
    required: true,
  },
  mainGuest: {
    type: String,
    required: true,
  },
  datesHotTub: {
    type: [Date],
    default: [],
    required: true,
  },
  priceCabin: {
    type: Number,
    required: true,
  },
  priceHotTub: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const ReservationCabin = model("ReservationCabin", reservationCabinSchema);
module.exports = ReservationCabin;
