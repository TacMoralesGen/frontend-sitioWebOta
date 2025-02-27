import React from "react";
import PersonalInfo from "./PersonalInfo";
import LocationInfo from "./LocationInfo";
import AdditionalInfo from "./AdditionalInfo";

function ContactInformationForm({ reservation, onChange, errors, isSubmitted }) {
  return (
    <div className="container">
      <div className="row justify-content-left">
        <div className="col-md-8">
          <div className="card p-4">
            <h1 className="mb-4">Datos de contacto</h1>

            <form
              id="contactForm"
              className={`needs-validation ${isSubmitted ? "was-validated" : ""}`}
              noValidate
            >
              <PersonalInfo
                formData={reservation}
                handleChange={onChange}
                errors={errors}
                isSubmitted={isSubmitted}
              />
              <LocationInfo
                formData={reservation}
                handleChange={onChange}
                errors={errors}
                isSubmitted={isSubmitted}
              />
              <AdditionalInfo
                formData={reservation}
                handleChange={onChange}
                errors={errors}
                isSubmitted={isSubmitted}
              />

              {/* Ejemplo de un campo directo aquí mismo (checkbox 'terms') */}
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  id="terminos"
                  name="terms"
                  className={`form-check-input ${errors.terms ? "is-invalid" : ""}`}
                  checked={reservation.terms || false}
                  onChange={onChange}
                  required
                />
                <label className="form-check-label" htmlFor="terminos">
                  He leído y acepto los términos &amp; condiciones
                </label>
                {errors.terms && (
                  <div className="invalid-feedback">{errors.terms}</div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInformationForm;