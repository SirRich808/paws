
import React, { createContext, useState, useContext, useEffect } from "react";

type Customer = {
  id: string;
  email: string;
  name: string;
  address: string;
  phone: string;
  createdAt: string;
};

type AuthState = {
  isAuthenticated: boolean;
  customer: Customer | null;
  isLoading: boolean;
};

type CustomerContextType = {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Customer>) => Promise<void>;
};

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  customer: null,
  isLoading: true,
};

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  useEffect(() => {
    // On initial load, check if user is already logged in
    const loadStoredCustomer = () => {
      const storedCustomer = localStorage.getItem("customer");
      
      if (storedCustomer) {
        try {
          const customerData = JSON.parse(storedCustomer);
          setAuthState({
            isAuthenticated: true,
            customer: customerData,
            isLoading: false,
          });
        } catch (error) {
          console.error("Failed to parse stored customer data:", error);
          localStorage.removeItem("customer");
          setAuthState({
            ...defaultAuthState,
            isLoading: false,
          });
        }
      } else {
        setAuthState({
          ...defaultAuthState,
          isLoading: false,
        });
      }
    };

    loadStoredCustomer();
  }, []);

  // Mock login function - in real app, this would call an API
  const login = async (email: string, password: string) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // This is a mock - in a real app, this would validate credentials with backend
    if (email && password) {
      const mockCustomer: Customer = {
        id: "cust_" + Math.random().toString(36).substring(2, 15),
        email: email,
        name: email.split('@')[0], // Simple default name
        address: "123 Main St, Pahoa, HI 96778",
        phone: "(808) 123-4567",
        createdAt: new Date().toISOString(),
      };
      
      // Store in localStorage for persistence
      localStorage.setItem("customer", JSON.stringify(mockCustomer));
      
      setAuthState({
        isAuthenticated: true,
        customer: mockCustomer,
        isLoading: false,
      });
    } else {
      throw new Error("Invalid credentials");
    }
  };

  // Mock register function
  const register = async (email: string, password: string, name: string) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Validate email and password
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Create new customer
    const mockCustomer: Customer = {
      id: "cust_" + Math.random().toString(36).substring(2, 15),
      email: email,
      name: name || email.split('@')[0],
      address: "",
      phone: "",
      createdAt: new Date().toISOString(),
    };
    
    // Store in localStorage
    localStorage.setItem("customer", JSON.stringify(mockCustomer));
    
    setAuthState({
      isAuthenticated: true,
      customer: mockCustomer,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem("customer");
    setAuthState({
      isAuthenticated: false,
      customer: null,
      isLoading: false,
    });
  };

  const updateProfile = async (data: Partial<Customer>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (authState.customer) {
      const updatedCustomer = { ...authState.customer, ...data };
      localStorage.setItem("customer", JSON.stringify(updatedCustomer));
      
      setAuthState({
        ...authState,
        customer: updatedCustomer,
      });
    }
  };

  return (
    <CustomerContext.Provider value={{ authState, login, register, logout, updateProfile }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = (): CustomerContextType => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
};
