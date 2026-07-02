"use client";

import { useState } from "react";

interface CopyButtonProps {
  value: string;
}

export default function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="
          rounded-xl py-3 px-5 text-sm font-semibold cursor-pointer
          bg-apple-border/50 dark:bg-apple-border-dark/50
          text-apple-text dark:text-apple-text-dark
          hover:bg-apple-border/70 dark:hover:bg-apple-border-dark/70
          transition-colors duration-150
        "
      >
        📋 Copy
      </button>
      <span
        className={`text-apple-green text-sm font-medium w-16 text-left transition-opacity duration-200 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        Copied!
      </span>
    </div>
  );
}
