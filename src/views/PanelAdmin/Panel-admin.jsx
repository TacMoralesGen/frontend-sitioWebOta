import { useState } from "react";
import "./Panel-admin.css";
import PanelHeader from "../../components/Panel-admin/Panel-header/Panel-header.jsx";
import PanelReservation from "../../components/Panel-admin/Panel-reservation/Panel-reservation.jsx";
import PanelSidebar from "../../components/Panel-admin/Panel-sidebar/Panel-sidebar.jsx";
import PanelCabins from "../../components/Panel-admin/Panel-Cabins/Panel-Cabins.jsx";
import PanelDashboard from "../../components/Panel-admin/Panel-dashboard/Panel-dashboard.jsx";

const PanelAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeSection, setActiveSection] = useState("Reservas");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="app-container">
      <PanelSidebar setActiveSection={setActiveSection} />
      <div className="main-content d-flex flex-column">
        <PanelHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filter={filter}
          setFilter={setFilter}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        {activeSection === "Dashboard" &&
        <PanelDashboard />}

        {activeSection === "Reservas" &&
        <PanelReservation
          searchTerm={searchTerm}
          filter={filter}
          startDate={startDate}
          endDate={endDate}
        />}
        
        {activeSection === "Cabañas" &&
        <PanelCabins
        />}
      </div>
    </div>
  );
};

export default PanelAdmin;
