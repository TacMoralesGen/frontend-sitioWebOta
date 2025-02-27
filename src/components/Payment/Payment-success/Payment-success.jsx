// eslint-disable-next-line react/prop-types
const PaymentSuccess = ({
  title,
  message,
  details,
  buttonText,
  buttonLink,
  buttonText2,
  buttonLink2,
}) => {
  return (
    <div className="container mt-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-success text-white opacity-50">
              {title}
            </div>
            <div className="card-body">
              <h1 className="display-4 text-success">¡Pago Exitoso!</h1>
              <p className="lead">{message}</p>
              <hr />
              <p className="text-muted">{details}</p>
              <a
                href={buttonLink}
                className="btn btn-success mt-4 opacity-50 text-white"
              >
                {buttonText}
              </a>
              <a
                href={buttonLink2}
                className="btn btn-success mt-4 opacity-50 text-white"
              >
                {buttonText2}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
