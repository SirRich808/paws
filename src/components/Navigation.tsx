
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useCustomer } from "../contexts/CustomerContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { authState } = useCustomer();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-lava bg-opacity-95 py-2 shadow-lg" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center bg-lava bg-opacity-90 rounded-full px-6 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
          <Link to="/" className="text-white font-playfair text-2xl font-bold transition-all duration-300 hover:text-ember">
            Aloha Poop Scoop
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            
            <div className="flex items-center space-x-4">
              <a 
                href="tel:8081234567" 
                className="text-white hover:text-ember transition-colors duration-300 hover:scale-105"
              >
                (808) 123-4567
              </a>
              {authState.isAuthenticated ? (
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 text-white hover:text-ember transition-colors duration-300 hover:scale-105"
                >
                  <User size={20} />
                  <span>My Account</span>
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center gap-2 text-white hover:text-ember transition-colors duration-300 hover:scale-105"
                >
                  <User size={20} />
                  <span>Login</span>
                </Link>
              )}
              <Link 
                to="/pricing" 
                className="btn-primary shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
              >
                Start Weekly Service
              </Link>
            </div>
          </div>

          <button 
            className="md:hidden text-white hover:text-ember transition-colors duration-300" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-lava animate-fade-in rounded-b-2xl mt-2 mx-4 shadow-xl">
          <div className="container mx-auto px-4 py-6 space-y-4">
            <div className="flex flex-col space-y-4">
              <NavLinks mobile={true} closeMenu={() => setIsMenuOpen(false)} />
            </div>
            <div className="flex flex-col space-y-4 pt-4 border-t border-gray-700">
              {authState.isAuthenticated ? (
                <Link 
                  to="/profile" 
                  className="text-white hover:text-ember transition-colors flex items-center justify-center gap-2 py-2 hover:scale-105 duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                  <span>My Account</span>
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="text-white hover:text-ember transition-colors flex items-center justify-center gap-2 py-2 hover:scale-105 duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                  <span>Login</span>
                </Link>
              )}
              <a href="tel:8081234567" className="text-white hover:text-ember transition-colors flex items-center justify-center py-2 hover:scale-105 duration-300">
                Call: (808) 123-4567
              </a>
              <Link 
                to="/pricing" 
                className="btn-primary text-center shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                onClick={() => setIsMenuOpen(false)}
              >
                Start Weekly Service
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLinks = ({ mobile = false, closeMenu = () => {} }) => {
  const links = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/#how-it-works" },
    { name: "Pricing", path: "/pricing" },
    { name: "Commercial", path: "/commercial" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={`text-white hover:text-ember transition-all duration-300 hover:scale-105 ${
            mobile ? "block py-2 text-center" : ""
          }`}
          onClick={closeMenu}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default Navigation;
