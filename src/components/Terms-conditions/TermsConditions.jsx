import React from "react";
import "./TermsConditions.css"
const TermsConditions = () => {
  return (
    <section className="card-container my-5 bg-white">
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h2><strong>Términos y Condiciones</strong></h2>
        </div>
      </div>
      <div className="row p-4">
        <div className="col-12">
          <div className="schedules">
            <h4><strong>Horarios de Entrada y Salida</strong></h4>
            <p>
              <strong>Check In:</strong> 3:00 pm
            </p>
            <p>
              <strong>Check Out:</strong> 11:00 am
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="p-4">
            <section className="payment mb-4">
              <h5><strong>Información de Pago</strong></h5>
              <ul className="list">
                <li>
                  Si deseas realizar el pago mediante transferencia bancaria, por
                  favor contáctanos a través del correo electrónico{" "}
                  <a href="mailto:info@chelenko.com" target="_blank">info@chelenko.com</a>.
                </li>
                <li>
                  Si eres un turista extranjero con menos de 3 meses de estancia en
                  Chile (verificado mediante tu pasaporte), podrás exonerarte del
                  impuesto del 19% (IVA). Para gestionar este beneficio, contáctanos
                  a <a href="mailto:info@chelenko.com" target="_blank">info@chelenko.com</a>.
                </li>
                <li>
                  El pago de la estadía debe realizarse antes o al momento del
                  check-in. En caso contrario, se cobrará un depósito de{" "}
                  <strong>500 USD</strong>, el cual será reembolsado íntegramente si,
                  tras revisar el estado de la tiny cabin, no se detectan
                  inconvenientes durante el check-out.
                </li>
              </ul>
            </section>
            <section className="cancel">
              <h5><strong>Políticas de Cancelación</strong></h5>
              <ul className="list">
                <li>
                  Sólo se permiten cancelaciones o cambios de fecha de estadía con un
                  mínimo de 14 días.
                </li>
                <li>
                  Las cancelaciones o modificaciones de fecha solo serán permitidas
                  si se solicitan con al menos <strong>14 días</strong> de
                  antelación. En caso de que la solicitud se realice dentro de los 14
                  días previos a la estadía, se cobrará el{" "}
                  <strong>100% del monto de la reserva</strong>.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;