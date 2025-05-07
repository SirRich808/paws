
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "@/types/booking";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface PaymentStepProps {
  form: UseFormReturn<BookingFormValues>;
  calculatePrice: () => number;
  isLoading?: boolean;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ form, calculatePrice, isLoading }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvc, setCvc] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [validationState, setValidationState] = useState({
    cardNumber: { valid: false, message: "" },
    expiration: { valid: false, message: "" },
    cvc: { valid: false, message: "" },
    nameOnCard: { valid: false, message: "" }
  });
  const [activeTab, setActiveTab] = useState("card");

  // Format card number as user types (4 digits grouped)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    setCardNumber(formattedValue);
    
    setValidationState(prev => ({
      ...prev, 
      cardNumber: {
        valid: value.length === 16,
        message: value.length < 16 && value.length > 0 ? "Card number must be 16 digits" : ""
      }
    }));
  };

  // Format expiration date as MM/YY
  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    setExpiration(value);
    
    // Basic validation
    const isValid = /^\d{2}\/\d{2}$/.test(value);
    setValidationState(prev => ({
      ...prev, 
      expiration: {
        valid: isValid,
        message: value && !isValid ? "Use format MM/YY" : ""
      }
    }));
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCvc(value);
    
    setValidationState(prev => ({
      ...prev, 
      cvc: {
        valid: value.length === 3,
        message: value.length < 3 && value.length > 0 ? "CVC must be 3 digits" : ""
      }
    }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameOnCard(value);
    
    setValidationState(prev => ({
      ...prev, 
      nameOnCard: {
        valid: value.length > 2,
        message: value && value.length < 3 ? "Please enter a valid name" : ""
      }
    }));
  };

  // Overall form validation
  const isCardFormValid = activeTab === "card" ? 
    validationState.cardNumber.valid && 
    validationState.expiration.valid && 
    validationState.cvc.valid && 
    validationState.nameOnCard.valid : true;

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
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="cardNumber" className="flex items-center justify-between">
                  Card Number
                  {cardNumber && (
                    validationState.cardNumber.valid ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      <span className="text-xs text-red-500">{validationState.cardNumber.message}</span>
                  )}
                </Label>
                <Input 
                  id="cardNumber" 
                  placeholder="4242 4242 4242 4242" 
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className={cardNumber && !validationState.cardNumber.valid ? "border-red-300" : ""}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiration" className="flex items-center justify-between">
                    Expiration
                    {expiration && (
                      validationState.expiration.valid ? 
                        <CheckCircle className="h-4 w-4 text-green-500" /> : 
                        <span className="text-xs text-red-500">{validationState.expiration.message}</span>
                    )}
                  </Label>
                  <Input 
                    id="expiration" 
                    placeholder="MM/YY" 
                    value={expiration}
                    onChange={handleExpirationChange}
                    className={expiration && !validationState.expiration.valid ? "border-red-300" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="cvc" className="flex items-center justify-between">
                    CVC
                    {cvc && (
                      validationState.cvc.valid ? 
                        <CheckCircle className="h-4 w-4 text-green-500" /> : 
                        <span className="text-xs text-red-500">{validationState.cvc.message}</span>
                    )}
                  </Label>
                  <Input 
                    id="cvc" 
                    placeholder="123" 
                    value={cvc}
                    onChange={handleCvcChange}
                    className={cvc && !validationState.cvc.valid ? "border-red-300" : ""}
                    maxLength={3}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="nameOnCard" className="flex items-center justify-between">
                  Name on Card
                  {nameOnCard && (
                    validationState.nameOnCard.valid ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      <span className="text-xs text-red-500">{validationState.nameOnCard.message}</span>
                  )}
                </Label>
                <Input 
                  id="nameOnCard" 
                  placeholder="John Doe" 
                  value={nameOnCard}
                  onChange={handleNameChange}
                  className={nameOnCard && !validationState.nameOnCard.valid ? "border-red-300" : ""}
                />
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
      
      <div className="text-sm text-muted-foreground space-y-2 pt-4 border-t mt-4">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M19.5,8.25H4.5a.75.75,0,0,1,0-1.5h15a.75.75,0,0,1,0,1.5Z"/>
            <path d="M16.5,12.75H7.5a.75.75,0,0,1,0-1.5h9a.75.75,0,0,1,0,1.5Z"/>
            <path d="M13.5,17.25h-3a.75.75,0,0,1,0-1.5h3a.75.75,0,0,1,0,1.5Z"/>
            <path d="M12,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22ZM12,3.5A8.5,8.5,0,1,0,20.5,12,8.51,8.51,0,0,0,12,3.5Z"/>
          </svg>
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
