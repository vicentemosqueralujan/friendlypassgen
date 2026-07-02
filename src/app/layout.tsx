import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FriendlyPassGen — Secure & Memorable Password Generator",
  description:
    "A premium, Apple-inspired password generator. Generate cryptographically secure or human-friendly passwords instantly, entirely in your browser.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22 width=%2232%22 height=%2232%22><text y=%2226%22 font-size=%2228%22>%F0%9F%94%92</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-apple-bg dark:bg-black font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
