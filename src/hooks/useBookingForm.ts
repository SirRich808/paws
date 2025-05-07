
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BookingFormValues } from "@/types/booking";
import { useCustomer } from "@/contexts/CustomerContext";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useBookingForm = (planFromUrl: string, dogsFromUrl: string) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const { authState } = useCustomer();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Check if returning from successful payment
  const success = searchParams.get("success") === "true";
  const sessionId = searchParams.get("session_id") || localStorage.getItem("stripe_session_id");

  // Initialize form with user data if available
  const form = useForm<BookingFormValues>({
    defaultValues: {
      firstName: authState.customer?.name?.split(' ')[0] || '',
      lastName: authState.customer?.name?.split(' ')[1] || '',
      email: authState.customer?.email || '',
      phone: authState.customer?.phone || '',
      address: authState.customer?.address?.split(',')[0] || '',
      city: authState.customer?.address?.split(',')[1]?.trim() || "Pahoa",
      state: "HI",
      zipCode: "96778",
      serviceDate: "",
      serviceTime: "",
      specialInstructions: "",
      numDogs: dogsFromUrl || "1",
      servicePlan: planFromUrl || "weekly",
    },
    mode: "onChange" // Validate on change for better user experience
  });

  // Verify payment status if redirected from Stripe
  useEffect(() => {
    if (success && sessionId) {
      verifyPaymentStatus(sessionId);
    }
  }, [success, sessionId]);

  // Update form when customer data changes
  useEffect(() => {
    if (authState.customer) {
      form.setValue("firstName", authState.customer.name?.split(' ')[0] || '');
      form.setValue("lastName", authState.customer.name?.split(' ')[1] || '');
      form.setValue("email", authState.customer.email || '');
      form.setValue("phone", authState.customer.phone || '');
      
      if (authState.customer.address) {
        const addressParts = authState.customer.address.split(',');
        form.setValue("address", addressParts[0] || '');
        form.setValue("city", addressParts[1]?.trim() || 'Pahoa');
      }
    }
  }, [authState.customer, form]);

  // Verify payment status with our edge function
  const verifyPaymentStatus = async (stripeSessionId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { sessionId: stripeSessionId }
      });
      
      if (error) {
        toast.error(`Payment verification failed: ${error.message}`);
        setIsLoading(false);
        return;
      }
      
      if (data.success) {
        // Payment was successful and booking was created
        setConfirmationNumber(data.confirmationNumber);
        setBookingComplete(true);
        toast.success("Payment successful! Your booking is confirmed.");
        
        // Clear the session ID from localStorage
        localStorage.removeItem("stripe_session_id");
        
        // Redirect to remove query params
        navigate('/booking', { replace: true });
      } else {
        // Payment not completed yet
        toast.error("Payment not completed. Please try again.");
      }
    } catch (error: any) {
      console.error("Payment verification error:", error);
      toast.error(error.message || "There was a problem verifying your payment");
    } finally {
      setIsLoading(false);
    }
  };

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
    // Payment is now handled by Stripe, this function is kept for compatibility
    setIsLoading(true);
    
    try {
      // This is now handled by the payment verification function
      console.log("Submission will be handled by Stripe");
    } catch (error: any) {
      console.error("Booking submission error:", error);
      toast.error(error.message || "There was a problem processing your booking");
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
