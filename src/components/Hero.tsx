
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        {/* This overlay div has a semi-transparent background */}
        <div className="absolute inset-0 bg-lava opacity-70 z-10"></div>
        
        {/* Image container - using img tag instead of background */}
        <img 
          src="/lovable-uploads/c8733489-7137-4b7a-9936-0fec54830978.png"
          alt="Hawaiian backyard"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-center text-white pt-20">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">
            Professional Pet Waste Removal in Hawaiian Paradise Park
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Enjoy a clean, fresh yard without the hassle. Weekly & bi-weekly service available.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/pricing" className="btn-primary text-lg">
              Start Weekly Service
            </Link>
            <a href="tel:8081234567" className="btn-secondary text-lg">
              Call Us: (808) 123-4567
            </a>
          </div>
          
          <div className="mt-8">
            <p className="text-xl mb-4">Trusted by over 100+ happy customers in Puna</p>
            <div className="flex justify-center items-center">
              <div className="flex -space-x-4">
                {/* Placeholder avatar images */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center overflow-hidden">
                    {i}
                  </div>
                ))}
              </div>
              <div className="ml-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2">4.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white z-20 animate-bounce">
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
