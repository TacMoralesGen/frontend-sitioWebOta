import { useState } from "react";
import PropTypes from "prop-types";
import { FaHome, FaClipboardList, FaBed } from "react-icons/fa";

const PanelSidebar = ({ setActiveSection }) => {
  const [active, setActive] = useState("Reservaciones");

  const handleClick = (section) => {
    setActive(section);
    setActiveSection(section);
  };

  return (
    <div
      className="d-flex flex-column bg-primary text-white vh-100 p-3 position-fixed"
      style={{ width: "250px" }}
    >
      <h2 className="text-center mb-4">Chelenko Lodge</h2>
      <ul className="nav flex-column">
        {[
          { name: "Dashboard", icon: <FaHome /> },
          { name: "Reservaciones", icon: <FaClipboardList /> },
          { name: "Cabañas", icon: <FaBed /> },
        ].map((item) => (
          <li key={item.name} className="nav-item">
            <button
              className={`btn btn-outline-light d-flex align-items-center w-100 text-start p-2 mb-2 ${
                active === item.name ? "active bg-success" : ""
              }`}
              onClick={() => handleClick(item.name)}
            >
              {item.icon} <span className="ms-2">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PanelSidebar.propTypes = {
  setActiveSection: PropTypes.func.isRequired,
};

export default PanelSidebar;
