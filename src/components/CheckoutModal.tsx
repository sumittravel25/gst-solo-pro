import { useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Plan } from "./PricingSection";

interface CheckoutModalProps {
  plan: Plan;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const CheckoutModal = ({ plan, onClose }: CheckoutModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Failed to load payment gateway. Please try again.");
        setLoading(false);
        return;
      }

      // Create order via edge function
      const { data, error } = await supabase.functions.invoke("razorpay", {
        body: {
          action: "create_order",
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          plan: plan.id,
          amount: plan.amount,
        },
      });

      if (error || !data?.order_id) {
        throw new Error(error?.message || "Failed to create order");
      }

      // Open Razorpay checkout
      const options = {
        key: data.key_id,
        amount: plan.amount * 100,
        currency: "INR",
        name: "Enterprise GST Pro",
        description: `${plan.name} Plan - One-time Purchase`,
        order_id: data.order_id,
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: phone.trim(),
        },
        theme: {
          color: "#2563eb",
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const { data: verifyData, error: verifyError } =
              await supabase.functions.invoke("razorpay", {
                body: {
                  action: "verify_payment",
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                },
              });

            if (verifyError || !verifyData?.verified) {
              toast.error("Payment verification failed. Please contact support.");
              return;
            }

            toast.success("Payment successful! Redirecting to download...");
            onClose();
            // Redirect to download page or show download link
            // You can customize this URL
            window.location.href = "/download";
          } catch {
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 p-8 bg-card rounded-xl shadow-card-hover">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <h3 className="text-xl font-semibold text-foreground mb-1">
          Complete Your Purchase
        </h3>
        <p className="text-sm text-muted mb-6">
          {plan.name} Plan — <span className="font-semibold tabular-nums">{plan.price}</span> one-time
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Rahul Sharma"
              required
              maxLength={100}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rahul@example.com"
              required
              maxLength={255}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              required
              maxLength={15}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-primary-hover active:scale-[0.98] shadow-button disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : `Pay ${plan.price}`}
          </button>

          <p className="text-xs text-muted text-center mt-3">
            Secure payment powered by Razorpay. Your data is encrypted.
          </p>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
