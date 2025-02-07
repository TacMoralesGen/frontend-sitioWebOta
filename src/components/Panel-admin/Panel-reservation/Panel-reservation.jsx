/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaSort } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year.slice(-2)}`;
};

const PanelReservation = ({ searchTerm, filter, startDate, endDate }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const reservations = [
    { id: 101, guest: "Carlos Sánchez", cabin: "Tiny Cabin", checkIn: "2025-02-14", checkOut: "2025-02-16", status: "Pendiente" },
    { id: 102, guest: "Ana Rodríguez", cabin: "Couple Room", checkIn: "2025-03-18", checkOut: "2025-03-19", status: "Confirmado" },
    { id: 103, guest: "Luis Pérez", cabin: "Tiny Cabin", checkIn: "2025-04-05", checkOut: "2025-04-08", status: "Confirmado" },
    { id: 104, guest: "Sofía Gómez", cabin: "Couple Room", checkIn: "2025-05-10", checkOut: "2025-05-14", status: "Pendiente" },
    { id: 105, guest: "Marcos Díaz", cabin: "Tiny Cabin", checkIn: "2025-06-20", checkOut: "2025-06-25", status: "Pendiente" },
    { id: 106, guest: "Laura Martínez", cabin: "Couple Room", checkIn: "2025-07-12", checkOut: "2025-07-14", status: "Cancelado" },
    { id: 107, guest: "Juan Fernández", cabin: "Tiny Cabin", checkIn: "2024-08-01", checkOut: "2024-08-02", status: "Finalizado" },
  ];

  const handleSort = (column) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
  };

  const filteredReservations = reservations
    .filter((res) => filter === "all" ? true : res.status.toLowerCase() === filter.toLowerCase())
    .filter((res) => res.guest.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((res) => {
      if (!startDate || !endDate) return true;
      const checkInDate = new Date(res.checkIn);
      return checkInDate >= startDate && checkInDate <= endDate;
    });

  const getSortedReservations = () => {
    if (!sortColumn) return filteredReservations;
    return [...filteredReservations].sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];
      
      if (sortColumn === "checkIn" || sortColumn === "checkOut") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  const sortedReservations = getSortedReservations();

  return (
    <section className="container-fluid mt-4">
      <div className="table-responsive">
        <table className="table table-hover table-striped w-100">
          <thead className="table-success">
            <tr>
              <th onClick={() => handleSort("guest")}>Huésped <FaSort /></th>
              <th onClick={() => handleSort("id")}>ID <FaSort /></th>
              <th onClick={() => handleSort("cabin")}>Cabaña <FaSort /></th>
              <th onClick={() => handleSort("checkIn")}>Check-In <FaSort /></th>
              <th onClick={() => handleSort("checkOut")}>Check-Out <FaSort /></th>
              <th onClick={() => handleSort("status")}>Status <FaSort /></th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {sortedReservations.map((res, index) => (
              <tr key={index}>
                <td>{res.guest}</td>
                <td>{res.id}</td>
                <td>{res.cabin}</td>
                <td>{formatDate(res.checkIn)}</td>
                <td>{formatDate(res.checkOut)}</td>
                <td>
                  <span className={`badge ${
                    res.status === "Pendiente" ? "bg-warning" :
                    res.status === "Confirmado" ? "bg-success" :
                    res.status === "Finalizado" ? "bg-secondary" : "bg-danger"
                  }`}>
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

export default PanelReservation;

