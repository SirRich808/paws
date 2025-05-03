
import { useState, useRef, useEffect } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah K.",
      location: "Hawaiian Paradise Park",
      rating: 5,
      text: "The team at Aloha Poop Scoop is amazing! They're reliable, thorough, and my yard has never been cleaner. Worth every penny for the time and hassle they save me."
    },
    {
      name: "Mike T.",
      location: "Puna",
      rating: 5,
      text: "As a busy professional with three large dogs, their weekly service has been a game-changer. The text notifications when they're done are super convenient."
    },
    {
      name: "Jennifer L.",
      location: "Hawaiian Beaches",
      rating: 5,
      text: "I can finally enjoy my backyard again! The technicians are always friendly and professional, and they do a thorough job every time."
    },
    {
      name: "David W.",
      location: "Hawaiian Paradise Park",
      rating: 5,
      text: "Best service I've ever used. My lawn stays clean and my dogs are happy. They're consistent, reliable, and worth every penny."
    },
    {
      name: "Keala M.",
      location: "Ainaloa",
      rating: 5,
      text: "With four dogs, keeping up with yard cleanup was impossible. Aloha Poop Scoop has been a lifesaver. They never miss a spot!"
    }
  ];
  
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      handleNext();
    }
    
    if (touchStart - touchEnd < -50) {
      // Swipe right
      handlePrev();
    }
  };
  
  useEffect(() => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollTo({
        left: currentIndex * scrollContainer.current.offsetWidth,
        behavior: "smooth"
      });
    }
  }, [currentIndex]);
  
  // Auto scroll
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => {
      clearInterval(timer);
    };
  }, [currentIndex]);
  
  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied customers.
          </p>
          
          <div className="flex items-center justify-center mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600">4.9 average from 56 reviews</span>
          </div>
        </div>
        
        <div className="relative mt-8">
          <div 
            ref={scrollContainer}
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${testimonials.length * 100}%` 
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="w-full px-4 flex-shrink-0"
                >
                  <div className="bg-gray-50 rounded-xl p-8 shadow-md">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    
                    <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
                    
                    <div className="flex items-center">
                      <div className="bg-ember text-white h-10 w-10 rounded-full flex items-center justify-center">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-gray-500 text-sm">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 w-2 rounded-full mx-1 ${
                  currentIndex === index ? "bg-ember" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://www.google.com/maps/place/Hawaiian+Paradise+Park,+HI/@19.5960518,-154.9818249,12z/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-ember hover:underline"
          >
            <span>See all reviews on Google</span>
            <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
