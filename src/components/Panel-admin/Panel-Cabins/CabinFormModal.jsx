import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const CabinFormModal = ({ show, handleClose, createCabin }) => {
  const [cabin, setCabin] = useState({
    typeName: 'Tiny Cabin',
    number: '',
    statusCabin: 'Activa',
    statusHotTub: 'Activa',
    maxAdults: 1,
    maxChildrens: 0,
    capacity: 1,
    priceHotTubPerInstance: 0,
    pricePerNight: 0,
    amenities: [
      "Aire Acondicionado",
      "Baño Privado (Ducha, Secador de pelo)",
      "Tinaja Caliente (costo adicional por uso)",
      "Toallas",
      "Estacionamiento Gratuito",
    ],
    size: 0,
    bedType: '',
    img: ''
  });

  const [newAmenity, setNewAmenity] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCabin(prevCabin => ({
      ...prevCabin,
      [name]: value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setCabin(prevCabin => ({
      ...prevCabin,
      [name]: Number(value)
    }));
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() !== '') {
      setCabin(prevCabin => ({
        ...prevCabin,
        amenities: [...prevCabin.amenities, newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (index) => {
    setCabin(prevCabin => ({
      ...prevCabin,
      amenities: prevCabin.amenities.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    // Update capacity based on adults and children
    const updatedCabin = {
      ...cabin,
      capacity: cabin.maxAdults + cabin.maxChildrens
    };
    createCabin(updatedCabin);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Agregar Cabaña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de Cabaña</Form.Label>
                <Form.Select 
                  name="typeName"
                  value={cabin.typeName}
                  onChange={handleChange}
                >
                  <option value="Tiny Cabin">Tiny Cabin</option>
                  <option value="Couple Room">Couple Room</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Número de Cabaña</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Ej: A-01" 
                  name="number"
                  value={cabin.number}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Estado de Cabaña</Form.Label>
                <Form.Select 
                  name="statusCabin"
                  value={cabin.statusCabin}
                  onChange={handleChange}
                >
                  <option value="Activa">Activa</option>
                  <option value="Inactiva">Inactiva</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Estado de Tinaja Caliente</Form.Label>
                <Form.Select 
                  name="statusHotTub"
                  value={cabin.statusHotTub}
                  onChange={handleChange}
                >
                  <option value="Activa">Activa</option>
                  <option value="Inactiva">Inactiva</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Máximo Adultos</Form.Label>
                <Form.Control 
                  type="number" 
                  min="1"
                  name="maxAdults"
                  value={cabin.maxAdults}
                  onChange={handleNumberChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Máximo Niños</Form.Label>
                <Form.Control 
                  type="number" 
                  min="0"
                  name="maxChildrens"
                  value={cabin.maxChildrens}
                  onChange={handleNumberChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Capacidad Total</Form.Label>
                <Form.Control 
                  type="number" 
                  value={cabin.maxAdults + cabin.maxChildrens}
                  disabled
                />
                <Form.Text className="text-muted">
                  Suma automática de adultos y niños
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Precio por Noche ($)</Form.Label>
                <Form.Control 
                  type="number" 
                  min="0"
                  name="pricePerNight"
                  value={cabin.pricePerNight}
                  onChange={handleNumberChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Precio de Tinaja Caliente por Uso ($)</Form.Label>
                <Form.Control 
                  type="number" 
                  min="0"
                  name="priceHotTubPerInstance"
                  value={cabin.priceHotTubPerInstance}
                  onChange={handleNumberChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tamaño (m²)</Form.Label>
                <Form.Control 
                  type="number" 
                  min="0"
                  name="size"
                  value={cabin.size}
                  onChange={handleNumberChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de Cama</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Ej: King Size, Queen Size"
                  name="bedType"
                  value={cabin.bedType}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>URL de Imagen</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="URL de la imagen de la cabaña"
              name="img"
              value={cabin.img}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amenidades</Form.Label>
            <div className="d-flex mb-2">
              <Form.Control 
                type="text" 
                placeholder="Nueva amenidad"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
              />
              <Button 
                variant="outline-secondary" 
                onClick={handleAddAmenity}
                className="ms-2"
              >
                Agregar
              </Button>
            </div>
            <div className="border p-2 rounded" style={{maxHeight: '150px', overflowY: 'auto'}}>
              {cabin.amenities.map((amenity, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-1 p-1 border-bottom">
                  <span>{amenity}</span>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleRemoveAmenity(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar Cabaña
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CabinFormModal;