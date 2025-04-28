
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-netflix-black text-white p-6">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold text-netflix-red mb-6">404</h1>
        <p className="text-xl mb-6">
          We couldn't find the page you were looking for.
        </p>
        <p className="text-netflix-gray mb-8">
          It might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild>
          <Link to="/" className="bg-netflix-red hover:bg-netflix-red/90">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
