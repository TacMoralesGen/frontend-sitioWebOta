const ReserveResume = () => {
  <div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Resumen de la Reserva</h4>
        <ul class="list-unstyled text-start">
          <li>
            <strong>Cabaña:</strong>
            <div>#1 Tiny Cabin (Familiar)</div>
          </li>
          <hr />

          <li>
            <strong>Fecha de reserva:</strong>
            <div class="row">
              <div class="col-md-6">
                <strong>Entrada:</strong>
                <div>Lunes, 06 Enero, 2025 desde las 15:00hrs</div>
              </div>
              <div class="col-md-6">
                <strong>Salida:</strong>
                <div>Miércoles, 08 Enero, 2025 hasta las 10:00am</div>
              </div>
            </div>
          </li>

          <div class="mt-3">
            Duración total de la estadía:
            <div>
              <strong> 2 noches</strong>
            </div>
          </div>

          <hr />

          <li>
            <strong>Total de Huespedes:</strong>
          </li>
          <ul>
            <li>
              <strong>Adultos:</strong> 2
            </li>
            <li>
              <strong>Niños:</strong> 1
            </li>
          </ul>
          <hr />

          <li>
            <strong>Servicios Adicionales:</strong>
          </li>
          <ul>
            <li>Desayuno Salado</li>
            <li>Tinaja Caliente</li>
          </ul>
          <hr />

          <li>
            <strong>Total a pagar:</strong>
          </li>
          <li>
            CLP$160,900 <strong>iva incluido</strong>
            <div>(*turistas exentos de iva)</div>
          </li>

          <div class="mt-4 text-center">
            <button type="button" class="btn btn-success opacity-50">
              Confirmar reserva
            </button>
            <div class="dropdown">
              <button
                class="btn btn-link link-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                ¿Tienes un código promocional?
              </button>
              <div
                class="dropdown-menu p-3"
                aria-labelledby="dropdownMenuButton"
              >
                <label for="codigoPromocional" class="form-label">
                  Ingresa tu código promocional:
                </label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="codigoPromocional"
                  name="codigoPromocional"
                  placeholder="Código promocional"
                />
              </div>
            </div>
          </div>

          <p class="text-center mt-2">
            Si deseas realizar el pago mediante transferencia bancaria, por
            favor contáctanos a través del correo electrónico info@chelenko.com
          </p>
        </ul>
      </div>
    </div>
  </div>;
};

export default ReserveResume;
