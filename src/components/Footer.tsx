import { Link } from "react-router-dom";
import { Scale } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Scale className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            LEGAL<span className="text-accent">MIND</span>
          </span>
        </div>

        <div className="flex gap-8 text-sm text-muted-foreground">
          <Link to="/privacy" className="transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link to="/terms" className="transition-colors hover:text-foreground">
            Terms
          </Link>
          <Link to="/contact" className="transition-colors hover:text-foreground">
            Support
          </Link>
        </div>
      </div>

      <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} LEGALMIND. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
