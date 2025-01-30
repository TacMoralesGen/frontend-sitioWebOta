import React from "react";
import "./Section_img_txt_ln.css";

const SectionImgTxtLn = ({imgSrc, title, subtitle, description, btnText, overlayText, reverse}) => {
  return (
    <section className="section-container">
      <div className="container">
        <div className={`row align-items-center ${reverse ? "flex-row-reverse": ""}`}>
          {/* Texto */}
          <div className="col-md-4 text-center text-md-start exclusividad-text">
            <p className="text-primary"><strong>{subtitle}</strong></p>
            <h2>
              {title}
              <hr className="separador"/>
            </h2>
            <p className="lead">{description}</p>
            <a href="#" className="btn btn-primary btn-custom text-white">
              <strong> {btnText} {">"}</strong>
            </a>
          </div>

          <div className="col-md-8 position-relative">
            <img src={imgSrc} className="exclusividad-img" alt="Vista de las cabañas" />
            <div className="overlay-text">
              <h1 className="display-3 fw-bold">{overlayText}</h1>
            </div>
          </div>
        </div>
        </div>
    </section>
  );
};

export default SectionImgTxtLn;