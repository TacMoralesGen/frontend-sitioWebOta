import "./customBootstrap.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Bienvenidos</h1>}/>
          <Route path="/reservar" element={<h1>Reservar</h1>}/>
          <Route path="/checkout" element={<h1>Checkout</h1>}/>
          <Route path="/confirmacion-reserva" element={<h1>Reserva Exitosa</h1>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;















