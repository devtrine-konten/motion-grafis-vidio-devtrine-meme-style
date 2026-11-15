import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, H, W } from "../theme";
import { rand } from "../lib/anim";

export type BgVariant = "light" | "sepia" | "dark" | "retro" | "blueprint" | "spotlight" | "warm";

const SHAPES = Array.from({ length: 6 }, (_, i) => ({
  kind: i % 4, // 0 triangle, 1 circle, 2 ring, 3 gear-cog (EP.02 Rust theme!)
  x: rand(i * 3.1) * W,
  y: rand(i * 7.7) * H,
  size: 40 + rand(i * 5.3) * 75,
  depth: 0.3 + rand(i * 9.1) * 0.7,
  rot: rand(i * 2.2) * 360,
}));

/** Floating geometric & Rust-gear shapes in 3 parallax depths for Episode 02. */
const FloatingShapes: React.FC<{ color: string; accent?: string; opacity: number; drift: number }> = ({
  color,
  accent = "#FF6B35",
  opacity,
  drift,
}) => {
  const frame = useCurrentFrame();
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {SHAPES.map((s, i) => {
        const y = ((s.y - frame * s.depth * drift) % (H + 300) + H + 300) % (H + 300) - 150;
        const x = s.x + Math.sin((frame + i * 40) / 50) * 18 * s.depth;
        const r = s.rot + frame * 0.45 * s.depth;
        const o = opacity * (0.5 + s.depth * 0.5);
        const col = s.kind === 3 ? accent : color;
        return (
          <g key={i} transform={`translate(${x},${y}) rotate(${r})`} opacity={o}>
            {s.kind === 0 && (
              <polygon
                points={`${-s.size / 2},${-s.size / 3} ${s.size / 2},${-s.size / 3} 0,${s.size / 2}`}
                fill="none"
                stroke={col}
                strokeWidth={6}
                strokeLinejoin="round"
              />
            )}
            {s.kind === 1 && <circle r={s.size / 5} fill={col} />}
            {s.kind === 2 && <circle r={s.size / 2.5} fill="none" stroke={col} strokeWidth={6} />}
            {s.kind === 3 && (
              <circle
                r={s.size / 2.4}
                fill="none"
                stroke={col}
                strokeWidth={9}
                strokeDasharray="12 10"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

export const Background: React.FC<{ variant?: BgVariant; drift?: number; children?: React.ReactNode }> = ({
  variant = "light",
  drift = 1,
  children,
}) => {
  const frame = useCurrentFrame();

  // EP.02 Blueprint Grid (Diagonal Isometric Tech Grid + Cyan/Rust Accents)
  if (variant === "blueprint") {
    return (
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 35%, #16222F 0%, #0D141C 78%)" }}>
        <AbsoluteFill
          style={{
            backgroundImage:
              "linear-gradient(rgba(12,192,223,0.1) 2px, transparent 2px), linear-gradient(90deg, rgba(12,192,223,0.1) 2px, transparent 2px)",
            backgroundSize: "64px 64px",
            backgroundPosition: `${frame * 0.5 * drift}px ${-frame * 0.5 * drift}px`,
          }}
        />
        <FloatingShapes color={C.cyanLight} accent="#FF6B35" opacity={0.07} drift={drift} />
        {children}
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 58%, rgba(0,0,0,0.45) 100%)", pointerEvents: "none" }} />
      </AbsoluteFill>
    );
  }

  // EP.02 Dramatic Spotlight (for Compiler Interrogation Scene)
  if (variant === "spotlight") {
    return (
      <AbsoluteFill style={{ background: "#141619" }}>
        <svg width={W} height={H} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <defs>
            <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFC93C" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#FFC93C" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <polygon points="440,0 640,0 980,1920 100,1920" fill="url(#cone)" />
        </svg>
        <FloatingShapes color={C.yellow} accent={C.red} opacity={0.06} drift={drift * 0.6} />
        {children}
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 48%, transparent 45%, rgba(0,0,0,0.65) 100%)", pointerEvents: "none" }} />
      </AbsoluteFill>
    );
  }

  // EP.02 Warm Rust Cream Grid (distinct from EP.01's plain paper)
  if (variant === "warm") {
    return (
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, #FFFDF9 0%, #F4EFE6 65%, #E5DCCB 100%)" }}>
        <AbsoluteFill
          style={{
            backgroundImage: "linear-gradient(rgba(39,39,39,0.04) 2px, transparent 2px), linear-gradient(90deg, rgba(39,39,39,0.04) 2px, transparent 2px)",
            backgroundSize: "72px 72px",
            backgroundPosition: `0px ${-frame * 0.5 * drift}px`,
          }}
        />
        <FloatingShapes color="#FF6B35" accent={C.cyan} opacity={0.08} drift={drift} />
        {children}
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 60%, rgba(59,44,30,0.18) 100%)", pointerEvents: "none" }} />
      </AbsoluteFill>
    );
  }

  if (variant === "sepia") {
    return (
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 42%, #F6ECD8 0%, ${C.sepia} 45%, #D4BC93 100%)` }}>
        <FloatingShapes color={C.sepiaDark} accent="#A8442E" opacity={0.12} drift={drift * 0.5} />
        {children}
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(59,44,30,0.38) 100%)", pointerEvents: "none" }} />
      </AbsoluteFill>
    );
  }

  if (variant === "dark") {
    return (
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 35%, #23292E 0%, #15181B 70%)" }}>
        <svg width={W} height={H} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {Array.from({ length: 9 }, (_, i) => {
            const y0 = 160 + i * 200;
            const len = 1400;
            const off = len - ((frame * 9 + i * 160) % (len * 2));
            const d = `M-20,${y0} H${200 + rand(i) * 200} l60,60 H${700 + rand(i + 3) * 200} l60,-60 H1100`;
            return (
              <g key={i}>
                <path d={d} fill="none" stroke={C.cyan} strokeOpacity={0.09} strokeWidth={3} />
                <path d={d} fill="none" stroke={C.cyanLight} strokeOpacity={0.5} strokeWidth={3} strokeDasharray={`120 ${len}`} strokeDashoffset={off} />
              </g>
            );
          })}
        </svg>
        <FloatingShapes color={C.cyan} accent="#FF6B35" opacity={0.14} drift={drift} />
        {children}
      </AbsoluteFill>
    );
  }

  if (variant === "retro") {
    return (
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, #24302C 0%, #141A18 80%)" }}>
        {children}
        <AbsoluteFill
          style={{
            background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 2px, transparent 2px, transparent 6px)",
            transform: `translateY(${(frame * 2) % 6}px)`,
            pointerEvents: "none",
          }}
        />
      </AbsoluteFill>
    );
  }

  // light (EP.02 enhanced diagonal dot + gear drift)
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 38%, #FFFFFF 0%, #EFF7F8 70%, #DCEEEF 100%)" }}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${C.cyan}26 3px, transparent 3px)`,
          backgroundSize: "56px 56px",
          backgroundPosition: `${frame * 0.4 * drift}px ${-frame * 0.6 * drift}px`,
        }}
      />
      <FloatingShapes color={C.cyan} accent="#FF6B35" opacity={0.08} drift={drift} />
      {children}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 62%, rgba(12,192,223,0.12) 100%)", pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
