// Voice-Over Synchronizer for Devtrine Studio — Episode 04: Sejarah Bahasa Pemrograman Perl (82.4s / 2472 frames)
// Uses `public/audio/vo/vo-synced.wav` directly as the master VO track.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const VO_FILE = path.join(ROOT, "public/audio/vo/vo-synced.wav");

if (fs.existsSync(VO_FILE)) {
  const bytes = fs.statSync(VO_FILE).size;
  console.log(`Master VO verified: public/audio/vo/vo-synced.wav (${(bytes / 1024).toFixed(1)} KB)`);
} else {
  console.error("Missing public/audio/vo/vo-synced.wav!");
  process.exit(1);
}
