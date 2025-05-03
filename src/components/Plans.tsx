
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../hooks/use-toast";

const Plans = () => {
  const { toast } = useToast();
  const [frequency, setFrequency] = useState("weekly");
  
  const plans = {
    weekly: [
      {
        title: "1 Dog",
        price: 19.99,
        description: "Perfect for homes with a single furry friend",
        features: [
          "Once per week service",
          "Complete yard cleanup",
          "Same day each week",
          "Text notifications",
        ],
        priceId: "price_weekly_1dog"
      },
      {
        title: "2 Dogs",
        price: 24.99,
        description: "Great for homes with two pups",
        features: [
          "Once per week service",
          "Complete yard cleanup",
          "Same day each week",
          "Text notifications",
        ],
        priceId: "price_weekly_2dogs",
        popular: true
      },
      {
        title: "3 Dogs",
        price: 29.99,
        description: "For households with three furry friends",
        features: [
          "Once per week service",
          "Complete yard cleanup",
          "Same day each week",
          "Text notifications",
        ],
        priceId: "price_weekly_3dogs"
      },
      {
        title: "4+ Dogs",
        price: 34.99,
        description: "For the serious dog lovers",
        features: [
          "Once per week service",
          "Complete yard cleanup",
          "Same day each week",
          "Text notifications",
        ],
        priceId: "price_weekly_4dogs"
      }
    ],
    biweekly: [
      {
        title: "1 Dog",
        price: 26.99,
        description: "Perfect for homes with a single furry friend",
        features: [
          "Once every two weeks",
          "Complete yard cleanup",
          "Same day each visit",
          "Text notifications",
        ],
        priceId: "price_biweekly_1dog"
      },
      {
        title: "2 Dogs",
        price: 32.99,
        description: "Great for homes with two pups",
        features: [
          "Once every two weeks",
          "Complete yard cleanup",
          "Same day each visit",
          "Text notifications",
        ],
        priceId: "price_biweekly_2dogs",
        popular: true
      },
      {
        title: "3 Dogs",
        price: 38.99,
        description: "For households with three furry friends",
        features: [
          "Once every two weeks",
          "Complete yard cleanup",
          "Same day each visit",
          "Text notifications",
        ],
        priceId: "price_biweekly_3dogs"
      },
      {
        title: "4+ Dogs",
        price: 44.99,
        description: "For the serious dog lovers",
        features: [
          "Once every two weeks",
          "Complete yard cleanup",
          "Same day each visit",
          "Text notifications",
        ],
        priceId: "price_biweekly_4dogs"
      }
    ]
  };
  
  const handleCheckout = (priceId: string) => {
    // In a real implementation, this would redirect to Stripe
    toast({
      title: "Redirecting to checkout",
      description: `Selected plan: ${priceId}`,
    });
    console.log(`Checkout with price ID: ${priceId}`);
  };
  
  return (
    <section id="plans" className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for you and your furry friends.
          </p>
          
          <div className="mt-8 inline-flex items-center p-1 bg-gray-200 rounded-lg">
            <button
              className={`px-6 py-2 rounded-md ${
                frequency === "weekly" 
                  ? "bg-white shadow-md text-lava" 
                  : "bg-transparent text-gray-600"
              }`}
              onClick={() => setFrequency("weekly")}
            >
              Weekly
            </button>
            <button
              className={`px-6 py-2 rounded-md ${
                frequency === "biweekly" 
                  ? "bg-white shadow-md text-lava" 
                  : "bg-transparent text-gray-600"
              }`}
              onClick={() => setFrequency("biweekly")}
            >
              Bi-Weekly
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {plans[frequency].map((plan) => (
            <div 
              key={plan.title}
              className={`rounded-xl overflow-hidden transition-all duration-300 hover-lift ${
                plan.popular 
                  ? "border-2 border-ember shadow-lg relative" 
                  : "border border-gray-200 shadow"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-ember text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <div className="bg-white p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-500 ml-1">/{frequency === "weekly" ? "week" : "visit"}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-tropic mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleCheckout(plan.priceId)}
                  className={`w-full py-3 rounded-lg font-medium ${
                    plan.popular 
                      ? "bg-ember text-white hover:bg-opacity-90" 
                      : "bg-lava text-white hover:bg-opacity-90"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            All plans include our satisfaction guarantee. No contracts - cancel anytime.
          </p>
          <a href="tel:8081234567" className="text-ember hover:underline font-medium">
            Questions? Call us at (808) 123-4567
          </a>
        </div>
      </div>
    </section>
  );
};

export default Plans;
