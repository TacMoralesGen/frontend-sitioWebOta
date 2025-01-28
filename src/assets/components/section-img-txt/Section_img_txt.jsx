const SectionImgTxt = () => {
  // <!-- patagonia -->
  <div class="container py-4">
    <div class="row">
      <div class="col-md-6 d-flex">
        <img
          src="./src/img/img-1.jpg"
          class="img-fluid"
          alt="Vista de la Patagonia Chilena"
          style="
              object-fit: cover;
              height: auto;
              max-height: 450px;
              width: 100%;
            "
        />
      </div>

      <div class="col-md-6 d-flex flex-column justify-content-center">
        <h2 class="mb-4 text-primary">
          La Patagonia Chilena como nunca antes la habías visto
          <hr />
        </h2>
        <p class="lead mb-4">
          Chelenko Lodge te ofrece una oportunidad única de presenciar las
          maravillas ocultas de la Patagonia Chilena. Ven y experimenta la
          belleza inigualable que nos brinda la naturaleza. Nuestro enfoque
          fusiona la tradición con la innovación para ofrecerte una experiencia
          de lujo en cada una de nuestras Cabañas.
        </p>
        <a href="#about" class="btn btn-primary text-white rounded-pill">
          <strong>Conoce más sobre Chelenko ></strong>
        </a>
      </div>
    </div>
  </div>;
  {
    /* <!-- horizontes --> */
  }
  <div class="container py-4">
    <div class="row">
      <div class="col-md-4 d-flex flex-column justify-content-center">
        <p class="mb-4 text-primary">Experimenta nuevos horizontes</p>
        <h2 class="mb-4">
          Vive el sueño, nosotros nos encargamos del resto.
          <hr />
        </h2>
        <p class="lead mb-4">
          Disfrute con un estilo único y experimente el verdadero lujo que sólo
          una profunda conexión con la naturaleza le puede ofrecer. La aventura
          de su vida le espera en una de nuestras exclusivas Cabañas, las cuales
          han sido cuidadosamente diseñadas e implementadas por el equipo de
          Chelenko Lodge para garantizarle una estadía placentera e inolvidable.
        </p>
        <a href="#about" class="btn btn-primary text-white rounded-pill">
          <strong>Acerca de la experiencia ></strong>
        </a>
      </div>

      <div class="col-md-8 d-flex position-relative">
        <img
          src="./src/img/img-2.jpg"
          class="img-fluid"
          alt="Vista de la Patagonia Chilena"
          style="
              object-fit: cover;
              height: auto;
              max-height: 450px;
              width: 100%;
            "
        />
        <div
          class="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle text-center text-white p-4 mt-2 ml-5"
          style="
              border: 5px solid #fff;
              width: 80%;
              min-height: 400px;
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
            "
        >
          <h1 class="display-3 fw-bold" style="font-weight: bold; opacity: 70%">
            Exclusividad
          </h1>
        </div>
      </div>
    </div>
  </div>;
  {
    /* <!-- exclusividad --> */
  }
  <div class="container py-4">
    <div class="row">
      <div class="col-md-8 d-flex position-relative">
        <img
          src="./src/img/img-3.jpg"
          class="img-fluid"
          alt="Vista de la Patagonia Chilena"
          style="
              object-fit: cover;
              height: auto;
              max-height: 450px;
              width: 100%;
            "
        />
        <div
          class="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle text-center text-white p-4 mt-2 ml-5"
          style="
              border: 5px solid #fff;
              width: 80%;
              min-height: 400px;
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
            "
        >
          <h1 class="display-3 fw-bold" style="font-weight: bold; opacity: 70%">
            Ubicación
          </h1>
        </div>
      </div>
      <div class="col-md-4 d-flex flex-column justify-content-center">
        <p class="mb-4 text-primary">Explora las posibilidades</p>
        <h2 class="mb-4">Redescubre la naturaleza</h2>
        <p>
          Nuestras exclusivas 'Tini Cabins' ubicadas estratégicamente en el Lago
          General Carrera, le permitirán conectarse consigo mismo de una manera
          única e inolvidable. <br />
          Despierte su creatividad y sumérjase en un mundo de posibilidades
          limitado únicamente con su imaginación.
        </p>
        <a href="#about" class="btn btn-primary text-white rounded-pill">
          <strong>Acerca de la experiencia ></strong>
        </a>
      </div>
    </div>
  </div>;
};

export default SectionImgTxt;