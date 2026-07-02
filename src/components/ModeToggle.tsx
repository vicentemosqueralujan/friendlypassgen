"use client";

import { PasswordMode } from "@/lib/passwordGenerator";

interface ModeToggleProps {
  mode: PasswordMode;
  onChange: (mode: PasswordMode) => void;
}

const OPTIONS: { value: PasswordMode; label: string }[] = [
  { value: "friendly", label: "Friendly" },
  { value: "secure", label: "Secure" },
];

export default function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex gap-2">
      {OPTIONS.map((opt) => {
        const active = mode === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`
              rounded-lg px-4 py-1.5 text-sm font-medium cursor-pointer
              transition-colors duration-150
              ${
                active
                  ? "bg-apple-blue text-white"
                  : "bg-apple-border/40 dark:bg-apple-border-dark/40 text-apple-text dark:text-apple-text-dark hover:bg-apple-border/60"
              }
            `}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
