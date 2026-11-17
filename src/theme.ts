import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadLora } from "@remotion/google-fonts/Lora";

const poppins = loadPoppins("normal", { weights: ["500", "600", "700", "800", "900"], subsets: ["latin"] });
const mono = loadMono("normal", { weights: ["500", "700", "800"], subsets: ["latin"] });
const lora = loadLora("normal", { weights: ["600", "700"], subsets: ["latin"] });
loadLora("italic", { weights: ["600", "700"], subsets: ["latin"] });

export const FONT = {
  sans: poppins.fontFamily,
  mono: mono.fontFamily,
  serif: lora.fontFamily,
};

/**
 * Devtrine Studio EP.03 Palette:
 * Lua Programming Language (Deep Navy, Electric Blue, Moonlight Ice) + Black & White Vox Editorial mix.
 * Pure SDR-safe values (no neon HDR clipping), while preserving original Devtrine Cyan for the mascot & brand pill.
 */
export const C = {
  // Devtrine brand identity (for DevtrineMascot & logo)
  cyan: "#0CC0DF",
  cyanLight: "#5EE1E6",
  cyanPale: "#D9F7F9",

  // Lua + B&W Theme Palette
  luaDeep: "#070B24",     // Deep midnight space / Lua sphere shadow
  luaNavy: "#000080",     // Classic Lua logo navy blue
  luaBlue: "#1D4ED8",     // Vibrant editorial Lua blue
  luaSky: "#60A5FA",      // Moonlight blue accent
  luaIce: "#DBEAFE",      // Pale ice blue tint

  // Monochrome B&W Vox Editorial
  black: "#0B0D12",
  charcoal: "#1C1F26",
  ink: "#14171D",
  slate: "#525866",
  paper: "#F3F2ED",       // Warm Vox newsprint off-white (SDR friendly)
  paperGrid: "#E5E3DC",
  white: "#F9F9F7",       // Soft SDR white (prevents blown-out glare)

  // Sparse editorial / UI accents
  yellow: "#FACC15",      // Vox highlighter marker
  red: "#DC2626",         // Stamp / alert
  green: "#16A34A",       // Verified / active
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
  sfx: 0.34,
  bgm: 0.16,
  vo: 1.0,
};
