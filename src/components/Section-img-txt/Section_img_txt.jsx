import React from "react";
import "./Section_img_txt.css";
import img1 from "../../assets/images/img-1.jpg";

const SectionImgTxt = () => {
  return (
    <section className="section-container">
      <div className="row align-items-center">
        {/* Imagen */}
        <div className="col-lg-6 mb-4 mb-lg-0">
          <img src={img1} className="section-img" alt="Vista de la Patagonia Chilena" />
        </div>
        {/* Texto */}
        <div className="col-lg-6 text-center text-lg-start section-text">
          <div className="text-center text-lg-start p-4">
            <h2 className="text-primary">
              La Patagonia Chilena como nunca antes la habías visto
              <hr className="separador"/>
            </h2>
            <p className="lead">
              Chelenko Lodge te ofrece una oportunidad única de presenciar las
              maravillas ocultas de la Patagonia Chilena. Ven y experimenta la
              belleza inigualable que nos brinda la naturaleza. Nuestro enfoque
              fusiona la tradición con la innovación para ofrecerte una
              experiencia de lujo en cada una de nuestras Cabañas.
            </p>
            <a href="#about" className="btn btn-primary text-white btn-custom">
              <strong>Conoce más sobre Chelenko {">"}</strong>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionImgTxt;
