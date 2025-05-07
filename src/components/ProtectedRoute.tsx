
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../contexts/CustomerContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authState } = useCustomer();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) {
      toast.error("Please log in to access this page");
      navigate("/login?redirect=" + encodeURIComponent(window.location.pathname));
    }
  }, [authState.isLoading, authState.isAuthenticated, navigate]);

  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-lava mb-4" />
          <p className="text-xl">Verifying your account...</p>
        </div>
      </div>
    );
  }

  return authState.isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
