
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

interface PlanCardProps {
  title: string;
  price: number;
  description: string;
  features: string[];
  priceId: string;
  popular?: boolean;
  frequency: "weekly" | "biweekly";
}

const PlanCard = ({ 
  title, 
  price, 
  description, 
  features, 
  priceId, 
  popular = false,
  frequency
}: PlanCardProps) => {
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    // Extract the dog count from the title
    const dogCount = title.split(" ")[0];
    
    // Navigate to booking page with plan information
    navigate(`/booking?plan=${frequency}&dogs=${dogCount}&price=${price}`);
  };

  return (
    <div 
      className={`rounded-xl overflow-hidden transition-all duration-300 hover-lift ${
        popular 
          ? "border-2 border-ember shadow-lg relative" 
          : "border border-gray-200 shadow"
      }`}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-ember text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
          Most Popular
        </div>
      )}
      
      <div className="bg-white p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="flex items-end mb-4">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-gray-500 ml-1">/{frequency === "weekly" ? "week" : "visit"}</span>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-tropic mr-2 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <button
          onClick={handleCheckout}
          className={`w-full py-3 rounded-lg font-medium ${
            popular 
              ? "bg-ember text-white hover:bg-opacity-90" 
              : "bg-lava text-white hover:bg-opacity-90"
          }`}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
