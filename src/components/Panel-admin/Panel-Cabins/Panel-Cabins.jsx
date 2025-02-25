/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaHome, FaCheckCircle, FaTimesCircle, FaClock, FaEdit, FaPlus } from "react-icons/fa";

// Importamos la función para crear cabaña
// import { createCabin } from "../../../../api.admin";

function PanelCabins({ cabins: initialCabins = [] }) {
  const [cabins, setCabins] = useState(initialCabins);

  // Estado para mostrar u ocultar el modal de "Editar Cabaña"
  const [showEditModal, setShowEditModal] = useState(false);
  // Estado para mostrar u ocultar el modal de "Agregar Cabaña"
  const [showAddModal, setShowAddModal] = useState(false);
  // Estado para la cabaña que se va a editar
  const [currentCabin, setCurrentCabin] = useState(null);

  // Estado local para los campos de la nueva cabaña
  const [newCabin, setNewCabin] = useState({
    name: "",
    description: "",
    capacity: 0,
    status: "Disponible",
  });

  // Helper para determinar color e icono según status
  const getStatusInfo = (status) => {
    switch (status) {
      case "Disponible":
        return { color: "bg-success", icon: <FaCheckCircle /> };
      case "Reservada":
        return { color: "bg-secondary", icon: <FaClock /> };
      case "Ocupada":
        return { color: "bg-danger", icon: <FaTimesCircle /> };
      default:
        return { color: "bg-secondary", icon: <FaHome /> };
    }
  };

  // Abre el modal de edición y guarda la cabaña en currentCabin
  const handleEditClick = (cabin) => {
    setCurrentCabin(cabin);
    setShowEditModal(true);
  };

  // Guardar cambios de la cabaña editada (en el front). Podrías hacer un PUT al backend aquí.
  const handleSaveEdit = () => {
    const updatedCabins = cabins.map((cabin) =>
      cabin.id === currentCabin.id ? currentCabin : cabin
    );
    setCabins(updatedCabins);
    setShowEditModal(false);

    // Si quisieras guardar en el backend, deberías llamar a algo como:
    // updateCabin(currentCabin.id, currentCabin)
    //   .then(() => { ... })
    //   .catch((error) => { ... });
  };

  // Se llama al presionar "Agregar" en el modal de nueva cabaña
  const handleAddCabin = async () => {
    // try {
    //   // 1. Llamamos a la API
    //   const data = await createCabin(newCabin);
    //   // 2. Si todo va bien, 'data' debería tener algo como { message: "...", cabin: {...} }
    //   if (data && data.cabin) {
    //     // 3. Actualizamos el estado local agregando la cabaña nueva
    //     setCabins([...cabins, data.cabin]);
    //     // 4. Cerramos el modal y reseteamos el formulario
    //     setShowAddModal(false);
    //     setNewCabin({
    //       name: "",
    //       description: "",
    //       capacity: 0,
    //       status: "Disponible",
    //     });
    //     alert("Cabaña agregada correctamente");
    //   }
    // } catch (error) {
    //   // Manejo de error: puede ser un error del servidor o de conexión
    //   alert("Error al agregar cabaña: " + error.message);
    // }
  };

  return (
    <section className="container mt-4">
      <h2 className="text-center mb-4">Estado de las Cabañas</h2>
      <div className="row g-3">
        {cabins.map((cabin, index) => {
          const { color, icon } = getStatusInfo(cabin.status);
          return (
            <div key={index} className="col-md-3 col-sm-6">
              <div
                className={`card text-white ${color} p-2 shadow d-flex flex-row align-items-center`}
              >
                <div className="me-2">
                  <FaHome
                    className="text-white"
                    style={{ fontSize: "2.5rem" }}
                  />
                </div>
                <div>
                  <h5 className="card-title mb-1" style={{ fontSize: "1rem" }}>
                    {cabin.name}
                  </h5>
                  <p className="card-text mb-1" style={{ fontSize: "0.9rem" }}>
                    {cabin.description}
                  </p>
                  <p className="fw-bold mb-1" style={{ fontSize: "0.9rem" }}>
                    Capacidad: {cabin.capacity} personas
                  </p>
                  <span
                    className="badge bg-light text-dark"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {icon}
                  </span>
                </div>
                <button
                  className="btn btn-sm btn-light ms-auto"
                  onClick={() => handleEditClick(cabin)}
                >
                  <FaEdit />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-4">
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <FaPlus /> Agregar Cabaña
        </Button>
      </div>

      {/*
        MODAL PARA EDITAR
      */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cabaña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentCabin && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={currentCabin.name}
                  onChange={(e) =>
                    setCurrentCabin({ ...currentCabin, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  value={currentCabin.description}
                  onChange={(e) =>
                    setCurrentCabin({ ...currentCabin, description: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Capacidad</Form.Label>
                <Form.Control
                  type="number"
                  value={currentCabin.capacity}
                  onChange={(e) =>
                    setCurrentCabin({
                      ...currentCabin,
                      capacity: parseInt(e.target.value, 10),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  value={currentCabin.status}
                  onChange={(e) =>
                    setCurrentCabin({ ...currentCabin, status: e.target.value })
                  }
                >
                  <option value="Disponible">Disponible</option>
                  <option value="Reservada">Reservada</option>
                  <option value="Ocupada">Ocupada</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/*
        MODAL PARA AGREGAR
      */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Cabaña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de la cabaña"
                value={newCabin.name}
                onChange={(e) =>
                  setNewCabin({ ...newCabin, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción de la cabaña"
                value={newCabin.description}
                onChange={(e) =>
                  setNewCabin({ ...newCabin, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Capacidad</Form.Label>
              <Form.Control
                type="number"
                placeholder="Capacidad"
                value={newCabin.capacity}
                onChange={(e) =>
                  setNewCabin({ ...newCabin, capacity: parseInt(e.target.value, 10) })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                value={newCabin.status}
                onChange={(e) =>
                  setNewCabin({ ...newCabin, status: e.target.value })
                }
              >
                <option value="Disponible">Disponible</option>
                <option value="Reservada">Reservada</option>
                <option value="Ocupada">Ocupada</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddCabin}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default PanelCabins;
