import { useNavigate } from "react-router-dom";
import { Button } from "../Components/ui/Button";
import NotFoundImage from "../assets/NotFound.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-light-bg dark:bg-dark-bg">
      {/* Illustration */}
      <img
        src={NotFoundImage}
        alt="Page not found illustration"
        className="w-72 md:w-96 mb-6 rounded-xl"
      />

      {/* 404 Title */}
      <h1 className="text-5xl font-extrabold text-accent dark:text-dark-accent mb-2">
        404
      </h1>

      {/* Subtitle */}
      <p className="text-title mb-2">Oops! Page not found.</p>

      {/* Description */}
      <p className="text-subtitle max-w-md mb-6">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>

      {/* Back Home Button */}
      <Button onClick={() => navigate("/")}>Go Back Home</Button>
    </div>
  );
};

export default NotFound;
