import React from 'react';

function PersonalInfo({ formData, handleChange, errors }) {
    return (
        <>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre *</label>
                <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico *</label>
                <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Teléfono *</label>
                <input
                    type="tel"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
        </>
    );
}

export default PersonalInfo;