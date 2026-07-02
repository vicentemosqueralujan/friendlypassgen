# CLAUDE.md — AI Context Blueprint

This file orients AI coding assistants (Claude included) working in this
repository.

## Project

FriendlyPassGen: a Next.js + TypeScript + Tailwind CSS password generator
with an Apple-inspired UI, deployable zero-config to Vercel. Core generation
logic lives in `src/lib/passwordGenerator.ts`, ported from the legacy Python
script referenced in the README's Attribution section.

## Development Bounds

- Package manager is **npm only** — do not introduce yarn/pnpm lockfiles.
- Framework is Next.js **App Router** (`src/app`) — do not add a `pages/`
  directory.
- Password generation must stay CSPRNG-backed (Web Crypto's
  `crypto.getRandomValues`) and run entirely client-side. Never use
  `Math.random()` for password material, and never introduce a server
  endpoint that receives or generates password material.
- Length is clamped to `MIN_LENGTH`–`MAX_LENGTH` (12–30) in
  `src/lib/passwordGenerator.ts`.
- Keep `src/lib` framework-agnostic (no React/Next imports) so the
  generator logic stays independently testable.

## Apple Design Tokens

Defined in `tailwind.config.ts` — respect these instead of introducing new
ad-hoc colors/radii:

| Token | Value | Usage |
|---|---|---|
| `apple-bg` | `#F5F5F7` | light background |
| `apple-dark` | `#000000` | dark background |
| `apple-surface` / `apple-surface-dark` | `#FFFFFF` / `#1D1D1F` | card backgrounds |
| `apple-border` / `apple-border-dark` | `#D2D2D7` / `#38383A` | hairline borders |
| `apple-text` / `apple-text-dark` | `#1D1D1F` / `#F5F5F7` | primary text |
| `apple-muted` | `#6E6E73` | secondary text |
| `apple-blue` / `-hover` / `-active` | `#0071E3` / `#0077ED` / `#005BBB` | primary action |
| `apple-green` | `#34C759` | success/confirmation state |
| `apple-red` | `#FF3B30` | warnings/disclaimers |
| `rounded-apple-lg` / `rounded-apple-xl` | `20px` / `28px` | card/container radii |
| `backdrop-blur-apple` | `20px` | glassmorphism containers |

UI must remain glassmorphism-based (translucent surfaces + `backdrop-blur`),
default to **dark mode** (`<html class="dark">` is set by default in
`layout.tsx`), and support a user-toggleable light mode via the `dark`
class on `<html>` (`darkMode: "class"`, toggled by `ThemeToggle.tsx` and
persisted to `localStorage`). Do not flip the default back to light —
this is a dark-first product. Keep micro-interactions (e.g. the Copy
button's "Copied!" fade) subtle and fast (150–250ms).

## Standard Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # production build (must pass before merging)
npm run lint     # eslint — must be clean before merging
npm run start    # serve production build locally
```

## Constraints

All work in this repo must stay contained within this project directory.
Do not commit `node_modules/`, `.next/`, or `.vercel/` — see `.gitignore`.
