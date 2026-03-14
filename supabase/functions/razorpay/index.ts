import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, name, email, phone, plan, amount, razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json();

    const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID");
    const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay credentials not configured");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    if (action === "create_order") {
      // Validate inputs
      if (!name || !email || !phone || !plan || !amount) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Create Razorpay order
      const razorpayRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`),
        },
        body: JSON.stringify({
          amount: amount * 100, // Razorpay expects paise
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
          notes: { plan, name, email, phone },
        }),
      });

      if (!razorpayRes.ok) {
        const errBody = await razorpayRes.text();
        throw new Error(`Razorpay order creation failed [${razorpayRes.status}]: ${errBody}`);
      }

      const order = await razorpayRes.json();

      // Store buyer in DB with pending status
      const { error: dbError } = await supabase.from("buyers").insert({
        name,
        email,
        phone,
        plan,
        amount,
        razorpay_order_id: order.id,
        payment_status: "pending",
      });

      if (dbError) {
        console.error("DB insert error:", dbError);
        throw new Error("Failed to save buyer information");
      }

      return new Response(
        JSON.stringify({ order_id: order.id, key_id: RAZORPAY_KEY_ID }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "verify_payment") {
      if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
        return new Response(
          JSON.stringify({ error: "Missing payment verification fields" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Verify signature using Web Crypto API
      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(RAZORPAY_KEY_SECRET),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      const data = encoder.encode(`${razorpay_order_id}|${razorpay_payment_id}`);
      const signature = await crypto.subtle.sign("HMAC", key, data);
      const generatedSignature = Array.from(new Uint8Array(signature))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      if (generatedSignature !== razorpay_signature) {
        // Mark as failed
        await supabase
          .from("buyers")
          .update({ payment_status: "failed" })
          .eq("razorpay_order_id", razorpay_order_id);

        return new Response(
          JSON.stringify({ error: "Payment verification failed", verified: false }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Mark as paid
      const { error: updateError } = await supabase
        .from("buyers")
        .update({
          payment_status: "paid",
          razorpay_payment_id,
        })
        .eq("razorpay_order_id", razorpay_order_id);

      if (updateError) {
        console.error("DB update error:", updateError);
      }

      return new Response(
        JSON.stringify({ verified: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
