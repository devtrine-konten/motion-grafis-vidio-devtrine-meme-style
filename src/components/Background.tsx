import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { C, H, W } from "../theme";

export type BgVariant = "voxPaper" | "dotMatrix" | "luaNight" | "noir" | "luaBlue" | "light" | "dark" | "blueprint";

/**
 * Clean Visual Desk Props (Zero background text clutter).
 */
const DeskPropsOverlay: React.FC<{
  frame: number;
  drift: number;
  dark?: boolean;
  polaroidMeme?: string;
}> = ({ frame, drift, dark = false, polaroidMeme = "memes/well_well.jpg" }) => {
  const shiftX = Math.sin(frame * 0.02 * drift) * 6;
  const shiftY = Math.cos(frame * 0.02 * drift) * 6;

  return (
    <>
      <svg
        width={W}
        height={H}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}
      >
        {/* Subtle Curved Trajectory Arcs */}
        <path
          d={`M -120,${360 + shiftY * 2} C ${340 + shiftX * 4},580 ${720 - shiftX * 3},220 ${W + 140},${420 - shiftY * 2}`}
          fill="none"
          stroke={dark ? "rgba(56,189,248,0.10)" : "rgba(0,115,161,0.10)"}
          strokeWidth={7}
          strokeDasharray="22 14"
          strokeDashoffset={-frame * 1.2}
        />
        <path
          d={`M -80,${1500 - shiftY * 2} Q ${480 - shiftX * 3},1160 ${W + 120},${1620 + shiftY * 2}`}
          fill="none"
          stroke={dark ? "rgba(245,158,11,0.12)" : "rgba(245,158,11,0.15)"}
          strokeWidth={6}
        />

        {/* Top-Left Out-of-Focus Pen Silhouette */}
        <g
          transform={`translate(${110 + shiftX}, ${95 + shiftY}) rotate(-32)`}
          opacity={dark ? 0.22 : 0.42}
          style={{ filter: "blur(5px)" }}
        >
          <rect x={-180} y={-14} width={320} height={28} rx={14} fill={C.perlDeep} />
          <rect x={60} y={-14} width={45} height={28} fill={C.camelGold} />
          <polygon points="140,-12 185,0 140,12" fill="#94A3B8" />
        </g>

        {/* Top-Right Torn Sand Paper Scrap */}
        <g
          transform={`translate(${W - 180 - shiftX * 0.8}, ${105 + shiftY * 0.8}) rotate(12)`}
          opacity={dark ? 0.35 : 0.88}
          style={{ filter: "drop-shadow(-10px 14px 18px rgba(4,21,39,0.16))" }}
        >
          <path
            d="M -110,-150 L 210,-150 L 210,155 L 40,170 L -25,142 L -85,155 L -120,110 L -115,20 Z"
            fill="#FDE68A"
          />
          <path
            d="M -110,-150 L 210,-150 L 210,155 L 40,170 L -25,142 L -85,155 L -120,110 L -115,20 Z"
            fill="none"
            stroke="rgba(180,83,9,0.30)"
            strokeWidth={3}
          />
        </g>

        {/* Bottom-Left Metallic Wire Paperclip */}
        <g
          transform={`translate(${135 + shiftX * 1.1}, ${1490 + shiftY * 1.1}) rotate(-36)`}
          opacity={dark ? 0.45 : 0.82}
          style={{ filter: "drop-shadow(6px 10px 8px rgba(4,21,39,0.18))" }}
        >
          <path
            d="M -45,10 L 55,10 A 24,24 0 0 1 55,58 L -65,58 A 32,32 0 0 1 -65,-6 L 42,-6 A 16,16 0 0 1 42,26 L -35,26"
            fill="none"
            stroke={dark ? "#94A3B8" : C.perlTeal}
            strokeWidth={6.5}
            strokeLinecap="round"
          />
          <path
            d="M -45,10 L 55,10 A 24,24 0 0 1 55,58 L -65,58 A 32,32 0 0 1 -65,-6 L 42,-6 A 16,16 0 0 1 42,26 L -35,26"
            fill="none"
            stroke="#E0F2FE"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Bottom-Right Polaroid Frame With Camel Gold Tape & Real Meme Image */}
      <div
        style={{
          position: "absolute",
          left: W - 140 - shiftX,
          top: H - 190 - shiftY,
          width: 296,
          height: 336,
          transform: "translate(-50%, -50%) rotate(-16deg)",
          background: "#F8FAFC",
          border: "2.5px solid rgba(0,115,161,0.24)",
          borderRadius: 10,
          padding: "22px 22px 64px",
          boxShadow: "-8px 14px 24px rgba(4,21,39,0.20)",
          opacity: dark ? 0.42 : 0.94,
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -16,
            left: "50%",
            width: 98,
            height: 30,
            transform: "translateX(-50%) rotate(5deg)",
            background: "rgba(245, 158, 11, 0.78)",
            border: "1.5px solid rgba(180,83,9,0.25)",
            borderRadius: 3,
          }}
        />
        <div style={{ width: "100%", height: "100%", overflow: "hidden", background: C.perlDeep, borderRadius: 4 }}>
          <Img
            src={staticFile(polaroidMeme)}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.93 }}
          />
        </div>
      </div>
    </>
  );
};

const WindowSunlightShadow: React.FC<{ frame: number; drift: number; opacity?: number }> = ({
  frame,
  drift,
  opacity = 0.15,
}) => {
  const offset = Math.sin(frame * 0.015 * drift) * 26;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 1,
        opacity,
        filter: "blur(28px)",
        transform: `translate(${offset}px, ${-offset * 0.6}px) rotate(-12deg) scale(1.25)`,
        background: `
          repeating-linear-gradient(
            0deg,
            rgba(4, 21, 39, 0.40) 0px,
            rgba(4, 21, 39, 0.40) 110px,
            rgba(254, 243, 199, 0.34) 110px,
            rgba(254, 243, 199, 0.34) 260px
          )
        `,
      }}
    />
  );
};

const DashedTrajectoryArcs: React.FC<{ frame: number; color?: string; accentColor?: string }> = ({
  frame,
  color = "rgba(0, 115, 161, 0.26)",
  accentColor = "rgba(245, 158, 11, 0.28)",
}) => {
  const dashOffset = -frame * 1.5;
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
      <path
        d="M -60,420 A 520,520 0 0 0 420,-60"
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeDasharray="18 14"
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
      />
      <path
        d="M 1160,1450 A 680,680 0 0 0 280,1960"
        fill="none"
        stroke={accentColor}
        strokeWidth={6}
        strokeDasharray="18 14"
        strokeDashoffset={-dashOffset}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Background: React.FC<{
  variant?: BgVariant;
  drift?: number;
  watermark?: string;
  polaroidMeme?: string;
  children?: React.ReactNode;
}> = ({ variant = "voxPaper", drift = 1, polaroidMeme = "memes/well_well.jpg", children }) => {
  const frame = useCurrentFrame();

  if (variant === "voxPaper" || variant === "light") {
    const gx = (frame * 0.35 * drift) % 80;
    const gy = (-frame * 0.35 * drift) % 80;
    return (
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 52% 38%, #FFFFFF 0%, ${C.paper} 62%, ${C.paperGrid} 100%)`,
        }}
      >
        <AbsoluteFill
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,115,161,0.065) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(0,115,161,0.065) 1.5px, transparent 1.5px)",
            backgroundSize: "80px 80px",
            backgroundPosition: `${gx}px ${gy}px`,
          }}
        />
        <AbsoluteFill
          style={{
            backgroundImage: "radial-gradient(rgba(0,115,161,0.22) 2.5px, transparent 2.5px)",
            backgroundSize: "80px 80px",
            backgroundPosition: `${gx - 1.5}px ${gy - 1.5}px`,
          }}
        />

        <WindowSunlightShadow frame={frame} drift={drift} opacity={0.14} />
        <DeskPropsOverlay frame={frame} drift={drift} polaroidMeme={polaroidMeme} />

        <AbsoluteFill style={{ zIndex: 5 }}>{children}</AbsoluteFill>

        <AbsoluteFill
          style={{
            background: "radial-gradient(ellipse at center, transparent 58%, rgba(4,21,39,0.15) 100%)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      </AbsoluteFill>
    );
  }

  if (variant === "dotMatrix" || variant === "luaBlue" || variant === "noir") {
    return (
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 42%, #FFFFFF 0%, ${C.white} 62%, #D8EBF6 100%)`,
        }}
      >
        <AbsoluteFill
          style={{
            backgroundImage: "radial-gradient(rgba(0, 115, 161, 0.17) 2px, transparent 2px)",
            backgroundSize: "30px 30px",
            backgroundPosition: `${frame * 0.25 * drift}px ${-frame * 0.25 * drift}px`,
          }}
        />

        <DashedTrajectoryArcs frame={frame} />

        <AbsoluteFill style={{ zIndex: 5 }}>{children}</AbsoluteFill>

        <AbsoluteFill
          style={{
            background: "radial-gradient(ellipse at center, transparent 64%, rgba(0,115,161,0.10) 100%)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      </AbsoluteFill>
    );
  }

  const gx = (frame * 0.35 * drift) % 80;
  const gy = (-frame * 0.35 * drift) % 80;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 42%, #063455 0%, ${C.perlDeep} 58%, #020A14 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.065) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(56,189,248,0.065) 1.5px, transparent 1.5px)",
          backgroundSize: "80px 80px",
          backgroundPosition: `${gx}px ${gy}px`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(rgba(245,158,11,0.18) 2px, transparent 2px)",
          backgroundSize: "80px 80px",
          backgroundPosition: `${gx - 1}px ${gy - 1}px`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "44%",
          width: 600,
          height: 600,
          transform: `translate(-50%, -50%) scale(${1 + Math.sin(frame * 0.04) * 0.025})`,
          borderRadius: "50%",
          border: "44px solid rgba(56, 189, 248, 0.075)",
          boxShadow: "0 0 95px rgba(0, 115, 161, 0.30), inset 0 0 60px rgba(245, 158, 11, 0.14)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <DashedTrajectoryArcs frame={frame} color="rgba(56, 189, 248, 0.24)" accentColor="rgba(245, 158, 11, 0.26)" />

      <AbsoluteFill style={{ zIndex: 5 }}>{children}</AbsoluteFill>

      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at center, transparent 52%, rgba(2,10,20,0.62) 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
    </AbsoluteFill>
  );
};
