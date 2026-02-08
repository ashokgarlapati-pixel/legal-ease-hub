import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, Upload, Brain, Search, ShieldAlert, Lightbulb, Mail, Wifi } from "lucide-react";

const processingSteps = [
  { icon: Upload, label: "Uploading Document" },
  { icon: Wifi, label: "Connecting to LEGALMIND Engine" },
  { icon: Search, label: "Checking Regulations" },
  { icon: ShieldAlert, label: "Detecting Risk Clauses" },
  { icon: Lightbulb, label: "Generating Compliance Suggestions" },
  { icon: Mail, label: "Preparing Email Report" },
];

type WebhookStatus = "connected" | "sending" | "processing" | "completed" | "failed";

interface ProcessingScreenProps {
  webhookStatus: WebhookStatus;
}

const statusConfig: Record<WebhookStatus, { color: string; label: string }> = {
  connected: { color: "bg-blue-soft text-accent", label: "Connected" },
  sending: { color: "bg-warning/10 text-warning", label: "Sending" },
  processing: { color: "bg-accent/10 text-accent", label: "Processing" },
  completed: { color: "bg-success/10 text-success", label: "Completed" },
  failed: { color: "bg-destructive/10 text-destructive", label: "Failed" },
};

const ProcessingScreen = ({ webhookStatus }: ProcessingScreenProps) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (webhookStatus === "failed" || webhookStatus === "completed") return;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= processingSteps.length - 1) return prev;
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [webhookStatus]);

  const statusCfg = statusConfig[webhookStatus];

  return (
    <div className="mx-auto max-w-lg space-y-8 py-8 text-center">
      {/* Webhook status badge */}
      <div className="flex justify-center">
        <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ${statusCfg.color}`}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
          </span>
          Webhook: {statusCfg.label}
        </span>
      </div>

      {/* Spinner */}
      <div className="flex justify-center">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <Loader2 className="absolute h-20 w-20 animate-spin text-accent/20" />
          <Brain className="h-8 w-8 text-accent" />
        </div>
      </div>

      <h2 className="text-xl font-bold text-foreground">Analyzing Your Document</h2>

      {/* Progress bar */}
      <div className="mx-auto h-2 max-w-sm overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: "0%" }}
          animate={{ width: `${((activeStep + 1) / processingSteps.length) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Steps list */}
      <div className="space-y-3 text-left">
        {processingSteps.map((s, i) => {
          const done = i < activeStep;
          const active = i === activeStep;
          return (
            <AnimatePresence key={s.label}>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-colors ${
                  done
                    ? "text-success"
                    : active
                    ? "bg-blue-soft text-accent font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {done ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : active ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <s.icon className="h-5 w-5" />
                )}
                {s.label}
              </motion.div>
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessingScreen;
