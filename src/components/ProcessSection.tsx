import { motion } from "framer-motion";
import { ListChecks, CreditCard, Download } from "lucide-react";

const steps = [
  {
    icon: ListChecks,
    title: "Select Plan",
    description: "Choose the model that fits your business needs.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Pay the exact plan amount securely via the Razorpay gateway.",
  },
  {
    icon: Download,
    title: "Instant Access",
    description: "Your unique download link for the .exe installer is provided immediately after payment confirmation.",
  },
];

const ease = [0.25, 0.1, 0.25, 1];

const ProcessSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            Seamless Access via Razorpay
          </h2>
          <p className="text-base text-muted">Three steps to get started with Enterprise GST Pro.</p>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-6 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease, delay: i * 0.12 }}
              className="flex-1 relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                  Step {i + 1}
                </span>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.description}</p>
              </div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
