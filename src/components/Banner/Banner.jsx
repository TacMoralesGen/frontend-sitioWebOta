import React from 'react';
import './Banner.css';
import videoSrc from './src/assets/videos/Chelenko-Lodge-Intro-by-ICS.mp4'
const Banner = () => {
  return (
    <section className="container-fluid banner position-relative vh-100 overflow-hidden">
      {/* Capa de oscurecimiento*/}
      <div className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover bg-overlay"></div>
      {/*Video de fondo*/}
      <video autoPlay muted loop playsInline>
        <source
          src={videoSrc}
          type="video/mp4"
        />
      </video>
      {/*Contenido banner*/}
      <div className="d-flex justify-content-center align-items-center position-relative z-index-1 h-100">
        <div className="text-center text-white p-4 d-flex flex-column align-items-center banner-content">
          <img
            src="./src/assets/images/Logo home.png"
            alt="Logo blanco Chelenko"
            className="fluid mb-3"
          />
          <h5 className="fw-light text-wrap">
            Creamos experiencias de viaje significativas y memorables,
            inspiradas por la autenticidad, la hospitalidad y un profundo sentido de
            conexión con la naturaleza.
          </h5>
          <p className="lead mb-4 p-4">Descubre la diferencia</p>
          <a href="./checkout.html" className="btn btn-primary btn-lg border-0 text-white rounded-pill btn-reserva">Reserva aquí</a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
