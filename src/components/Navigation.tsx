
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        scrolled ? "bg-lava bg-opacity-95 py-2 shadow-md" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white font-playfair text-2xl font-bold">
            Aloha Poop Scoop
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            
            <div className="flex items-center space-x-4">
              <a href="tel:8081234567" className="text-white hover:text-ember transition-colors">
                (808) 123-4567
              </a>
              <Link to="/pricing" className="btn-primary">
                Start Weekly Service
              </Link>
            </div>
          </div>

          <button 
            className="md:hidden text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-lava animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="flex flex-col space-y-4">
              <NavLinks mobile={true} closeMenu={() => setIsMenuOpen(false)} />
            </div>
            <div className="flex flex-col space-y-4 pt-4 border-t border-gray-700">
              <a href="tel:8081234567" className="text-white hover:text-ember transition-colors flex items-center justify-center py-2">
                Call: (808) 123-4567
              </a>
              <Link 
                to="/pricing" 
                className="btn-primary text-center"
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
          className={`text-white hover:text-ember transition-colors ${
            mobile ? "block py-2 text-center" : ""
          }`}
          onClick={closeMenu}
        >
          {link.name}
        </Link>
      ))}
      <Link
        to="https://customer-portal-url.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`text-white hover:text-ember transition-colors ${
          mobile ? "block py-2 text-center" : ""
        }`}
        onClick={closeMenu}
      >
        Customer Login
      </Link>
    </>
  );
};

export default Navigation;
