
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
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-lava shadow-lg" : "bg-lava"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link
              to="/"
              className="text-white font-playfair text-2xl font-bold transition-all duration-300 hover:text-ember"
            >
              Pacific Animal Waste Services
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <NavLinks />
              
              <div className="flex items-center space-x-6">
                <a
                  href="tel:8081234567"
                  className="text-white hover:text-ember transition-colors duration-300"
                >
                  (808) 123-4567
                </a>
                
                {authState.isAuthenticated ? (
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-white hover:text-ember transition-colors duration-300"
                  >
                    <User size={20} />
                    <span>My Account</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-white hover:text-ember transition-colors duration-300"
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
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[72px] left-0 right-0 bg-lava z-40 animate-fade-in shadow-xl">
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
              <a
                href="tel:8081234567"
                className="text-white hover:text-ember transition-colors flex items-center justify-center py-2 hover:scale-105 duration-300"
              >
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
      
      {/* Empty space to prevent content from being hidden under the navbar */}
      <div className="h-[76px]"></div>
    </>
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
          className={`
            text-white hover:text-ember transition-all duration-300
            ${mobile 
              ? "block py-3 text-center text-lg" 
              : "px-3 py-1 font-medium hover:scale-105"}
          `}
          onClick={closeMenu}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default Navigation;
