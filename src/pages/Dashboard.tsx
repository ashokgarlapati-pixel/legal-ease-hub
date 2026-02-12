import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StepIndicator from "@/components/StepIndicator";
import FileUpload from "@/components/FileUpload";
import JurisdictionSelect from "@/components/JurisdictionSelect";
import SuccessScreen from "@/components/SuccessScreen";
import ProcessingScreen from "@/components/ProcessingScreen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Send, RotateCcw, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

type Phase = "form" | "processing" | "success";
type WebhookStatus = "connected" | "sending" | "processing" | "completed" | "failed";

const STEPS = ["Upload", "Details", "Submit"];

const Dashboard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jurisdiction, setJurisdiction] = useState("india");
  const [customJurisdiction, setCustomJurisdiction] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phase, setPhase] = useState<Phase>("form");
  const [webhookStatus, setWebhookStatus] = useState<WebhookStatus>("connected");

  const currentStep = !file ? 0 : !jurisdiction || !email ? 1 : 2;

  const isFormValid =
    file &&
    jurisdiction &&
    (jurisdiction !== "custom" || customJurisdiction.trim()) &&
    email &&
    !emailError;

  const validateEmail = (val: string) => {
    setEmail(val);
    if (!val) {
      setEmailError("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleReset = useCallback(() => {
    setFile(null);
    setJurisdiction("");
    setCustomJurisdiction("");
    setEmail("");
    setEmailError("");
    setPhase("form");
    setWebhookStatus("connected");
  }, []);

  const handleSubmit = async () => {
    if (!isFormValid || !file) return;

    setPhase("processing");
    setWebhookStatus("sending");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("jurisdiction", jurisdiction === "custom" ? customJurisdiction : jurisdiction);
      formData.append("email", email);

      setWebhookStatus("processing");

      const response = await supabase.functions.invoke("webhook-proxy", {
        body: formData,
      });

      if (response.error) throw new Error(response.error.message);

      setWebhookStatus("completed");
      setTimeout(() => {
        setPhase("success");
        toast.success("Document submitted successfully!");
      }, 800);
    } catch (error) {
      console.error("Webhook error:", error);
      setWebhookStatus("failed");
      toast.error("Failed to submit document. Please try again.");
      setTimeout(() => setPhase("form"), 2000);
    }
  };

  const jurisdictionLabel =
    jurisdiction === "custom" ? customJurisdiction : jurisdiction;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 px-4 py-10 md:py-16">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
              Document Analyzer
            </h1>
            <p className="text-muted-foreground">
              Upload your legal document for AI-powered compliance analysis.
            </p>
          </div>

          {phase === "form" && (
            <>
              <div className="mb-8">
                <StepIndicator currentStep={currentStep} steps={STEPS} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-elevated md:p-8"
              >
                <FileUpload file={file} onFileSelect={setFile} />

                <JurisdictionSelect
                  value={jurisdiction}
                  customValue={customJurisdiction}
                  onChange={setJurisdiction}
                  onCustomChange={setCustomJurisdiction}
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Receive Analysis Report via Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => validateEmail(e.target.value)}
                    className={`bg-card ${emailError ? "border-destructive" : ""}`}
                  />
                  {emailError && (
                    <p className="flex items-center gap-1.5 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      {emailError}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className="flex-1 gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Analyze Document
                  </Button>
                  <Button variant="outline" onClick={handleReset} className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </motion.div>
            </>
          )}

          <AnimatePresence mode="wait">
            {phase === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-elevated md:p-8"
              >
                <ProcessingScreen webhookStatus={webhookStatus} />
              </motion.div>
            )}
            {phase === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-elevated md:p-8"
              >
                <SuccessScreen
                  fileName={file?.name || ""}
                  jurisdiction={jurisdictionLabel}
                  email={email}
                  onReset={handleReset}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
