/**
 * Password generation core.
 * Ported 1:1 from the legacy Python reference (`random-secure-friendly-password-v05061315.py`),
 * swapping Python's `secrets` module for the Web Crypto API (`crypto.getRandomValues`)
 * so generation runs entirely client-side with CSPRNG-backed entropy — no
 * password material is ever sent to a server.
 */

function randomInt(maxExclusive: number): number;
function randomInt(min: number, maxExclusive: number): number;
function randomInt(a: number, b?: number): number {
  const min = b === undefined ? 0 : a;
  const max = b === undefined ? a : b;
  const range = max - min;
  const buf = new Uint32Array(1);
  const limit = Math.floor(0xffffffff / range) * range;
  let value: number;
  do {
    crypto.getRandomValues(buf);
    value = buf[0];
  } while (value >= limit);
  return min + (value % range);
}

export type PasswordMode = "friendly" | "secure";

export const MIN_LENGTH = 12;
export const MAX_LENGTH = 30;

const SYMBOLS = "@#*!$%&?";
const FRIENDLY_SYMBOLS = [".", "$"];
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";

const FRIENDLY_WORDS = [
  "apple", "bison", "coral", "dino", "ember", "fable", "grove", "haven",
  "ivory", "jade", "karma", "lemon", "mango", "noble", "ocean", "panda",
  "quill", "river", "solar", "tiger", "ultra", "violet", "willow", "xenon",
  "yacht", "zephyr", "amber", "blaze", "cedar", "daisy", "eagle", "frost",
  "glacier", "honey", "island", "jungle", "knight", "lotus", "maple",
  "nectar", "orbit", "quest", "ranch", "storm", "tundra",
  "urban", "venom", "walnut", "farm", "pixel", "sigma", "delta", "lunar",
  "comet", "prism", "scout", "forge", "swift", "brave", "crisp",
];

function choice<T>(arr: T[] | string): T extends string ? string : T {
  const idx = randomInt(arr.length);
  // @ts-expect-error - indexing works identically for string and array
  return arr[idx];
}

function capitalize(word: string): string {
  if (!word) return word;
  return word[0].toUpperCase() + word.slice(1);
}

export function clampLength(length: number): number {
  if (!Number.isFinite(length)) return MIN_LENGTH;
  return Math.max(MIN_LENGTH, Math.min(MAX_LENGTH, Math.trunc(length)));
}

export function generateFriendly(length: number): string {
  const sep = choice(FRIENDLY_SYMBOLS);
  const num = String(randomInt(10, 100));
  const wordBudget = Math.max(2, length - 3);
  const half = Math.floor(wordBudget / 2);

  const w1 = (choice(FRIENDLY_WORDS) as string).slice(0, Math.max(1, half));
  const w2 = (choice(FRIENDLY_WORDS) as string).slice(
    0,
    Math.max(1, wordBudget - w1.length)
  );

  let raw = w1.toLowerCase() + sep + capitalize(w2) + num;
  if (raw.length < length) {
    raw += (choice(FRIENDLY_WORDS) as string).slice(0, length - raw.length);
  }
  return raw.slice(0, length);
}

export function generateSecure(length: number): string {
  const pool = UPPER + LOWER + DIGITS + SYMBOLS;
  const required = [
    choice(UPPER) as string,
    choice(LOWER) as string,
    choice(DIGITS) as string,
    choice(SYMBOLS) as string,
  ];
  const remaining = Math.max(0, length - required.length);
  const chars = required.concat(
    Array.from({ length: remaining }, () => choice(pool) as string)
  );

  // Fisher-Yates shuffle, CSPRNG-backed.
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.slice(0, length).join("");
}

export function generatePassword(mode: PasswordMode, length: number): string {
  const safeLength = clampLength(length);
  return mode === "friendly"
    ? generateFriendly(safeLength)
    : generateSecure(safeLength);
}
