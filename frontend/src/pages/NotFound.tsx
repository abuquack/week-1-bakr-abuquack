import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-primary">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg max-w-lg">
        <h2 className="text-9xl font-extrabold text-primary mb-4">404</h2>
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h3>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn’t exist or has been moved. Please
          check the URL or go back to the homepage.
        </p>
        <Link
          to="/"
          className="px-6 py-3 text-white bg-primary font-semibold rounded-lg"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};
