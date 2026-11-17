import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, easeOut, keys, lerp, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconMoon, IconSparkles } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

export const Scene02LuaReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const revealed = frame >= 104; // exact start of "adalah Lua!"

  const shk = shake(frame, 104, 18, 12);
  const camScale = keys(frame, [0, 95, 104, 118, 152], [1, 1.03, 1.09, 1.03, 1.05]);
  // Mascot slides from left -> hops up excitedly on Lua reveal!
  const mascotX = keys(frame, [0, 22, 104, 122, 152], [-140, 590, 560, 480, 540]);
  const hop = frame >= 104 && frame < 122 ? Math.sin(((frame - 104) / 18) * Math.PI) * -42 : 0;
  const revealPop = spr(frame, 104, { damping: 10, stiffness: 210 });
  const orbitDeg = frame * 2.2;

  return (
    <Background variant="luaNight" drift={1.1}>
      <Camera scale={camScale} x={shk.x} y={shk.y} focusX={540} focusY={725}>
        <Header
          kicker="PLAYER KUNCI DI DUNIA GAME"
          title="Perkenalkan: Bahasa Lua!"
          highlight={["Bahasa", "Lua!"]}
          tone="dark"
        />

        <ExplainCard
          at={6}
          w={960}
          h={630}
          y={725}
          badge={revealed ? "LUA · 1993" : "LOADING ENGINE"}
          badgeIcon={<IconMoon size={18} color={C.charcoal} />}
          watermark={revealed ? "LUA 1993" : "ENGINE"}
          dark
        >
          {!revealed ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
              <div style={{ position: "relative", width: 290, height: 290, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div
                  style={{
                    position: "absolute",
                    width: 255,
                    height: 255,
                    borderRadius: "50%",
                    border: "26px solid rgba(219,234,254,0.88)",
                    boxShadow: "0 0 60px rgba(96, 165, 250, 0.55)",
                  }}
                />
                <svg width={290} height={290} viewBox="-145 -145 290 290" style={{ transform: `rotate(${orbitDeg}deg)` }}>
                  <circle cx={125} cy={0} r={18} fill={C.luaSky} />
                </svg>
                <div style={{ position: "absolute", fontFamily: FONT.sans, fontWeight: 900, fontSize: 96, color: C.white }}>
                  ?
                </div>
              </div>
              <div style={{ textAlign: "center", lineHeight: 1.1 }}>
                <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 24, color: C.luaSky, letterSpacing: "0.08em" }}>
                  SCRIPTING ENGINE
                </div>
                <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 48, color: C.white, letterSpacing: "-0.03em" }}>
                  Bahasa Rahasia Game
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                transform: `scale(${revealPop})`,
              }}
            >
              <div style={{ position: "relative", width: 320, height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={320} height={320} viewBox="-160 -160 320 320" style={{ position: "absolute", transform: `rotate(${orbitDeg}deg)` }}>
                  <circle r={148} fill="none" stroke="rgba(219,234,254,0.4)" strokeWidth={3.5} strokeDasharray="12 12" />
                </svg>
                <Img
                  src={staticFile("image-vidio/lua/lua-logo.svg")}
                  style={{
                    width: 270,
                    height: 270,
                    objectFit: "contain",
                    filter: "drop-shadow(0 20px 38px rgba(0,0,0,0.45))",
                  }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <IconSparkles size={32} color={C.luaSky} />
                <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 54, color: C.white, letterSpacing: "-0.03em" }}>
                  Bahasa <span style={{ color: C.luaSky }}>Lua!</span>
                </div>
                <IconSparkles size={32} color={C.luaSky} />
              </div>
            </div>
          )}
        </ExplainCard>

        <MemeSticker
          src="memes/let_him_cook.jpg"
          x={205}
          y={1245}
          w={250}
          h={230}
          at={18}
          until={104}
          rotate={-5}
        />
        <MemeSticker
          src="memes/chad_gojo.jpg"
          x={875}
          y={1245}
          w={265}
          h={240}
          at={104}
          until={136}
          rotate={5}
        />

        <DevtrineMascot
          x={mascotX}
          y={lerp(frame, [0, 18], [1540, 1245], easeOut) + hop + Math.sin(frame * 0.16) * 6}
          size={156}
          expression={revealed ? "cool" : "amazed"}
          sunglasses={revealed}
          blink={autoBlink(frame, 14)}
          rotate={revealed ? Math.sin(frame * 0.2) * 6 : -4}
          lookX={revealed ? 0.35 : -0.3}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={104} color={C.luaIce} max={0.32} />

      <Subtitles
        cues={[
          { from: 10, to: 100, text: "Nah, salah satu bahasa yang punya peran di dunia game", hi: ["peran", "dunia", "game"] },
          { from: 103, to: 146, text: "adalah Lua!", hi: ["adalah", "Lua!"] },
        ]}
      />

      <Sfx name="whoosh" at={6} volume={0.8} />
      <Sfx name="thud" at={104} volume={0.95} duration={44} />
      <Sfx name="meme_wow" at={110} volume={0.75} duration={36} />
    </Background>
  );
};
