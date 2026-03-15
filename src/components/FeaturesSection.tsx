import { motion } from "framer-motion";
import { Calculator, ShieldCheck, UserCheck, FileImage, CheckCircle, IndianRupee } from "lucide-react";

const features = [
  {
    icon: UserCheck,
    title: "Complete CRM",
    description: "Manage clients, leads, and contacts — all from one unified desktop application.",
  },
  {
    icon: Calculator,
    title: "Built-in Invoice Generator",
    description: "Generate GST-compliant invoices with automatic CGST/SGST and IGST calculations.",
  },
  {
    icon: ShieldCheck,
    title: "100% Offline Privacy",
    description: "Your data stays on your PC, never on the cloud. Ideal for privacy-conscious businesses.",
  },
  {
    icon: FileImage,
    title: "Professional Branding",
    description: "Upload your logo and generate enterprise-grade PDFs with custom footers.",
  },
  {
    icon: CheckCircle,
    title: "Data Validation",
    description: "Built-in GSTIN check and integer-locked quantities to prevent compliance errors.",
  },
  {
    icon: IndianRupee,
    title: "One-Time Cost",
    description: "Break free from SaaS traps. Pay once, own it forever.",
  },
];

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            Built for Compliance. Designed for Speed.
          </h2>
          <p className="text-base text-muted max-w-2xl mx-auto" style={{ textWrap: "pretty" }}>
            Everything you need to generate GST-compliant invoices without an internet connection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, ease, delay: i * 0.08 }}
              whileHover={{ y: -2, transition: { duration: 0.2, ease } }}
              className="p-6 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
