const ReserveConfCard = () => {
  <div class="container mt-5 text-center">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header bg-danger text-white opacity-50">
            Chelenko Lodge - Pago Fallido
          </div>
          <div class="card-body">
            <h1 class="display-4 text-danger">¡Algo salió mal!</h1>
            <p class="lead">
              No pudimos procesar su pago. Lamentablemente, su reserva no se
              pudo completar.
            </p>
            <hr />
            <h5 class="text-muted">Recomendaciones a seguir</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                Recargue la página e inténtelo de nuevo.
              </li>
              <li class="list-group-item">
                Revise que tenga los fondos suficientes en su cuenta bancaria.
              </li>
              <li class="list-group-item">
                Contacte su banco si el problema persiste.
              </li>
            </ul>
            <a href="/retry" class="btn btn-danger mt-4 opacity-50">
              Volver al inicio
            </a>
            <a href="/support" class="btn btn-danger mt-4 opacity-50">
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default ReserveConfCard;
