
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthIndicatorProps {
  passwordScore: number;
}

export const getPasswordStrengthLabel = (score: number) => {
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

const PasswordStrengthIndicator = ({ passwordScore }: PasswordStrengthIndicatorProps) => {
  const strengthInfo = getPasswordStrengthLabel(passwordScore);

  return (
    <div className="space-y-1">
      <Progress value={(passwordScore + 1) * 20} className={strengthInfo.color} />
      <p className="text-xs text-muted-foreground">
        Password strength: <span className="font-medium">{strengthInfo.label}</span>
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;
