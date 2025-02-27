import { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import "./Panel-dashboard.css";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);

// useEffect(() => {
// fetch('/api/reservas')
// .then(response => response.json())
// .then(data => {
// Aquí puedes actualizar el estado con los datos obtenidos
// setReservasData(data);
// });
// }, []);

const PanelDashboard = () => {
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Datos para los gráficos
  const reservasData = {
    labels: ["Confirmadas", "Canceladas", "Pendientes", "Finalizadas"],
    datasets: [
      {
        data: [12, 5, 2, 3],
        backgroundColor: ["#28a745", "#dc3545", "#ffc107", "secondary"],
      },
    ],
  };

  const ocupacionData = {
    labels: ["Tiny Lodge", "Couple Room"],
    datasets: [
      {
        label: "Ocupación",
        data: [15, 5],
        backgroundColor: ["#f39c12", "#3498db"],
      },
    ],
  };

  const ingresosData = {
    labels: ["Mes Actual", "Mes Anterior"],
    datasets: [
      {
        label: "Ingresos",
        data: [5000, 4500],
        backgroundColor: ["#27ae60", "#3498db"],
      },
    ],
  };

  const handleChartClick = (event, chartElement, dataType) => {
    const element = chartElement[0];
    if (element) {
      const index = element.index;
      const label = reservasData.labels[index];
      setModalData(`Datos de ${label} para ${dataType}`);
      setShowModal(true);
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        {/* Resumen de Reservaciones */}
        <Col md={6} className="d-flex">
          <Card className="dashboard-card w-100">
            <Card.Body>
              <Card.Title>Resumen de Reservaciones 📆</Card.Title>
              <Doughnut
                data={reservasData}
                onElementsClick={(elems) =>
                  handleChartClick(null, elems, "Reservaciones")
                }
              />
            </Card.Body>
          </Card>
        </Col>

        {/* Ocupación de Cabañas */}
        <Col md={6} className="d-flex">
          <Card className="dashboard-card w-100">
            <Card.Body>
              <Card.Title>Ocupación de las Cabañas 🏡</Card.Title>
              <Bar
                data={ocupacionData}
                onElementsClick={(elems) =>
                  handleChartClick(null, elems, "Ocupación")
                }
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        {/* Ingresos Estimados */}
        <Col md={6} className="d-flex">
          <Card className="dashboard-card w-100">
            <Card.Body>
              <Card.Title>Ingresos Estimados 💰</Card.Title>
              <Bar
                data={ingresosData}
                onElementsClick={(elems) =>
                  handleChartClick(null, elems, "Ingresos")
                }
              />
            </Card.Body>
          </Card>
        </Col>

        {/* Actividad Reciente */}
        <Col md={6} className="d-flex">
          <Card className="dashboard-card w-100">
            <Card.Body>
              <Card.Title>Actividad Reciente 🔔</Card.Title>
              <ul>
                <li>Última reserva: 23 de Febrero</li>
                <li>Próximo check-in: 25 de Febrero</li>
                <li>Último check-out: 22 de Febrero</li>
              </ul>
              <Button variant="primary text-white">Ver más</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para mostrar detalles de los gráficos */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de {modalData}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Información detallada sobre {modalData}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PanelDashboard;
