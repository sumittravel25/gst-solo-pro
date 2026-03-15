import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import CheckoutModal from "./CheckoutModal";

const plans = [
  {
    id: "basic" as const,
    name: "Basic",
    tag: "For Freelancers",
    price: "₹2,499",
    amount: 2499,
    popular: false,
    features: [
      "Complete CRM + Invoice Generator .exe",
      "Lifetime access",
      "Professional PDF Export",
    ],
  },
  {
    id: "business" as const,
    name: "Business",
    tag: "Most Popular",
    price: "₹5,999",
    amount: 5999,
    popular: true,
    features: [
      "Everything in Basic",
      "Future Feature Updates",
      "Priority Email Support",
      "Remote Installation Support",
    ],
  },
  {
    id: "enterprise" as const,
    name: "Enterprise",
    tag: "For Growing Firms",
    price: "₹9,999",
    amount: 9999,
    popular: false,
    features: [
      "Everything in Business",
      "Custom Invoice Layouts",
      "1-on-1 Customization Assistance",
      "White-labeling options",
    ],
  },
];

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export type Plan = (typeof plans)[number];

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            Choose Your Plan & Download Instantly
          </h2>
          <p className="text-base text-muted max-w-2xl mx-auto">
            Each plan includes a one-time payment. Upon successful payment, you get instant access to your download.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, ease, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease } }}
              className={`relative p-8 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow duration-200 ${
                plan.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full uppercase tracking-wide">
                    {plan.tag}
                  </span>
                </div>
              )}

              {!plan.popular && (
                <span className="text-xs font-medium text-muted uppercase tracking-wide">{plan.tag}</span>
              )}

              <h3 className="text-lg font-semibold text-foreground mt-2">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-semibold text-foreground tabular-nums">{plan.price}</span>
                <span className="text-sm text-muted ml-2">one-time</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(plan)}
                className={`w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-[0.98] ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary-hover shadow-button"
                    : "bg-secondary text-secondary-foreground hover:bg-border"
                }`}
              >
                Buy Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <CheckoutModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </section>
  );
};

export default PricingSection;
