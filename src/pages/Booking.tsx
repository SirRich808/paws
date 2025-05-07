
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useCustomer } from "../contexts/CustomerContext";

// Import required UI components
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Import our new booking components
import BookingProgressStepper from "../components/booking/BookingProgressStepper";
import CustomerInfoStep from "../components/booking/CustomerInfoStep";
import ScheduleStep from "../components/booking/ScheduleStep";
import ReviewStep from "../components/booking/ReviewStep";
import PaymentStep from "../components/booking/PaymentStep";
import BookingSuccess from "../components/booking/BookingSuccess";
import { BookingFormValues } from "../components/booking/BookingTypes";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const navigate = useNavigate();
  const { authState } = useCustomer();

  // Extract values from URL parameters
  const planFromUrl = searchParams.get("plan") || "weekly";
  const dogsFromUrl = searchParams.get("dogs") || "1";
  const priceFromUrl = searchParams.get("price") || "19.99";

  const form = useForm<BookingFormValues>({
    defaultValues: {
      firstName: authState.customer?.name?.split(' ')[0] || '',
      lastName: authState.customer?.name?.split(' ')[1] || '',
      email: authState.customer?.email || '',
      phone: authState.customer?.phone || '',
      address: authState.customer?.address || '',
      city: "Pahoa",
      state: "HI",
      zipCode: "96778",
      serviceDate: "",
      serviceTime: "",
      specialInstructions: "",
      numDogs: dogsFromUrl,
      servicePlan: planFromUrl,
    },
  });

  // Available time slots
  const timeSlots = [
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
  ];

  // Calculate price based on number of dogs and service plan
  const calculatePrice = () => {
    const numDogs = parseInt(form.getValues("numDogs") || "1");
    const plan = form.getValues("servicePlan");
    
    let basePrice = 19.99;
    
    if (plan === "biweekly") {
      basePrice = 24.99;
    } else if (plan === "monthly") {
      basePrice = 29.99;
    } else if (plan === "onetime") {
      basePrice = 34.99;
    }
    
    // Add $5 for each additional dog
    const additionalDogs = Math.max(0, numDogs - 1);
    return basePrice + (additionalDogs * 5);
  };

  // Next step handler
  const handleNextStep = async () => {
    if (currentStep === 1) {
      // Validate customer info
      const valid = await form.trigger([
        "firstName",
        "lastName",
        "email",
        "phone",
        "address",
        "city",
        "state",
        "zipCode"
      ]);
      
      if (valid) setCurrentStep(2);
    } 
    else if (currentStep === 2) {
      // Validate scheduling info
      const valid = await form.trigger([
        "serviceDate",
        "serviceTime",
      ]);
      
      if (valid) setCurrentStep(3);
    }
    else if (currentStep === 3) {
      // Go to payment step
      setCurrentStep(4);
    }
  };

  // Previous step handler
  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Form submission handler
  const onSubmit = (data: BookingFormValues) => {
    setIsLoading(true);
    
    // Simulate API call for payment processing
    setTimeout(() => {
      setIsLoading(false);
      setBookingComplete(true);
      setConfirmationNumber(`APS${Math.floor(Math.random() * 10000)}`);
      
      toast.success("Booking successful!");
      
      // In a real app, this would send the booking data to your backend
      console.log("Booking data:", data);
    }, 1500);
  };
  
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
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl">Book Your Pet Waste Service</CardTitle>
                  <CardDescription>
                    Please complete the form below to schedule your pet waste removal service.
                  </CardDescription>
                  
                  <BookingProgressStepper currentStep={currentStep} />
                </CardHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent>
                      {/* Step 1: Customer Information */}
                      {currentStep === 1 && (
                        <CustomerInfoStep form={form} />
                      )}
                      
                      {/* Step 2: Schedule */}
                      {currentStep === 2 && (
                        <ScheduleStep form={form} timeSlots={timeSlots} today={today} />
                      )}
                      
                      {/* Step 3: Review */}
                      {currentStep === 3 && (
                        <ReviewStep form={form} calculatePrice={calculatePrice} />
                      )}
                      
                      {/* Step 4: Payment */}
                      {currentStep === 4 && (
                        <PaymentStep form={form} calculatePrice={calculatePrice} />
                      )}
                    </CardContent>
                    
                    <CardFooter className="flex justify-between border-t pt-6">
                      {currentStep > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handlePrevStep}
                        >
                          Back
                        </Button>
                      )}
                      
                      <div className={currentStep === 1 ? "ml-auto" : ""}>
                        {currentStep < 4 ? (
                          <Button
                            type="button"
                            className="bg-lava hover:bg-ember"
                            onClick={handleNextStep}
                          >
                            Continue
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            className="bg-lava hover:bg-ember"
                            disabled={isLoading}
                          >
                            {isLoading ? "Processing..." : `Pay $${calculatePrice().toFixed(2)}`}
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;
