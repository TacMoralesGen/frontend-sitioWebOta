import React from 'react';

function LocationInfo({ formData, handleChange, formValidated }) {
    return (
        <>
            <div className="mb-3">
                <label htmlFor="country" className="form-label">País de residencia *</label>
                <select
                    className={`form-select ${formValidated && !formData.country ? 'is-invalid' : ''}`}
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
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
                <div className="invalid-feedback">Por favor, selecciona tu país.</div>
            </div>

            {formData.country === 'otros' && (
                <div className="mb-3" id="otherCountryField">
                    <label htmlFor="otherCountry" className="form-label">Escribe tu país *</label>
                    <input
                        type="text"
                        className={`form-control ${formValidated && !formData.otherCountry ? 'is-invalid' : ''}`}
                        id="otherCountry"
                        name="otherCountry"
                        value={formData.otherCountry}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">Por favor, ingresa tu país.</div>
                </div>
            )}
        </>
    );
}

export default LocationInfo;