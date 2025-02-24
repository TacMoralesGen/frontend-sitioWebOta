const Cabin = require("../models/cabin.model");

const createNewCabin = async (req, res) => {
    try {

        const newCabin = await Cabin.create(req.body);

        res.status(201).json({
            message: "Se creo con exito un nuevo tipo de cabina",
            cabin: newCabin
        });
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error al crear la cabina",
            error: error.message
        });
    }
};

const getAllCabins = async (req, res) => {
    try {
        const cabins = await Cabin.find();
        res.status(200).json({
            cabins
        });
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error al obtener las cabinas",
            error: error.message
        });
    }
};

module.exports = { createNewCabin,getAllCabins };