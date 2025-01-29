import "./customBootstrap.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home/Home.jsx";
import Checkout from "./views/Checkout/Checkout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/checkout',
      element: <Checkout />
    }
  ])
  return (
    <RouterProvider router={router} />
      // <BrowserRouter>
      // <Navbar isUponBanner={true}/>
      //   <Routes>
      //     <Route path="/" element={<Home />} />
      //     <Route path="/reservar" element={<Checkout />} />
      //     <Route path="/checkout" element={<h1>Checkout el correcto</h1>} />
      //     <Route
      //       path="/confirmacion-reserva"
      //       element={<h1>Reserva Exitosa</h1>}
      //     />
      //   </Routes>
      // </BrowserRouter>
  );
}

export default App;
