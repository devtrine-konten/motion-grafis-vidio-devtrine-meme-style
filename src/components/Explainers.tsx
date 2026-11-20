import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { easeOut, lerp, spr } from "../lib/anim";

/**
 * 3D Amber/Gold & Teal Pushpin SVG.
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
    <ellipse cx={0} cy={4} rx={11} ry={8} fill="#B45309" />
    <path d="M -9,-8 L -11,4 L 11,4 L 9,-8 Z" fill="#D97706" />
    <circle cx={0} cy={-9} r={12.5} fill={C.camelGold} />
    <ellipse cx={-4} cy={-13} rx={5} ry={3} transform="rotate(-20 -4 -13)" fill="rgba(255,255,255,0.6)" />
  </svg>
);

/**
 * Animated 2D Character (for Unix Coder, Sysadmin, etc.)
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

  const headCol = kind === "npc" ? C.red : C.perlSky;
  const bodyCol = kind === "npc" ? "#991B1B" : C.perlTeal;
  const eyeCol = kind === "npc" ? "#FEF08A" : C.perlDeep;

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
      <line x1={-6} y1={14} x2={-6 - legSwing * 0.55} y2={42} stroke={C.white} strokeWidth={9} strokeLinecap="round" />
      <line x1={-12} y1={-12} x2={-28 + armSwing * 0.5} y2={8} stroke={headCol} strokeWidth={8} strokeLinecap="round" />
      <rect x={-18} y={-22} width={36} height={40} rx={10} fill={bodyCol} stroke={C.white} strokeWidth={2.5} />
      <rect x={-22} y={-58} width={44} height={38} rx={12} fill={headCol} stroke={C.white} strokeWidth={2.5} />
      {kind === "npc" ? (
        <>
          <polygon points="-14,-44 -2,-38 -14,-34" fill={eyeCol} />
          <polygon points="14,-44 2,-38 14,-34" fill={eyeCol} />
          <path d="M -10,-28 L 10,-28" stroke={C.white} strokeWidth={3} strokeLinecap="round" />
          <text x={24} y={-50} fontFamily={FONT.sans} fontWeight={900} fontSize={26} fill={C.camelGold}>!</text>
        </>
      ) : (
        <>
          <circle cx={-8} cy={-40} r={4.5} fill={eyeCol} />
          <circle cx={8} cy={-40} r={4.5} fill={eyeCol} />
          <path d="M -6,-30 Q 0,-26 6,-30" fill="none" stroke={eyeCol} strokeWidth={3} strokeLinecap="round" />
        </>
      )}
      <line x1={8} y1={14} x2={8 + legSwing * 0.55} y2={42} stroke={C.white} strokeWidth={9} strokeLinecap="round" />
      <line x1={14} y1={-12} x2={34 - armSwing * 0.5} y2={-2} stroke={headCol} strokeWidth={8} strokeLinecap="round" />
    </svg>
  );
};

/**
 * Perl Unix Blueprint Window & Cerulean Terminal Hero Card.
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
      : "linear-gradient(145deg, #03537B 0%, #0073A1 46%, #041527 100%)"
    : "#F8FAFC";

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
        borderRadius: dark ? 30 : 22,
        border: dark
          ? "2px solid rgba(56, 189, 248, 0.36)"
          : "2px solid rgba(0, 115, 161, 0.22)",
        boxShadow: dark
          ? "0 34px 70px rgba(4, 21, 39, 0.48), 0 10px 24px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(224,242,254,0.25)"
          : "0 28px 56px rgba(4, 21, 39, 0.15), 0 10px 0 rgba(0, 115, 161, 0.12)",
        padding: "54px 36px 32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 18,
        overflow: "visible",
      }}
    >
      {/* Minimal Top Window Bar (3 Dots only — zero text clutter) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 38,
          borderTopLeftRadius: dark ? 28 : 20,
          borderTopRightRadius: dark ? 28 : 20,
          background: dark ? "rgba(4, 21, 39, 0.45)" : "rgba(0, 115, 161, 0.06)",
          borderBottom: dark ? "1px solid rgba(56,189,248,0.18)" : "1px solid rgba(0,115,161,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          zIndex: 15,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#EF4444" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#F59E0B" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#10B981" }} />
        </div>
        {badge && (
          <div
            style={{
              fontFamily: FONT.mono,
              fontWeight: 700,
              fontSize: 14,
              color: dark ? "rgba(224,242,254,0.75)" : C.perlTeal,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {badgeIcon}
            <span>{badge}</span>
          </div>
        )}
        <div style={{ width: 36 }} />
      </div>

      {/* Inner Blueprint Texture & Watermark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: dark ? 30 : 22,
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
                  "linear-gradient(rgba(0,115,161,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,115,161,0.05) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
              <line x1={0} y1={h * 0.22} x2={w} y2={h * 0.88} stroke="rgba(0,115,161,0.09)" strokeWidth={1.6} />
              <line x1={w} y1={h * 0.24} x2={0} y2={h * 0.85} stroke="rgba(245,158,11,0.12)" strokeWidth={1.6} />
            </svg>
          </>
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 75% 22%, rgba(56, 189, 248, 0.24) 0%, transparent 58%)",
            }}
          />
        )}
      </div>

      {usePaperStyle && (
        <div style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", zIndex: 30 }}>
          <RedPushpin size={40} />
        </div>
      )}

      {title && (
        <div
          style={{
            fontFamily: FONT.sans,
            fontWeight: 800,
            fontSize: 28,
            color: dark ? C.white : C.charcoal,
            marginBottom: 14,
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
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * Pinned Photo Cutout Card (Perl Teal & Camel Gold Accent).
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
        border: "2px solid rgba(0, 115, 161, 0.24)",
        borderRadius: 16,
        boxShadow: "0 24px 48px rgba(4, 21, 39, 0.22), 0 6px 14px rgba(4, 21, 39, 0.10)",
        padding: "12px 12px 14px",
        zIndex,
      }}
    >
      <div style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
        <RedPushpin size={34} />
      </div>

      <div style={{ width: "100%", height: h, borderRadius: 10, overflow: "hidden", background: C.perlDeep }}>
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
                color: C.perlTeal,
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
 * Connected Vertical Pipeline Node Tree in Perl Teal & Camel Gold.
 */
export const NodeTreeList: React.FC<{
  items: { label: string; sub?: string; at: number; highlight?: boolean }[];
  x?: number;
  y?: number;
  color?: string;
  dotColor?: string;
  textColor?: string;
  rowGap?: number;
}> = ({
  items,
  x = 120,
  y = 780,
  color = C.perlTeal,
  dotColor = C.perlBlue,
  textColor = C.charcoal,
  rowGap = 70,
}) => {
  const frame = useCurrentFrame();

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
                background: item.highlight ? C.camelGold : dotColor,
                boxShadow: item.highlight
                  ? "0 0 0 5px rgba(245, 158, 11, 0.22)"
                  : "0 0 0 5px rgba(0, 115, 161, 0.18)",
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
                  fontSize: 33,
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
                    fontSize: 24,
                    color: C.perlTeal,
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
 * 4-Piece Interlocking Jigsaw Puzzle Assembly in Perl Teal (#0073A1).
 */
export const PuzzleGrid: React.FC<{
  at?: number;
  letter?: string;
  sublabel?: string;
}> = ({ at = 10, letter = "PERL", sublabel = "$report =~ s/raw/clean/g;" }) => {
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
              style={{ filter: "drop-shadow(0 18px 28px rgba(0, 115, 161, 0.30))" }}
            >
              <path d={p.path} fill={C.perlTeal} stroke="rgba(245, 158, 11, 0.65)" strokeWidth={2.5} />
              <text
                x={150}
                y={182}
                textAnchor="middle"
                fontFamily={FONT.sans}
                fontWeight={900}
                fontSize={96}
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
          color: C.perlDeep,
          background: "rgba(0, 115, 161, 0.10)",
          border: "1.5px solid rgba(0, 115, 161, 0.28)",
          padding: "10px 24px",
          borderRadius: 999,
        }}
      >
        {sublabel}
      </div>
    </div>
  );
};
