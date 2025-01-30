import './Banner.css';
import videoSrc from '../../assets/videos/Chelenko-Lodge-Intro-by-ICS.mp4'
import logo from '../../assets/images/Logo home.png';
const Banner = () => {
  return (
    <section className="container-fluid p-0 banner position-relative min-vh-100 overflow-hidden">
      {/* Capa de oscurecimiento*/}
      <div className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover bg-overlay"></div>
      {/*Video de fondo*/}
      <video autoPlay muted loop playsInline className="w-100 h-100 position-absolute top-0 start-0 object-fit-cover">
        <source
          src={videoSrc}
          type="video/mp4"
        />
      </video>
      {/*Contenido banner*/}  {/*logo responsivo*/}
      <div className="d-flex justify-content-center align-items-center position-relative z-index-1 h-100">
        <div className="text-center text-white p-4 d-flex flex-column align-items-center banner-content">
          <img
            src={logo}
            alt="Logo blanco Chelenko"
            className="img-fluid mb-2"
          />
          <h5 className="fw-light text-wrap">
            Creamos experiencias de viaje significativas y memorables,
            inspiradas por la autenticidad, la hospitalidad y un profundo sentido de
            conexión con la naturaleza.
          </h5>
          <p className="lead mb-2 p-2">Descubre la diferencia</p>
          <a href="./checkout.html" className="btn btn-primary btn-lg border-0 text-white rounded-pill btn-reserva">Reserva aquí</a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
