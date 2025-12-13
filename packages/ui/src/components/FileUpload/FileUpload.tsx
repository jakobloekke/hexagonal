import React, { useMemo, useState } from 'react';
import { cn } from '../../utils/cn';
import { INTERACTIVE_BASE } from '../../utils/a11yClasses';

export interface FileUploadProps {
  /** Accepted types (e.g. "image/*,.pdf") */
  accept?: string;
  /** Max size in bytes */
  maxSize?: number;
  /** Multiple selection */
  multiple?: boolean;
  /** Controlled files list (optional). If omitted, component keeps its own list for display. */
  files?: File[];
  /** Called when files are selected */
  onFilesSelected: (files: File[]) => void;
  /** Optional upload handler; when provided, component shows uploading state */
  onUpload?: (file: File) => Promise<void>;
  /** Label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
}

function parseAccept(accept?: string) {
  if (!accept) return [];
  return accept
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function matchesAccept(file: File, accept?: string) {
  const rules = parseAccept(accept);
  if (rules.length === 0) return true;

  return rules.some((r) => {
    if (r.startsWith('.')) return file.name.toLowerCase().endsWith(r.toLowerCase());
    if (r.endsWith('/*')) return file.type.startsWith(r.slice(0, -1));
    return file.type === r;
  });
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  maxSize,
  multiple = false,
  files,
  onFilesSelected,
  onUpload,
  label,
  helperText,
  error,
  disabled = false,
  className,
}) => {
  const [internalFiles, setInternalFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  const list = files ?? internalFiles;

  const constraintsText = useMemo(() => {
    const parts: string[] = [];
    if (accept) parts.push(`Accepted: ${accept}`);
    if (typeof maxSize === 'number') parts.push(`Max size: ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
    return parts.join(' • ');
  }, [accept, maxSize]);

  const validate = (f: File) => {
    if (!matchesAccept(f, accept)) return `File type not allowed: ${f.name}`;
    if (typeof maxSize === 'number' && f.size > maxSize) return `File too large: ${f.name}`;
    return null;
  };

  const handleFiles = async (picked: File[]) => {
    setInternalError(null);

    const next: File[] = [];
    for (const f of picked) {
      const err = validate(f);
      if (err) {
        setInternalError(err);
      } else {
        next.push(f);
      }
    }

    const final = multiple ? next : next.slice(0, 1);
    if (final.length === 0) return;

    if (!files) setInternalFiles(final);
    onFilesSelected(final);

    if (onUpload) {
      for (const f of final) {
        const key = `${f.name}-${f.size}-${f.lastModified}`;
        setUploading((m) => ({ ...m, [key]: true }));
        try {
          await onUpload(f);
        } finally {
          setUploading((m) => ({ ...m, [key]: false }));
        }
      }
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {label ? <div className="mb-1 text-sm font-medium text-gray-700">{label}</div> : null}

      <div
        className={cn(
          'rounded-md border border-dashed p-4 text-sm',
          dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          INTERACTIVE_BASE,
        )}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onDragEnter={(e) => {
          e.preventDefault();
          if (disabled) return;
          setDragOver(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (disabled) return;
          setDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (disabled) return;
          const picked = Array.from(e.dataTransfer.files);
          void handleFiles(picked);
        }}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            (e.currentTarget.querySelector('input[type=file]') as HTMLInputElement | null)?.click();
          }
        }}
        onClick={() => {
          if (disabled) return;
          (document.getElementById('secondgen-fileupload-input') as HTMLInputElement | null)?.click();
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-medium text-gray-900">Drag and drop files here</div>
            <div className="text-gray-500">or click to browse</div>
            {constraintsText ? <div className="mt-1 text-xs text-gray-500">{constraintsText}</div> : null}
          </div>
          <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm">
            Browse
          </div>
        </div>

        <input
          id="secondgen-fileupload-input"
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => {
            const picked = e.target.files ? Array.from(e.target.files) : [];
            void handleFiles(picked);
          }}
        />
      </div>

      {(error || internalError) ? (
        <p className="mt-1 text-sm text-red-600">{error ?? internalError}</p>
      ) : helperText ? (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      ) : null}

      {list.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {list.map((f) => {
            const key = `${f.name}-${f.size}-${f.lastModified}`;
            const isUploading = Boolean(uploading[key]);
            return (
              <li key={key} className="rounded-md border border-gray-200 bg-white p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-gray-900">{f.name}</div>
                    <div className="text-xs text-gray-500">{(f.size / 1024).toFixed(0)} KB</div>
                  </div>
                  {isUploading ? (
                    <div className="text-xs text-blue-600">Uploading…</div>
                  ) : (
                    <div className="text-xs text-gray-500">Ready</div>
                  )}
                </div>
                {isUploading ? (
                  <div className="mt-2 h-2 w-full overflow-hidden rounded bg-gray-200">
                    <div className="h-full w-1/2 animate-pulse bg-blue-600" />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};


