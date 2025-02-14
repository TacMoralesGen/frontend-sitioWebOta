import "./Reserve.css";
import Header from "../../components/Header/Header";
import SelectDates from "../../components/Select-dates/SelectDates";
import SelectCabins from "../../components/Select-cabins/SelectCabins";
import ReserveResume from "../../components/ReserveResume/ReserveResume";
import TermsConditions from "../../components/Terms-conditions/TermsConditions";
import Footer from "../../components/Footer/Footer";


const Reserve = () => {
  return (
    <>
      <Header />
      <SelectDates />
      <SelectCabins />
      {/* <ReserveResume/> */}
      {/* <ReserveResume habitaciones={} totalAdultos={} totalNinos={} serviciosAdicionales={} totalReserva={} /> */}
      <TermsConditions />
      <Footer />
    </>
  );
};

export default Reserve;
