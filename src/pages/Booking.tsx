
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useCustomer } from "../contexts/CustomerContext";

// Import required UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Type for our form values
type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  serviceDate: string;
  serviceTime: string;
  specialInstructions: string;
  numDogs: string;
  servicePlan: string;
};

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const navigate = useNavigate();
  const { authState } = useCustomer();

  // Extract values from URL parameters
  const planFromUrl = searchParams.get("plan") || "weekly";
  const dogsFromUrl = searchParams.get("dogs") || "1";
  const priceFromUrl = searchParams.get("price") || "19.99";

  const form = useForm<FormValues>({
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

  // Available time slots
  const timeSlots = [
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
  ];

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
  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    
    // Simulate API call for payment processing
    setTimeout(() => {
      setIsLoading(false);
      setBookingComplete(true);
      setConfirmationNumber(`APS${Math.floor(Math.random() * 10000)}`);
      
      toast.success("Booking successful!");
      
      // In a real app, this would send the booking data to your backend
      console.log("Booking data:", data);
    }, 1500);
  };
  
  // Today's date for min value
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            {bookingComplete ? (
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
                    {!authState.isAuthenticated && (
                      <Button onClick={() => navigate("/register")} className="bg-lava hover:bg-ember">
                        Create Account
                      </Button>
                    )}
                    {authState.isAuthenticated && (
                      <Button onClick={() => navigate("/profile")} className="bg-lava hover:bg-ember">
                        View My Account
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ) : (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl">Book Your Pet Waste Service</CardTitle>
                  <CardDescription>
                    Please complete the form below to schedule your pet waste removal service.
                  </CardDescription>
                  
                  <div className="flex justify-between mt-6 mb-2">
                    <div className={`flex flex-col items-center ${currentStep >= 1 ? "text-lava" : "text-gray-400"}`}>
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${currentStep >= 1 ? "border-lava bg-lava/10" : "border-gray-300"}`}>
                        1
                      </div>
                      <span className="text-xs mt-1">Your Info</span>
                    </div>
                    
                    <div className="flex-1 flex items-center px-2">
                      <div className={`h-1 w-full rounded ${currentStep >= 2 ? "bg-lava" : "bg-gray-300"}`}></div>
                    </div>
                    
                    <div className={`flex flex-col items-center ${currentStep >= 2 ? "text-lava" : "text-gray-400"}`}>
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${currentStep >= 2 ? "border-lava bg-lava/10" : "border-gray-300"}`}>
                        2
                      </div>
                      <span className="text-xs mt-1">Schedule</span>
                    </div>
                    
                    <div className="flex-1 flex items-center px-2">
                      <div className={`h-1 w-full rounded ${currentStep >= 3 ? "bg-lava" : "bg-gray-300"}`}></div>
                    </div>
                    
                    <div className={`flex flex-col items-center ${currentStep >= 3 ? "text-lava" : "text-gray-400"}`}>
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${currentStep >= 3 ? "border-lava bg-lava/10" : "border-gray-300"}`}>
                        3
                      </div>
                      <span className="text-xs mt-1">Review</span>
                    </div>
                    
                    <div className="flex-1 flex items-center px-2">
                      <div className={`h-1 w-full rounded ${currentStep >= 4 ? "bg-lava" : "bg-gray-300"}`}></div>
                    </div>
                    
                    <div className={`flex flex-col items-center ${currentStep >= 4 ? "text-lava" : "text-gray-400"}`}>
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${currentStep >= 4 ? "border-lava bg-lava/10" : "border-gray-300"}`}>
                        4
                      </div>
                      <span className="text-xs mt-1">Payment</span>
                    </div>
                  </div>
                </CardHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent>
                      {/* Step 1: Customer Information */}
                      {currentStep === 1 && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="firstName"
                              rules={{ required: "First name is required" }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="lastName"
                              rules={{ required: "Last name is required" }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="email"
                              rules={{ 
                                required: "Email is required",
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address"
                                }
                              }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="john@example.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="phone"
                              rules={{ required: "Phone number is required" }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone</FormLabel>
                                  <FormControl>
                                    <Input type="tel" placeholder="(808) 123-4567" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="address"
                            rules={{ required: "Address is required" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Street Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="123 Main St" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <FormField
                              control={form.control}
                              name="city"
                              rules={{ required: "City is required" }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>City</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Pahoa" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State</FormLabel>
                                  <FormControl>
                                    <Input value="HI" disabled {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="zipCode"
                              rules={{ required: "ZIP code is required" }}
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>ZIP Code</FormLabel>
                                  <FormControl>
                                    <Input placeholder="96778" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* Step 2: Schedule */}
                      {currentStep === 2 && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="serviceDate"
                              rules={{ required: "Please select a service date" }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Service Date</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="date" 
                                      min={today}
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="serviceTime"
                              rules={{ required: "Please select a service time" }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Service Time</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a time slot" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                          {time}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="numDogs"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Number of Dogs</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select number of dogs" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="1">1 Dog</SelectItem>
                                      <SelectItem value="2">2 Dogs</SelectItem>
                                      <SelectItem value="3">3 Dogs</SelectItem>
                                      <SelectItem value="4">4 Dogs</SelectItem>
                                      <SelectItem value="5">5+ Dogs</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="servicePlan"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Service Plan</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a service plan" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="weekly">Weekly Service - $19.99/week</SelectItem>
                                      <SelectItem value="biweekly">Bi-Weekly Service - $24.99/visit</SelectItem>
                                      <SelectItem value="monthly">Monthly Service - $29.99/visit</SelectItem>
                                      <SelectItem value="onetime">One-Time Cleanup - $34.99</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="specialInstructions"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Special Instructions (Optional)</FormLabel>
                                <FormControl>
                                  <textarea
                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Gate code, dog breed info, yard specifics, etc."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                      
                      {/* Step 3: Review */}
                      {currentStep === 3 && (
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
                      )}
                      
                      {/* Step 4: Payment */}
                      {currentStep === 4 && (
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
                      )}
                    </CardContent>
                    
                    <CardFooter className="flex justify-between border-t pt-6">
                      {currentStep > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handlePrevStep}
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
                        ) : (
                          <Button
                            type="submit"
                            className="bg-lava hover:bg-ember"
                            disabled={isLoading}
                          >
                            {isLoading ? "Processing..." : `Pay $${calculatePrice().toFixed(2)}`}
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;
