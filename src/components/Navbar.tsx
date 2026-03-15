import { Monitor } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-card/80 shadow-nav">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-2">
          <Monitor className="h-5 w-5 text-primary" strokeWidth={1.5} />
          <span className="text-lg font-semibold text-foreground">My CRM</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-muted hover:text-foreground transition-colors duration-200">Features</a>
          <a href="#pricing" className="text-sm font-medium text-muted hover:text-foreground transition-colors duration-200">Pricing</a>
          <a href="#faq" className="text-sm font-medium text-muted hover:text-foreground transition-colors duration-200">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#pricing"
            className="text-sm font-medium tracking-wide uppercase px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-button"
          >
            Buy Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
