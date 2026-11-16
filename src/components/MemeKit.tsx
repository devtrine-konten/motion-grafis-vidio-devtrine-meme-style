import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { lerp, spr } from "../lib/anim";

/** Outlined meme impact text (white/yellow fill + thick black stroke) for meme cards. */
export const MemeText: React.FC<{
  text: string;
  size?: number;
  color?: string;
  stroke?: number;
  rotate?: number;
  style?: React.CSSProperties;
}> = ({ text, size = 44, color = C.white, stroke = 10, rotate = 0, style }) => (
  <div
    style={{
      fontFamily: FONT.sans,
      fontWeight: 900,
      fontSize: size,
      lineHeight: 1.1,
      letterSpacing: "0.02em",
      color,
      textAlign: "center",
      WebkitTextStroke: `${stroke}px #111111`,
      paintOrder: "stroke fill",
      textShadow: `0 ${Math.round(stroke * 0.4)}px 0 #111111, 0 6px 14px rgba(0,0,0,0.35)`,
      transform: rotate ? `rotate(${rotate}deg)` : undefined,
      ...style,
    }}
  >
    {text}
  </div>
);

/**
 * Hybrid Devtrine + Meme Sticker Card:
 * Combines the neo-brutalist card border & offset shadow from the previous video
 * with pop-in meme images and Impact-style top/bottom captions.
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
  topText?: string;
  bottomText?: string;
  badge?: string;
  badgeIcon?: React.ReactNode;
  badgeBg?: string;
  accent?: string;
  textColor?: string;
  textSize?: number;
  rounded?: number;
  wobble?: boolean;
  zIndex?: number;
  fit?: "cover" | "contain";
  bg?: string;
  padding?: number;
}> = ({
  src,
  x,
  y,
  w = 320,
  h,
  at = 0,
  until,
  rotate = 0,
  topText,
  bottomText,
  badge,
  badgeIcon,
  badgeBg = C.yellow,
  accent = C.charcoal,
  textColor = C.white,
  textSize = 34,
  rounded = 22,
  wobble = false,
  zIndex = 20,
  fit = "cover",
  bg = C.white,
  padding = 0,
}) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const pop = spr(frame, at, { damping: 11, stiffness: 210 });
  const out = until !== undefined ? lerp(frame, [until - 5, until], [1, 0]) : 1;
  if (out <= 0) return null;
  const tilt = rotate + (wobble ? Math.sin((frame - at) * 0.2) * 3 : 0);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        transform: `translate(-50%, -50%) scale(${pop * out}) rotate(${tilt}deg)`,
        zIndex,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {badge && (
        <div
          style={{
            position: "absolute",
            top: -22,
            zIndex: 5,
            background: badgeBg,
            color: C.charcoal,
            fontFamily: FONT.mono,
            fontWeight: 900,
            fontSize: 19,
            padding: "4px 14px",
            borderRadius: 999,
            border: `3.5px solid ${C.charcoal}`,
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
      <div
        style={{
          width: w,
          height: h ?? w,
          // borderRadius: rounded,
          overflow: "hidden",
          background: bg,
          padding,
          // border: `5px solid ${C.charcoal}`,
          // boxShadow: `8px 8px 0 ${accent}`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: fit,
            borderRadius: padding ? Math.max(8, rounded - 8) : 0,
          }}
        />
      </div>
      {topText && (
        <div style={{ position: "absolute", top: badge ? 14 : -20, left: -24, right: -24, pointerEvents: "none", zIndex: 4 }}>
          <MemeText text={topText} size={textSize} color={textColor} stroke={9} />
        </div>
      )}
      {bottomText && (
        <div style={{ position: "absolute", bottom: -22, left: -24, right: -24, pointerEvents: "none", zIndex: 4 }}>
          <MemeText text={bottomText} size={textSize} color={textColor} stroke={9} />
        </div>
      )}
    </div>
  );
};

/** Wide showcase card combining Devtrine's neo-brutalist window frame with meme overlay captions. */
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
}> = ({ src, x = 540, y = 780, w = 880, h = 440, at = 0, until, accent = C.cyan, tag, labels = [], zIndex = 15 }) => {
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
        borderRadius: 28,
        overflow: "hidden",
        border: `6px solid ${C.charcoal}`,
        boxShadow: `10px 10px 0 ${accent}`,
        background: "#14191F",
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
            color: C.charcoal,
            fontFamily: FONT.mono,
            fontWeight: 900,
            fontSize: 20,
            padding: "5px 16px",
            borderRadius: 999,
            border: `3.5px solid ${C.charcoal}`,
            boxShadow: `4px 4px 0 ${C.charcoal}`,
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
            <MemeText text={l.text} size={l.size ?? 44} color={l.color ?? C.white} stroke={10} />
          </div>
        );
      })}
    </div>
  );
};
