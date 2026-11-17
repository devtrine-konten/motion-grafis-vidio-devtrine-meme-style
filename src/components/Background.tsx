import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT, H, W } from "../theme";

export type BgVariant = "voxPaper" | "dotMatrix" | "luaNight" | "noir" | "luaBlue" | "light" | "dark" | "blueprint";

/**
 * Tactile Desk Props (SVG + Meme Photo Polaroid at bottom-right).
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
        {/* Continuous Curved Trajectory Arcs */}
        <path
          d={`M -120,${380 + shiftY * 2} Q ${540 + shiftX * 4},620 ${W + 140},${180 - shiftY * 2}`}
          fill="none"
          stroke={dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,128,0.10)"}
          strokeWidth={8}
        />
        <path
          d={`M -80,${1480 - shiftY * 2} Q ${460 - shiftX * 3},1120 ${W + 120},${1640 + shiftY * 2}`}
          fill="none"
          stroke={dark ? "rgba(96,165,250,0.10)" : "rgba(0,0,128,0.09)"}
          strokeWidth={7}
        />

        {/* Top-Left Out-of-Focus Pen Silhouette */}
        <g
          transform={`translate(${110 + shiftX}, ${95 + shiftY}) rotate(-32)`}
          opacity={dark ? 0.22 : 0.45}
          style={{ filter: "blur(5px)" }}
        >
          <rect x={-180} y={-14} width={320} height={28} rx={14} fill="#1E293B" />
          <rect x={60} y={-14} width={45} height={28} fill="#D4AF37" />
          <polygon points="140,-12 185,0 140,12" fill="#94A3B8" />
        </g>

        {/* Top-Right Torn Kraft Paper Scrap */}
        <g
          transform={`translate(${W - 185 - shiftX * 0.8}, ${115 + shiftY * 0.8}) rotate(14)`}
          opacity={dark ? 0.35 : 0.90}
          style={{ filter: "drop-shadow(-10px 16px 18px rgba(0,0,0,0.20))" }}
        >
          <path
            d="M -110,-160 L 220,-160 L 220,170 L 40,185 L -25,155 L -85,168 L -125,120 L -115,20 Z"
            fill={C.kraft}
          />
          <path
            d="M -110,-160 L 220,-160 L 220,170 L 40,185 L -25,155 L -85,168 L -125,120 L -115,20 Z"
            fill="none"
            stroke="rgba(92,58,30,0.35)"
            strokeWidth={3}
          />
        </g>

        {/* Bottom-Left Realistic Metallic Wire Paperclip */}
        <g
          transform={`translate(${135 + shiftX * 1.1}, ${1490 + shiftY * 1.1}) rotate(-36)`}
          opacity={dark ? 0.45 : 0.85}
          style={{ filter: "drop-shadow(6px 10px 8px rgba(0,0,0,0.20))" }}
        >
          <path
            d="M -45,10 L 55,10 A 24,24 0 0 1 55,58 L -65,58 A 32,32 0 0 1 -65,-6 L 42,-6 A 16,16 0 0 1 42,26 L -35,26"
            fill="none"
            stroke={dark ? "#94A3B8" : "#475569"}
            strokeWidth={6.5}
            strokeLinecap="round"
          />
          <path
            d="M -45,10 L 55,10 A 24,24 0 0 1 55,58 L -65,58 A 32,32 0 0 1 -65,-6 L 42,-6 A 16,16 0 0 1 42,26 L -35,26"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Bottom-Right Polaroid Frame Filled With Real Meme Image */}
      <div
        style={{
          position: "absolute",
          left: W - 140 - shiftX,
          top: H - 190 - shiftY,
          width: 300,
          height: 340,
          transform: "translate(-50%, -50%) rotate(-18deg)",
          background: "#F4F3EE",
          border: "2px solid #D6D3C9",
          borderRadius: 6,
          padding: "24px 24px 68px",
          boxShadow: "-8px 14px 22px rgba(0,0,0,0.22)",
          opacity: dark ? 0.4 : 0.94,
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        {/* Masking Tape Strip at Top of Polaroid */}
        <div
          style={{
            position: "absolute",
            top: -18,
            left: "50%",
            width: 94,
            height: 32,
            transform: "translateX(-50%) rotate(6deg)",
            background: "rgba(238, 232, 213, 0.85)",
            border: "1.5px solid rgba(0,0,0,0.08)",
          }}
        />
        <div style={{ width: "100%", height: "100%", overflow: "hidden", background: "#141824" }}>
          <Img
            src={staticFile(polaroidMeme)}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.92 }}
          />
        </div>
      </div>
    </>
  );
};

/**
 * Window Blind / Sunlight Shadow Overlay (Gobo light effect).
 */
const WindowSunlightShadow: React.FC<{ frame: number; drift: number; opacity?: number }> = ({
  frame,
  drift,
  opacity = 0.2,
}) => {
  const offset = Math.sin(frame * 0.015 * drift) * 28;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 1,
        opacity,
        filter: "blur(28px)",
        transform: `translate(${offset}px, ${-offset * 0.6}px) rotate(-14deg) scale(1.25)`,
        background: `
          repeating-linear-gradient(
            0deg,
            rgba(5, 9, 41, 0.46) 0px,
            rgba(5, 9, 41, 0.46) 110px,
            rgba(255, 252, 240, 0.35) 110px,
            rgba(255, 252, 240, 0.35) 260px
          ),
          linear-gradient(90deg, rgba(5,9,41,0.4) 0%, transparent 18%, transparent 48%, rgba(5,9,41,0.45) 52%, transparent 56%, transparent 88%, rgba(5,9,41,0.4) 100%)
        `,
      }}
    />
  );
};

/**
 * Sweeping Dashed Trajectory Arcs in Lua Navy.
 */
const DashedTrajectoryArcs: React.FC<{ frame: number; color?: string }> = ({
  frame,
  color = "rgba(0, 0, 128, 0.28)",
}) => {
  const dashOffset = -frame * 1.4;
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
      <path
        d="M -60,430 A 520,520 0 0 0 430,-60"
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeDasharray="18 16"
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
      />
      <path
        d="M 1160,1460 A 680,680 0 0 0 280,1960"
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeDasharray="18 16"
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
}> = ({ variant = "voxPaper", drift = 1, watermark, polaroidMeme = "memes/well_well.jpg", children }) => {
  const frame = useCurrentFrame();

  // 1. Tactile Studio Grid + Intersection Dots + Window Sunlight Shadows + Desk Props with Meme Polaroid
  if (variant === "voxPaper" || variant === "light") {
    const gx = (frame * 0.35 * drift) % 84;
    const gy = (-frame * 0.35 * drift) % 84;
    return (
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 52% 38%, #F8FAFC 0%, ${C.paper} 62%, ${C.paperGrid} 100%)`,
        }}
      >
        <AbsoluteFill
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,128,0.065) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(0,0,128,0.065) 1.5px, transparent 1.5px)",
            backgroundSize: "84px 84px",
            backgroundPosition: `${gx}px ${gy}px`,
          }}
        />
        <AbsoluteFill
          style={{
            backgroundImage: "radial-gradient(rgba(0,0,128,0.24) 2.5px, transparent 2.5px)",
            backgroundSize: "84px 84px",
            backgroundPosition: `${gx - 1.5}px ${gy - 1.5}px`,
          }}
        />

        {watermark && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "45%",
              transform: `translate(-50%, -50%) scale(${1 + Math.sin(frame * 0.02) * 0.02})`,
              fontFamily: FONT.sans,
              fontWeight: 900,
              fontSize: 640,
              color: "rgba(0, 0, 128, 0.065)",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            {watermark}
          </div>
        )}

        <WindowSunlightShadow frame={frame} drift={drift} opacity={0.18} />
        <DeskPropsOverlay frame={frame} drift={drift} polaroidMeme={polaroidMeme} />

        <AbsoluteFill style={{ zIndex: 5 }}>{children}</AbsoluteFill>

        <AbsoluteFill
          style={{
            background: "radial-gradient(ellipse at center, transparent 58%, rgba(5,9,41,0.18) 100%)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      </AbsoluteFill>
    );
  }

  // 2. Clean Minimalist Dot-Matrix Canvas + Lua Navy Sweeping Dashed Arcs
  if (variant === "dotMatrix" || variant === "luaBlue" || variant === "noir") {
    return (
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 42%, #FFFFFF 0%, ${C.white} 64%, #DCE6F7 100%)`,
        }}
      >
        <AbsoluteFill
          style={{
            backgroundImage: "radial-gradient(rgba(0, 0, 128, 0.16) 2px, transparent 2px)",
            backgroundSize: "30px 30px",
            backgroundPosition: `${frame * 0.25 * drift}px ${-frame * 0.25 * drift}px`,
          }}
        />

        {watermark && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "44%",
              transform: "translate(-50%, -50%)",
              fontFamily: FONT.sans,
              fontWeight: 900,
              fontSize: 560,
              color: "rgba(0, 0, 128, 0.055)",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            {watermark}
          </div>
        )}

        <DashedTrajectoryArcs frame={frame} color="rgba(0, 0, 128, 0.28)" />

        <AbsoluteFill style={{ zIndex: 5 }}>{children}</AbsoluteFill>

        <AbsoluteFill
          style={{
            background: "radial-gradient(ellipse at center, transparent 64%, rgba(0,0,128,0.10) 100%)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      </AbsoluteFill>
    );
  }

  // 3. Lua Deep Space Spotlight + Glowing Orbital Ring
  const gx = (frame * 0.35 * drift) % 84;
  const gy = (-frame * 0.35 * drift) % 84;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 42%, #0C1B54 0%, ${C.luaDeep} 58%, #020514 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(96,165,250,0.065) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(96,165,250,0.065) 1.5px, transparent 1.5px)",
          backgroundSize: "84px 84px",
          backgroundPosition: `${gx}px ${gy}px`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(rgba(219,234,254,0.18) 2px, transparent 2px)",
          backgroundSize: "84px 84px",
          backgroundPosition: `${gx - 1}px ${gy - 1}px`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "44%",
          width: 580,
          height: 580,
          transform: `translate(-50%, -50%) scale(${1 + Math.sin(frame * 0.04) * 0.025})`,
          borderRadius: "50%",
          border: "52px solid rgba(219, 234, 254, 0.075)",
          boxShadow: "0 0 90px rgba(29, 78, 216, 0.24), inset 0 0 60px rgba(96, 165, 250, 0.16)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <DashedTrajectoryArcs frame={frame} color="rgba(96, 165, 250, 0.24)" />

      <AbsoluteFill style={{ zIndex: 5 }}>{children}</AbsoluteFill>

      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at center, transparent 52%, rgba(2,5,20,0.58) 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
    </AbsoluteFill>
  );
};
