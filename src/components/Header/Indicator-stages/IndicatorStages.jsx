import './IndicatorStages.css'

// eslint-disable-next-line react/prop-types
const IndicatorStages = ({stage}) => {
  let class1, class2, classSpan;
  if (stage === 1){
    class1 = "col-7 bg-success opacity-50 border border-success text fs-3 text-white fw-bold border-5 rounded-end-5";
    class2 = "col-5 bg-success-subtle opacity-50 text fs-4 align-content-center";
    classSpan = "d-none d-md-inline";
  }
  else{
    class1 = "col-5 bg-success-subtle opacity-50 text fs-4 align-content-center";
    class2 = "col-7 bg-success opacity-50 border border-success text fs-3 text-white border-5 rounded-start-5 fw-bold align-content-center";
    classSpan = "d-none d-lg-inline";
  }
  return (
    <section className="stage-indicator row text-center bg-success-subtle">
      <div className={class1}>
        1 Seleccionar <span className={classSpan}>fechas y cabaña</span>
      </div>
      <div className={class2}>
        2 Check Out
      </div>
    </section>
  );
};

export default IndicatorStages;
