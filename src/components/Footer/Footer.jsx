import "./Footer.css";
import { Link } from "react-router-dom"; 

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="padding-footer">
        <div className="row text-nowrap">
          <section className="col-lg-3 col-sm-6 d-none d-sm-flex flex-column align-items-center">
            <h5>
              <strong>Nosotros</strong>
            </h5>
            <ul className="list-unstyled">
              <li className="text-start">
                <Link to="#" className="text-white text-decoration-none">
                  Acerca de Chelenko Lodge
                </Link>
              </li>
              <hr className="my-2" />
              <li className="text-start">
                <Link to="#" className="text-white text-decoration-none">
                  Galería
                </Link>
              </li>
              <hr className="my-2" />
              <li className="text-start">
                <Link to="#" className="text-white text-decoration-none">
                  Testimonios
                </Link>
              </li>
            </ul>
          </section>
          <section className="col-lg-3 col-sm-6 d-none d-sm-flex flex-column align-items-center">
            <h5>
              <strong>La Ubicación</strong>
            </h5>
            <ul className="list-unstyled">
              <li className="text-start">
                <Link to="#" className="text-white text-decoration-none">
                  Descubre La Patagonia
                </Link>
              </li>
              <hr className="my-2" />
              <li className="text-start">
                <Link to="#" className="text-white text-decoration-none">
                  Atracciones Turísticas
                </Link>
              </li>
            </ul>
          </section>
          <section className="col-lg-3 col-sm-6 d-none d-sm-flex flex-column align-items-center">
            <h5>
              <strong>La Experiencia</strong>
            </h5>
            <ul className="list-unstyled">
              <li className="text-start">
                <Link to="#" className="text-white text-decoration-none">
                  Nuestras Cabañas
                </Link>
              </li>
              <hr className="my-2" />
              <li className="text-start">
                <Link to="#" className="text-white text-decoration-none">
                  Actividades
                </Link>
              </li>
            </ul>
          </section>
          <section className="col-lg-3 col-sm-6 d-sm-flex flex-column align-items-center">
            <h5>
              <strong>Contáctanos</strong>
            </h5>
            <ul className="list-unstyled">
              <li className="text-start">
                <Link
                  href="mailto:support@example.com"
                  className="text-white text-decoration-none"
                >
                  Correo: info@chelenko.com
                </Link>
              </li>
              <hr className="my-2" />
              <li>
                <Link
                  href="tel:+56956292538"
                  className="text-white text-decoration-none"
                >
                  Teléfono: +56 9 5629 2538
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <div className="text-center mt-4">
          <p className="mb-0">
            &copy; 2025 Chelenko Lodge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
