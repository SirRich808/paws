
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div>
      <Navigation />
      <div className="flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center max-w-lg mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-lava mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Oops! Page not found</h2>
          <p className="text-gray-600 mb-8">
            Looks like this page has run away faster than a dog without a leash! Don't worry, our team is hot on its trail.
          </p>
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=800" 
              alt="Confused dog" 
              className="max-w-[300px] rounded-lg mx-auto shadow-lg"
            />
          </div>
          <Link to="/" className="btn-primary inline-flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
