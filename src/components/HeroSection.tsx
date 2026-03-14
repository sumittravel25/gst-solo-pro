import { motion } from "framer-motion";
import appScreenshot from "@/assets/app-screenshot.png";

const ease = [0.25, 0.1, 0.25, 1];

const HeroSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <p className="text-sm font-medium tracking-wide uppercase text-primary mb-4">
              100% Offline. 0% Cloud Risk.
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.1] mb-6">
              GST Billing, Simplified.{" "}
              <span className="text-muted">Professional Invoices in Seconds.</span>
            </h1>
            <p className="text-base md:text-lg text-muted leading-relaxed mb-8 max-w-lg" style={{ textWrap: "pretty" }}>
              A powerful, offline-first desktop suite built for Indian SMEs. No monthly subscriptions. Pay once, download, and start billing.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#pricing"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold transition-all duration-200 hover:bg-primary-hover active:scale-[0.98] shadow-button"
              >
                Get Started
              </a>
              <button className="px-8 py-4 rounded-lg font-semibold text-foreground border border-border hover:bg-secondary transition-all duration-200">
                Watch Demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden shadow-card bg-foreground p-1">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-foreground rounded-t-lg">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-primary-foreground/50 ml-2 font-medium">Enterprise GST Pro v3.2</span>
              </div>
              <img
                src={appScreenshot}
                alt="Enterprise GST Pro desktop application showing GST invoice management interface"
                className="w-full rounded-b-lg"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
