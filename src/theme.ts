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
 * Devtrine Studio EP.04 Palette — Official Perl & O'Reilly "Camel Book" Colors
 * (Perl Cerulean Teal #0073A1, Regex Sky #38BDF8, Unix Terminal Deep #041527, Camel Desert Gold #F59E0B).
 */
export const C = {
  // Devtrine brand identity (for DevtrineMascot & logo)
  cyan: "#0CC0DF",
  cyanLight: "#5EE1E6",
  cyanPale: "#D9F7F9",

  // Official Perl Programming Language & Camel Book Palette
  perlDeep: "#041527",     // Deep Unix terminal midnight
  perlTeal: "#0073A1",     // Official O'Reilly "Programming Perl" Camel Book cerulean teal
  perlBlue: "#0284C7",     // Vibrant Perl cyan-blue
  perlSky: "#38BDF8",      // Electric regex sky blue
  perlIce: "#E0F2FE",      // Pale ice blue tint
  camelGold: "#F59E0B",    // Iconic Perl Camel mascot desert amber/gold
  camelDark: "#B45309",    // Deep desert bronze
  camelSand: "#FEF3C7",    // Warm desert oasis sand

  // Compatibility aliases used by shared components
  luaDeep: "#041527",
  luaNavy: "#0073A1",
  luaBlue: "#0284C7",
  luaSky: "#38BDF8",
  luaIce: "#E0F2FE",
  purple: "#0073A1",
  purpleLight: "#E0F2FE",

  // Crisp Unix Terminal & Blueprint Studio Neutrals
  black: "#030D1A",
  charcoal: "#0F172A",
  ink: "#091326",
  slate: "#475569",
  paper: "#F1F5F9",
  paperGrid: "#DCE5F0",
  white: "#F8FAFC",

  // Functional Accents
  yellow: "#F59E0B",
  red: "#E11D48",
  green: "#10B981",
  kraft: "#D4A373",
  sepia: "#EFECE6",
  sepiaDark: "#4B483F",
  sepiaInk: "#1B1A17",
  sepiaRed: "#0073A1",
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
