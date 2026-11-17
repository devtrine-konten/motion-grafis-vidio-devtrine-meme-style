import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { easeOut, lerp, spr } from "../lib/anim";

/**
 * 3D Red Pushpin SVG.
 */
export const RedPushpin: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 44, style }) => (
  <svg
    width={size * 1.6}
    height={size * 1.6}
    viewBox="-30 -26 70 70"
    style={{ overflow: "visible", pointerEvents: "none", ...style }}
  >
    <ellipse cx={16} cy={22} rx={12} ry={5} transform="rotate(32 16 22)" fill="rgba(0,0,0,0.28)" style={{ filter: "blur(2px)" }} />
    <line x1={0} y1={8} x2={16} y2={22} stroke="rgba(0,0,0,0.32)" strokeWidth={5} strokeLinecap="round" />
    <line x1={0} y1={4} x2={0} y2={15} stroke="#64748B" strokeWidth={3.5} strokeLinecap="round" />
    <ellipse cx={0} cy={4} rx={11} ry={8} fill="#9F1239" />
    <path d="M -9,-8 L -11,4 L 11,4 L 9,-8 Z" fill="#BE123C" />
    <circle cx={0} cy={-9} r={12.5} fill={C.red} />
    <ellipse cx={-4} cy={-13} rx={5} ry={3} transform="rotate(-20 -4 -13)" fill="rgba(255,255,255,0.55)" />
  </svg>
);

/**
 * Animated 2D Game Character (for NPC Chases, Programmer illustrations, etc.)
 */
export const MiniCharacter: React.FC<{
  kind: "npc" | "player" | "coder";
  x?: number;
  y?: number;
  scale?: number;
  running?: boolean;
  facing?: 1 | -1;
  frame?: number;
}> = ({ kind, x = 0, y = 0, scale = 1, running = true, facing = 1, frame = 0 }) => {
  const legSwing = running ? Math.sin(frame * 0.65) * 28 : 0;
  const armSwing = running ? Math.cos(frame * 0.65) * 32 : 0;
  const bob = running ? Math.abs(Math.sin(frame * 0.65)) * -7 : Math.sin(frame * 0.14) * 3;

  if (kind === "player") {
    // Animated running Roblox Noob player character with swinging legs/sweat
    return (
      <div
        style={{
          position: "absolute",
          left: x,
          top: y + bob,
          transform: `translate(-50%, -50%) scale(${scale * facing}, ${scale}) rotate(${running ? 10 : 0}deg)`,
          width: 82,
          height: 92,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.38))",
        }}
      >
        <Img
          src={staticFile("image-vidio/lua/roblox-noob.png")}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    );
  }

  const headCol = kind === "npc" ? C.red : C.luaSky;
  const bodyCol = kind === "npc" ? "#991B1B" : C.luaBlue;
  const eyeCol = kind === "npc" ? "#FEF08A" : C.luaDeep;

  return (
    <svg
      width={110 * scale}
      height={120 * scale}
      viewBox="-55 -70 110 120"
      style={{
        position: "absolute",
        left: x,
        top: y + bob,
        transform: `translate(-50%, -50%) scale(${facing}, 1) rotate(${running ? 12 : 0}deg)`,
        overflow: "visible",
        filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.35))",
      }}
    >
      {/* Back Leg */}
      <line x1={-6} y1={14} x2={-6 - legSwing * 0.55} y2={42} stroke={C.white} strokeWidth={9} strokeLinecap="round" />
      {/* Back Arm */}
      <line x1={-12} y1={-12} x2={-28 + armSwing * 0.5} y2={8} stroke={headCol} strokeWidth={8} strokeLinecap="round" />
      {/* Torso */}
      <rect x={-18} y={-22} width={36} height={40} rx={10} fill={bodyCol} stroke={C.white} strokeWidth={2.5} />
      {/* Head */}
      <rect x={-22} y={-58} width={44} height={38} rx={12} fill={headCol} stroke={C.white} strokeWidth={2.5} />
      {/* Expressive Eyes */}
      {kind === "npc" ? (
        <>
          <polygon points="-14,-44 -2,-38 -14,-34" fill={eyeCol} />
          <polygon points="14,-44 2,-38 14,-34" fill={eyeCol} />
          <path d="M -10,-28 L 10,-28" stroke={C.white} strokeWidth={3} strokeLinecap="round" />
          {/* Floating Alert ! */}
          <text x={24} y={-50} fontFamily={FONT.sans} fontWeight={900} fontSize={26} fill={C.yellow}>!</text>
        </>
      ) : (
        <>
          <circle cx={-8} cy={-40} r={4.5} fill={eyeCol} />
          <circle cx={8} cy={-40} r={4.5} fill={eyeCol} />
          <path d="M -6,-30 Q 0,-26 6,-30" fill="none" stroke={eyeCol} strokeWidth={3} strokeLinecap="round" />
        </>
      )}
      {/* Front Leg */}
      <line x1={8} y1={14} x2={8 + legSwing * 0.55} y2={42} stroke={C.white} strokeWidth={9} strokeLinecap="round" />
      {/* Front Arm */}
      <line x1={14} y1={-12} x2={34 - armSwing * 0.5} y2={-2} stroke={headCol} strokeWidth={8} strokeLinecap="round" />
    </svg>
  );
};

/**
 * Tactile Studio Paper Card & Lua Navy Hero Card.
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
  watermark?: string;
  children: React.ReactNode;
}> = ({
  title,
  badge,
  badgeIcon,
  x = 540,
  y = 720,
  w = 960,
  h = 630,
  at = 0,
  until,
  bg,
  dark = false,
  tape = false,
  rotate = 0,
  watermark,
  children,
}) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const pop = spr(frame, at, { damping: 13, stiffness: 185 });
  const out = until !== undefined ? lerp(frame, [until - 6, until], [1, 0]) : 1;
  if (out <= 0) return null;

  const blurAmt = lerp(frame, [at, at + 8], [10, 0], easeOut);
  const usePaperStyle = !dark || tape;

  const cardBackground = dark
    ? bg && bg !== C.black && bg !== "#121622" && bg !== "#0D1436" && bg !== "#0C1333" && bg !== "#0E121D"
      ? bg
      : "linear-gradient(145deg, #1E3A8A 0%, #000080 54%, #050929 100%)"
    : "#F6F8FC";

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        transform: `translate(-50%, -50%) scale(${(0.88 + 0.12 * pop) * out}) rotate(${rotate}deg)`,
        filter: blurAmt > 0.3 ? `blur(${blurAmt.toFixed(1)}px)` : undefined,
        background: cardBackground,
        borderRadius: dark ? 32 : 18,
        border: dark
          ? "1.5px solid rgba(96, 165, 250, 0.30)"
          : "1.5px solid rgba(0, 0, 128, 0.14)",
        boxShadow: dark
          ? "0 34px 70px rgba(5, 9, 41, 0.45), 0 10px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(219,234,254,0.22)"
          : "0 30px 60px rgba(5, 9, 41, 0.16), 0 8px 20px rgba(5, 9, 41, 0.08)",
        padding: "42px 36px 32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 18,
        overflow: "visible",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: dark ? 32 : 18,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {!dark ? (
          <>
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(0,0,128,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,128,0.05) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />
            <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
              <line x1={0} y1={h * 0.18} x2={w} y2={h * 0.88} stroke="rgba(0,0,128,0.12)" strokeWidth={1.8} />
              <line x1={w} y1={h * 0.22} x2={0} y2={h * 0.85} stroke="rgba(0,0,128,0.12)" strokeWidth={1.8} />
            </svg>
          </>
        ) : (
          <>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at 75% 20%, rgba(96, 165, 250, 0.28) 0%, transparent 60%)",
              }}
            />
            {(watermark || badge) && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 28,
                  right: 28,
                  textAlign: "center",
                  fontFamily: FONT.sans,
                  fontWeight: 800,
                  fontSize: 96,
                  letterSpacing: "-0.05em",
                  color: "rgba(255, 255, 255, 0.065)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  lineHeight: 1,
                }}
              >
                {watermark ?? badge?.split("·")[0]}
              </div>
            )}
          </>
        )}
      </div>

      {usePaperStyle && (
        <div style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", zIndex: 30 }}>
          <RedPushpin size={42} />
        </div>
      )}

      {!dark && (
        <svg
          width={86}
          height={86}
          viewBox="0 0 86 86"
          style={{ position: "absolute", right: -1, bottom: -1, pointerEvents: "none", zIndex: 25 }}
        >
          <defs>
            <linearGradient id="curlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="55%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>
          <path d="M 8,86 Q 42,46 86,8 L 86,86 Z" fill="rgba(0,0,0,0.16)" />
          <path d="M 14,86 Q 28,28 86,14 Q 52,52 14,86 Z" fill="url(#curlGrad)" stroke="rgba(0,0,0,0.12)" strokeWidth={1} />
        </svg>
      )}

      {badge && (
        <div
          style={{
            position: "absolute",
            top: usePaperStyle ? 16 : -20,
            left: usePaperStyle ? 24 : undefined,
            background: dark ? C.white : "rgba(0, 0, 128, 0.07)",
            color: C.charcoal,
            fontFamily: FONT.mono,
            fontWeight: 800,
            fontSize: 17,
            letterSpacing: "0.06em",
            padding: "6px 16px",
            borderRadius: 999,
            boxShadow: dark ? "0 10px 24px rgba(0,0,0,0.25)" : "none",
            border: dark ? "none" : "1px solid rgba(0,0,128,0.12)",
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
            marginBottom: 16,
            textAlign: "center",
            zIndex: 5,
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
          zIndex: 5,
          marginTop: usePaperStyle && badge ? 18 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * Pinned Photo Cutout Card (Clean Space Grotesk + Inter Tight).
 */
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
  zIndex = 20,
}) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const pop = spr(frame, at, { damping: 13, stiffness: 195 });
  const out = until !== undefined ? lerp(frame, [until - 5, until], [1, 0]) : 1;
  if (out <= 0) return null;
  const blurAmt = lerp(frame, [at, at + 8], [9, 0], easeOut);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        transform: `translate(-50%, -50%) scale(${(0.86 + 0.14 * pop) * out}) rotate(${rotate}deg)`,
        filter: blurAmt > 0.3 ? `blur(${blurAmt.toFixed(1)}px)` : undefined,
        background: "#F8FAFC",
        border: "1px solid rgba(0, 0, 128, 0.14)",
        borderRadius: 14,
        boxShadow: "0 24px 48px rgba(5, 9, 41, 0.22), 0 6px 14px rgba(5, 9, 41, 0.10)",
        padding: "12px 12px 14px",
        zIndex,
      }}
    >
      <div style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
        <RedPushpin size={34} />
      </div>

      <div style={{ width: "100%", height: h, borderRadius: 8, overflow: "hidden", background: C.black }}>
        {children}
      </div>
      {caption && (
        <div style={{ marginTop: 10, textAlign: "center" }}>
          <div
            style={{
              fontFamily: FONT.sans,
              fontWeight: 800,
              fontSize: 19,
              color: C.charcoal,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              whiteSpace: "nowrap",
            }}
          >
            {caption}
          </div>
          {subcaption && (
            <div
              style={{
                fontFamily: FONT.mono,
                fontWeight: 700,
                fontSize: 14,
                color: C.luaBlue,
                marginTop: 3,
              }}
            >
              {subcaption}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Connected Vertical Node Tree in Lua Navy & Space Grotesk (zero AI-slop serif).
 */
export const NodeTreeList: React.FC<{
  items: { label: string; sub?: string; at: number; highlight?: boolean }[];
  x?: number;
  y?: number;
  color?: string;
  dotColor?: string;
  textColor?: string;
}> = ({
  items,
  x = 120,
  y = 780,
  color = C.luaNavy,
  dotColor = C.luaBlue,
  textColor = C.charcoal,
}) => {
  const frame = useCurrentFrame();
  const rowGap = 70;

  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 24 }}>
      {items.map((item, idx) => {
        if (frame < item.at) return null;
        const p = spr(frame, item.at, { damping: 13, stiffness: 210 });
        const segLen = lerp(frame, [item.at - 4, item.at + 6], [0, rowGap], easeOut);
        const blurAmt = lerp(frame, [item.at, item.at + 7], [6, 0], easeOut);

        return (
          <div
            key={item.label}
            style={{
              position: "absolute",
              left: 0,
              top: idx * rowGap,
              display: "flex",
              alignItems: "center",
              gap: 20,
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 11,
                top: -rowGap + 14,
                width: 4,
                height: segLen,
                background: color,
                borderRadius: 2,
              }}
            />
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: item.highlight ? C.luaSky : dotColor,
                boxShadow: "0 0 0 5px rgba(29, 78, 216, 0.16)",
                transform: `scale(${p})`,
                flexShrink: 0,
              }}
            />
            <div
              style={{
                transform: `translateX(${(1 - p) * -18}px)`,
                opacity: p,
                filter: blurAmt > 0.2 ? `blur(${blurAmt.toFixed(1)}px)` : undefined,
                display: "flex",
                alignItems: "baseline",
                gap: 14,
              }}
            >
              <span
                style={{
                  fontFamily: FONT.sans,
                  fontWeight: 800,
                  fontSize: 34,
                  letterSpacing: "-0.03em",
                  color: textColor,
                }}
              >
                {item.label}
              </span>
              {item.sub && (
                <span
                  style={{
                    fontFamily: FONT.display,
                    fontWeight: 600,
                    fontSize: 25,
                    color: C.luaBlue,
                  }}
                >
                  — {item.sub}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * 4-Piece Interlocking Jigsaw Puzzle Assembly in Official Lua Navy (#000080).
 */
export const PuzzleGrid: React.FC<{
  at?: number;
  letter?: string;
  sublabel?: string;
}> = ({ at = 10, letter = "LUA", sublabel = "app_config = { auto = true }" }) => {
  const frame = useCurrentFrame();
  const join = lerp(frame, [at, at + 36], [1, 0], easeOut);
  const rot = join * 18;
  const dist = join * 125;

  const pieces = [
    { dx: -dist, dy: -dist, r: -rot, path: "M 0,0 H 150 V 55 A 22,22 0 0 1 150,99 V 150 H 95 A 22,22 0 0 0 51,150 H 0 Z" },
    { dx: dist, dy: -dist, r: rot, path: "M 150,0 H 300 V 150 H 245 A 22,22 0 0 1 201,150 H 150 V 99 A 22,22 0 0 0 150,55 Z" },
    { dx: -dist, dy: dist, r: rot * 0.8, path: "M 0,150 H 51 A 22,22 0 0 1 95,150 H 150 V 205 A 22,22 0 0 0 150,249 V 300 H 0 Z" },
    { dx: dist, dy: dist, r: -rot * 0.8, path: "M 150,150 H 201 A 22,22 0 0 0 245,150 H 300 V 300 H 150 V 249 A 22,22 0 0 1 150,205 Z" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
      <div style={{ position: "relative", width: 340, height: 340 }}>
        <svg width={340} height={340} viewBox="0 0 300 300" style={{ overflow: "visible" }}>
          {pieces.map((p, i) => (
            <g
              key={i}
              transform={`translate(${p.dx}, ${p.dy}) rotate(${p.r} 150 150)`}
              style={{ filter: "drop-shadow(0 18px 28px rgba(0, 0, 128, 0.28))" }}
            >
              <path d={p.path} fill="#07124A" stroke="rgba(96, 165, 250, 0.45)" strokeWidth={2.5} />
              <text
                x={150}
                y={182}
                textAnchor="middle"
                fontFamily={FONT.sans}
                fontWeight={900}
                fontSize={108}
                fill={C.white}
                letterSpacing="-0.04em"
              >
                {letter}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div
        style={{
          fontFamily: FONT.mono,
          fontWeight: 700,
          fontSize: 22,
          color: C.luaNavy,
          background: "rgba(29, 78, 216, 0.09)",
          border: "1.5px solid rgba(29, 78, 216, 0.25)",
          padding: "10px 24px",
          borderRadius: 999,
        }}
      >
        {sublabel}
      </div>
    </div>
  );
};
