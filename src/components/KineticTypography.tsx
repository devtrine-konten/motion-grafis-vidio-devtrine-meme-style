import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { easeOut, easeOutBack, lerp, rand, spr } from "../lib/anim";

type Variant = "pop" | "slam" | "rise" | "glitch" | "type";

/**
 * Crisp Motion-Graphics Kinetic Typography (Inter Tight + Space Grotesk):
 * Emphasizes highlighted keywords using solid Lua Blue/Sky contrast or sleek pill badges
 * — clean, punchy, and free of cheesy italic serif swaps.
 */
export const KineticText: React.FC<{
  text: string;
  start?: number;
  stagger?: number;
  size?: number;
  color?: string;
  highlight?: string[];
  highlightColor?: string;
  pillHighlight?: boolean;
  variant?: Variant;
  weight?: number;
  align?: "center" | "left";
  lineHeight?: number;
  font?: string;
  italic?: boolean;
  exitAt?: number;
  letterSpacing?: number;
  style?: React.CSSProperties;
}> = ({
  text,
  start = 0,
  stagger = 4,
  size = 86,
  color = C.charcoal,
  highlight = [],
  highlightColor,
  pillHighlight = false,
  variant = "pop",
  weight = 800,
  align = "center",
  lineHeight = 1.04,
  font = FONT.sans,
  italic = false,
  exitAt,
  letterSpacing = -0.03,
  style,
}) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");
  const exit = exitAt !== undefined ? lerp(frame, [exitAt, exitAt + 8], [1, 0], easeOut) : 1;
  let charCount = 0;

  const isLightText = color === C.white || color === "#FFFFFF" || color === C.luaIce;
  const accentCol =
    highlightColor && highlightColor !== C.yellow && highlightColor !== C.black
      ? highlightColor
      : isLightText
        ? C.luaSky
        : C.luaBlue;

  return (
    <div
      style={{
        fontFamily: font,
        fontWeight: weight,
        fontSize: size,
        lineHeight,
        color,
        textAlign: align,
        letterSpacing: `${letterSpacing}em`,
        fontStyle: italic ? "italic" : "normal",
        opacity: exit,
        transform: `translateY(${(1 - exit) * -24}px)`,
        ...style,
      }}
    >
      {words.map((w, i) => {
        const d = start + i * stagger;
        const s = spr(frame, d, variant === "slam" ? { damping: 14, stiffness: 240 } : { damping: 13, stiffness: 175 });
        const cleanW = w.replace(/[?!.,…]/g, "").toLowerCase();
        const isHi = highlight.some((h) => h.replace(/[?!.,…]/g, "").toLowerCase() === cleanW);

        const blurAmt = frame < d ? 12 : lerp(frame, [d, d + 9], [10, 0], easeOut);
        let transform = "";
        let opacity = 1;
        let filter: string | undefined = blurAmt > 0.3 ? `blur(${blurAmt.toFixed(1)}px)` : undefined;
        let content: React.ReactNode = w;

        if (variant === "pop") {
          const yOff = lerp(frame, [d, d + 10], [26, 0], easeOut);
          transform = `translateY(${yOff}px) scale(${0.86 + 0.14 * s})`;
          opacity = lerp(frame, [d, d + 5], [0, 1], easeOut);
        } else if (variant === "slam") {
          const sc = lerp(frame, [d, d + 7], [1.85, 1], easeOut);
          transform = `scale(${sc})`;
          opacity = lerp(frame, [d, d + 4], [0, 1]);
        } else if (variant === "rise") {
          const yOff = lerp(frame, [d, d + 11], [42, 0], easeOut);
          transform = `translateY(${yOff}px)`;
          opacity = lerp(frame, [d, d + 6], [0, 1], easeOut);
        } else if (variant === "glitch") {
          const g = frame - d;
          const j = g >= 0 && g < 10 ? (rand(frame + i * 9) * 2 - 1) * 14 * (1 - g / 10) : 0;
          transform = `translateX(${j}px)`;
          opacity = g >= 0 ? 1 : 0;
        } else if (variant === "type") {
          const visible = Math.max(0, Math.floor((frame - start) / 1.4) - charCount);
          content = w.slice(0, visible);
          opacity = visible > 0 ? 1 : 0;
        }
        charCount += w.length + 1;

        const usePill = pillHighlight && isHi && i === 0;

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              verticalAlign: "baseline",
              padding: "0 0.10em",
              position: "relative",
            }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                zIndex: 1,
                transform,
                opacity,
                filter,
                fontFamily: font,
                fontWeight: isHi ? 900 : weight,
                color: usePill ? C.white : isHi ? accentCol : color,
                background: usePill ? C.luaNavy : undefined,
                padding: usePill ? "0.04em 0.32em" : undefined,
                borderRadius: usePill ? "0.24em" : undefined,
                boxShadow: usePill ? "0 10px 24px rgba(0, 0, 128, 0.28)" : undefined,
              }}
            >
              {content}
            </span>
          </span>
        );
      })}
    </div>
  );
};

/** Sleek rounded capsule pill. */
export const Pill: React.FC<{
  text: string;
  bg?: string;
  color?: string;
  at?: number;
  size?: number;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  text,
  bg = C.luaNavy,
  color = C.white,
  at = 0,
  size = 22,
  icon,
  style,
}) => {
  const frame = useCurrentFrame();
  const s = spr(frame, at, { damping: 13, stiffness: 200 });
  const blurAmt = frame < at ? 8 : lerp(frame, [at, at + 7], [6, 0], easeOut);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.35,
        background: bg,
        color,
        fontFamily: FONT.display,
        fontWeight: 700,
        fontSize: size,
        letterSpacing: "0.02em",
        padding: `${size * 0.34}px ${size * 0.78}px`,
        borderRadius: 12,
        boxShadow: "0 10px 24px rgba(5, 9, 41, 0.18)",
        transform: `scale(${s})`,
        filter: blurAmt > 0.2 ? `blur(${blurAmt.toFixed(1)}px)` : undefined,
        opacity: frame >= at ? 1 : 0,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {icon && <span style={{ display: "inline-flex", alignItems: "center" }}>{icon}</span>}
      <span>{text}</span>
    </div>
  );
};

/**
 * Editorial Chapter Header — Bold Inter Tight Display Title + Space Grotesk Tag.
 */
export const Header: React.FC<{
  kicker?: string;
  title: string;
  highlight?: string[];
  at?: number;
  pills?: { text: string; bg?: string; color?: string; icon?: React.ReactNode }[];
  tone?: "light" | "dark" | "sepia";
  align?: "left" | "center";
  exitAt?: number;
}> = ({ kicker, title, highlight = [], at = 0, pills = [], tone = "light", align = "center", exitAt }) => {
  const frame = useCurrentFrame();
  const ink = tone === "dark" ? C.white : C.charcoal;
  const exit = exitAt !== undefined ? lerp(frame, [exitAt, exitAt + 8], [1, 0]) : 1;
  const tagIn = spr(frame, at, { damping: 14, stiffness: 190 });

  return (
    <div
      style={{
        position: "absolute",
        top: kicker ? 104 : 138,
        left: 56,
        right: 56,
        textAlign: align,
        opacity: exit,
        transform: `translateY(${(1 - exit) * -32}px)`,
        zIndex: 30,
      }}
    >
      {kicker && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: tone === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0, 0, 128, 0.08)",
            border: tone === "dark" ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(0, 0, 128, 0.16)",
            padding: "5px 18px",
            borderRadius: 999,
            marginBottom: 10,
            transform: `scale(${tagIn})`,
            opacity: frame >= at ? 1 : 0,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: tone === "dark" ? C.luaSky : C.luaBlue,
            }}
          />
          <span
            style={{
              fontFamily: FONT.mono,
              fontWeight: 800,
              fontSize: 17,
              letterSpacing: "0.08em",
              color: tone === "dark" ? C.luaIce : C.luaNavy,
            }}
          >
            {kicker}
          </span>
        </div>
      )}

      <KineticText
        text={title}
        start={at + 4}
        stagger={3}
        size={68}
        variant="pop"
        color={ink}
        align={align}
        highlight={highlight}
        highlightColor={tone === "dark" ? C.luaSky : C.luaBlue}
        weight={900}
        letterSpacing={-0.03}
      />

      {pills.length > 0 && (
        <div style={{ display: "flex", gap: 12, marginTop: 16, justifyContent: align === "center" ? "center" : "flex-start" }}>
          {pills.map((p, i) => (
            <Pill key={p.text} text={p.text} bg={p.bg} color={p.color} icon={p.icon} at={at + 12 + i * 4} />
          ))}
        </div>
      )}
    </div>
  );
};

export const popIn = (frame: number, at: number) => ({
  transform: `scale(${spr(frame, at, { damping: 12, stiffness: 180 })})`,
  opacity: frame >= at ? 1 : 0,
});

export { easeOutBack };
