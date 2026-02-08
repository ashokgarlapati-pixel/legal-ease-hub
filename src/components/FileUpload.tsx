import { useCallback, useState } from "react";
import { Upload, FileText, X, AlertCircle } from "lucide-react";

interface FileUploadProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
}

const MAX_SIZE = 20 * 1024 * 1024; // 20MB

const FileUpload = ({ file, onFileSelect }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndSet = useCallback(
    (f: File) => {
      setError(null);
      if (f.type !== "application/pdf") {
        setError("Only PDF files are accepted.");
        return;
      }
      if (f.size > MAX_SIZE) {
        setError("File size must be under 20MB.");
        return;
      }
      onFileSelect(f);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files[0]) validateAndSet(e.dataTransfer.files[0]);
    },
    [validateAndSet]
  );

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Upload Legal Document</label>

      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-all ${
            dragActive
              ? "border-accent bg-blue-soft"
              : "border-border bg-muted/30 hover:border-accent/50 hover:bg-blue-soft/50"
          }`}
        >
          <input
            type="file"
            accept=".pdf,application/pdf"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => {
              if (e.target.files?.[0]) validateAndSet(e.target.files[0]);
            }}
          />
          <Upload className="mb-3 h-10 w-10 text-accent" />
          <p className="text-sm font-medium text-foreground">
            Drag & drop your PDF here
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            or click to browse • PDF only • Max 20MB
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-soft text-accent">
            <FileText className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button
            onClick={() => onFileSelect(null)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
