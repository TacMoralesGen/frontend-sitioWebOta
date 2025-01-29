import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo1 from "./../../assets/images/logo_CHELENKO-Top-bar-Black-1024x311.webp";
import logo2 from "./../../assets/images/logo_CHELENKO-Top-bar-1024x311.webp";
import "./Navbar.css";
import { Tooltip } from "bootstrap";

const Navbar = (props) => {
  //activar tooltips de bootstrap
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
  );

  // eslint-disable-next-line react/prop-types
  const { isUponBanner } = props;
  const [navbarTrans, setNavbarTrans] = useState(true); // Estado para determinar si la navbar está transparente o no

  // Efecto para manejar el scroll
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY < 60) {
        setNavbarTrans(true); // Navbar transparente si el scroll es menor a 60
      } else {
        setNavbarTrans(false); // Navbar con color si el scroll es mayor a 60
      }
    };

    // Añadimos el evento de scroll
    window.addEventListener("scroll", checkScroll);

    // Limpiamos el evento al desmontar el componente
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []); // Este efecto se ejecuta solo una vez cuando el componente se monta

  // Condicional para cambiar las clases dependiendo del estado de navbarTrans y isUponBanner
  let classForHeader = `navbar navbar-expand-lg ${
    navbarTrans ? "" : "navbar-scrolled"
  }`;
  let classLeftNav = `collapse navbar-collapse left-nav flex-lg-grow-0 order-1 order-lg-0 ${
    navbarTrans ? "navbar-dark" : ""
  }`;
  let classLogo1 = `logo-1 ${navbarTrans ? "d-none" : ""}`;
  let classLogo2 = `logo-2 ${navbarTrans ? "" : "d-none"}`;
  let classBtnContact = `btn ${
    navbarTrans ? "btn-outline-light" : "btn-outline-grey"
  }`;
  let classCartText = `nav-item text-nowrap d-flex ${
    navbarTrans ? "text-light" : ""
  }`;
  let classTogglerIcon = `navbar-toggler-icon ${
    navbarTrans ? "" : "black-navbar-toggler-icon"
  }`;

  // Si estamos sobre el banner (según isUponBanner), agregamos clases específicas
  if (isUponBanner) {
    classForHeader += " fixed-top";
  } else {
    classForHeader += " sticky-top";
  }
  return (
    <header className={classForHeader}>
      <nav className="width-90 d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap">
        <section id="left-nav" className={classLeftNav}>
          <ul className="navbar-nav">
            <li className="nav-item px-0 mx-2">
              <Link className="nav-link px-2 ms-lg-0 " to="#">
                Inicio
              </Link>
            </li>
            <li className="nav-item px-0 mx-2 dropdown">
              <Link
                className="nav-link px-2 dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Nosotros
              </Link>
              <ul className="dropdown-menu rounded-0">
                <li>
                  <Link className="dropdown-item" to="#">
                    Acerca de Chelenko
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Testimonios
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Galería
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item px-0 mx-2 dropdown">
              <Link
                className="nav-link px-2 dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                La Ubicación
              </Link>
              <ul className="dropdown-menu rounded-0">
                <li>
                  <Link className="dropdown-item" to="#">
                    Lago General Carrera - Patagonia Chilena
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Atracciones Turísticas
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item px-0 mx-2 dropdown">
              <Link
                className="nav-link px-2 dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                La Experiencia
              </Link>
              <ul className="dropdown-menu rounded-0">
                <li>
                  <Link className="dropdown-item" to="#">
                    Nuestras Cabañas
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Actividades
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <section className="d-flex align-items-center justify-content-between flex-nowrap flex-grow-1 flex-lg-grow-0 flex-xl-grow-1">
          <button
            id="navbar-toggler"
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#left-nav"
            aria-controls="left-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span id="toggler-icon" className={classTogglerIcon}></span>
          </button>
          <section className="px-2 d-xxs-block d-lg-none d-xl-block d-flex m-auto">
            <Link className="navbar-brand mx-0" to="#">
              <img className={classLogo1} src={logo1} alt="Logo Chelenko" />
              <img className={classLogo2} src={logo2} alt="Logo Chelenko" />
            </Link>
          </section>
          <section id="right-nav" className="navbar px-0">
            <ul className="navbar-nav ms-auto d-flex flex-nowrap flex-row">
              <li className="nav-item me-2">
                <Link
                  id="navbar-btn-reserve"
                  className="btn btn-primary"
                  to="./reservar"
                >
                  Reservar
                </Link>
              </li>
              <li className="nav-item me-4 d-none d-lg-block">
                <Link
                  id="navbar-btn-contact"
                  className={classBtnContact}
                  to="#"
                >
                  Contáctanos
                </Link>
              </li>
              <li className="vr me-lg-4 me-2"></li>
              <li id="cart-text" className={classCartText}>
                <span className="me-2 d-none d-lg-block align-content-center">
                  Carrito / <strong className="cart-price">$0</strong>
                </span>
                <Link
                  to="./cart"
                  className="bag-icon"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  data-bs-title="No tiene reserva en el carrito"
                >
                  <strong> 0 </strong>
                </Link>
              </li>
            </ul>
          </section>
        </section>
      </nav>
    </header>
  );
};

export default Navbar;
