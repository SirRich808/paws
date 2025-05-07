
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Forgot Password - Pacific Animal Waste Services</title>
        <meta name="description" content="Reset your password to regain access to your account." />
      </Helmet>
      
      <Navigation />
      
      <div className="flex-grow flex items-center justify-center py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="w-full max-w-md">
          <Card className="border-amber-200 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center font-playfair">Forgot Password</CardTitle>
              <CardDescription className="text-center">
                Enter your email address to reset your password
              </CardDescription>
            </CardHeader>
            
            <CardContent className="grid gap-4">
              <ForgotPasswordForm />
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 border-t p-6">
              {/* Form back to login link is handled inside ForgotPasswordForm */}
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
