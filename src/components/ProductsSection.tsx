import { motion } from "framer-motion";
import { Search, MapPin, Phone, Mail, Save, Users, FileText, Calculator, Building2, IndianRupee } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            Two Powerful Tools, One Mission
          </h2>
          <p className="text-base text-muted max-w-2xl mx-auto">
            Everything you need to find new clients and manage your business — all from your desktop, no internet required.
          </p>
        </div>

        {/* Lead Gen Tool */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
          className="mb-24"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wide mb-4">
                Product 1
              </span>
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Lead Generation Tool
              </h3>
              <p className="text-muted mb-6 leading-relaxed">
                Find high-quality leads from any niche, in any city across India. Extract verified contact details and save them directly to your computer for instant outreach.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Search, text: "Search leads by niche — restaurants, clinics, agencies, and more" },
                  { icon: MapPin, text: "Filter by any city or location for hyper-local targeting" },
                  { icon: Phone, text: "Get verified phone numbers for direct outreach" },
                  { icon: Mail, text: "Extract email addresses for email marketing campaigns" },
                  { icon: Save, text: "Export & save all lead data to your computer instantly" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-muted">
                    <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-primary/10 shrink-0 mt-0.5">
                      <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
                    </div>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="rounded-xl bg-card shadow-card p-8 border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Lead Finder</p>
                    <p className="text-xs text-muted">Search · Extract · Save</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {["Restaurants in Mumbai", "CA Firms in Delhi", "Clinics in Bangalore"].map((q, i) => (
                    <div key={q} className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/50">
                      <Search className="h-4 w-4 text-muted shrink-0" />
                      <span className="text-sm text-foreground">{q}</span>
                      <span className="ml-auto text-xs text-primary font-medium tabular-nums">{[147, 89, 203][i]} leads</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted">
                  <span>Results saved to your PC</span>
                  <span className="text-primary font-medium">100% Offline</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CRM Tool */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="order-2 md:order-1 relative">
              <div className="rounded-xl bg-card shadow-card p-8 border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Client Manager</p>
                    <p className="text-xs text-muted">Manage · Invoice · Bill</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Sharma Electronics", status: "Invoice Sent", amt: "₹24,500" },
                    { name: "Patel Traders", status: "Paid", amt: "₹18,200" },
                    { name: "Gupta & Sons", status: "Draft", amt: "₹31,750" },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/50">
                      <Building2 className="h-4 w-4 text-muted shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-foreground block">{c.name}</span>
                        <span className="text-xs text-muted">{c.status}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground tabular-nums">{c.amt}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted">
                  <span>GST auto-calculated</span>
                  <span className="text-primary font-medium">CGST + SGST / IGST</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wide mb-4">
                Product 2
              </span>
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Complete CRM with GST Invoicing
              </h3>
              <p className="text-muted mb-6 leading-relaxed">
                Manage your entire client list and generate professional, GST-compliant invoices — all from one powerful desktop application. No cloud, no subscriptions.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Users, text: "Maintain a complete client database with all details" },
                  { icon: FileText, text: "Generate professional PDF invoices in seconds" },
                  { icon: Calculator, text: "Automatic GST calculation — CGST, SGST & IGST splitting" },
                  { icon: IndianRupee, text: "Track payments, pending bills & revenue at a glance" },
                  { icon: Building2, text: "Save business profiles & bank details for auto-fill" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-muted">
                    <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-primary/10 shrink-0 mt-0.5">
                      <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
                    </div>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
