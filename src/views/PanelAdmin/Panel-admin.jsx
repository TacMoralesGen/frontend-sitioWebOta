import { useState } from "react";
import "./Panel-admin.css";
import PanelReservation from "../../components/Panel-admin/Panel-reservation/Panel-reservation.jsx";
import PanelSidebar from "../../components/Panel-admin/Panel-sidebar/Panel-sidebar.jsx";
import PanelCabins from "../../components/Panel-admin/Panel-Cabins/Panel-Cabins.jsx";
import PanelDashboard from "../../components/Panel-admin/Panel-dashboard/Panel-dashboard.jsx";

const PanelAdmin = () => {
  const [activeSection, setActiveSection] = useState("Reservas");

  return (
    <div className="app-container">
      <PanelSidebar setActiveSection={setActiveSection} />
      <div className="main-content d-flex flex-column p-0">
        {activeSection === "Dashboard" &&
        <PanelDashboard />}
        {activeSection === "Reservas" &&
        <PanelReservation/>}
        {activeSection === "Cabañas" &&
        <PanelCabins
        />}
      </div>
    </div>
  );
};

export default PanelAdmin;
