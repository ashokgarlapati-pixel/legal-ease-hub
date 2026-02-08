import { CheckCircle2 } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => (
  <div className="flex items-center justify-center gap-2">
    {steps.map((label, i) => {
      const isCompleted = i < currentStep;
      const isActive = i === currentStep;
      return (
        <div key={label} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                isCompleted
                  ? "bg-success text-success-foreground"
                  : isActive
                  ? "bg-accent text-accent-foreground shadow-glow"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={`hidden text-sm font-medium sm:block ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`mx-1 h-0.5 w-8 rounded-full transition-colors ${
                isCompleted ? "bg-success" : "bg-border"
              }`}
            />
          )}
        </div>
      );
    })}
  </div>
);

export default StepIndicator;
