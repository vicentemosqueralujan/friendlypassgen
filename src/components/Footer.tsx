import { REPO_URL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="w-full pt-1 text-center">
      <a
        href={REPO_URL}
        className="text-xs text-apple-muted hover:text-apple-blue transition-colors underline"
      >
        © 2026 Vicente Mosquera Luján. All rights reserved.
      </a>
    </footer>
  );
}
