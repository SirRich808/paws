
import React from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

import BookingProgressStepper from "./BookingProgressStepper";
import CustomerInfoStep from "./CustomerInfoStep";
import ScheduleStep from "./ScheduleStep";
import ReviewStep from "./ReviewStep";
import PaymentStep from "./PaymentStep";
import { BookingFormValues } from "@/types/booking";
import { UseFormReturn } from "react-hook-form";

interface BookingFormContainerProps {
  form: UseFormReturn<BookingFormValues>;
  currentStep: number;
  isLoading: boolean;
  timeSlots: string[];
  today: string;
  calculatePrice: () => number;
  handleNextStep: () => Promise<void>;
  handlePrevStep: () => void;
  onSubmit: (data: BookingFormValues) => Promise<void>;
}

const BookingFormContainer: React.FC<BookingFormContainerProps> = ({
  form,
  currentStep,
  isLoading,
  timeSlots,
  today,
  calculatePrice,
  handleNextStep,
  handlePrevStep,
  onSubmit,
}) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl">Book Your Pet Waste Service</CardTitle>
        <CardDescription>
          Please complete the form below to schedule your pet waste removal service.
        </CardDescription>
        
        <BookingProgressStepper currentStep={currentStep} />
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <PaymentStep 
                form={form} 
                calculatePrice={calculatePrice} 
                isLoading={isLoading} 
                onProcessPayment={onSubmit}
              />
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between border-t pt-6">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                disabled={isLoading}
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
              ) : null}
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default BookingFormContainer;
