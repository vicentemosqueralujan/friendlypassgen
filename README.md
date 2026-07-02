# 🔒 FriendlyPassGen

A premium, Apple-inspired password generator — generate cryptographically
secure passwords **or** human-friendly, memorable ones, entirely
**client-side** using the browser's Web Crypto API (CSPRNG). No password
is ever sent to a server. Built with Next.js, TypeScript, and Tailwind CSS;
zero-config deployable to Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vicentemoslu/friendlypassgen)

> Repo not published yet — update the link above once it goes live.

## Attribution

The core password-generation algorithm is ported from an original Python
reference script (`random-secure-friendly-password-v05061315.py`). See
[`LICENSE`](./LICENSE) for the full MIT terms.

## Security & Entropy Model

Two generation modes, both backed by `crypto.getRandomValues` (a CSPRNG —
never `Math.random`), run entirely in the browser:

- **Secure mode** — draws from `A-Z`, `a-z`, `0-9`, and a symbol set
  (`@#*!$%&?`), guarantees at least one character from each class, fills the
  remainder uniformly from the full pool, then applies a CSPRNG-driven
  Fisher-Yates shuffle. At the 12-character floor this yields roughly
  **~72 bits of entropy** (log2(66) × 12), scaling up to ~180 bits at the
  30-character ceiling.
- **Friendly mode** — composes two dictionary words (from a 60-word list),
  a separator (`.` or `$`), and a 2-digit number, trading raw entropy for
  memorability. This mode is intended for low-stakes, human-typed contexts,
  not for protecting sensitive accounts.

Length is clamped to **12–30 characters**.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS (Apple Human Interface Guidelines–inspired design tokens)
- Deployed on [Vercel](https://vercel.com)

## Project Structure

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    PasswordCard.tsx        # main card, state, generation trigger
    ModeToggle.tsx           # Friendly / Secure segmented control
    ThemeToggle.tsx          # light / dark mode switch
    CopyButton.tsx           # clipboard button + "Copied!" micro-interaction
    Footer.tsx                # copyright + repo link
  lib/
    passwordGenerator.ts     # ported core algorithm (Web Crypto–backed)
    site.ts                  # shared site constants (repo URL)
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. Click the **Deploy with Vercel** badge above, or import the repo directly
   at [vercel.com/new](https://vercel.com/new).
3. No environment variables or build configuration are required — Vercel
   auto-detects the Next.js framework.

## License

MIT. See [`LICENSE`](./LICENSE).
