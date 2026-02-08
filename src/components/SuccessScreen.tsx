import { CheckCircle2, FileText, Globe, Mail, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SuccessScreenProps {
  fileName: string;
  jurisdiction: string;
  email: string;
  onReset: () => void;
}

const SuccessScreen = ({ fileName, jurisdiction, email, onReset }: SuccessScreenProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="mx-auto max-w-lg space-y-8 py-8 text-center"
  >
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
      <CheckCircle2 className="h-10 w-10 text-success" />
    </div>

    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        Document Submitted Successfully
      </h2>
      <p className="text-muted-foreground">
        Your analysis report will be sent to your email shortly.
      </p>
    </div>

    {/* Summary */}
    <div className="space-y-3 rounded-xl border border-border bg-card p-5 text-left shadow-card">
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-accent" />
        <div>
          <p className="text-xs text-muted-foreground">Document</p>
          <p className="text-sm font-medium text-foreground">{fileName}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Globe className="h-5 w-5 text-accent" />
        <div>
          <p className="text-xs text-muted-foreground">Jurisdiction</p>
          <p className="text-sm font-medium text-foreground capitalize">{jurisdiction}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Mail className="h-5 w-5 text-accent" />
        <div>
          <p className="text-xs text-muted-foreground">Report Sent To</p>
          <p className="text-sm font-medium text-foreground">{email}</p>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
      <Button onClick={onReset} className="gap-2">
        <RotateCcw className="h-4 w-4" />
        Upload Another Document
      </Button>
      <Button variant="outline" onClick={onReset} className="gap-2">
        <ArrowRight className="h-4 w-4" />
        Back to Dashboard
      </Button>
    </div>
  </motion.div>
);

export default SuccessScreen;
