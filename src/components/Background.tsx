import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, H, W } from "../theme";
import { rand } from "../lib/anim";

export type BgVariant = "voxPaper" | "luaNight" | "noir" | "luaBlue" | "light" | "dark" | "blueprint";

const SHAPES = Array.from({ length: 8 }, (_, i) => ({
  kind: i % 4, // 0 crescent moon, 1 orbit ring, 2 triangle, 3 solid dot
  x: rand(i * 3.1) * W,
  y: rand(i * 7.7) * H,
  size: 38 + rand(i * 5.3) * 72,
  depth: 0.25 + rand(i * 9.1) * 0.65,
  rot: rand(i * 2.2) * 360,
}));

/** Floating Lua-orbit & Vox geometric shapes in parallax depths. */
const FloatingLuaShapes: React.FC<{ color: string; accent: string; opacity: number; drift: number }> = ({
  color,
  accent,
  opacity,
  drift,
}) => {
  const frame = useCurrentFrame();
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {SHAPES.map((s, i) => {
        const y = ((s.y - frame * s.depth * drift) % (H + 300) + H + 300) % (H + 300) - 150;
        const x = s.x + Math.sin((frame + i * 40) / 55) * 16 * s.depth;
        const r = s.rot + frame * 0.35 * s.depth;
        const o = opacity * (0.5 + s.depth * 0.5);
        const col = i % 3 === 0 ? accent : color;
        return (
          <g key={i} transform={`translate(${x},${y}) rotate(${r})`} opacity={o}>
            {s.kind === 0 && (
              <path
                d={`M ${s.size * 0.35},${-s.size * 0.3} A ${s.size * 0.42} ${s.size * 0.42} 0 1 0 ${s.size * 0.35},${s.size * 0.3} A ${s.size * 0.32} ${s.size * 0.32} 0 1 1 ${s.size * 0.35},${-s.size * 0.3} Z`}
                fill={col}
              />
            )}
            {s.kind === 1 && (
              <g>
                <circle r={s.size / 2.2} fill="none" stroke={col} strokeWidth={4} strokeDasharray="10 8" />
                <circle cx={s.size / 2.2} cy={0} r={s.size / 10} fill={accent} />
              </g>
            )}
            {s.kind === 2 && (
              <polygon
                points={`${-s.size / 2},${-s.size / 3} ${s.size / 2},${-s.size / 3} 0,${s.size / 2}`}
                fill="none"
                stroke={col}
                strokeWidth={5}
                strokeLinejoin="round"
              />
            )}
            {s.kind === 3 && <circle r={s.size / 5.5} fill={col} />}
          </g>
        );
      })}
    </svg>
  );
};

export const Background: React.FC<{ variant?: BgVariant; drift?: number; children?: React.ReactNode }> = ({
  variant = "voxPaper",
  drift = 1,
  children,
}) => {
  const frame = useCurrentFrame();

  // Vox Editorial Warm Newsprint Paper + B&W Halftone Dots + Lua Blue accents
  if (variant === "voxPaper" || variant === "light") {
    return (
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 35%, ${C.white} 0%, ${C.paper} 68%, ${C.paperGrid} 100%)` }}>
        <AbsoluteFill
          style={{
            backgroundImage:
              "linear-gradient(rgba(14,16,21,0.045) 2px, transparent 2px), linear-gradient(90deg, rgba(14,16,21,0.045) 2px, transparent 2px)",
            backgroundSize: "64px 64px",
            backgroundPosition: `${frame * 0.35 * drift}px ${-frame * 0.45 * drift}px`,
          }}
        />
        <AbsoluteFill
          style={{
            backgroundImage: "radial-gradient(rgba(29,78,216,0.09) 2.5px, transparent 2.5px)",
            backgroundSize: "32px 32px",
            backgroundPosition: `${-frame * 0.2 * drift}px ${frame * 0.25 * drift}px`,
          }}
        />
        <FloatingLuaShapes color={C.charcoal} accent={C.luaBlue} opacity={0.075} drift={drift} />
        {children}
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 62%, rgba(11,13,18,0.14) 100%)", pointerEvents: "none" }} />
      </AbsoluteFill>
    );
  }

  // Deep Lua Night Sky (Midnight Navy + Stars + Orbit Rings)
  if (variant === "luaNight" || variant === "blueprint") {
    return (
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 34%, #101A4A 0%, ${C.luaDeep} 76%, #040717 100%)` }}>
        <AbsoluteFill
          style={{
            backgroundImage:
              "linear-gradient(rgba(96,165,250,0.08) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(96,165,250,0.08) 1.5px, transparent 1.5px)",
            backgroundSize: "64px 64px",
            backgroundPosition: `${frame * 0.4 * drift}px ${-frame * 0.4 * drift}px`,
          }}
        />
        {/* Subtle SDR stars */}
        <svg width={W} height={H} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {Array.from({ length: 24 }, (_, i) => {
            const sx = rand(i * 11.3) * W;
            const sy = rand(i * 17.7) * H;
            const twinkle = 0.2 + 0.35 * (0.5 + 0.5 * Math.sin(frame * 0.08 + i * 1.9));
            return <circle key={i} cx={sx} cy={sy} r={i % 3 === 0 ? 3.5 : 2} fill={C.luaIce} opacity={twinkle} />;
          })}
        </svg>
        <FloatingLuaShapes color={C.luaSky} accent={C.white} opacity={0.08} drift={drift} />
        {children}
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 58%, rgba(4,7,23,0.48) 100%)", pointerEvents: "none" }} />
      </AbsoluteFill>
    );
  }

  // High-Contrast Black & White Vox Noir + Lua Cobalt Blue accents
  if (variant === "noir" || variant === "dark") {
    return (
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 35%, #1D212B 0%, ${C.black} 74%)` }}>
        <AbsoluteFill
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.045) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(255,255,255,0.045) 1.5px, transparent 1.5px)",
            backgroundSize: "72px 72px",
            backgroundPosition: `0px ${-frame * 0.4 * drift}px`,
          }}
        />
        {/* Subtle animated diagonal editorial stripes */}
        <AbsoluteFill
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg, rgba(96,165,250,0.03) 0px, rgba(96,165,250,0.03) 2px, transparent 2px, transparent 22px)",
            pointerEvents: "none",
          }}
        />
        <FloatingLuaShapes color={C.white} accent={C.luaSky} opacity={0.07} drift={drift} />
        {children}
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.52) 100%)", pointerEvents: "none" }} />
      </AbsoluteFill>
    );
  }

  // Electric Lua Blue Editorial (Cobalt Blue + Crisp White Grid)
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 36%, #1E3A8A 0%, #0C1740 72%, ${C.luaDeep} 100%)` }}>
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(rgba(219,234,254,0.12) 2.5px, transparent 2.5px)",
          backgroundSize: "44px 44px",
          backgroundPosition: `${frame * 0.35 * drift}px ${-frame * 0.35 * drift}px`,
        }}
      />
      <FloatingLuaShapes color={C.luaIce} accent={C.yellow} opacity={0.09} drift={drift} />
      {children}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 58%, rgba(5,10,48,0.45) 100%)", pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
