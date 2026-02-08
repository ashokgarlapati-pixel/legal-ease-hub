import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => (
  <section className="relative overflow-hidden bg-hero px-4 py-24 md:py-32">
    {/* Background decoration */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
    </div>

    <div className="container relative mx-auto max-w-4xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground/90">
          <Sparkles className="h-4 w-4" />
          AI-Powered Legal Intelligence
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground md:text-6xl"
      >
        Turn Complex Legal Documents
        <br />
        into <span className="text-accent">Clear Decisions</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mb-10 max-w-2xl text-lg text-primary-foreground/70"
      >
        Upload your legal documents and HR policies. Get jurisdiction-aware compliance
        analysis, risk detection, and actionable suggestions — delivered straight to your inbox.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <Link to="/dashboard">
          <Button
            size="lg"
            className="gap-2 bg-accent px-8 text-accent-foreground shadow-glow hover:bg-accent/90"
          >
            Analyze Document
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
          <Shield className="h-4 w-4" />
          Secure & confidential processing
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
