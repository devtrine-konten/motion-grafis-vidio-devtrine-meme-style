// Voice-Over Synchronizer & Mixer for Devtrine Studio — Rust Meme Edition (84.0s)
// Uses `public/audio/vo/sync-vo.wav` directly and keeps `vo-synced.wav` in sync.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const VO_DIR = path.join(ROOT, "public/audio/vo");
const SYNC_VO = path.join(VO_DIR, "sync-vo.wav");
const LEGACY_VO = path.join(VO_DIR, "vo-synced.wav");

if (fs.existsSync(SYNC_VO)) {
  fs.copyFileSync(SYNC_VO, LEGACY_VO);
  console.log("Synced public/audio/vo/sync-vo.wav -> public/audio/vo/vo-synced.wav (84.0s)");
} else {
  console.log("Pastikan file public/audio/vo/sync-vo.wav tersedia.");
}
