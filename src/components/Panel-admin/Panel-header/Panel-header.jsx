import PropTypes from "prop-types";

const PanelHeader = ({ searchTerm, setSearchTerm, filter, setFilter }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 shadow container-fluid w-100 mb-3">
      <h1 className="navbar-brand">Reservaciones</h1>
      <div className="d-flex ms-auto gap-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="confirmado">Confirmado</option>
          <option value="cancelado">Cancelado</option>
        </select>
        <button className="btn btn-outline-success">Perfil</button>
      </div>
    </nav>
  );
};

PanelHeader.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default PanelHeader;
