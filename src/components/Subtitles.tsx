import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { lerp, spr } from "../lib/anim";

export type CaptionCue = {
  from: number;
  to: number;
  tag?: string;
  text: string;
  hi?: string[];
};

/**
 * Devtrine Studio burn-in caption pill (from previous video) combined with
 * active-word meme pop highlight synced to the voice-over.
 */
export const Subtitles: React.FC<{ cues: CaptionCue[] }> = ({ cues }) => {
  const frame = useCurrentFrame();
  const cue = cues.find((c) => frame >= c.from && frame < c.to);
  if (!cue) return null;

  const enter = spr(frame, cue.from, { damping: 12, stiffness: 220 });
  const exit = lerp(frame, [cue.to - 5, cue.to], [1, 0]);
  const words = cue.text.split(" ");
  const activeIdx = Math.min(
    words.length - 1,
    Math.max(0, Math.floor(lerp(frame, [cue.from, Math.max(cue.from + 1, cue.to - 4)], [0, words.length]))),
  );

  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        bottom: 310,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `translateY(${(1 - enter) * 28}px) scale(${0.92 + enter * 0.08})`,
        opacity: exit,
        pointerEvents: "none",
        zIndex: 80,
      }}
    >
      <div
        style={{
          background: "rgba(28, 30, 33, 0.94)",
          color: C.white,
          fontFamily: FONT.sans,
          fontWeight: 800,
          fontSize: 36,
          lineHeight: 1.32,
          textAlign: "center",
          padding: "18px 28px",
          borderRadius: 26,
          border: `4px solid ${C.charcoal}`,
          boxShadow: "0 12px 0 rgba(0,0,0,0.28)",
          maxWidth: 920,
        }}
      >
        {words.map((w, i) => {
          const clean = w.replace(/[?!.,…]/g, "").toLowerCase();
          const isHi = cue.hi?.some((h) => h.replace(/[?!.,…]/g, "").toLowerCase() === clean);
          const isCurrent = i === activeIdx;
          const wPop = spr(frame, cue.from + i * 1.4, { damping: 14, stiffness: 240 });
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                margin: "0 5px",
                padding: isHi ? "1px 10px" : undefined,
                borderRadius: isHi ? 10 : undefined,
                background: isHi ? (isCurrent ? C.luaSky : C.yellow) : undefined,
                color: isHi ? C.black : isCurrent ? C.luaSky : C.white,
                transform: `scale(${(0.85 + 0.15 * wPop) * (isCurrent ? 1.06 : 1)})`,
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    </div>
  );
};
