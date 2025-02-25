/* eslint-disable react/prop-types */
const PaymentFailure = ({
  title,
  message,
  recommendations,
  retryLink,
  homeLink,
}) => {
  return (
    <div className="container mt-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-danger text-white opacity-50">
              {title}
            </div>
            <div className="card-body">
              <h1 className="display-4 text-danger">¡Algo salió mal!</h1>
              <p className="lead">{message}</p>
              <hr />
              <h5 className="text-muted">Recomendaciones a seguir</h5>
              <ul className="list-group list-group-flush">
                {recommendations.map((rec, index) => (
                  <li key={index} className="list-group-item">
                    {rec}
                  </li>
                ))}
              </ul>
              <a
                href={retryLink}
                className="btn btn-danger mt-4 opacity-50 text-white"
              >
                Intentar de nuevo
              </a>
              <a
                href={homeLink}
                className="btn btn-danger mt-4 opacity-50 text-white"
              >
                Volver al inicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
