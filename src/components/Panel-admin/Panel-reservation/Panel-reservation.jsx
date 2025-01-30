import PropTypes from "prop-types";

const PanelReservation = ({ searchTerm, filter }) => {
  const reservations = [
    {
      guest: "Ejemplo",
      cabin: "Cabaña 1",
      duration: "3 días",
      dateRange: "02-14 Enero, 2025",
      status: "Pendiente",
    },
    {
      guest: "Ejemplo",
      cabin: "Cabaña 1",
      duration: "3 días",
      dateRange: "02-14 Enero, 2025",
      status: "Confirmado",
    },
    {
      guest: "Ejemplo",
      cabin: "Cabaña 1",
      duration: "3 días",
      dateRange: "02-14 Enero, 2025",
      status: "Confirmado",
    },
    {
      guest: "Ejemplo",
      cabin: "Cabaña 1",
      duration: "3 días",
      dateRange: "02-14 Enero, 2025",
      status: "Pendiente",
    },
    {
      guest: "Ejemplo",
      cabin: "Cabaña 1",
      duration: "3 días",
      dateRange: "02-14 Enero, 2025",
      status: "Pendiente",
    },
    {
      guest: "Ejemplo",
      cabin: "Cabaña 1",
      duration: "3 días",
      dateRange: "02-14 Enero, 2025",
      status: "Cancelado",
    },
  ];

  return (
    <section className="container-fluid mt-4">
      <div className="table-responsive">
        <table className="table table-hover table-striped w-100">
          <thead className="table-success">
            <tr>
              <th>Huésped</th>
              <th>Cabaña</th>
              <th>Duración</th>
              <th>Fechas</th>
              <th>Status</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {reservations
              .filter(
                (res) =>
                  res.status.toLowerCase().includes(filter) || filter === "all"
              )
              .filter((res) =>
                res.guest.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((res, index) => (
                <tr key={index}>
                  <td>{res.guest}</td>
                  <td>{res.cabin}</td>
                  <td>{res.duration}</td>
                  <td>{res.dateRange}</td>
                  <td>
                    <span
                      className={`badge ${
                        res.status === "Pendiente"
                          ? "bg-warning"
                          : res.status === "Confirmado"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {res.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary">Editar</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

PanelReservation.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
};

export default PanelReservation;
