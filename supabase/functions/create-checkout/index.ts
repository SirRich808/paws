
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
    const { bookingData, totalPrice } = await req.json();
    
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Create Supabase client using the anon key for user authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );
    
    // Get user information if available
    let userEmail = bookingData.email;
    let userId = null;
    
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      if (data?.user) {
        userEmail = data.user.email;
        userId = data.user.id;
      }
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${bookingData.servicePlan === "weekly" ? "Weekly" : 
                     bookingData.servicePlan === "biweekly" ? "Bi-Weekly" : 
                     bookingData.servicePlan === "monthly" ? "Monthly" : 
                     "One-time"} Pet Waste Service - ${bookingData.numDogs} ${parseInt(bookingData.numDogs) === 1 ? "Dog" : "Dogs"}`,
              description: `Service on ${bookingData.serviceDate} at ${bookingData.serviceTime}`,
            },
            unit_amount: Math.round(totalPrice * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/booking?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/booking?canceled=true`,
      metadata: {
        booking_data: JSON.stringify({
          customerName: `${bookingData.firstName} ${bookingData.lastName}`,
          email: bookingData.email,
          phone: bookingData.phone,
          address: `${bookingData.address}, ${bookingData.city}, ${bookingData.state} ${bookingData.zipCode}`,
          serviceDate: bookingData.serviceDate,
          serviceTime: bookingData.serviceTime,
          servicePlan: bookingData.servicePlan,
          numDogs: bookingData.numDogs,
          specialInstructions: bookingData.specialInstructions || "",
          userId: userId,
        })
      }
    });

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
