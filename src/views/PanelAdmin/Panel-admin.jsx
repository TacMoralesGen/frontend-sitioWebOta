import { useState } from "react";
import "./Panel-admin.css";
import PanelHeader from "../../components/Panel-admin/Panel-header/Panel-header.jsx";
import PanelReservation from "../../components/Panel-admin/Panel-reservation/Panel-reservation.jsx";
import PanelSidebar from "../../components/Panel-admin/Panel-sidebar/Panel-sidebar.jsx";

const PanelAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeSection, setActiveSection] = useState("Reservaciones");

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
      </div>
    </div>
  );
};

export default PanelAdmin;
