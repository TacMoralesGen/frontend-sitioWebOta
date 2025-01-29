const ReserveDetails = () => {
  <>
    <div class="container-fluid mt-3">
      <div class="container text-center">
        {/* Aqui va "IndicatorSectionOneTwo" en CHECKOUT*/}
        <div class="row">
          <div class="col-md-8 mb-3">
            {/* Primer bloque de detalles de la reserva */}
            <div class="card">
              <div class="card-body text-start">
                <h1 class="card-title fw-normal">Detalle de la reserva</h1>
                <div class="card-text">
                  <div class="container text-start">
                    <div class="row">
                      <div class="col-6">
                        <span class="fw-bold">#1 Tiny Cabin </span> Familiar
                        (1-4 Personas)
                      </div>
                      <div class="col-6">
                        <div class="dropdown d-inline">
                          <button
                            class="btn btn-link link-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Ver detalles Cabaña
                          </button>
                          <ul
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <li class="dropdown-item">
                              Vista: Lago General Carrera - Patagonia Chilena.
                            </li>
                            <li class="dropdown-item">Tamaño: 25m².</li>
                            <li class="dropdown-item">
                              Camas: (1) Cama Queen - (2) Literas.
                            </li>
                            <li class="dropdown-item">
                              Comodidades: Aire Acondicionado, Ducha, Baño
                              privado, Toallas, Secador de pelo.
                            </li>
                            <li class="dropdown-item">
                              Estacionamiento: Gratuito.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="container text-start">
                    <div class="row">
                      <div class="col">
                        <p>Nombre completo Huesped Representante :</p>
                      </div>
                    </div>
                  </div>

                  <div class="container text-start">
                    <div class="row">
                      <div class="col-6">
                        <input
                          type="text"
                          id="clienteNombre"
                          name="clienteNombre"
                          class="form-control form-control-sm d-inline"
                          placeholder="Ingresa tu nombre"
                          required
                        />
                      </div>
                      <div class="col-2">
                        <select
                          class="form-select form-select-sm d-inline"
                          id="adultos"
                          name="adultos"
                          aria-label="Cantidad de adultos"
                        >
                          <option selected>Adultos</option>
                          <option value="1">1 Adulto</option>
                          <option value="2">2 Adultos</option>
                          <option value="3">3 Adultos</option>
                          <option value="4">4 Adultos</option>
                        </select>
                      </div>
                      <div class="col-2">
                        <select
                          class="form-select form-select-sm"
                          id="ninos"
                          name="ninos"
                          aria-label="Cantidad de niños"
                        >
                          <option selected>Niños</option>
                          <option value="1">1 Niño</option>
                          <option value="2">2 Niños</option>
                          <option value="3">3 Niños</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-2 fw-bold" id="precioBase">
                  CLP$160,900
                </div>

                <div class="mt-3">
                  <label for="servicioDesayuno">Servicios Adicionales:</label>
                  <div class="mt-1 form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="10000"
                      id="desayunoSalado"
                      onchange="actualizarPrecio()"
                    />
                    <label class="form-check-label" for="desayunoSalado">
                      Desayuno Salado (CLP$10,000 pp)
                    </label>
                  </div>
                  <div class="mt-1 form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="12000"
                      id="desayunoDulce"
                      onchange="actualizarPrecio()"
                    />
                    <label class="form-check-label" for="desayunoDulce">
                      Desayuno Dulce (CLP$12,000 pp)
                    </label>
                  </div>
                  <div class="mt-1 form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="60000"
                      id="tinajaCaliente"
                      onchange="actualizarPrecio()"
                    />
                    <label class="form-check-label" for="tinajaCaliente">
                      Tinaja Caliente (CLP$60,000 por uso)
                    </label>
                  </div>
                  <div class="mt-2">
                    <label for="cantidadTinaja">
                      ¿Cuántas veces usarás la tinaja caliente?
                    </label>
                    <div class="col-2">
                      <input
                        type="number"
                        id="cantidadTinaja"
                        class="form-control form-control-sm"
                        value="0"
                        min="0"
                        onchange="actualizarPrecio()"
                      />
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-between mt-3">
                  <span class="h4">Sub Total Cabaña:</span>
                  <span class="h4" id="precioTotal">
                    CLP$160,900
                  </span>
                </div>
              </div>
            </div>

            {/* Segundo bloque de detalles de la reserva (clon de la sección anterior) */}
            <div class="card mt-3">
              <div class="card-body text-start">
                <div class="card-text">
                  <div class="container text-start">
                    <div class="row">
                      <div class="col-6">
                        <span class="fw-bold">#1 Tiny Cabin </span> Familiar
                        (1-4 Personas)
                      </div>
                      <div class="col-6">
                        <div class="dropdown d-inline">
                          <button
                            class="btn btn-link link-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Ver detalles Cabaña
                          </button>
                          <ul
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <li class="dropdown-item">
                              Vista: Lago General Carrera - Patagonia Chilena.
                            </li>
                            <li class="dropdown-item">Tamaño: 25m².</li>
                            <li class="dropdown-item">
                              Camas: (1) Cama Queen - (2) Literas.
                            </li>
                            <li class="dropdown-item">
                              Comodidades: Aire Acondicionado, Ducha, Baño
                              privado, Toallas, Secador de pelo.
                            </li>
                            <li class="dropdown-item">
                              Estacionamiento: Gratuito.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="container text-start">
                    <div class="row">
                      <div class="col">
                        <p>Nombre completo Huesped Representante :</p>
                      </div>
                    </div>
                  </div>

                  <div class="container text-start">
                    <div class="row">
                      <div class="col-6">
                        <input
                          type="text"
                          id="clienteNombre"
                          name="clienteNombre"
                          class="form-control form-control-sm d-inline"
                          placeholder="Ingresa tu nombre"
                          required
                        />
                      </div>
                      <div class="col-2">
                        <select
                          class="form-select form-select-sm d-inline"
                          id="adultos"
                          name="adultos"
                          aria-label="Cantidad de adultos"
                        >
                          <option selected>Adultos</option>
                          <option value="1">1 Adulto</option>
                          <option value="2">2 Adultos</option>
                          <option value="3">3 Adultos</option>
                          <option value="4">4 Adultos</option>
                        </select>
                      </div>
                      <div class="col-2">
                        <select
                          class="form-select form-select-sm"
                          id="ninos"
                          name="ninos"
                          aria-label="Cantidad de niños"
                        >
                          <option selected>Niños</option>
                          <option value="1">1 Niño</option>
                          <option value="2">2 Niños</option>
                          <option value="3">3 Niños</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-2 fw-bold" id="precioBase">
                  CLP$160,900
                </div>

                <div class="mt-3">
                  <label for="servicioDesayuno">Servicios Adicionales:</label>
                  <div class="mt-1 form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="10000"
                      id="desayunoSalado"
                      onchange="actualizarPrecio()"
                    />
                    <label class="form-check-label" for="desayunoSalado">
                      Desayuno Salado (CLP$10,000 pp)
                    </label>
                  </div>
                  <div class="mt-1 form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="12000"
                      id="desayunoDulce"
                      onchange="actualizarPrecio()"
                    />
                    <label class="form-check-label" for="desayunoDulce">
                      Desayuno Dulce (CLP$12,000 pp)
                    </label>
                  </div>
                  <div class="mt-1 form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="60000"
                      id="tinajaCaliente"
                      onchange="actualizarPrecio()"
                    />
                    <label class="form-check-label" for="tinajaCaliente">
                      Tinaja Caliente (CLP$60,000 por uso)
                    </label>
                  </div>
                  <div class="mt-2">
                    <label for="cantidadTinaja">
                      ¿Cuántas veces usarás la tinaja caliente?
                    </label>
                    <div class="col-2">
                      <input
                        type="number"
                        id="cantidadTinaja"
                        class="form-control form-control-sm"
                        value="0"
                        min="0"
                        onchange="actualizarPrecio()"
                      />
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-between mt-3">
                  <span class="h4">Sub Total Cabaña:</span>
                  <span class="h4" id="precioTotal">
                    CLP$160,900
                  </span>
                </div>
              </div>
            </div>

            {/* Tercera cabaña */}
            <div class="card mt-3">
              <div class="card-body text-start">
                <div class="card-text">
                  <div class="container text-start">
                    <div class="row">
                      <div class="col-6">
                        <span class="fw-bold">#1 Couple Room </span> (1-2
                        Personas)
                      </div>
                      <div class="col-6">
                        <div class="dropdown d-inline">
                          <button
                            class="btn btn-link link-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Ver detalles Cabaña
                          </button>
                          <ul
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <li class="dropdown-item">
                              Vista: Lago General Carrera - Patagonia Chilena.
                            </li>
                            <li class="dropdown-item">Tamaño: 14m².</li>
                            <li class="dropdown-item">
                              Camas: (1) Cama Queen.
                            </li>
                            <li class="dropdown-item">
                              Comodidades: Aire Acondicionado, Ducha, Baño
                              privado, Toallas, Secador de pelo.
                            </li>
                            <li class="dropdown-item">
                              Estacionamiento: Gratuito.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="container text-start">
                    <div class="row">
                      <div class="col">
                        <p>Nombre completo Huesped Representante :</p>
                      </div>
                    </div>
                  </div>

                  <div class="container text-start">
                    <div class="row">
                      <div class="col-6">
                        <input
                          type="text"
                          id="clienteNombre"
                          name="clienteNombre"
                          class="form-control form-control-sm d-inline"
                          placeholder="Ingresa tu nombre"
                          required
                        />
                      </div>
                      <div class="col-2">
                        <select
                          class="form-select form-select-sm d-inline"
                          id="adultos"
                          name="adultos"
                          aria-label="Cantidad de adultos"
                        >
                          <option selected>Adultos</option>
                          <option value="1">1 Adulto</option>
                          <option value="2">2 Adultos</option>
                          <option value="3">3 Adultos</option>
                          <option value="4">4 Adultos</option>
                        </select>
                      </div>
                      <div class="col-2">
                        <select
                          class="form-select form-select-sm"
                          id="ninos"
                          name="ninos"
                          aria-label="Cantidad de niños"
                        >
                          <option selected>Niños</option>
                          <option value="1">1 Niño</option>
                          <option value="2">2 Niños</option>
                          <option value="3">3 Niños</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-2 fw-bold" id="precioBase">
                  CLP$91,900
                </div>

                <div class="mt-3">
                  <label for="servicioDesayuno">Servicios Adicionales:</label>
                  <div class="mt-1 form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="10000"
                      id="desayunoSalado"
                      onchange="actualizarPrecio()"
                    />
                    <label class="form-check-label" for="desayunoSalado">
                      Desayuno Salado (CLP$10,000 pp)
                    </label>
                  </div>
                  <div class="mt-1 form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="12000"
                      id="desayunoDulce"
                      onchange="actualizarPrecio()"
                    />
                    <label class="form-check-label" for="desayunoDulce">
                      Desayuno Dulce (CLP$12,000 pp)
                    </label>
                  </div>
                  <div class="mt-1 form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="60000"
                      id="tinajaCaliente"
                      onchange="actualizarPrecio()"
                    />
                    <label class="form-check-label" for="tinajaCaliente">
                      Tinaja Caliente (CLP$45,000 por uso)
                    </label>
                  </div>
                  <div class="mt-2">
                    <label for="cantidadTinaja">
                      ¿Cuántas veces usarás la tinaja caliente?
                    </label>
                    <div class="col-2">
                      <input
                        type="number"
                        id="cantidadTinaja"
                        class="form-control form-control-sm"
                        value="0"
                        min="0"
                        onchange="actualizarPrecio()"
                      />
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-between mt-3">
                  <span class="h4">Sub Total Cabaña:</span>
                  <span class="h4" id="precioTotal">
                    CLP$91,900
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Aqui va el resumen de la reserva "ReserveResume" en CHECKOUT*/}
        </div>
      </div>
    </div>


  </>;
};
