
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

// Define form validation schema
const customerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  address: z.string().min(5, { message: "Please enter your full address." }),
  city: z.string().min(2, { message: "Please enter your city." }),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions." }),
  }),
});

type Step = "customer-info" | "schedule" | "payment" | "confirmation";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("customer-info");
  
  // Extract plan details from URL params
  const planType = searchParams.get("plan") || "weekly";
  const dogCount = searchParams.get("dogs") || "1";
  const price = searchParams.get("price") || "19.99";
  
  // Set up form
  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      agreeTerms: false,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const onSubmit = (values: z.infer<typeof customerFormSchema>) => {
    // In a real app, we would save this data to Supabase here
    console.log("Form submitted:", values);
    setStep("schedule");
    toast({
      title: "Information saved",
      description: "Your information has been saved successfully.",
    });
  };

  const handleScheduleNext = () => {
    setStep("payment");
    toast({
      title: "Schedule confirmed",
      description: "Your service schedule has been confirmed.",
    });
  };

  const handlePaymentComplete = () => {
    setStep("confirmation");
    toast({
      title: "Payment successful",
      description: "Your booking has been confirmed.",
    });
  };

  return (
    <div>
      <Navigation />
      
      <div className="pt-24 pb-12 bg-lava text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Service</h1>
          <p className="text-xl">
            {planType === "weekly" ? "Weekly" : "Bi-Weekly"} service for {dogCount} {parseInt(dogCount) === 1 ? "dog" : "dogs"} - ${price}/{planType === "weekly" ? "week" : "visit"}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className={`h-2 w-16 rounded-full ${step === "customer-info" || step === "schedule" || step === "payment" || step === "confirmation" ? "bg-tropic" : "bg-gray-200"}`}></div>
          <div className="h-1 w-4 bg-gray-200"></div>
          <div className={`h-2 w-16 rounded-full ${step === "schedule" || step === "payment" || step === "confirmation" ? "bg-tropic" : "bg-gray-200"}`}></div>
          <div className="h-1 w-4 bg-gray-200"></div>
          <div className={`h-2 w-16 rounded-full ${step === "payment" || step === "confirmation" ? "bg-tropic" : "bg-gray-200"}`}></div>
          <div className="h-1 w-4 bg-gray-200"></div>
          <div className={`h-2 w-16 rounded-full ${step === "confirmation" ? "bg-tropic" : "bg-gray-200"}`}></div>
        </div>
        
        {/* Customer info form */}
        {step === "customer-info" && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6">Your Information</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="808-123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Paradise Park Dr" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Keaau" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <Label>State</Label>
                    <Input value="Hawaii" readOnly className="bg-gray-100" />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="agreeTerms"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the terms and conditions
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <Button type="submit" className="w-full bg-tropic hover:bg-tropic/90">
                      Continue to Scheduling
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
        
        {/* Scheduling step */}
        {step === "schedule" && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6">Choose Your Schedule</h2>
              
              <div className="mb-6">
                <Label className="mb-2 block">Preferred Service Day</Label>
                <div className="grid grid-cols-7 gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                    <Button 
                      key={day}
                      variant="outline" 
                      className="aspect-square hover:bg-tropic hover:text-white"
                    >
                      {day}
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  * Weekend service not available
                </p>
              </div>
              
              <div className="mb-6">
                <Label className="mb-2 block">First Service Date</Label>
                <Input type="date" className="mb-2" min={new Date().toISOString().split('T')[0]} />
                <p className="text-sm text-gray-500">
                  We need at least 24 hours notice for first-time service
                </p>
              </div>
              
              <div className="mb-6">
                <Label className="mb-2 block">Special Instructions</Label>
                <textarea 
                  className="w-full border rounded-md p-2 min-h-[100px]"
                  placeholder="Gate access code, dog behavior notes, yard specifics, etc."
                />
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setStep("customer-info")}
                >
                  Back
                </Button>
                <Button 
                  onClick={handleScheduleNext}
                  className="bg-tropic hover:bg-tropic/90"
                >
                  Continue to Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Payment step (placeholder) */}
        {step === "payment" && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium mb-2">Service Summary</h3>
                <div className="flex justify-between">
                  <span>{planType === "weekly" ? "Weekly" : "Bi-Weekly"} Service for {dogCount} {parseInt(dogCount) === 1 ? "dog" : "dogs"}</span>
                  <span>${price}</span>
                </div>
              </div>
              
              {/* Simplified payment form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>
                
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="•••• •••• •••• ••••" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="•••" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setStep("schedule")}
                >
                  Back
                </Button>
                <Button 
                  onClick={handlePaymentComplete}
                  className="bg-ember hover:bg-ember/90"
                >
                  Complete Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Confirmation step */}
        {step === "confirmation" && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-4">
                <svg className="h-16 w-16 text-tropic" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold mb-6">Booking Confirmed!</h2>
              <p className="mb-4">
                Thank you for booking with Aloha Poop Scoop. Your {planType === "weekly" ? "weekly" : "bi-weekly"} service has been scheduled.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md text-left mb-6">
                <h3 className="font-medium mb-2">Service Details</h3>
                <p>Service Type: {planType === "weekly" ? "Weekly" : "Bi-Weekly"}</p>
                <p>Dogs: {dogCount}</p>
                <p>Price: ${price}/{planType === "weekly" ? "week" : "visit"}</p>
              </div>
              
              <p className="mb-6">
                You'll receive a confirmation email shortly with all the details of your service.
              </p>
              
              <Button 
                onClick={() => navigate("/")}
                className="bg-tropic hover:bg-tropic/90"
              >
                Return to Homepage
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Booking;
