const express = require("express");
const router = express.Router();

const { createNewContact, getAllContacts } = require("../controllers/contacto.controllers");
const { createNewReservationCabin, getAllReservationCabins } = require("../controllers/reservationCabin.controllers")
const { createNewPayment, getAllPayments } = require("../controllers/payment.controllers")
const { createNewReservation, getAllReservations, getReservedDates } = require ("../controllers/reservation.controllers")
const { createNewCabin, getAllCabins } = require ("../controllers/cabin.controllers");
const {createNewAdminCabin} = require("../controllers/adminCabin.controllers");

// Crear nuevo contacto
router.post("/contacto", createNewContact);
// Obtener todos los contactos
router.get("/contactos", getAllContacts);


router.post("/api/reservationCabin", createNewReservationCabin);
router.get("/api/reservationCabins", getAllReservationCabins);


router.post("/api/payment", createNewPayment);
router.get("/api/payments", getAllPayments);


router.post("/create/reservation", createNewReservation);
router.get("/all/reservations", getAllReservations);
router.get("/reservations/fechas", getReservedDates)


router.post("/api/cabin", createNewCabin);
router.get("/api/cabins", getAllCabins);

router.post("/admin/cabin", createNewAdminCabin);
router.get("/admin/cabin", getAllCabins);








module.exports = {router};