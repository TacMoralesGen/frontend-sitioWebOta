import "./customBootstrap.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home/Home.jsx";
import Reserve from "./views/Reserve/Reserve.jsx";
import Checkout from "./views/Checkout/Checkout.jsx";
import PanelAdmin from "./views/PanelAdmin/Panel-admin.jsx";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ContactInformationForm from "./components/Contact-information-form/ContactInformationForm.jsx";


const App = () => {
  return (
    // <RouterProvider router={router} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservar" element={<Reserve />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<PanelAdmin />} />  
        <Route path="/contact" element={<ContactInformationForm/>}/>      
      </Routes>
    </BrowserRouter>
  );
};

export default App;
