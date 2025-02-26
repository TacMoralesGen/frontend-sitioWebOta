import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import PaymentSuccess from "../../components/Payment/Payment-success/Payment-success.jsx";
import PaymentFailure from "../../components/Payment/Payment-failure/Payment-failure.jsx";

const Payment = () => {
  return (
    <div>
      <Header />
      <PaymentSuccess
        title="¡Reserva Confirmada!"
        message="Tu pago ha sido procesado correctamente. Pronto recibirás un correo con los detalles de tu reserva."
        details="Si tienes alguna pregunta, no dudes en contactarnos."
        buttonText="Volver al inicio"
        buttonLink="/"
        buttonText2="Ver otros servicios"
        buttonLink2="#"
      />

      <PaymentFailure
        title="Error en el pago"
        message="No pudimos procesar tu pago. Lamentablemente, tu reserva no se completó."
        recommendations={[
          "Verifica tu saldo disponible.",
          "Intenta con otro método de pago.",
          "Si el problema persiste, contacta a tu banco.",
        ]}
        retryLink="/reservar"
        homeLink="/"
      />
      <Footer />
    </div>
  );
};

export default Payment;
