
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imagePath = "/lovable-uploads/96adf5e6-14b4-4501-bae7-5a20da774c5b.png";
  
  // Track when the full image has loaded
  useEffect(() => {
    const img = new Image();
    img.src = imagePath;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        {/* This overlay div has a semi-transparent background */}
        <div className="absolute inset-0 bg-lava opacity-70 z-10"></div>
        
        {/* Low quality placeholder that shows immediately */}
        <div 
          className="absolute inset-0 bg-lava/30"
          style={{ 
            backgroundImage: `url('data:image/jpeg;base64,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')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            transition: 'opacity 0.5s ease-in-out'
          }}
          className={`${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
        />
        
        {/* High quality image that loads in the background */}
        <img 
          src={imagePath}
          alt="Hawaiian backyard with poop cleanup service visualization"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
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
