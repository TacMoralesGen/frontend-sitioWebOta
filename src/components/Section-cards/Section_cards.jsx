import React from "react";
import "./Section_cards.css";

const SectionCards = () => {
  return (
    <section className="container-card">
      <div className="card-container">
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <h3 className="card-title">
            <strong>Descubre experiencias sin límites</strong></h3>
          <p className="card-text">
            Te invitamos a descubrir y disfrutar de la majestuosa Patagonia Chilena desde una perspectiva diferente. Nuestras cabañas le permitirán conectarse con la naturaleza y vivir una experiencia única gracias a todos los atractivos turísticos disponibles en este mágico lugar.
          </p>
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card custom-card">
                <div className="card-body">
                  <h3 className="card-title"><strong>Sobre nuestras cabañas</strong></h3>
                  <p className="card-text">
                    La aventura te espera en una de nuestras exclusivas «Tini Cabins». Técnicamente son casas de 25m2 de superficie, minimalista y de gran calidad para garantizarle una experiencia y estadía inolvidables.</p>
                  <a href="#" className="btn btn-link border border-primary btn-custom">
                    <strong>Leer más</strong>
                  </a> 
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card custom-card">
                <div className="card-body">
                  <h3 className="card-title"><strong>Actividades y atracciones</strong></h3>
                  <p className="card-text">
                    ¿Qué ha pensado hacer cuando se encuentre rodeado de las maravillas de la Patagonia Chilena?
                    Haga Click en el botón de abajo para descubrir algunas de las tantas actividades y atractivos turísticos disponibles en nuestra zona.
                  </p>
                  <a href="#" className="btn btn-link border border-primary btn-custom">
                   <strong>Leer más</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionCards;
