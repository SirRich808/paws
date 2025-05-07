
import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BookingFormValues } from "@/types/booking";
import { useCustomer } from "@/contexts/CustomerContext";

export const useBookingForm = (planFromUrl: string, dogsFromUrl: string) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const { authState } = useCustomer();

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
  const onSubmit = async (data: BookingFormValues) => {
    setIsLoading(true);
    
    try {
      // Save booking to Supabase if user is authenticated
      if (authState.isAuthenticated && authState.customer) {
        // Get service plan ID based on selected plan frequency
        const { data: servicePlan } = await supabase
          .from('service_plans')
          .select('id')
          .eq('frequency', data.servicePlan)
          .single();
          
        if (servicePlan) {
          // Insert booking into Supabase
          const { error } = await supabase.from('bookings').insert({
            customer_id: authState.customer.id,
            service_plan_id: servicePlan.id,
            num_dogs: parseInt(data.numDogs),
            service_date: data.serviceDate,
            service_time: data.serviceTime,
            special_instructions: data.specialInstructions,
            total_price: calculatePrice(),
            address: `${data.address}, ${data.city}, ${data.state} ${data.zipCode}`,
          });
          
          if (error) {
            console.error("Error saving booking:", error);
            toast.error("Failed to save booking");
            setIsLoading(false);
            return;
          }
        }
      }
      
      // Generate confirmation number
      const confirmNum = `APS${Math.floor(Math.random() * 10000)}`;
      setConfirmationNumber(confirmNum);
      setBookingComplete(true);
      toast.success("Booking successful!");
      
    } catch (error) {
      console.error("Booking submission error:", error);
      toast.error("There was a problem processing your booking");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    currentStep,
    isLoading,
    bookingComplete,
    confirmationNumber,
    calculatePrice,
    handleNextStep,
    handlePrevStep,
    onSubmit,
  };
};
