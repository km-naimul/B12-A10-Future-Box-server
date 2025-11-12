import React from "react";
import { useRouteError, Link } from "react-router"; 
const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-green-200">
        <h1 className="text-4xl font-bold mb-4"> Oops!Page not found.</h1>
      <h1 className="text-8xl font-bold text-error mb-4">404</h1>
      <h2 className="text-1xl font-normal mb-4">We can't find the page you are looking for.</h2>
      
      <Link to="/" className="btn btn-primary">
        ⬅ Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
