import "./Map.css";
const SectionMap = () => {
  return (
    <section className="map-section d-flex align-items-stretch w-100">
      <div className="container-fluid d-flex justify-content-center p-5">
        <div className="card map-card custom-shadow border-0 w-100 h-100">
          <div className="row g-0 h-100">
            {/*Mapa*/}
              <div className="col-md-6 d-flex">
                <div className="ratio ratio-16x9 w-100 h-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2745.159507637868!2d-72.7223230883734!3d-46.524745380045154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbd9259c86994b1f9%3A0xdab48173ce8ddfe8!2sChelenko%20Lodge!5e0!3m2!1ses!2scl!4v1738969063736!5m2!1ses!2scl"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de ubicación"
                  className="map-frame">
                </iframe>
                </div>
              </div>
          {/*Texto*/}
            <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
              <div className="card-body">
              <h3 className="card-title text-dark"><strong>¿Cómo encontrarnos?</strong></h3>
                <ul>
                  <li>
                    Primero debe llegar vía aérea al Aeródromo Balmaceda de Coyhaique,
                    Región de Aysen, Chile.
                  </li>
                  <li>Continúe a lo largo de la ruta 245 por 15.9 kms.</li>
                  <li>Gire a la izquierda hacia la Carretera Austral o Ruta 7.</li>
                  <li>Continúe por otros 163 kms hasta llegar a Chelenko Lodge.</li>
                </ul>
                <a
                  href="https://www.google.com/maps/dir//Chelenko+Lodge,+Chile"
                  className="btn btn-primary rounded-pill btn-custom text-white px-3"
                  target="_blank"
                  rel="noopener noreferrer">
                  <strong>Obtener Direcciones</strong> <i className="bi bi-geo-alt-fill me-2"></i>
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionMap;