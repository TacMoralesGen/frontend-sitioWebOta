const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Creación del esquema con validaciones
const contactoSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [50, "El nombre no puede superar los 50 caracteres"],
      match: [/^[a-zA-Z\s]+$/, "El nombre solo puede contener letras y espacios"],
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      trim: true,
      lowercase: true, 
      unique: true,
      match: [/\S+@\S+\.\S+/, "El correo electrónico no es válido"],
    },
    phone: {
      type: String,
      required: [true, "El número de teléfono es obligatorio"],
      trim: true,
      match: [/^\+?\d{7,15}$/, "El número de teléfono no es válido"], // Permite el prefijo '+' y valida números con 7 a 15 dígitos
    },
    country: {
      type: String,
      required: [true, "El país es obligatorio"],
    },
    otherCountry: {
      type: String,
      required: function() { return this.country === 'otros'; }, // Solo es obligatorio si el país es 'otros'
    },
    message: {
      type: String,
      maxlength: [500, "El mensaje no puede exceder los 500 caracteres"],
    },
  },
  { 
    timestamps: true, // Campos de fecha de creación y actualización automáticos
    collection: "datos-contacto" // Asegurar que usa la colección "datos-contacto"
  }
);

// Definición del modelo
const Contacto = model("Contacto", contactoSchema);


module.exports = Contacto;