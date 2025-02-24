const AdminCabin = require("../models/adminCabin.model");

// Crear una nueva cabaña
const createNewAdminCabin = async (req, res) => {
  try {
    const { name, description, capacity, status } = req.body;

    // Crea el documento en la colección "admincabins"
    const newAdminCabin = await AdminCabin.create({
      name,
      description,
      capacity,
      status,
    });

    return res.status(201).json({
      message: "Cabaña creada con éxito",
      cabin: newAdminCabin,
    });
  } catch (error) {
    console.error("Error al crear la cabaña:", error);
    return res.status(500).json({
      message: "Hubo un error al crear la cabaña",
      error: error.message,
    });
  }
};

// (Opcional) Obtener todas las cabañas
const getAllCabins = async (req, res) => {
  try {
    const cabins = await AdminCabin.find({});
    return res.status(200).json(cabins);
  } catch (error) {
    console.error("Error al obtener cabañas:", error);
    return res.status(500).json({
      message: "Hubo un error al obtener las cabañas",
      error: error.message,
    });
  }
};

// (Opcional) Actualizar una cabaña por ID
const updateCabinById = async (req, res) => {
  try {
    const { id } = req.params; // el id vendría en la ruta, ej: /admin/cabin/:id
    const { name, description, capacity, status } = req.body;

    const updatedCabin = await AdminCabin.findByIdAndUpdate(
      id,
      { name, description, capacity, status },
      { new: true } // Retorna el documento actualizado
    );

    if (!updatedCabin) {
      return res.status(404).json({ message: "Cabaña no encontrada" });
    }

    return res.status(200).json({
      message: "Cabaña actualizada con éxito",
      cabin: updatedCabin,
    });
  } catch (error) {
    console.error("Error al actualizar la cabaña:", error);
    return res.status(500).json({
      message: "Error al actualizar la cabaña",
      error: error.message,
    });
  }
};

// (Opcional) Eliminar una cabaña por ID
const deleteCabinById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCabin = await AdminCabin.findByIdAndDelete(id);

    if (!deletedCabin) {
      return res.status(404).json({ message: "Cabaña no encontrada" });
    }

    return res.status(200).json({
      message: "Cabaña eliminada con éxito",
      cabin: deletedCabin,
    });
  } catch (error) {
    console.error("Error al eliminar la cabaña:", error);
    return res.status(500).json({
      message: "Error al eliminar la cabaña",
      error: error.message,
    });
  }
};

module.exports = {
  createNewAdminCabin,
  getAllCabins,
  updateCabinById,
  deleteCabinById,
};