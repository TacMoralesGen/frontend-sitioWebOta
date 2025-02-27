import React from 'react';

function AdditionalInfo({ formData, handleChange }) {
    return (
        <>
            <div className="mb-3">
                <label htmlFor="message" className="form-label">Información Adicional</label>
                <textarea
                    className="form-control"
                    id="notes"
                    name="notes"
                    value={formData.message}
                    onChange={handleChange}
                ></textarea>
            </div>

        </>
    );
}

export default AdditionalInfo;