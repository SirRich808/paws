
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../contexts/CustomerContext";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authState } = useCustomer();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) {
      toast.error("Please log in to access this page");
      navigate("/login");
    }
  }, [authState.isLoading, authState.isAuthenticated, navigate]);

  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl">Loading...</div>
      </div>
    );
  }

  return authState.isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
