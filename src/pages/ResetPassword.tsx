
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Loader2, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { Progress } from "@/components/ui/progress"; 

const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
};

zxcvbnOptions.setOptions(options);

type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);
  const navigate = useNavigate();

  const form = useForm<ResetPasswordFormValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });

  // Check if user is already reset password capable
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data?.session?.user) {
        toast.error("Invalid or expired reset link. Please try again.");
        navigate("/forgot-password");
      }
    };
    
    checkSession();
  }, [navigate]);

  const getPasswordStrengthLabel = (score: number) => {
    switch (score) {
      case 0:
        return { label: "Very Weak", color: "bg-red-500" };
      case 1:
        return { label: "Weak", color: "bg-red-500" };
      case 2:
        return { label: "Fair", color: "bg-yellow-500" };
      case 3:
        return { label: "Good", color: "bg-green-400" };
      case 4:
        return { label: "Strong", color: "bg-green-600" };
      default:
        return { label: "Very Weak", color: "bg-red-500" };
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    if (password) {
      const result = zxcvbn(password);
      setPasswordScore(result.score);
    } else {
      setPasswordScore(0);
    }
  };

  const handleSubmit = async (data: ResetPasswordFormValues) => {
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match"
      });
      return;
    }

    if (passwordScore < 2) {
      form.setError("password", {
        type: "manual",
        message: "Please choose a stronger password"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password
      });

      if (error) {
        throw error;
      }

      toast.success("Password updated successfully!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Failed to reset password. Please try again.");
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const strengthInfo = getPasswordStrengthLabel(passwordScore);

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Reset Password - Pacific Animal Waste Services</title>
        <meta name="description" content="Create a new password for your account." />
      </Helmet>
      
      <Navigation />
      
      <div className="flex-grow flex items-center justify-center py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="w-full max-w-md">
          <Card className="border-amber-200 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center font-playfair">Reset Password</CardTitle>
              <CardDescription className="text-center">
                Create a new password for your account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="grid gap-4">
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••"
                    {...form.register("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      },
                      onChange: handlePasswordChange
                    })}
                    aria-invalid={form.formState.errors.password ? "true" : "false"}
                  />
                  
                  {form.getValues("password") && (
                    <div className="space-y-1">
                      <Progress value={(passwordScore + 1) * 20} className={strengthInfo.color} />
                      <p className="text-xs text-muted-foreground">
                        Password strength: <span className="font-medium">{strengthInfo.label}</span>
                      </p>
                    </div>
                  )}
                  
                  {form.formState.errors.password && (
                    <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                  )}
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
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
                      Updating Password...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 border-t p-6">
              <div className="text-center text-sm text-muted-foreground">
                <Link to="/login" className="inline-flex items-center text-ember hover:underline">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to login
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

export default ResetPassword;
