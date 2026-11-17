import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, easeOut, keys, lerp, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconMoon, IconSparkles } from "../components/Icons";
import { Header, KineticText } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

export const Scene02LuaReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const revealed = frame >= 104; // exact start of "adalah Lua!"

  const shk = shake(frame, 104, 20, 12);
  const camScale = keys(frame, [0, 95, 104, 118, 152], [1, 1.03, 1.09, 1.03, 1.04]);
  const slideX = lerp(frame, [0, 20], [-140, 205], easeOut);
  const revealPop = spr(frame, 104, { damping: 9, stiffness: 220 });
  const orbitDeg = frame * 2.4;

  return (
    <Background variant="luaNight" drift={1.1}>
      <Camera scale={camScale} x={shk.x} y={shk.y} focusX={540} focusY={720}>
        <Header
          kicker="PLAYER KUNCI DI DUNIA GAME"
          title="Perkenalkan: Bahasa Lua!"
          highlight={["Bahasa", "Lua!"]}
          tone="dark"
        />

        <ExplainCard
          at={6}
          w={850}
          h={460}
          y={675}
          bg="#0D1436"
          accent={C.luaSky}
          badge={revealed ? "LUA PROGRAMMING LANGUAGE" : "MEMUAT BAHASA GAME..."}
          badgeIcon={<IconMoon size={20} color={C.charcoal} />}
          badgeBg={revealed ? C.yellow : C.luaIce}
          dark
        >
          {!revealed ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
              <div style={{ position: "relative", width: 210, height: 210, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={210} height={210} viewBox="-105 -105 210 210" style={{ transform: `rotate(${orbitDeg}deg)` }}>
                  <circle r={88} fill="none" stroke={C.luaSky} strokeWidth={5} strokeDasharray="16 12" opacity={0.75} />
                  <circle cx={88} cy={0} r={14} fill={C.yellow} />
                </svg>
                <div style={{ position: "absolute", fontFamily: FONT.mono, fontWeight: 900, fontSize: 64, color: C.white }}>
                  ?
                </div>
              </div>
              <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 24, color: C.luaIce, letterSpacing: "0.1em" }}>
                ENGINE SCRIPTING LANGUAGE
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 18,
                transform: `scale(${revealPop})`,
              }}
            >
              <div style={{ position: "relative", width: 250, height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={250} height={250} viewBox="-125 -125 250 250" style={{ position: "absolute", transform: `rotate(${orbitDeg}deg)` }}>
                  <circle r={112} fill="none" stroke={C.luaSky} strokeWidth={3} strokeDasharray="10 10" opacity={0.5} />
                </svg>
                <Img
                  src={staticFile("image-vidio/lua/lua-logo.svg")}
                  style={{ width: 210, height: 210, objectFit: "contain" }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <IconSparkles size={28} color={C.yellow} />
                <KineticText text="LUA (1993)" start={106} size={44} color={C.white} variant="pop" />
                <IconSparkles size={28} color={C.yellow} />
              </div>
            </div>
          )}
        </ExplainCard>

        {/* Bottom Meme Cutaways */}
        <MemeSticker
          src="memes/let_him_cook.jpg"
          x={575}
          y={1145}
          w={260}
          h={245}
          at={18}
          until={104}
          rotate={-4}
          accent={C.luaBlue}
        />
        <MemeSticker
          src="memes/chad_gojo.jpg"
          x={745}
          y={1145}
          w={275}
          h={265}
          at={104}
          rotate={4}
          accent={C.luaSky}
        />

        <DevtrineMascot
          x={slideX}
          y={1215 + Math.sin(frame * 0.16) * 7}
          size={130}
          expression={revealed ? "cool" : "amazed"}
          sunglasses={revealed}
          blink={autoBlink(frame, 14)}
          lookX={0.5}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={104} color={C.luaIce} max={0.3} />

      <Subtitles
        cues={[
          { from: 10, to: 100, text: "Nah, salah satu bahasa yang punya peran di dunia game", hi: ["peran", "dunia", "game"] },
          { from: 103, to: 146, text: "adalah Lua!", hi: ["adalah", "Lua!"] },
        ]}
      />

      <Sfx name="whoosh" at={6} volume={0.75} />
      <Sfx name="thud" at={104} volume={0.95} />
      <Sfx name="meme_wow" at={114} volume={0.7} duration={36} />
    </Background>
  );
};
