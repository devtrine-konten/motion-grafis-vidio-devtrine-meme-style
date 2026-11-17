import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { AUDIO } from "../theme";

export type SfxName =
  | "vine_boom"
  | "thud"
  | "sus"
  | "goofy_horn"
  | "error_buzzer"
  | "meme_bonk"
  | "boing"
  | "bruh"
  | "what_meme"
  | "ka_ching"
  | "meme_click"
  | "meme_haha"
  | "level_up"
  | "meme_wow"
  | "whoosh"
  | "whoosh_small"
  | "whoosh_reverse"
  | "pop"
  | "impact"
  | "cinematic_hit"
  | "glitch"
  | "notification"
  | "paper"
  | "typing"
  | "shimmer"
  | "confetti"
  | "rimshot"
  | "record_scratch"
  | "digital_sweep"
  | "running"
  | "confirm";

/** Natural frame length (@ 30fps) for each WAV clip in public/audio/sfx/. */
const DEFAULT_DURATION: Record<SfxName, number> = {
  vine_boom: 26,
  thud: 27,
  sus: 29,
  goofy_horn: 24,
  error_buzzer: 22,
  meme_bonk: 14,
  boing: 17,
  bruh: 15,
  what_meme: 29,
  ka_ching: 27,
  meme_click: 7,
  meme_haha: 48,
  level_up: 48,
  meme_wow: 48,
  whoosh: 18,
  whoosh_small: 10,
  whoosh_reverse: 18,
  pop: 5,
  impact: 34,
  cinematic_hit: 78,
  glitch: 12,
  notification: 24,
  paper: 21,
  typing: 48,
  shimmer: 54,
  confetti: 30,
  rimshot: 42,
  record_scratch: 17,
  digital_sweep: 20,
  running: 54,
  confirm: 14,
};

/**
 * One-shot sound effect placed at a frame (relative to the parent Sequence).
 */
export const Sfx: React.FC<{ name: SfxName; at: number; volume?: number; rate?: number; duration?: number }> = ({
  name,
  at,
  volume = 0.8,
  rate = 1,
  duration,
}) => (
  <Sequence from={Math.max(0, at)} durationInFrames={duration ?? DEFAULT_DURATION[name]} layout="none" name={`sfx:${name}`}>
    <Audio src={staticFile(`audio/sfx/${name}.wav`)} volume={volume * AUDIO.sfx} playbackRate={rate} />
  </Sequence>
);
