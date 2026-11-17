import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { easeOut, lerp, spr } from "../lib/anim";

/** Outlined meme impact text (for optional standalone overlays like Buff Doge vs Cheems). */
export const MemeText: React.FC<{
  text: string;
  size?: number;
  color?: string;
  stroke?: number;
  rotate?: number;
  style?: React.CSSProperties;
}> = ({ text, size = 38, color = C.white, stroke = 8, rotate = 0, style }) => (
  <div
    style={{
      fontFamily: FONT.sans,
      fontWeight: 900,
      fontSize: size,
      lineHeight: 1.08,
      letterSpacing: "-0.01em",
      color,
      textAlign: "center",
      WebkitTextStroke: `${stroke}px #050929`,
      paintOrder: "stroke fill",
      textShadow: `0 ${Math.round(stroke * 0.35)}px 0 #050929, 0 8px 18px rgba(0,0,0,0.38)`,
      transform: rotate ? `rotate(${rotate}deg)` : undefined,
      ...style,
    }}
  >
    {text}
  </div>
);

/**
 * Pure Meme Sticker:
 * Sharp square/rectangular meme sticker (`borderRadius: 0` — kotak saja),
 * no Polaroid frame, no pushpin, no extra text/badge overlays.
 */
export const MemeSticker: React.FC<{
  src: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  at?: number;
  until?: number;
  rotate?: number;
  rounded?: number;
  wobble?: boolean;
  zIndex?: number;
  fit?: "cover" | "contain";
}> = ({
  src,
  x,
  y,
  w = 270,
  h,
  at = 0,
  until,
  rotate = 0,
  rounded = 0,
  wobble = true,
  zIndex = 24,
  fit = "cover",
}) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const pop = spr(frame, at, { damping: 11, stiffness: 220 });
  const out = until !== undefined ? lerp(frame, [until - 5, until], [1, 0]) : 1;
  if (out <= 0) return null;

  const blurAmt = lerp(frame, [at, at + 6], [9, 0], easeOut);
  const tilt = rotate + (wobble ? Math.sin((frame - at) * 0.18) * 2.5 : 0);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h ?? w,
        transform: `translate(-50%, -50%) scale(${pop * out}) rotate(${tilt}deg)`,
        filter: blurAmt > 0.3 ? `blur(${blurAmt.toFixed(1)}px)` : undefined,
        borderRadius: rounded,
        overflow: "hidden",
        boxShadow: "0 18px 38px rgba(5, 9, 41, 0.30)",
        zIndex,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: fit,
        }}
      />
    </div>
  );
};

/** Wide showcase card with soft shadow and meme overlay captions. */
export const MemeBanner: React.FC<{
  src: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  at?: number;
  until?: number;
  accent?: string;
  tag?: string;
  labels?: { text: string; x: number; y: number; at?: number; color?: string; size?: number; rotate?: number }[];
  zIndex?: number;
}> = ({ src, x = 540, y = 780, w = 880, h = 440, at = 0, until, accent = C.luaNavy, tag, labels = [], zIndex = 15 }) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const pop = spr(frame, at, { damping: 12, stiffness: 195 });
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
        borderRadius: 0,
        overflow: "hidden",
        border: "1.5px solid rgba(96,165,250,0.3)",
        boxShadow: "0 30px 60px rgba(5,9,41,0.34)",
        background: C.luaDeep,
        zIndex,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${1 + Math.max(0, frame - at) * 0.0007})`,
        }}
      />
      {tag && (
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 18,
            background: accent,
            color: C.white,
            fontFamily: FONT.sans,
            fontWeight: 700,
            fontSize: 18,
            padding: "6px 16px",
            borderRadius: 999,
            boxShadow: "0 8px 20px rgba(0,0,0,0.28)",
          }}
        >
          {tag}
        </div>
      )}
      {labels.map((l, idx) => {
        const lAt = l.at ?? at + 6;
        if (frame < lAt) return null;
        const lPop = spr(frame, lAt, { damping: 10, stiffness: 220 });
        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: `${l.x}%`,
              top: `${l.y}%`,
              transform: `translate(-50%, -50%) scale(${lPop}) rotate(${l.rotate ?? 0}deg)`,
            }}
          >
            <MemeText text={l.text} size={l.size ?? 44} color={l.color ?? C.white} stroke={9} />
          </div>
        );
      })}
    </div>
  );
};
