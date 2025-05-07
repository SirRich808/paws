
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "./BookingTypes";

interface PaymentStepProps {
  form: UseFormReturn<BookingFormValues>;
  calculatePrice: () => number;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ form, calculatePrice }) => {
  return (
    <div className="space-y-6">
      <div className="border rounded-md p-4 mb-6 bg-amber-50">
        <h3 className="font-medium mb-2">Order Summary</h3>
        <div className="flex justify-between">
          <span>
            {form.getValues("servicePlan") === "weekly" ? "Weekly" : 
            form.getValues("servicePlan") === "biweekly" ? "Bi-Weekly" : 
            form.getValues("servicePlan") === "monthly" ? "Monthly" : 
            "One-time"} Service for {form.getValues("numDogs")} {parseInt(form.getValues("numDogs")) === 1 ? "Dog" : "Dogs"}
          </span>
          <span className="font-semibold">${calculatePrice().toFixed(2)}</span>
        </div>
      </div>
      
      <div className="space-y-6">
        <h3 className="font-medium">Payment Method</h3>
        
        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="card">Credit Card</TabsTrigger>
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="card" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiration">Expiration Date</Label>
                  <Input id="expiration" placeholder="MM/YY" />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="nameOnCard">Name on Card</Label>
                <Input id="nameOnCard" placeholder="John Doe" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="paypal" className="space-y-4 py-4">
            <div className="text-center">
              <Button 
                type="button" 
                className="bg-blue-600 hover:bg-blue-700"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="#ffffff">
                  <path d="M7.016 20.146h-3.06c-.414 0-.75-.336-.75-.75v-7.396a.75.75 0 1 1 1.5 0v6.646h2.31a.75.75 0 0 1 0 1.5zm6.144 0h-3.06a.75.75 0 0 1 0-1.5h2.31V7.75a.75.75 0 0 1 1.5 0v11.646a.75.75 0 0 1-.75.75zm6.144 0h-3.06a.75.75 0 0 1-.75-.75V7.75a.75.75 0 0 1 1.5 0v10.646h2.31a.75.75 0 0 1 0 1.5zM3.03 8.708a.75.75 0 0 1 .672-.42h4.264a.75.75 0 0 1 0 1.5H3.702a.75.75 0 0 1-.672-1.08zm9.974.75c0-.414.336-.75.75-.75h7.188a.75.75 0 0 1 0 1.5h-7.188a.75.75 0 0 1-.75-.75zm-3.83-5.302a.75.75 0 0 1 .672-.42h4.264a.75.75 0 0 1 0 1.5H9.846a.75.75 0 0 1-.672-1.08z" />
                </svg>
                Pay with PayPal
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                You'll be redirected to PayPal to complete your payment securely.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PaymentStep;
