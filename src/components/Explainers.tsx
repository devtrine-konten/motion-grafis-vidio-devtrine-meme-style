import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { lerp, spr } from "../lib/anim";

/**
 * Clean neo-brutalist stage card for Episode 02 explanatory animations.
 * Enters with a crisp spring pop and exits cleanly before `until`.
 */
export const ExplainCard: React.FC<{
  title?: string;
  badge?: string;
  badgeIcon?: React.ReactNode;
  badgeBg?: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  at?: number;
  until?: number;
  bg?: string;
  accent?: string;
  dark?: boolean;
  children: React.ReactNode;
}> = ({
  title,
  badge,
  badgeIcon,
  badgeBg = C.yellow,
  x = 540,
  y = 685,
  w = 840,
  h = 445,
  at = 0,
  until,
  bg = C.white,
  accent = C.charcoal,
  dark = false,
  children,
}) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const pop = spr(frame, at, { damping: 12, stiffness: 190 });
  const out = until !== undefined ? lerp(frame, [until - 5, until], [1, 0]) : 1;
  if (out <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        transform: `translate(-50%, -50%) scale(${pop * out})`,
        background: bg,
        border: `6px solid ${C.charcoal}`,
        borderRadius: 30,
        boxShadow: `10px 10px 0 ${accent}`,
        padding: "36px 34px 28px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 18,
      }}
    >
      {badge && (
        <div
          style={{
            position: "absolute",
            top: -24,
            background: badgeBg,
            color: C.charcoal,
            fontFamily: FONT.mono,
            fontWeight: 900,
            fontSize: 20,
            padding: "5px 18px",
            borderRadius: 999,
            border: `4px solid ${C.charcoal}`,
            boxShadow: `4px 4px 0 ${C.charcoal}`,
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {badgeIcon}
          <span>{badge}</span>
        </div>
      )}
      {title && (
        <div
          style={{
            fontFamily: FONT.sans,
            fontWeight: 800,
            fontSize: 28,
            color: dark ? C.white : C.charcoal,
            marginBottom: 18,
            textAlign: "center",
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
};
