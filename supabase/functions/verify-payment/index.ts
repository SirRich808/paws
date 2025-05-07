
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json();
    
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Retrieve the session to check payment status
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== "paid") {
      return new Response(JSON.stringify({ 
        success: false,
        message: "Payment not completed yet" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Payment is complete, now create the booking in Supabase
    const bookingDataStr = session.metadata?.booking_data;
    if (!bookingDataStr) {
      throw new Error("Booking data not found in session metadata");
    }

    const bookingData = JSON.parse(bookingDataStr);
    
    // Create Supabase client with service role key for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );
    
    // Check if customer exists or create a new one
    let customerId = bookingData.userId;
    
    if (!customerId) {
      // Check if customer exists by email
      const { data: existingCustomers } = await supabaseAdmin
        .from("customers")
        .select("id")
        .eq("email", bookingData.email)
        .limit(1);

      if (existingCustomers && existingCustomers.length > 0) {
        customerId = existingCustomers[0].id;
      } else {
        // Create new customer
        const newCustomerId = crypto.randomUUID();
        const { error: customerError } = await supabaseAdmin
          .from("customers")
          .insert({
            id: newCustomerId,
            name: bookingData.customerName,
            email: bookingData.email,
            phone: bookingData.phone,
            address: bookingData.address
          });

        if (customerError) {
          throw new Error(`Error creating customer: ${customerError.message}`);
        }
        
        customerId = newCustomerId;
      }
    }
    
    // Get service plan ID
    const { data: servicePlan, error: planError } = await supabaseAdmin
      .from("service_plans")
      .select("id")
      .eq("frequency", bookingData.servicePlan)
      .single();
      
    if (planError) {
      throw new Error(`Error fetching service plan: ${planError.message}`);
    }
    
    // Create booking
    const { error: bookingError } = await supabaseAdmin
      .from("bookings")
      .insert({
        customer_id: customerId,
        service_plan_id: servicePlan.id,
        num_dogs: parseInt(bookingData.numDogs),
        service_date: bookingData.serviceDate,
        service_time: bookingData.serviceTime,
        special_instructions: bookingData.specialInstructions,
        total_price: session.amount_total ? session.amount_total / 100 : null,
        address: bookingData.address,
        status: "scheduled"
      });
      
    if (bookingError) {
      throw new Error(`Error creating booking: ${bookingError.message}`);
    }
    
    // Generate confirmation number
    const confirmationNumber = `AWS-${Math.floor(10000 + Math.random() * 90000)}`;
    
    return new Response(JSON.stringify({
      success: true,
      confirmationNumber: confirmationNumber,
      paymentStatus: session.payment_status
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
