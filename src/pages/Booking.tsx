
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useBookingForm } from "../hooks/useBookingForm";

// Import our booking components
import BookingFormContainer from "../components/booking/BookingFormContainer";
import BookingSuccess from "../components/booking/BookingSuccess";
import { useCustomer } from "@/contexts/CustomerContext";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { authState } = useCustomer();

  // Extract values from URL parameters
  const planFromUrl = searchParams.get("plan") || "weekly";
  const dogsFromUrl = searchParams.get("dogs") || "1";

  // Use our custom hook for form handling
  const {
    form,
    currentStep,
    isLoading,
    bookingComplete,
    confirmationNumber,
    calculatePrice,
    handleNextStep,
    handlePrevStep,
    onSubmit
  } = useBookingForm(planFromUrl, dogsFromUrl);

  // Available time slots
  const timeSlots = [
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
  ];
  
  // Today's date for min value
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            {bookingComplete ? (
              <BookingSuccess 
                confirmationNumber={confirmationNumber} 
                form={form}
                isAuthenticated={authState.isAuthenticated}
              />
            ) : (
              <BookingFormContainer
                form={form}
                currentStep={currentStep}
                isLoading={isLoading}
                timeSlots={timeSlots}
                today={today}
                calculatePrice={calculatePrice}
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                onSubmit={onSubmit}
              />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;
