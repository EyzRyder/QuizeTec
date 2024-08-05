import { Link, useRouteError, useNavigate } from "react-router-dom";

export default function Error() {
  const error = useRouteError() as any;
  const navigate = useNavigate();

  console.log("Error ~ ", error);
  return (
    <div className="error">
      <h1>Uh oh! We've got a problem.</h1>
      <p>{error?.message || error?.statusText}</p>
      <div className="flex-md">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          <span>Go Back</span>
        </button>
        <Link to="/" className="btn btn--dark">
          <span>Go home</span>
        </Link>
      </div>
    </div>
  );
}
