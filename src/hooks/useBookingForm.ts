
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BookingFormValues } from "@/types/booking";
import { useCustomer } from "@/contexts/CustomerContext";
import { useNavigate } from "react-router-dom";

export const useBookingForm = (planFromUrl: string, dogsFromUrl: string) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const { authState } = useCustomer();
  const navigate = useNavigate();

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
      // Format the full address for storage
      const fullAddress = `${data.address}, ${data.city}, ${data.state} ${data.zipCode}`;
      
      // Get service plan ID based on selected plan frequency
      const { data: servicePlan, error: planError } = await supabase
        .from('service_plans')
        .select('id')
        .eq('frequency', data.servicePlan)
        .single();
        
      if (planError) {
        console.error("Error fetching service plan:", planError);
        throw new Error("Unable to find the selected service plan");
      }
        
      // Prepare customer information for non-authenticated users
      let customerId = authState.customer?.id;
      
      if (!customerId) {
        // For non-authenticated users, first create a customer record
        const customerName = `${data.firstName} ${data.lastName}`;
        
        const { data: newCustomer, error: customerError } = await supabase
          .from('customers')
          .insert({
            name: customerName,
            email: data.email,
            phone: data.phone,
            address: fullAddress
          })
          .select()
          .single();
        
        if (customerError) {
          console.error("Error creating customer:", customerError);
          throw new Error("Failed to create customer record");
        }
        
        customerId = newCustomer.id;
      }

      // Insert booking into Supabase with the appropriate customer ID
      const { error: bookingError } = await supabase.from('bookings').insert({
        customer_id: customerId,
        service_plan_id: servicePlan.id,
        num_dogs: parseInt(data.numDogs),
        service_date: data.serviceDate,
        service_time: data.serviceTime,
        special_instructions: data.specialInstructions,
        total_price: calculatePrice(),
        address: fullAddress,
        status: 'scheduled'
      });
      
      if (bookingError) {
        console.error("Error saving booking:", bookingError);
        throw new Error("Failed to save your booking");
      }
      
      // Update authenticated customer profile with address if not set
      if (authState.isAuthenticated && authState.customer && !authState.customer.address) {
        await supabase.from('customers').update({
          address: fullAddress,
          phone: data.phone,
          updated_at: new Date().toISOString()
        }).eq('id', authState.customer.id);
      }
      
      // Generate confirmation number with prefix AWS (Animal Waste Services) and random numbers
      const confirmNum = `AWS-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmationNumber(confirmNum);
      setBookingComplete(true);
      toast.success("Booking successful!");
      
      // Log the successful booking
      console.log("Booking successful", {
        confirmationNumber: confirmNum,
        plan: data.servicePlan,
        dogs: data.numDogs,
        date: data.serviceDate,
        authenticated: authState.isAuthenticated
      });
      
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
