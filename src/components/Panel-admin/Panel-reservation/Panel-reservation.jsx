import PropTypes from "prop-types";

const PanelReservation = ({ searchTerm, filter }) => {
  const reservations = [
    {
      guest: "Carlos Sánchez",
      cabin: "Tiny Cabin",
      duration: "3 días",
      dateRange: "14-16 Febrero, 2025",
      status: "Pendiente",
    },
    {
      guest: "Ana Rodríguez",
      cabin: "Couple Room",
      duration: "2 días",
      dateRange: "18-19 Marzo, 2025",
      status: "Confirmado",
    },
    {
      guest: "Luis Pérez",
      cabin: "Tiny Cabin",
      duration: "4 días",
      dateRange: "05-08 Abril, 2025",
      status: "Confirmado",
    },
    {
      guest: "Sofía Gómez",
      cabin: "Couple Room",
      duration: "5 días",
      dateRange: "10-14 Mayo, 2025",
      status: "Pendiente",
    },
    {
      guest: "Marcos Díaz",
      cabin: "Tiny Cabin",
      duration: "6 días",
      dateRange: "20-25 Junio, 2025",
      status: "Pendiente",
    },
    {
      guest: "Laura Martínez",
      cabin: "Couple Room",
      duration: "3 días",
      dateRange: "12-14 Julio, 2025",
      status: "Cancelado",
    },
    {
      guest: "Juan Fernández",
      cabin: "Tiny Cabin",
      duration: "2 días",
      dateRange: "01-02 Agosto, 2024",
      status: "Finalizado",
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
                          : res.status === "Finalizado"
                          ? "bg-secondary"
                          : "bg-danger"
                      }`}
                    >
                      {res.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary">Ver Más</button>
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
