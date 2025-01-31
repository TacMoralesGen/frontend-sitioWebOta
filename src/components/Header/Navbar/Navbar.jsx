import { useState } from "react";
import { Link } from "react-router-dom";
import logo1 from "./../../../assets/images/logo_CHELENKO-Top-bar-Black-1024x311.webp";
import logo2 from "./../../../assets/images/logo_CHELENKO-Top-bar-1024x311.webp";
import "./Navbar.css";
import { Tooltip } from "bootstrap";

// eslint-disable-next-line react/prop-types
const Navbar = ({ isUponBanner }) => {
  //activar tooltips de bootstrap
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
  );

  let classForNav;
  let classLeftNav;
  let classLogo1;
  let classLogo2;
  let classBtnContact;
  let classCartText;
  let classTogglerIcon;

  const changeColors = (navbarTrans) => {
    console.log(
      `cambiando colores: ${
        navbarTrans ? "modo transparente" : "con fondo blanco"
      }`
    );
    // Condicional para cambiar las clases dependiendo del estado de navbarTrans y isUponBanner
    classForNav = `navbar navbar-expand-lg width-90 fixed-top justify-content-between ${
      navbarTrans ? "" : "navbar-scrolled"
    }`;
    classLeftNav = `collapse navbar-collapse left-nav flex-lg-grow-0 order-1 order-lg-0 ${
      navbarTrans ? "navbar-dark" : ""
    }`;
    classLogo1 = `logo-1 ${navbarTrans ? "d-none" : ""}`;
    classLogo2 = `logo-2 ${navbarTrans ? "" : "d-none"}`;
    classBtnContact = `btn ${
      navbarTrans ? "btn-outline-light" : "btn-outline-grey"
    }`;
    classCartText = `nav-item text-nowrap d-flex ${
      navbarTrans ? "text-light" : ""
    }`;
    classTogglerIcon = `navbar-toggler-icon ${
      navbarTrans ? "" : "black-navbar-toggler-icon"
    }`;
    console.log(
      `Termine de definir los colores: ${
        navbarTrans ? "modo transparente" : "con fondo blanco"
      }`
    );
  };
  const [navbarTrans, setNavbarTrans] = useState(isUponBanner); // Estado para determinar si la navbar está transparente o no
  console.log("Primera vez mostrando navbarTrans" + navbarTrans);
  changeColors(navbarTrans);

  const checkScroll = () => {
    if (window.scrollY < 60) {
      setNavbarTrans(true); // Navbar transparente si el scroll es menor a 60
    } else {
      setNavbarTrans(false); // Navbar con color si el scroll es mayor a 60
    }
    changeColors(navbarTrans);
  };

  // Añadimos el evento de scroll
  if (isUponBanner) {
    window.addEventListener("scroll", checkScroll);
    document.addEventListener("readystatechange", function () {
      if (document.readyState === "complete") {
        const navbarToggler = document.getElementById("navbar-toggler");
        navbarToggler.addEventListener("click", () => {
          const isExpanded =
            navbarToggler.getAttribute("aria-expanded") === "true";
          if (isExpanded) {
            console.log("Se ejecuta el callback: Está expandido el menú");
            setNavbarTrans(false);
            window.removeEventListener("scroll", checkScroll);
          } else {
            console.log("Se ejecuta el callback: Se contrajo el menú");
            checkScroll();
            window.addEventListener("scroll", checkScroll);
          }
        });
      }
    });
  }

  return (
    <nav className={classForNav}>
      <section id="left-nav" className={classLeftNav}>
        <ul className="navbar-nav">
          <li className="nav-item px-0 mx-2">
            <Link className="nav-link px-2 ms-lg-0 " to="/">
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
      <section className="d-flex align-items-center justify-content-between flex-nowrap flex-grow-1 flex-lg-grow-0 flex-xl-grow-1 ">
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
          <Link className="navbar-brand" to="/">
            <img className={classLogo1} src={logo1} alt="Logo Chelenko" />
            <img className={classLogo2} src={logo2} alt="Logo Chelenko" />
          </Link>
        </section>
        <section
          id="right-nav"
          className="navbar px-0"
        >
          <ul className="navbar-nav ms-auto d-flex flex-nowrap flex-row">
            <li className="nav-item me-2">
              <Link
                id="navbar-btn-reserve"
                className="btn btn-primary"
                to="/reservar"
              >
                Reservar
              </Link>
            </li>
            <li className="nav-item me-4 d-none d-lg-block">
              <Link id="navbar-btn-contact" className={classBtnContact} to="/checkout">
                Check Out
              </Link>
            </li>
            <li className="vr me-lg-4 me-2"></li>
            <li id="cart-text" className={classCartText}>
              <span className="me-2 d-none d-lg-block align-content-center">
                Carrito / <strong className="cart-price">$0</strong>
              </span>
              <Link
                to="/checkout"
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
  );
};

export default Navbar;
