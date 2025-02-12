import './SelectCabins.css';

const SelectCabins = () => {
    return (
        <section className="col-12 col-md-8">
          <div className="card p-3">
            <div className="row mb-4">
              <div className="col-12 col-md-5">
                <img src="/web-ota/public/chalenco 1.jpg" alt="Tiny cabin" className="responsive-image" />
              </div>
              <div className="col-12 col-md-7 py-3 px-4 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-3">Tiny cabin</h6>
                  <button className="btn custom-button">Disponibilidad</button>
                </div>
                <div>
                  <span>
                    <i className="fa fa-battery-full" aria-hidden="true"></i>
                    <i className="fa fa-headphones" aria-hidden="true"></i>
                  </span>
                  <p>Ocupación máxima 4 personas</p>
                  <p>Estadía mínima 1 noche.</p>
                  <p>Categoría $160.900</p>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <p>
                    <img src="/web-ota/public/ojo.ico" alt="Ícono de ojo" className="icono-pequeno" /> Ver detalles
                  </p>
                  <div className="d-flex flex-row flex-wrap">
                    <div className="form-group mx-2">
                      <label className="form-label" htmlFor="adults">Adulto(s)</label>
                      <select id="adults" className="form-select form-select-sm" aria-label="select example">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3" selected>3</option>
                      </select>
                    </div>
                    <div className="form-group mx-2">
                      <label className="form-label" htmlFor="children">Niño(s)</label>
                      <select id="children" className="form-select form-select-sm" aria-label="select example">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4" selected>4</option>
                      </select>
                    </div>
                    <div className="form-group mx-2">
                      <label className="form-label" htmlFor="lodge">Lodge</label>
                      <select className="form-select form-select-sm lodge" aria-label="select example">
                        <option value="1">1</option>
                        <option value="2" selected>2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row mb-4">
              <div className="col-12 col-md-5">
                <img src="/web-ota/public/chalenco 2.avif" alt="Suite" className="responsive-image" />
              </div>
              <div className="col-12 col-md-7 py-3 px-4 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-3">Suite</h6>
                  <button className="btn custom-button">Disponibilidad</button>
                </div>
                <div>
                  <span>
                    <i className="fa fa-battery-full" aria-hidden="true"></i>
                    <i className="fa fa-headphones" aria-hidden="true"></i>
                  </span>
                  <p>Ocupación máxima 2 personas</p>
                  <p>Estadía mínima 1 noche.</p>
                  <p>Categoría $91.900</p>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <p>
                    <img src="/web-ota/public/ojo.ico" alt="Ícono de ojo" className="icono-pequeno" /> Ver detalles
                  </p>
                  <div className="d-flex flex-row flex-wrap">
                    <div className="form-group mx-2">
                      <label className="form-label" htmlFor="adults">Adulto(s)</label>
                      <select id="adults" className="form-select form-select-sm" aria-label="select example">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3" selected>3</option>
                      </select>
                    </div>
                    <div className="form-group mx-2">
                      <label className="form-label" htmlFor="children">Niño(s)</label>
                      <select id="children" className="form-select form-select-sm" aria-label="select example">
                        <option value="0" selected>0</option>
                      </select>
                    </div>
                    <div className="form-group mx-2">
                      <label className="form-label" htmlFor="lodge">Lodge</label>
                      <select className="form-select form-select-sm lodge" aria-label="select example">
                        <option value="1" selected>1</option>
                        <option value="2">2</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}

export default SelectCabins;