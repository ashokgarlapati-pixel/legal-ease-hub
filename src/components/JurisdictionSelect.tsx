import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const jurisdictions = [
  { value: "india", label: "🇮🇳 India" },
  { value: "usa", label: "🇺🇸 USA" },
  { value: "uk", label: "🇬🇧 United Kingdom" },
  { value: "eu", label: "🇪🇺 European Union" },
  { value: "custom", label: "✏️ Custom" },
];

interface JurisdictionSelectProps {
  value: string;
  customValue: string;
  onChange: (value: string) => void;
  onCustomChange: (value: string) => void;
}

const JurisdictionSelect = ({
  value,
  customValue,
  onChange,
  onCustomChange,
}: JurisdictionSelectProps) => (
  <div className="space-y-3">
    <label className="text-sm font-medium text-foreground">Select Jurisdiction</label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-card">
        <SelectValue placeholder="Choose jurisdiction…" />
      </SelectTrigger>
      <SelectContent className="bg-card">
        {jurisdictions.map((j) => (
          <SelectItem key={j.value} value={j.value}>
            {j.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    {value === "custom" && (
      <Input
        placeholder="Enter custom jurisdiction…"
        value={customValue}
        onChange={(e) => onCustomChange(e.target.value)}
        className="bg-card"
      />
    )}
  </div>
);

export default JurisdictionSelect;
