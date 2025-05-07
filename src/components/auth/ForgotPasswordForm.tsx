
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Loader2, ArrowLeft } from "lucide-react";
import { useCustomer } from "@/contexts/CustomerContext";

type ForgotPasswordFormValues = {
  email: string;
};

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useCustomer();

  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    }
  });

  const handleSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);

    try {
      await resetPassword(data.email);
      setIsSubmitted(true);
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email. Please try again.");
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isSubmitted ? (
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
          
          <Button 
            type="submit" 
            className="w-full bg-lava hover:bg-ember" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Reset Link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-muted-foreground">
            We've sent an email to <strong>{form.getValues("email")}</strong> with instructions to reset your password.
          </p>
          <p className="text-sm text-muted-foreground">
            Please check your inbox and spam folder. The link will expire in 24 hours.
          </p>
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground pt-4">
        <Link to="/login" className="inline-flex items-center text-ember hover:underline">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to login
        </Link>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
