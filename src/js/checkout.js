//DOMCONTENTLOADED
document.addEventListener("DOMContentLoaded", () => {
  //activar tooltips de bootstrap
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  //formulario checkout
  function toggleOtherCountryField() {
    const countrySelect = document.getElementById("country");
    const otherCountryField = document.getElementById("otherCountryField");
    const otherCountryInput = document.getElementById("otherCountry");
  
    if (countrySelect.value === "otros") {
      otherCountryField.style.display = "block";
      otherCountryInput.setAttribute("required", "required");
    } else {
      otherCountryField.style.display = "none";
      otherCountryInput.removeAttribute("required");
      otherCountryInput.value = ""; // Limpiar el campo si no es visible
    }
  }
  
  (function () {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
  
    Array.from(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const nameRange = /^[a-zA-Z\s]+$/; //para validar que el nombre solo contenga letras y espacios
        const phoneRange = /^[0-9]+$/; //para validar que el teléfono solo contenga números
  
        if (!nameRange.test(nameInput.value)) {
          nameInput.setCustomValidity('Por favor, ingresa solo letras.'); //Si el valor del nombre no coincide con la expresión regular, enviar un mensaje de error
          nameInput.classList.add('is-invalid');
        } else {
          nameInput.setCustomValidity(''); //Si el valor del nombre es válido, eliminar el mensaje de error
          nameInput.classList.remove('is-invalid');
        }
  
        if (!phoneRange.test(phoneInput.value)) {
          phoneInput.setCustomValidity('Por favor, ingresa solo números.');
          phoneInput.classList.add('is-invalid');
        } else {
          phoneInput.setCustomValidity('');
          phoneInput.classList.remove('is-invalid');
        }
  
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          alert('Formulario enviado con éxito');
          form.reset();
        }
  
        form.classList.add('was-validated');
      }, false);
    });
  })();
  
});
