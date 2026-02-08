import { Globe, ShieldAlert, BookOpen, Lightbulb, Mail } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Globe,
    title: "Jurisdiction-Aware Analysis",
    description: "Tailored compliance checks for India, USA, UK, EU, and custom jurisdictions.",
  },
  {
    icon: ShieldAlert,
    title: "Compliance Risk Detection",
    description: "Instantly identifies clauses that pose regulatory or legal risks.",
  },
  {
    icon: BookOpen,
    title: "Regulation Mapping",
    description: "Maps document clauses to applicable laws and regulations automatically.",
  },
  {
    icon: Lightbulb,
    title: "Actionable Suggestions",
    description: "Get clear, plain-language recommendations to fix compliance gaps.",
  },
  {
    icon: Mail,
    title: "Automated Email Reports",
    description: "Receive a comprehensive analysis report directly in your inbox.",
  },
];

const FeaturesGrid = () => (
  <section className="bg-gradient-soft px-4 py-20 md:py-28">
    <div className="container mx-auto max-w-6xl">
      <div className="mb-14 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Powerful Features
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Everything you need to analyze legal documents with confidence.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-soft text-accent">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {f.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesGrid;
