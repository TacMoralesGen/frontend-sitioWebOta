import './IndicatorStages.css'

// eslint-disable-next-line react/prop-types
const IndicatorStages = ({stage}) => {
  let class1, class2, classSpan;
  const classActive = "col-7 bg-success opacity-50 text-center fs-4 text-white fw-semibold align-content-center";
  const classNotActive = "col-5 bg-success-subtle opacity-50 fs-5 align-content-center text-lg-center";
  if (stage === 1){
    class1 = classActive + " rounded-end-5";
    class2 = classNotActive + " text-start";
    classSpan = "d-none d-md-inline";
  }
  else if (stage === 2){
    class1 = classNotActive + " text-end";
    class2 = classActive + " rounded-start-5";
    classSpan = "d-none d-sm-inline";
  }
  return (
    <section className="stage-indicator row bg-success-subtle fw w-100">
      <div className={class1}>
        1 Seleccionar <span className={classSpan}>Reserva</span>
      </div>
      <div className={class2}>
        2 Check Out
      </div>
    </section>
  );
};

export default IndicatorStages;
