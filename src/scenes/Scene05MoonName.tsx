import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, lerp, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconArrowRight, IconBook, IconHelp, IconLaptop, IconMoon, IconXCircle } from "../components/Icons";
import { Header, KineticText } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

export const Scene05MoonName: React.FC = () => {
  const frame = useCurrentFrame();
  // Beat A (0..86): "Terus, kenapa namanya Lua?"
  // Beat B (86..220): "Fun fact! Lua berarti BULAN dalam bahasa Portugis!"
  // Beat C (220..340): "Bukan karena developernya ngoding sambil menatap bulan ya, hahaha!"
  const isMoon = frame >= 86 && frame < 220;
  const isJoke = frame >= 220;

  const shk1 = shake(frame, 89, 14, 9);
  const shk2 = shake(frame, 224, 18, 10);
  const camScale = keys(frame, [0, 86, 98, 220, 234, 340], [1, 1.02, 1.06, 1.02, 1.06, 1.02]);

  const moonRise = lerp(frame, [96, 128], [130, 0]);
  const moonScale = spr(frame, 96, { damping: 10, stiffness: 180 });
  const xStamp = spr(frame, 250, { damping: 9, stiffness: 250 });

  return (
    <Background variant="luaNight" drift={0.8}>
      <Camera scale={camScale} x={shk1.x + shk2.x} y={shk1.y + shk2.y} focusX={540} focusY={700}>
        <Header
          kicker={isJoke ? "PLOT TWIST!" : "FUN FACT · ARTI NAMA"}
          title={isMoon || isJoke ? "Lua = BULAN (Portugis)" : "Kenapa Namanya Lua?"}
          highlight={["BULAN", "Namanya", "Lua?"]}
          tone="dark"
        />

        {/* Beat A (0..86): Curious Question */}
        <ExplainCard
          at={4}
          until={86}
          w={840}
          h={420}
          y={675}
          bg="#0D1436"
          accent={C.luaSky}
          badge="ASAL NAMA LUA"
          badgeIcon={<IconHelp size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
          dark
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
            <IconHelp size={110} color={C.yellow} />
            <KineticText text="KENAPA LUA?!" start={12} size={62} color={C.white} variant="pop" />
          </div>
        </ExplainCard>

        {/* Beat B (86..220): Animated Vector Moon + Portuguese Translation */}
        <ExplainCard
          at={86}
          until={220}
          w={860}
          h={460}
          y={675}
          bg="#0C1333"
          accent={C.luaSky}
          badge="BAHASA PORTUGIS"
          badgeIcon={<IconBook size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
          dark
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            {/* Custom Animated SVG Crescent/Full Moon (Zero Emoji!) */}
            <div style={{ transform: `translateY(${moonRise}px) scale(${moonScale})`, position: "relative" }}>
              <svg width={210} height={210} viewBox="-105 -105 210 210">
                <circle r={88} fill="none" stroke={C.luaSky} strokeWidth={3} strokeDasharray="8 8" opacity={0.45} transform={`rotate(${frame * 1.2})`} />
                <circle r={68} fill={C.luaIce} stroke={C.luaSky} strokeWidth={5} />
                {/* Subtle moon craters */}
                <circle cx={-22} cy={-16} r={13} fill={C.luaSky} opacity={0.45} />
                <circle cx={24} cy={18} r={17} fill={C.luaSky} opacity={0.4} />
                <circle cx={14} cy={-28} r={8} fill={C.luaSky} opacity={0.35} />
                {/* Orbiting mini satellite */}
                <g transform={`rotate(${frame * 2.5})`}>
                  <circle cx={88} cy={0} r={11} fill={C.luaBlue} stroke={C.white} strokeWidth={2.5} />
                </g>
              </svg>
            </div>

            {/* Translation Card */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                background: C.black,
                border: `4px solid ${C.luaSky}`,
                borderRadius: 18,
                padding: "12px 28px",
              }}
            >
              <span style={{ fontFamily: FONT.mono, fontWeight: 900, fontSize: 38, color: C.luaSky }}>LUA</span>
              <IconArrowRight size={36} color={C.yellow} />
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <IconMoon size={36} color={C.yellow} />
                <span style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 40, color: C.yellow }}>BULAN</span>
              </div>
            </div>
          </div>
        </ExplainCard>

        {/* Beat C (220..340): Comedy Cutaway — Not coding while staring at the moon! */}
        <ExplainCard
          at={220}
          w={860}
          h={455}
          y={675}
          bg="#0C1333"
          accent={C.red}
          badge="BUKAN GITU KONSEPNYA!"
          badgeIcon={<IconXCircle size={20} color={C.white} />}
          badgeBg={C.red}
          dark
        >
          <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <IconLaptop size={105} color={C.luaIce} />
              <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, color: C.luaSky }}>NGODING MALAM</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <IconMoon size={105} color={C.yellow} />
              <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, color: C.yellow }}>NATAP BULAN</span>
            </div>

            {/* Big Red X Stamp */}
            {frame >= 250 && (
              <div
                style={{
                  position: "absolute",
                  transform: `scale(${xStamp}) rotate(-10deg)`,
                  background: C.red,
                  color: C.white,
                  border: `6px solid ${C.white}`,
                  borderRadius: 20,
                  padding: "12px 28px",
                  fontFamily: FONT.sans,
                  fontWeight: 900,
                  fontSize: 44,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  boxShadow: `8px 8px 0 ${C.black}`,
                }}
              >
                <IconXCircle size={46} color={C.white} />
                <span>BUKAN YA!</span>
              </div>
            )}
          </div>
        </ExplainCard>

        {/* Bottom Memes */}
        <MemeSticker
          src="memes/shocked_pikachu.jpg"
          x={680}
          y={1145}
          w={265}
          h={250}
          at={108}
          until={220}
          rotate={4}
          accent={C.yellow}
        />
        <MemeSticker
          src="memes/tertawa_terluka.jpg"
          x={680}
          y={1145}
          w={285}
          h={270}
          at={240}
          rotate={-4}
          accent={C.red}
        />

        <DevtrineMascot
          x={205}
          y={1215 + (isJoke && frame >= 300 ? Math.abs(Math.sin(frame * 0.45)) * -18 : Math.sin(frame * 0.15) * 7)}
          size={130}
          expression={isJoke ? "laughing" : isMoon ? "amazed" : "curious"}
          tears={isJoke && frame >= 295 ? 1 : 0}
          blink={autoBlink(frame, 17)}
          lookX={0.5}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={89} color={C.luaIce} max={0.25} />

      <Subtitles
        cues={[
          { from: 12, to: 72, text: "Terus, kenapa namanya Lua?", hi: ["namanya", "Lua?"] },
          { from: 88, to: 112, text: "Fun fact!", hi: ["Fun", "fact!"] },
          { from: 115, to: 214, text: "Lua berarti BULAN dalam bahasa Portugis!", hi: ["BULAN", "Portugis!"] },
          { from: 222, to: 332, text: "Bukan karena developernya ngoding sambil menatap bulan ya, hahaha!", hi: ["Bukan", "menatap", "bulan"] },
        ]}
      />

      <Sfx name="thud" at={89} volume={0.9} />
      <Sfx name="shimmer" at={115} volume={0.65} duration={36} />
      <Sfx name="record_scratch" at={250} volume={0.85} />
      <Sfx name="meme_haha" at={310} volume={0.85} duration={28} />
    </Background>
  );
};
