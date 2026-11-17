import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { lerp, spr } from "../lib/anim";

/**
 * Vox + Neo-Brutalist Stage Card for Episode 03 explanatory animations.
 * Supports optional masking-tape corners (`tape`) for Vox documentary collage vibe.
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
  tape?: boolean;
  rotate?: number;
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
  accent = C.luaNavy,
  dark = false,
  tape = false,
  rotate = 0,
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
        transform: `translate(-50%, -50%) scale(${pop * out}) rotate(${rotate}deg)`,
        background: bg,
        border: `5px solid ${dark ? C.luaSky : C.charcoal}`,
        borderRadius: 26,
        boxShadow: `10px 10px 0 ${accent}`,
        padding: "36px 34px 28px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 18,
      }}
    >
      {/* Vox editorial masking tape strips */}
      {tape && (
        <>
          <div
            style={{
              position: "absolute",
              top: -14,
              left: 34,
              width: 96,
              height: 28,
              background: "rgba(250, 204, 21, 0.85)",
              border: `2px solid ${C.charcoal}`,
              transform: "rotate(-6deg)",
              zIndex: 25,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -14,
              right: 34,
              width: 96,
              height: 28,
              background: "rgba(96, 165, 250, 0.85)",
              border: `2px solid ${C.charcoal}`,
              transform: "rotate(5deg)",
              zIndex: 25,
            }}
          />
        </>
      )}

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
            zIndex: 26,
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

/** Vox-style paper-cutout photo card with tape + editorial caption strip. */
export const VoxCutout: React.FC<{
  children: React.ReactNode;
  caption?: string;
  subcaption?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  at?: number;
  until?: number;
  rotate?: number;
  accent?: string;
  zIndex?: number;
}> = ({
  children,
  caption,
  subcaption,
  x,
  y,
  w,
  h,
  at = 0,
  until,
  rotate = -2,
  accent = C.luaBlue,
  zIndex = 20,
}) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const pop = spr(frame, at, { damping: 12, stiffness: 200 });
  const out = until !== undefined ? lerp(frame, [until - 5, until], [1, 0]) : 1;
  if (out <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        transform: `translate(-50%, -50%) scale(${pop * out}) rotate(${rotate}deg)`,
        background: C.white,
        border: `4px solid ${C.charcoal}`,
        borderRadius: 14,
        boxShadow: `8px 8px 0 ${accent}`,
        padding: 12,
        zIndex,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -13,
          left: "50%",
          width: 82,
          height: 22,
          transform: "translateX(-50%) rotate(-2deg)",
          background: C.yellow,
          border: `2px solid ${C.charcoal}`,
          opacity: 0.9,
        }}
      />
      <div style={{ width: "100%", height: h, borderRadius: 8, overflow: "hidden", background: C.black }}>
        {children}
      </div>
      {caption && (
        <div style={{ marginTop: 10, textAlign: "center" }}>
          <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 18.5, color: C.charcoal, lineHeight: 1.15, whiteSpace: "nowrap" }}>
            {caption}
          </div>
          {subcaption && (
            <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 14, color: C.luaBlue, marginTop: 2 }}>
              {subcaption}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
