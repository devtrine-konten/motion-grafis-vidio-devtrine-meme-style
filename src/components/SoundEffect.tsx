import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { AUDIO } from "../theme";
import { lerp } from "../lib/anim";

export type SfxName =
  | "vine_boom"
  | "thud"
  | "sus"
  | "goofy_horn"
  | "error_buzzer"
  | "funny_fail"
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
  | "hahahaha"
  | "confirm";

/** Natural / optimal frame length (@ 30fps) for each WAV clip in public/audio/sfx/. */
const DEFAULT_DURATION: Record<SfxName, number> = {
  vine_boom: 24,
  thud: 45,
  sus: 42,
  goofy_horn: 36,
  error_buzzer: 20,
  funny_fail: 26,
  meme_bonk: 14,
  boing: 17,
  bruh: 16,
  what_meme: 36,
  ka_ching: 26,
  meme_click: 6,
  meme_haha: 46,
  level_up: 54,
  meme_wow: 42,
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
  hahahaha: 17,
};

/**
 * One-shot sound effect placed at a frame (relative to the parent Sequence),
 * with a clean 3-frame tail fade-out to avoid audio clicks on trimmed clips.
 */
export const Sfx: React.FC<{ name: SfxName; at: number; volume?: number; rate?: number; duration?: number }> = ({
  name,
  at,
  volume = 0.85,
  rate = 1,
  duration,
}) => {
  const dur = duration ?? DEFAULT_DURATION[name];
  return (
    <Sequence from={Math.max(0, at)} durationInFrames={dur} layout="none" name={`sfx:${name}`}>
      <Audio
        src={staticFile(`audio/sfx/${name}.wav`)}
        volume={(f) => {
          const tail = dur > 6 ? lerp(f, [dur - 4, dur], [1, 0]) : 1;
          return volume * AUDIO.sfx * tail;
        }}
        playbackRate={rate}
      />
    </Sequence>
  );
};
