
import React from "react";
import { Link } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "./BookingTypes";

interface ReviewStepProps {
  form: UseFormReturn<BookingFormValues>;
  calculatePrice: () => number;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ form, calculatePrice }) => {
  return (
    <div className="space-y-6">
      <div className="border rounded-md p-4 bg-gray-50">
        <h3 className="font-medium text-lg mb-4">Review Your Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Name</p>
            <p>{form.getValues("firstName")} {form.getValues("lastName")}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Contact</p>
            <p>{form.getValues("email")}</p>
            <p>{form.getValues("phone")}</p>
          </div>
          
          <div className="space-y-1 md:col-span-2">
            <p className="text-sm text-muted-foreground">Address</p>
            <p>{form.getValues("address")}, {form.getValues("city")}, {form.getValues("state")} {form.getValues("zipCode")}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Service Date & Time</p>
            <p>{form.getValues("serviceDate")}</p>
            <p>{form.getValues("serviceTime")}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Service Details</p>
            <p>{form.getValues("servicePlan") === "weekly" ? "Weekly" : form.getValues("servicePlan") === "biweekly" ? "Bi-Weekly" : form.getValues("servicePlan") === "monthly" ? "Monthly" : "One-time"} Plan</p>
            <p>{form.getValues("numDogs")} {parseInt(form.getValues("numDogs")) === 1 ? "Dog" : "Dogs"}</p>
          </div>
          
          {form.getValues("specialInstructions") && (
            <div className="space-y-1 md:col-span-2">
              <p className="text-sm text-muted-foreground">Special Instructions</p>
              <p>{form.getValues("specialInstructions")}</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 p-4 bg-lava/10 rounded-md">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Price:</span>
            <span className="text-xl font-semibold">${calculatePrice().toFixed(2)}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {form.getValues("servicePlan") === "weekly" ? "Weekly recurring charge" : 
            form.getValues("servicePlan") === "biweekly" ? "Bi-weekly recurring charge" :
            form.getValues("servicePlan") === "monthly" ? "Monthly recurring charge" : 
            "One-time charge"}
          </p>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <p className="text-sm">
          By proceeding to payment, you agree to our{" "}
          <Link to="/terms" className="text-lava hover:underline" target="_blank">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-lava hover:underline" target="_blank">
            Privacy Policy
          </Link>.
        </p>
      </div>
    </div>
  );
};

export default ReviewStep;
