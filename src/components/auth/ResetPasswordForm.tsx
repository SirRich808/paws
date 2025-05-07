
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { zxcvbn } from "@zxcvbn-ts/core";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);
  const navigate = useNavigate();

  const form = useForm<ResetPasswordFormValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });

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

  return (
    <>
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
            <PasswordStrengthIndicator passwordScore={passwordScore} />
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

      <div className="text-center text-sm text-muted-foreground">
        <Link to="/login" className="inline-flex items-center text-ember hover:underline">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to login
        </Link>
      </div>
    </>
  );
};

export default ResetPasswordForm;
