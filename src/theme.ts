import { loadFont as loadInterTight } from "@remotion/google-fonts/InterTight";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const interTight = loadInterTight("normal", { weights: ["500", "600", "700", "800", "900"], subsets: ["latin"] });
const spaceGrotesk = loadSpaceGrotesk("normal", { weights: ["500", "600", "700"], subsets: ["latin"] });
const mono = loadMono("normal", { weights: ["500", "700", "800"], subsets: ["latin"] });

export const FONT = {
  sans: interTight.fontFamily,
  display: spaceGrotesk.fontFamily,
  mono: mono.fontFamily,
};

/**
 * Devtrine Studio EP.03 Palette — Lua Official Colors (Deep Navy #000080, Cobalt Blue #1D4ED8, Moonlight Sky #60A5FA, Ice #DBEAFE).
 */
export const C = {
  // Devtrine brand identity (for DevtrineMascot & logo)
  cyan: "#0CC0DF",
  cyanLight: "#5EE1E6",
  cyanPale: "#D9F7F9",

  // Lua Official Programming Language Palette
  luaDeep: "#050929",     // Deep midnight Lua space
  luaNavy: "#000080",     // Official Lua logo navy blue
  luaBlue: "#1D4ED8",     // Vibrant Lua cobalt blue
  luaSky: "#60A5FA",      // Moonlight sky blue accent
  luaIce: "#DBEAFE",      // Pale ice blue tint
  purple: "#000080",
  purpleLight: "#DBEAFE",

  // Crisp Cool Studio Desk & Dot-Matrix Neutrals
  black: "#070B19",
  charcoal: "#111827",
  ink: "#0F172A",
  slate: "#475569",
  paper: "#EEF2F7",
  paperGrid: "#DCE3EE",
  white: "#F8FAFC",

  // Functional Accents
  yellow: "#FACC15",
  red: "#E11D48",
  green: "#16A34A",
  kraft: "#C69C6D",
  sepia: "#ECE8DF",
  sepiaDark: "#4B483F",
  sepiaInk: "#1B1A17",
  sepiaRed: "#1D4ED8",
};

export const W = 1080;
export const H = 1920;

/** Safe area for TikTok / Reels / Shorts UI overlays. */
export const SAFE = { top: 220, bottom: 1540, left: 90, right: 990 };

/** Master Audio Volume Settings */
export const AUDIO = {
  sfx: 0.48,
  bgm: 0.15,
  vo: 1.0,
};
