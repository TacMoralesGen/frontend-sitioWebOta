import "./Section_img_txt.css";

const SectionImgTxt = () => {
  return (
    <>
      <section className="container py-4">
        <div className="row">
          <div className="col-md-6 d-flex">
            <img
              src="./src/img/img-1.jpg"
              className="img-fluid"
              alt="Vista de la Patagonia Chilena"
              style={{
                objectfit: "cover",
                height: "auto",
                maxheight: "450px",
                width: "100%",
              }}
            />
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2 className="mb-4 text-primary">
              La Patagonia Chilena como nunca antes la habías visto
              <hr />
            </h2>
            <p className="lead mb-4">
              Chelenko Lodge te ofrece una oportunidad única de presenciar las
              maravillas ocultas de la Patagonia Chilena. Ven y experimenta la
              belleza inigualable que nos brinda la naturaleza. Nuestro enfoque
              fusiona la tradición con la innovación para ofrecerte una
              experiencia de lujo en cada una de nuestras Cabañas.
            </p>
            <a
              href="#about"
              className="btn btn-primary text-white rounded-pill"
            >
              <strong>Conoce más sobre Chelenko {">"}</strong>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionImgTxt;
