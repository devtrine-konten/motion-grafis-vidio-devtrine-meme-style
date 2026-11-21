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
 * Clean Motion-Graphics Burn-In Subtitles (Space Grotesk + Perl Teal / Camel Gold Active Highlight).
 */
export const Subtitles: React.FC<{ cues: CaptionCue[] }> = ({ cues }) => {
  const frame = useCurrentFrame();
  const cue = cues.find((c) => frame >= c.from && frame < c.to);
  if (!cue) return null;

  const enter = spr(frame, cue.from, { damping: 14, stiffness: 210 });
  const exit = lerp(frame, [cue.to - 5, cue.to], [1, 0]);
  const isSettled = Math.abs(1 - enter) < 0.002;
  const words = cue.text.split(" ");
  const activeIdx = Math.min(
    words.length - 1,
    Math.max(0, Math.floor(lerp(frame, [cue.from, Math.max(cue.from + 1, cue.to - 4)], [0, words.length]))),
  );

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        bottom: 245,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: isSettled
          ? undefined
          : `translateY(${Math.round((1 - enter) * 22)}px) scale(${(0.94 + enter * 0.06).toFixed(3)})`,
        opacity: exit,
        pointerEvents: "none",
        zIndex: 80,
      }}
    >
      <div
        style={{
          background: "rgba(4, 21, 39, 0.95)",
          color: C.white,
          fontFamily: FONT.display,
          fontWeight: 700,
          fontSize: 36,
          lineHeight: 1.32,
          letterSpacing: "-0.02em",
          textAlign: "center",
          padding: "16px 30px",
          borderRadius: 22,
          border: "1.5px solid rgba(56, 189, 248, 0.32)",
          boxShadow: "0 22px 48px rgba(4, 21, 39, 0.38)",
          maxWidth: 940,
        }}
      >
        {words.map((w, i) => {
          const clean = w.replace(/[?!.,…]/g, "").toLowerCase();
          const isHi = cue.hi?.some((h) => h.replace(/[?!.,…]/g, "").toLowerCase() === clean);
          const isCurrent = i === activeIdx;
          const wPop = spr(frame, cue.from + i * 1.4, { damping: 16, stiffness: 260 });
          const wordSettled = Math.abs(1 - wPop) < 0.003;
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                margin: "0 5px",
                padding: isHi && isCurrent ? "1px 12px" : isHi ? "0 4px" : undefined,
                borderRadius: isHi && isCurrent ? 10 : undefined,
                background: isHi && isCurrent ? C.perlTeal : undefined,
                fontFamily: FONT.display,
                fontWeight: isHi || isCurrent ? 800 : 700,
                color: isHi
                  ? isCurrent
                    ? C.camelSand
                    : C.camelGold
                  : isCurrent
                    ? C.perlSky
                    : "rgba(255,255,255,0.92)",
                transform: wordSettled
                  ? isCurrent
                    ? "translateY(-2px)"
                    : undefined
                  : `translateY(${Math.round((1 - wPop) * 8)}px)`,
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
