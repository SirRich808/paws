
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCustomer } from "../contexts/CustomerContext";
import { toast } from "sonner";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser, authState } = useCustomer();
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  useEffect(() => {
    // If user is already authenticated, redirect to profile
    if (authState.isAuthenticated) {
      navigate("/profile");
    }
  }, [authState.isAuthenticated, navigate]);

  const handleRegister = async (data: RegisterFormValues) => {
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", { 
        type: "manual", 
        message: "Passwords do not match" 
      });
      return;
    }

    setIsLoading(true);

    try {
      await registerUser(data.email, data.password, data.name);
      // Redirect happens automatically through onAuthStateChange
    } catch (error) {
      console.error(error);
      // Toast error is handled in the context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Create Account - Pacific Animal Waste Services</title>
        <meta name="description" content="Sign up for an account to schedule pet waste removal services, manage your bookings, and set up recurring services." />
      </Helmet>
      
      <Navigation />
      
      <div className="flex-grow flex items-center justify-center py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="w-full max-w-md">
          <Card className="border-amber-200 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl text-center font-playfair">Create Account</CardTitle>
              <CardDescription className="text-center">
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="grid gap-4">
              <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    type="text" 
                    placeholder="John Doe"
                    {...form.register("name", { 
                      required: "Name is required" 
                    })}
                    aria-invalid={form.formState.errors.name ? "true" : "false"}
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="name@example.com"
                    {...form.register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address"
                      }
                    })}
                    aria-invalid={form.formState.errors.email ? "true" : "false"}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                  )}
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••"
                    {...form.register("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                    aria-invalid={form.formState.errors.password ? "true" : "false"}
                  />
                  {form.formState.errors.password && (
                    <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                  )}
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword"
                    type="password" 
                    placeholder="••••••••"
                    {...form.register("confirmPassword", { 
                      required: "Please confirm your password",
                      validate: value => 
                        value === form.getValues("password") || "Passwords do not match"
                    })}
                    aria-invalid={form.formState.errors.confirmPassword ? "true" : "false"}
                  />
                  {form.formState.errors.confirmPassword && (
                    <p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-lava hover:bg-ember" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 border-t p-6">
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-ember hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
