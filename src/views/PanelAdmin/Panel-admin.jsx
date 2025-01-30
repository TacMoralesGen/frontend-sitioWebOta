import { useState } from "react";
import "./Panel-admin.css";
import PanelHeader from "../../components/Panel-admin/Panel-header/Panel-header.jsx";
import PanelReservation from "../../components/Panel-admin/Panel-reservation/Panel-reservation.jsx";
import PanelSidebar from "../../components/Panel-admin/Panel-sidebar/Panel-sidebar.jsx";
import PanelCabins from "../../components/Panel-admin/Panel-Cabins/Panel-Cabins.jsx";

const PanelAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeSection, setActiveSection] = useState("Reservaciones");
  const cabinsData = [
    {
      name: "Tiny Cabin 1",
      description: "Frente al lago",
      status: "disponible",
      capacity: 4,
    },
    {
      name: "Tiny Cabin 2",
      description: "Incluye Tinaja",
      status: "reservada",
      capacity: 2,
    },
    {
      name: "Tiny Cabin 3",
      description: "Incluye Tinaja",
      status: "ocupada",
      capacity: 6,
    },
    {
      name: "Couple Room 1",
      description: "Frente al lago",
      status: "ocupada",
      capacity: 6,
    },
    {
      name: "Couple Room 2",
      description: "Frente al lago",
      status: "disponible",
      capacity: 6,
    },
    {
      name: "Couple Room 3",
      description: "Frente al lago",
      status: "reservada",
      capacity: 6,
    },
  ];

  return (
    <div className="app-container">
      <PanelSidebar setActiveSection={setActiveSection} />
      <div className="main-content d-flex flex-column">
        <PanelHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filter={filter}
          setFilter={setFilter}
        />
        {activeSection === "Reservaciones" && (
          <PanelReservation searchTerm={searchTerm} filter={filter} />
        )}
        {activeSection === "Cabañas" && <PanelCabins cabins={cabinsData} />}
      </div>
    </div>
  );
};

export default PanelAdmin;
