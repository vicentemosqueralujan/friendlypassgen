"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const dark = stored === "light" ? false : true;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="
        rounded-full w-9 h-9 flex items-center justify-center text-sm
        border border-apple-border dark:border-apple-border-dark
        text-apple-text dark:text-apple-text-dark
        hover:bg-apple-bg dark:hover:bg-white/5
        transition-colors duration-150
      "
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
