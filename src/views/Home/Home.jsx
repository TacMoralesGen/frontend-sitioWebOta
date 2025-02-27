import "./Home.css";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import SectionImgTxt from "../../components/Section-img-txt/Section_img_txt";
import SectionImgTxtLn from "../../components/Section-img-txt-ln/Section_img_txt_ln";
import img2 from "../../assets/images/img-2.jpg";
import img3 from "../../assets/images/img-3.jpg"; 
import SectionCards from "../../components/Section-cards/Section_cards";
import SectionMap from "../../components/Map/Map";
import Footer from "../../components/Footer/Footer"

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <SectionImgTxt />

      <SectionImgTxtLn
        imgSrc={img2}
        subtitle="Experimenta nuevos horizontes"
        title="Vive el sueño, nosotros nos encargamos del resto"
        description="Disfrute con un estilo único y experimente el verdadero lujo que sólo una profunda conexión con la naturaleza le puede ofrecer. La aventura de su vida le espera en una de nuestras exclusivas Cabañas, las cuales han sido cuidadosamente diseñadas e implementadas por el equipo de Chelenko Lodge para garantizarle una estadía placentera e inolvidable."
        btnText="Acerca de la experiencia"
        overlayText="Exclusividad"
      />

      <SectionImgTxtLn
        imgSrc={img3}
        subtitle="Explora las posibilidades"
        title="Redescubre la naturaleza"
        description="Nuestras exclusivas 'Tini Cabins' ubicadas estratégicamente en el Lago General Carrera, le permitirán conectarse consigo mismo de una manera única e inolvidable. Despierte su creatividad y sumérjase en un mundo de posibilidades limitado únicamente con su imaginación."
        btnText="Acerca de la ubicación"
        overlayText="Ubicación"
        reverse={true}  // Invertir la posición de la imagen y el texto
      />
      <SectionCards />
      <SectionMap />
      <Footer />
    </>
  );
};

export default Home;