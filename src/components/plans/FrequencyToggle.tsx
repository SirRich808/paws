
interface FrequencyToggleProps {
  frequency: string;
  setFrequency: (frequency: string) => void;
}

const FrequencyToggle = ({ frequency, setFrequency }: FrequencyToggleProps) => {
  return (
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
  );
};

export default FrequencyToggle;
