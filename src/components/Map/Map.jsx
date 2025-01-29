const Map = () => {
    <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="ratio ratio-16x9">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d994203.3604247845!2d-72.9097185!3d-46.180418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbdf29f70f449fbef%3A0xa0328ec0c6bc05d!2sAer%C3%B3dromo%20Balmaceda%2C%20Coyhaique%2C%20Ays%C3%A9n!5e0!3m2!1ses-419!2scl!4v1615364676789"
            allowfullscreen=""
            loading="lazy"
          >
          </iframe>
        </div>
      </div>
      <div class="col-md-6">
        <h3 class="text-primary py-4">¿Cómo encontrarnos?</h3>
        <ul>
          <li>
            Primero debe llegar vía aérea al Aeródromo Balmaceda de Coyhaique,
            <br />
            Región de Aysen, Chile.
          </li>
          <li>Continúe a lo largo de la ruta 245 por 15.9 kms.</li>
          <li>Gire a la izquierda hacia la Carretera Austral o Ruta 7.</li>
          <li>Continúe por otros 163 kms hasta llegar a Chelenko Lodge.</li>
        </ul>
        <a
          href="https://www.google.com/maps/dir/Aeródromo+Balmaceda,+Coyhaique,+Aysén/Chelenko+Lodge+-+Carretera+Austral,+El+Condor,+Río+Ibáñez/@-46.180418,-72.9097185,9z/am=t/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0xbdf29f70f449fbef:0xa0328ec0c6bc05d!2m2!1d-71.6918239!2d-45.9147796!1m5!1m1!1s0xbd9259c86994b1f9:0xdab48173ce8ddfe8!2m2!1d-72.7197428!2d-46.5247491?entry=ttu&g_ep=EgoyMDI1MDEyMS4wIKXMDSoASAFQAw%3D%3D"
          class="btn btn-primary rounded-pill"
          target="_blank"
          ><strong>Obtener Direcciones</strong></a
        >
      </div>
    </div>
  </div>
}

export default Map;