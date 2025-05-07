
import { useState } from "react";
import { plansData } from "./plans/PlansData";
import PlansHeader from "./plans/PlansHeader";
import PlanCard from "./plans/PlanCard";
import PlansFooter from "./plans/PlansFooter";

const Plans = () => {
  const [frequency, setFrequency] = useState("weekly");
  
  return (
    <section id="plans" className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <PlansHeader frequency={frequency} setFrequency={setFrequency} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {plansData[frequency].map((plan) => (
            <PlanCard 
              key={plan.title}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              priceId={plan.priceId}
              popular={plan.popular}
              frequency={frequency as "weekly" | "biweekly"}
            />
          ))}
        </div>
        
        <PlansFooter />
      </div>
    </section>
  );
};

export default Plans;
