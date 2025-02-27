import React, { useState, useEffect } from 'react';
import PersonalInfo from './PersonalInfo';
import LocationInfo from './LocationInfo';
import AdditionalInfo from './AdditionalInfo';
import { createContact } from "../../../api"; // Importamos la función 'createContact'

function ContactInformationForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        country: '',
        otherCountry: '',
        message: '',
        terms: false,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.name.trim().match(/^[a-zA-Z\s]+$/)) {
            newErrors.name = 'Por favor, ingresa tu nombre solo con letras.';
        }
        if (!formData.email.includes('@')) {
            newErrors.email = 'Por favor, ingresa un correo válido.';
        }
        if (!formData.phone.match(/^[0-9]+$/)) {
            newErrors.phone = 'El teléfono debe contener solo números.';
        }
        if (!formData.terms) {
            newErrors.terms = 'Debes aceptar los términos y condiciones.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Si no hay errores, retornamos true
    };

    useEffect(() => {
        if (isSubmitted) validateForm();
    }, [formData, isSubmitted]);

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto de envío del formulario
        setIsSubmitted(true);
    
        if (validateForm()) {
            console.log("Formulario validado, enviando datos:", formData); // Log de los datos antes de enviarlos
    
            // Llamamos a la función 'createContact' para enviar los datos del formulario
            createContact(formData)
                .then(response => {
                    console.log("Respuesta del backend:", response); // Ver la respuesta del backend
                    // Si la API responde correctamente, mostramos un mensaje de éxito
                    alert('Formulario enviado con éxito');
                    
                    // Reseteamos el formulario
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        country: '',
                        otherCountry: '',
                        message: '',
                        terms: false,
                    });
    
                    setIsSubmitted(false);
                })
                .catch(error => {
                    console.error("Error al enviar el formulario:", error); // Log para errores
                    // Si ocurre un error, mostramos un mensaje de error
                    alert('Error al enviar el formulario');
                });
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-left">
                <div className="col-md-8">
                    <div className="card p- rounded-0">
                        <h2 className="mb-4 fw-bold">Datos de contacto</h2>
                        <form
                            id="contactForm"
                            className={`needs-validation ${isSubmitted ? 'was-validated' : ''}`}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <PersonalInfo formData={formData} handleChange={handleChange} errors={errors} />
                            <LocationInfo formData={formData} handleChange={handleChange} formValidated={isSubmitted} />
                            <AdditionalInfo formData={formData} handleChange={handleChange} />

                            <div className="form-check mb-3 ">
                                <input
                                    type="checkbox"
                                    id="terminos"
                                    name="terms"
                                    className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="form-check-label" htmlFor="terminos">
                                    He leído y acepto los términos & condiciones
                                </label>
                                {errors.terms && <div className="invalid-feedback">{errors.terms}</div>}
                            </div>

                            <button type="submit" className="btn btn-primary text-white w-100">
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactInformationForm;