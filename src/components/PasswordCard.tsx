"use client";

import { useCallback, useEffect, useState } from "react";
import {
  generatePassword,
  MAX_LENGTH,
  MIN_LENGTH,
  PasswordMode,
} from "@/lib/passwordGenerator";
import ModeToggle from "./ModeToggle";
import CopyButton from "./CopyButton";
import ThemeToggle from "./ThemeToggle";
import Footer from "./Footer";

export default function PasswordCard() {
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<PasswordMode>("friendly");
  const [length, setLength] = useState(12);
  const [loading, setLoading] = useState(false);

  const generate = useCallback((nextMode: PasswordMode, nextLength: number) => {
    setLoading(true);
    setPassword(generatePassword(nextMode, nextLength));
    setLoading(false);
  }, []);

  useEffect(() => {
    generate(mode, length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModeChange = (nextMode: PasswordMode) => {
    setMode(nextMode);
    generate(nextMode, length);
  };

  const handleLengthChange = (nextLength: number) => {
    setLength(nextLength);
    generate(mode, nextLength);
  };

  return (
    <div
      className="
        w-full max-w-md rounded-apple-xl border p-8
        bg-white/80 dark:bg-apple-surface-dark/70
        backdrop-blur-apple
        border-apple-border dark:border-apple-border-dark
        shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.08)]
        animate-fade-in-up
      "
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-apple-text dark:text-apple-text-dark flex items-center gap-2">
          <span aria-hidden>🔒</span> FriendlyPassGen
        </h1>
        <ThemeToggle />
      </div>

      <div
        className="
          rounded-apple-lg border px-6 py-5 mb-6 text-center min-h-[76px] flex items-center justify-center
          bg-apple-bg/70 dark:bg-black/30
          border-apple-border dark:border-apple-border-dark
        "
      >
        <span
          key={password}
          className={`text-2xl font-bold text-apple-text dark:text-apple-text-dark break-all select-all tracking-wide animate-pop ${
            loading ? "opacity-40" : ""
          }`}
        >
          {password || "•".repeat(12)}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => generate(mode, length)}
          className="
            flex-1 rounded-xl py-3 text-sm font-semibold text-white
            bg-apple-blue hover:bg-apple-blue-hover active:bg-apple-blue-active
            transition-colors duration-150
          "
        >
          ⚡ Generate
        </button>
        <CopyButton value={password} />
      </div>

      <div className="border-t border-apple-border dark:border-apple-border-dark mb-5" />

      <p className="text-apple-text dark:text-apple-text-dark text-sm font-semibold mb-4">
        ⚙️ Settings
      </p>

      <div className="flex items-center gap-3 mb-5">
        <span className="text-sm text-apple-text dark:text-apple-text-dark w-20 shrink-0">
          📏 Length
        </span>
        <input
          type="range"
          min={MIN_LENGTH}
          max={MAX_LENGTH}
          value={length}
          onChange={(e) => handleLengthChange(Number(e.target.value))}
          className="flex-1 h-1.5 rounded-full cursor-pointer accent-apple-blue"
        />
        <span className="text-sm text-apple-text dark:text-apple-text-dark w-6 text-right font-medium">
          {length}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-apple-text dark:text-apple-text-dark w-20 shrink-0">
          🎨 Mode
        </span>
        <ModeToggle mode={mode} onChange={handleModeChange} />
      </div>

      <div
        className="
          rounded-apple-lg border px-4 py-3 mb-5
          bg-apple-red/5 dark:bg-apple-red/10
          border-apple-red/20 dark:border-apple-red/30
        "
      >
        <p className="text-center text-apple-red text-xs font-medium leading-snug">
          🔒 <span className="font-semibold">Security Note:</span> Runs
          entirely locally. No data or passwords are ever collected,
          tracked, or stored. Use at your own risk; the author assumes no
          liability or responsibility.
        </p>
      </div>

      <Footer />
    </div>
  );
}
