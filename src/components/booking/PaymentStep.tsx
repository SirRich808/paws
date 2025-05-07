
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "@/types/booking";
import { Loader2, CheckCircle, AlertCircle, CreditCard, LockKeyhole } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PaymentStepProps {
  form: UseFormReturn<BookingFormValues>;
  calculatePrice: () => number;
  isLoading?: boolean;
  onProcessPayment: () => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ 
  form, 
  calculatePrice, 
  isLoading,
  onProcessPayment 
}) => {
  const [activeTab, setActiveTab] = useState("card");
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // Handle payment submission
  const handlePaymentSubmit = async () => {
    try {
      setProcessingPayment(true);
      
      // Get form values to pass to Stripe
      const formValues = form.getValues();
      
      // Call the Stripe checkout function
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { 
          bookingData: formValues,
          totalPrice: calculatePrice()
        }
      });
      
      if (error) {
        toast.error("Payment processing failed: " + error.message);
        setProcessingPayment(false);
        return;
      }
      
      if (data?.url) {
        // Store session ID in localStorage for verification after redirect
        if (data.sessionId) {
          localStorage.setItem("stripe_session_id", data.sessionId);
        }
        
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        toast.error("Payment processing failed. Please try again.");
        setProcessingPayment(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment processing failed. Please try again.");
      setProcessingPayment(false);
    }
  };

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
        
        <Tabs defaultValue="card" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="card">Credit Card</TabsTrigger>
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="card" className="space-y-4 pt-4">
            <div className="flex items-center justify-center p-8 border rounded-md border-gray-200 bg-gray-50">
              <div className="text-center">
                <CreditCard className="h-10 w-10 mx-auto mb-4 text-lava" />
                <h3 className="text-lg font-medium mb-2">Secure Card Payment</h3>
                <p className="text-muted-foreground mb-4">
                  You'll be redirected to our secure payment processor to complete your payment
                </p>
                <Button
                  onClick={handlePaymentSubmit}
                  disabled={processingPayment}
                  className="bg-lava hover:bg-ember"
                >
                  {processingPayment ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay ${calculatePrice().toFixed(2)} Securely
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="paypal" className="space-y-4 py-4">
            <div className="text-center p-8 border rounded-md border-gray-200 bg-gray-50">
              <svg viewBox="0 0 24 24" className="h-10 w-10 mx-auto mb-4 text-blue-600">
                <path d="M7.016 20.146h-3.06c-.414 0-.75-.336-.75-.75v-7.396a.75.75 0 1 1 1.5 0v6.646h2.31a.75.75 0 0 1 0 1.5zm6.144 0h-3.06a.75.75 0 0 1 0-1.5h2.31V7.75a.75.75 0 0 1 1.5 0v11.646a.75.75 0 0 1-.75.75zm6.144 0h-3.06a.75.75 0 0 1-.75-.75V7.75a.75.75 0 0 1 1.5 0v10.646h2.31a.75.75 0 0 1 0 1.5zM3.03 8.708a.75.75 0 0 1 .672-.42h4.264a.75.75 0 0 1 0 1.5H3.702a.75.75 0 0 1-.672-1.08zm9.974.75c0-.414.336-.75.75-.75h7.188a.75.75 0 0 1 0 1.5h-7.188a.75.75 0 0 1-.75-.75zm-3.83-5.302a.75.75 0 0 1 .672-.42h4.264a.75.75 0 0 1 0 1.5H9.846a.75.75 0 0 1-.672-1.08z" fill="currentColor"/>
              </svg>
              <h3 className="text-lg font-medium mb-2">Pay with PayPal</h3>
              <p className="text-muted-foreground mb-4">
                You'll be redirected to PayPal to complete your payment securely
              </p>
              <Button 
                onClick={handlePaymentSubmit}
                disabled={processingPayment}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {processingPayment ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Pay ${calculatePrice().toFixed(2)} with PayPal
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="text-sm text-muted-foreground space-y-2 pt-4 border-t mt-4">
        <div className="flex items-center gap-2">
          <LockKeyhole className="h-4 w-4" />
          <p>Your payment information is secure and encrypted</p>
        </div>
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M20,6H17V5a3,3,0,0,0-3-3H10A3,3,0,0,0,7,5V6H4A3,3,0,0,0,1,9V19a3,3,0,0,0,3,3H20a3,3,0,0,0,3-3V9A3,3,0,0,0,20,6ZM9,5a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V6H9ZM21,19a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V12.57l5.47,3.42a1,1,0,0,0,1.06,0L12,14.38l2.47,1.61a1,1,0,0,0,1.06,0L21,12.57Zm0-8.74-5.47,3.42L13.06,12.1a1,1,0,0,0-1.06,0L9.47,13.68,4,10.26V9A1,1,0,0,1,5,8H19a1,1,0,0,1,1,1Z"/>
          </svg>
          <p>Receipt will be sent to your email</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
