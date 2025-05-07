
// Additional types for the booking system
// These complement the auto-generated Supabase types

import { Database } from "@/integrations/supabase/types";

// Convenient type aliases
export type ServicePlan = Database["public"]["Tables"]["service_plans"]["Row"];
export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type Customer = Database["public"]["Tables"]["customers"]["Row"];
export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];

// Form values for booking page
export type BookingFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  serviceDate: string;
  serviceTime: string;
  specialInstructions: string;
  numDogs: string;
  servicePlan: string;
};
