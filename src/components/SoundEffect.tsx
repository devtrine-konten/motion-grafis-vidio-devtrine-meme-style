import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { AUDIO } from "../theme";

export type SfxName =
  | "vine_boom"
  | "sus"
  | "goofy_horn"
  | "error_buzzer"
  | "meme_bonk"
  | "boing";

/**
 * One-shot sound effect placed at a frame (relative to the parent Sequence).
 * Default duration is capped to 20 frames (~0.66s) so only the core impact plays
 * in sync with the photo/meme appearance.
 */
export const Sfx: React.FC<{ name: SfxName; at: number; volume?: number; rate?: number; duration?: number }> = ({
  name,
  at,
  volume = 0.8,
  rate = 1,
  duration = 20,
}) => (
  <Sequence from={at} durationInFrames={duration} layout="none" name={`sfx:${name}`}>
    <Audio src={staticFile(`audio/sfx/${name}.wav`)} volume={volume * AUDIO.sfx} playbackRate={rate} />
  </Sequence>
);
