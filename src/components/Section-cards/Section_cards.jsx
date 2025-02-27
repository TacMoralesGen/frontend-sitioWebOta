import React from "react";
import "./Section_cards.css";

const SectionCards = () => {
  return (
    <section className="container-card">
      <div className="card-container">
        <div className="card-body">
          <h3 className="card-title mb-2">
            <strong>Descubre experiencias sin límites</strong></h3>
          <p className="card-text mb-4">
            Te invitamos a descubrir y disfrutar de la majestuosa Patagonia Chilena desde una perspectiva diferente. Nuestras cabañas le permitirán conectarse con la naturaleza y vivir una experiencia única gracias a todos los atractivos turísticos disponibles en este mágico lugar.
          </p>
          <div className="row justify-content-center">
            {/*card-left*/}
            <div className="col-12 col-md-8 col-lg-6 mb-6 mt-4">
              <div className="card custom-card h-100 w-100 d-flex flex-column">
                <div className="card-body d-flex flex-column flex-grow-1">
                  <h3 className="card-left"><strong>Sobre nuestras cabañas</strong></h3>
                  <p className="card-text">
                    La aventura te espera en una de nuestras exclusivas «Tini Cabins». Técnicamente son casas de 25m2 de superficie, minimalista y de gran calidad para garantizarle una experiencia y estadía inolvidables.</p>
                  <a href="#" className="btn btn-link border border-primary btn-custom mt-auto">
                    <strong>Leer más</strong>
                  </a> 
                </div>
              </div>
            </div>
            {/*card-right*/}
            <div className="col-12 col-md-8 col-lg-6 mb-6 mt-4">
              <div className="card custom-card h-100 w-100 d-flex flex-column">
                <div className="card-body d-flex flex-column flex-grow-1">
                  <h3 className="card-title"><strong>Actividades y atracciones</strong></h3>
                  <p className="card-right">
                    ¿Qué ha pensado hacer cuando se encuentre rodeado de las maravillas de la Patagonia Chilena?
                    Haga Click en el botón de abajo para descubrir algunas de las tantas actividades y atractivos turísticos disponibles en nuestra zona.
                  </p>
                  <a href="#" className="btn btn-link border border-primary btn-custom mt-auto">
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
