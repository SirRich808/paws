
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { setupPasswordStrengthOptions } from "@/utils/passwordUtils";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

// Initialize password strength options
setupPasswordStrengthOptions();

const ResetPassword = () => {
  const navigate = useNavigate();

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
              <ResetPasswordForm />
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 border-t p-6">
              {/* Form back to login link is handled inside ResetPasswordForm */}
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ResetPassword;
