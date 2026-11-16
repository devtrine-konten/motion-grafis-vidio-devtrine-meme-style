import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { AUDIO } from "../theme";

export type SfxName =
  | "vine_boom"
  | "sus"
  | "goofy_horn"
  | "error_buzzer"
  | "meme_bonk"
  | "boing"
  | "bruh"
  | "what_meme"
  | "ka_ching"
  | "meme_click";

/** Natural short frame length (@ 30fps) for each trimmed Pixabay meme SFX. */
const DEFAULT_DURATION: Record<SfxName, number> = {
  vine_boom: 26,
  sus: 29,
  goofy_horn: 24,
  error_buzzer: 22,
  meme_bonk: 14,
  boing: 17,
  bruh: 15,
  what_meme: 29,
  ka_ching: 27,
  meme_click: 8,
};

/**
 * One-shot sound effect placed at a frame (relative to the parent Sequence).
 * Defaults to the trimmed clip's natural frame count so each short meme SFX
 * plays cleanly in sync without abrupt mid-sound cutoff or leading silence.
 */
export const Sfx: React.FC<{ name: SfxName; at: number; volume?: number; rate?: number; duration?: number }> = ({
  name,
  at,
  volume = 0.8,
  rate = 1,
  duration,
}) => (
  <Sequence from={at} durationInFrames={duration ?? DEFAULT_DURATION[name]} layout="none" name={`sfx:${name}`}>
    <Audio src={staticFile(`audio/sfx/${name}.wav`)} volume={volume * AUDIO.sfx} playbackRate={rate} />
  </Sequence>
);
