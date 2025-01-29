import "./Home.css";
import Banner from "../../components/Banner/Banner";
import Navbar from "../../components/Navbar/Navbar";
import SectionImgTxt from "../../components/Section-img-txt/Section_img_txt";

const Home = () => {
  return (
    <>
      <Navbar isUponBanner={true}/>
      <Banner />
      <SectionImgTxt />
    </>
  );
};

export default Home;
