
import React from "react";

interface BookingProgressStepperProps {
  currentStep: number;
}

const BookingProgressStepper: React.FC<BookingProgressStepperProps> = ({ currentStep }) => {
  return (
    <div className="flex justify-between mt-6 mb-2">
      <div className={`flex flex-col items-center ${currentStep >= 1 ? "text-lava" : "text-gray-400"}`}>
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${currentStep >= 1 ? "border-lava bg-lava/10" : "border-gray-300"}`}>
          1
        </div>
        <span className="text-xs mt-1">Your Info</span>
      </div>
      
      <div className="flex-1 flex items-center px-2">
        <div className={`h-1 w-full rounded ${currentStep >= 2 ? "bg-lava" : "bg-gray-300"}`}></div>
      </div>
      
      <div className={`flex flex-col items-center ${currentStep >= 2 ? "text-lava" : "text-gray-400"}`}>
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${currentStep >= 2 ? "border-lava bg-lava/10" : "border-gray-300"}`}>
          2
        </div>
        <span className="text-xs mt-1">Schedule</span>
      </div>
      
      <div className="flex-1 flex items-center px-2">
        <div className={`h-1 w-full rounded ${currentStep >= 3 ? "bg-lava" : "bg-gray-300"}`}></div>
      </div>
      
      <div className={`flex flex-col items-center ${currentStep >= 3 ? "text-lava" : "text-gray-400"}`}>
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${currentStep >= 3 ? "border-lava bg-lava/10" : "border-gray-300"}`}>
          3
        </div>
        <span className="text-xs mt-1">Review</span>
      </div>
      
      <div className="flex-1 flex items-center px-2">
        <div className={`h-1 w-full rounded ${currentStep >= 4 ? "bg-lava" : "bg-gray-300"}`}></div>
      </div>
      
      <div className={`flex flex-col items-center ${currentStep >= 4 ? "text-lava" : "text-gray-400"}`}>
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${currentStep >= 4 ? "border-lava bg-lava/10" : "border-gray-300"}`}>
          4
        </div>
        <span className="text-xs mt-1">Payment</span>
      </div>
    </div>
  );
};

export default BookingProgressStepper;
