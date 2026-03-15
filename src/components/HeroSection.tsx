import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import appScreenshot1 from "@/assets/app-screenshot-1.png";
import appScreenshot2 from "@/assets/app-screenshot-2.png";

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const slides = [appScreenshot1, appScreenshot2];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
              Complete CRM + Invoice Generator
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.1] mb-6">
              All-in-One CRM{" "}
              <span className="text-muted">with Built-in Invoice Generator.</span>
            </h1>
            <p className="text-base md:text-lg text-muted leading-relaxed mb-8 max-w-lg" style={{ textWrap: "pretty" }}>
              A complete CRM bundled with a powerful GST invoice generator — all in a single offline desktop app. Pay once, download the .exe, and run your business.
            </p>
            <a
              href="#pricing"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold transition-all duration-200 hover:bg-primary-hover active:scale-[0.98] shadow-button"
            >
              Get Started
            </a>
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
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-accent/80" />
                  <div className="w-3 h-3 rounded-full bg-primary/80" />
                </div>
                <span className="text-xs text-primary-foreground/50 ml-2 font-medium">My CRM v3.2</span>
              </div>
              <div className="relative">
                <img
                  src={slides[currentSlide]}
                  alt={`My CRM desktop application - view ${currentSlide + 1}`}
                  className="w-full rounded-b-lg"
                  loading="eager"
                />
                {/* Navigation arrows */}
                <button
                  onClick={() => setCurrentSlide(0)}
                  className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-opacity ${currentSlide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-background'}`}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-4 w-4 text-foreground" />
                </button>
                <button
                  onClick={() => setCurrentSlide(1)}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-opacity ${currentSlide === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-background'}`}
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-4 w-4 text-foreground" />
                </button>
                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-primary w-4' : 'bg-background/60'}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
