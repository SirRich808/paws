
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { BookingFormValues } from "./BookingTypes";
import { UseFormReturn } from "react-hook-form";

interface BookingSuccessProps {
  confirmationNumber: string;
  form: UseFormReturn<BookingFormValues>;
  isAuthenticated: boolean;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ 
  confirmationNumber, 
  form,
  isAuthenticated
}) => {
  const navigate = useNavigate();

  return (
    <Card className="shadow-lg border-green-200">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <CardTitle className="text-2xl md:text-3xl text-green-800">Booking Confirmed!</CardTitle>
        <CardDescription className="text-lg">
          Thank you for booking our service!
        </CardDescription>
      </CardHeader>
      
      <CardContent className="text-center space-y-4">
        <p className="text-xl">Your confirmation number is:</p>
        <p className="text-3xl font-bold text-lava">{confirmationNumber}</p>
        
        <div className="border rounded-lg p-4 mt-6 text-left">
          <h3 className="font-semibold mb-2">Booking Details:</h3>
          <p>Service: {form.getValues("servicePlan") === "weekly" ? "Weekly" : form.getValues("servicePlan") === "biweekly" ? "Bi-Weekly" : form.getValues("servicePlan") === "monthly" ? "Monthly" : "One-time"} Pet Waste Removal</p>
          <p>Date: {form.getValues("serviceDate")}</p>
          <p>Time: {form.getValues("serviceTime")}</p>
          <p>Address: {form.getValues("address")}, {form.getValues("city")}, {form.getValues("state")} {form.getValues("zipCode")}</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4">
        <p className="text-center text-muted-foreground">
          We've sent a confirmation email to {form.getValues("email")} with all the details.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate("/")} variant="outline">
            Return to Homepage
          </Button>
          {!isAuthenticated && (
            <Button onClick={() => navigate("/register")} className="bg-lava hover:bg-ember">
              Create Account
            </Button>
          )}
          {isAuthenticated && (
            <Button onClick={() => navigate("/profile")} className="bg-lava hover:bg-ember">
              View My Account
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookingSuccess;
