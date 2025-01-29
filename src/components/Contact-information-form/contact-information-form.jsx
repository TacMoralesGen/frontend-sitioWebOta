const ContactInformationForm = () => {
  <div class="container">
    <div class="row justify-content-left">
      <div class="col-md-8">
        <div class="card p-4">
          <h1 class="mb-4">Datos de contacto</h1>
          <form id="contactForm" class="needs-validation" novalidate>
            <div class="mb-3">
              <label for="name" class="form-label">
                Nombre *
              </label>
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                required
              />
              <div class="invalid-feedback">Por favor, ingresa tu nombre.</div>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">
                Correo electrónico *
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                required
              />
              <div class="invalid-feedback">
                Por favor, ingresa un correo válido.
              </div>
            </div>

            <div class="mb-3">
              <label for="phone" class="form-label">
                Teléfono *
              </label>
              <input
                type="tel"
                class="form-control"
                id="phone"
                name="phone"
                required
              />
              <div class="invalid-feedback">
                Por favor, ingresa tu número de teléfono.
              </div>
            </div>

            <div class="mb-3">
              <label for="country" class="form-label">
                País de residencia *
              </label>
              <select
                class="form-select"
                id="country"
                name="country"
                required
                onchange="toggleOtherCountryField()"
              >
                <option value="">Seleccione su país</option>
                <option value="chile">Chile</option>
                <option value="argentina">Argentina</option>
                <option value="mexico">México</option>
                <option value="colombia">Colombia</option>
                <option value="peru">Perú</option>
                <option value="brasil">Brasil</option>
                <option value="otros">Otros</option>
              </select>
              <div class="invalid-feedback">Por favor, selecciona tu país.</div>
            </div>

            <div class="mb-3" id="otherCountryField" style="display: none">
              <label for="otherCountry" class="form-label">
                Escribe tu país *
              </label>
              <input
                type="text"
                class="form-control"
                id="otherCountry"
                name="otherCountry"
              />
              <div class="invalid-feedback">Por favor, ingresa tu país.</div>
            </div>

            <div class="mb-3">
              <label for="message" class="form-label">
                Información Adicional
              </label>
              <textarea
                class="form-control"
                id="message"
                name="message"
              ></textarea>
            </div>

            <div class="form-check mb-3">
              <input
                type="checkbox"
                id="terminos"
                name="terminos"
                class="form-check-input"
                required
              />
              <label class="form-check-label" for="terminos">
                He leído y acepto los términos & condiciones
              </label>
            </div>

            <button type="submit" class="btn btn-success w-100">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>;
};

export default ContactInformationForm