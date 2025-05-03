
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Schedule Your Service",
      description: "Choose weekly or bi-weekly service. We'll visit on the same day each week.",
      icon: "📆"
    },
    {
      number: 2,
      title: "We Clean Your Yard",
      description: "Our professional team removes all pet waste, sanitizes affected areas, and deodorizes when needed.",
      icon: "🧹"
    },
    {
      number: 3,
      title: "Enjoy A Clean Yard",
      description: "Return to a clean, fresh yard that's safe and enjoyable for your entire family.",
      icon: "🏡"
    }
  ];
  
  return (
    <section id="how-it-works" className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make keeping your yard clean and safe as simple as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {steps.map((step) => (
            <div 
              key={step.number}
              className="rounded-lg p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center animate-fade-in"
            >
              <div className="bg-tropic text-white text-3xl h-16 w-16 rounded-full flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gray-100 rounded-lg p-8 animate-fade-in">
          <h3 className="text-2xl font-bold mb-6 text-center">Every Service Includes:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Complete removal of all pet waste",
              "Thorough inspection of your entire yard",
              "Sanitization of affected areas",
              "Deodorizing treatment (as needed)",
              "Same-day service notification",
              "Waste properly disposed of",
              "Service even when you're not home",
              "Friendly, professional technicians"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center">
                <Check className="h-5 w-5 text-tropic mr-2 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/pricing" className="btn-primary inline-block">
            Start Weekly Service
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
