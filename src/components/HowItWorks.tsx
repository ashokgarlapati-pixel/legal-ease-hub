import { Upload, Globe, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Document",
    description: "Drag & drop your PDF legal document or HR policy.",
  },
  {
    icon: Globe,
    step: "02",
    title: "Select Jurisdiction",
    description: "Choose the applicable legal jurisdiction for analysis.",
  },
  {
    icon: FileCheck,
    step: "03",
    title: "Receive Report",
    description: "Get a detailed compliance report delivered to your email.",
  },
];

const HowItWorks = () => (
  <section className="px-4 py-20 md:py-28">
    <div className="container mx-auto max-w-5xl">
      <div className="mb-14 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          How It Works
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Three simple steps to comprehensive legal compliance analysis.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="relative text-center"
          >
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border md:block" />
            )}

            <div className="relative z-10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-elevated">
              <s.icon className="h-7 w-7 text-primary-foreground" />
            </div>

            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
              Step {s.step}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
