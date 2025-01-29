import "./Checkout.css";

const Checkout = () => {
  return (
    <>
      <div className="container-fluid banner position-relative vh-100 overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover bg-overlay"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        >
          <source
            src="./src/videos/Chelenko-Lodge-Intro-by-ICS.mp4"
            type="video/mp4"
          />
        </video>
        <div className="d-flex justify-content-center align-items-center position-relative z-index-1 h-100">
          <div
            className="text-center text-white p-4 d-flex justify-content-center align-items-center flex-column"
            style="
            border: 5px solid #fff;
            width: 80%;
            height: 65%;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
          "
          >
            <img
              src="./src/img/Logo home.png"
              alt="Logo blanco Chelenko"
              className="fluid mb-4"
              style="max-height: 150px; object-fit: contain"
            />
            <h5
              className="fw-light text-wrap"
              style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7)"
            >
              Creamos experiencias de viaje significativas y memorables,
              inspiradas
              <br />
              por la autenticidad, la hospitalidad y un profundo sentido de
              conexión
              <br />
              con la naturaleza.
            </h5>
            <p className="lead mb-4 p-4">Descubre la diferencia</p>
            <a
              href="./checkout.html"
              className="btn btn-primary btn-lg border-0 text-white rounded-pill"
            >
              Reserva aquí
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
