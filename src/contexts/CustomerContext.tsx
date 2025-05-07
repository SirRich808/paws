
import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User, Session } from '@supabase/supabase-js';

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
  session: Session | null;
};

type CustomerContextType = {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Customer>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  customer: null,
  isLoading: true,
  session: null,
};

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        if (session) {
          fetchCustomerProfile(session);
        } else {
          setAuthState({
            isAuthenticated: false,
            customer: null,
            isLoading: false,
            session: null,
          });
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchCustomerProfile(session);
      } else {
        setAuthState({
          ...defaultAuthState,
          isLoading: false,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchCustomerProfile = async (session: Session) => {
    try {
      // Get customer profile from customers table
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error("Error fetching customer profile:", error);
        
        // Check if error is because the profile doesn't exist
        if (error.code === 'PGRST116') { // No rows returned
          // Create new profile if it doesn't exist
          const newCustomer = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '',
            address: '',
            phone: '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          
          const { error: insertError } = await supabase
            .from('customers')
            .insert([newCustomer]);
            
          if (insertError) {
            console.error("Failed to create customer profile:", insertError);
            throw insertError;
          }
          
          setAuthState({
            isAuthenticated: true,
            customer: {
              id: newCustomer.id,
              email: newCustomer.email,
              name: newCustomer.name,
              address: newCustomer.address,
              phone: newCustomer.phone,
              createdAt: newCustomer.created_at
            },
            isLoading: false,
            session: session,
          });
          return;
        } else {
          throw error;
        }
      }

      if (data) {
        setAuthState({
          isAuthenticated: true,
          customer: {
            id: data.id,
            email: data.email,
            name: data.name || session.user.email?.split('@')[0] || '',
            address: data.address || '',
            phone: data.phone || '',
            createdAt: data.created_at,
          },
          isLoading: false,
          session: session,
        });
      }
    } catch (error) {
      console.error("Error in customer profile handling:", error);
      // Set basic profile from session
      setAuthState({
        isAuthenticated: true,
        customer: {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.email?.split('@')[0] || '',
          address: '',
          phone: '',
          createdAt: new Date().toISOString(),
        },
        isLoading: false,
        session: session,
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success("Login successful!");
    } catch (error: any) {
      console.error("Login error:", error);
      
      // More user-friendly error messages
      if (error.message.includes("Invalid login credentials")) {
        toast.error("Invalid email or password. Please try again.");
      } else if (error.message.includes("Email not confirmed")) {
        toast.error("Please verify your email address before logging in.");
      } else {
        toast.error(error.message || "Failed to login. Please check your credentials.");
      }
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // Register new user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });

      if (error) {
        throw error;
      }

      // Check if email confirmation is required
      if (data?.user && data.session) {
        toast.success("Registration successful!");
      } else {
        toast.success("Registration successful! Please check your email to verify your account.");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      
      // More descriptive error messages
      if (error.message.includes("already registered")) {
        toast.error("This email is already registered. Please log in instead.");
      } else {
        toast.error(error.message || "Failed to register. Please try again.");
      }
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }
      
      return Promise.resolve();
    } catch (error: any) {
      console.error("Reset password error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      
      toast.success("Logged out successfully");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error("Error logging out");
    }
  };

  const updateProfile = async (data: Partial<Customer>) => {
    if (!authState.customer) {
      toast.error("You must be logged in to update your profile");
      return Promise.reject("Not authenticated");
    }

    try {
      const { error } = await supabase
        .from('customers')
        .update({
          name: data.name,
          address: data.address,
          phone: data.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', authState.customer.id);

      if (error) {
        throw error;
      }

      // Update local state
      setAuthState({
        ...authState,
        customer: {
          ...authState.customer,
          ...data
        }
      });

      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile");
      throw error;
    }
  };

  return (
    <CustomerContext.Provider value={{ 
      authState, 
      login, 
      register, 
      logout, 
      updateProfile,
      resetPassword 
    }}>
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
