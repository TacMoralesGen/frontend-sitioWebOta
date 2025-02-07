import { FaHome, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const PanelCabins = ({ cabins }) => {
  const getStatusInfo = (status) => {
    switch (status) {
      case "disponible":
        return { color: "bg-success", icon: <FaCheckCircle /> };
      case "reservada":
        return { color: "bg-warning", icon: <FaClock /> };
      case "ocupada":
        return { color: "bg-danger", icon: <FaTimesCircle /> };
      default:
        return { color: "bg-secondary", icon: <FaHome /> };
    }
  };

  return (
    <section className="container mt-4">
      <h2 className="text-center mb-4">Estado de las Cabañas</h2>
      <div className="row g-3">
        {cabins.map((cabin, index) => {
          const { color, icon } = getStatusInfo(cabin.status);
          return (
            <div key={index} className="col-md-4">
              <div
                className={`card text-white ${color} p-3 shadow d-flex flex-row align-items-center`}
              >
                <div className="me-3">
                  <FaHome className="text-white" style={{ fontSize: "4rem" }} />
                </div>
                <div>
                  <h5 className="card-title">{cabin.name}</h5>
                  <p className="card-text">{cabin.description}</p>
                  <p className="fw-bold">
                    Capacidad: {cabin.capacity} personas
                  </p>
                  <span className="badge bg-light text-dark">{icon}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PanelCabins;
