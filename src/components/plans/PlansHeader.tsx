
import FrequencyToggle from "./FrequencyToggle";

interface PlansHeaderProps {
  frequency: string;
  setFrequency: (frequency: string) => void;
}

const PlansHeader = ({ frequency, setFrequency }: PlansHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Choose the plan that works best for you and your furry friends.
      </p>
      
      <FrequencyToggle frequency={frequency} setFrequency={setFrequency} />
    </div>
  );
};

export default PlansHeader;
