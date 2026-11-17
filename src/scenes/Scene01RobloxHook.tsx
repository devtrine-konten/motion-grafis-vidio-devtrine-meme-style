import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, easeOutBack, keys, lerp, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconArrowRight, IconCode, IconGamepad, IconHelp } from "../components/Icons";
import { Header, Pill } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

export const Scene01RobloxHook: React.FC = () => {
  const frame = useCurrentFrame();

  const jumpUp = lerp(frame, [0, 18], [1560, 1215], easeOutBack);
  const flipRot = frame < 18 ? lerp(frame, [0, 18], [360, 0]) : Math.sin(frame * 0.14) * 4;

  // Vine Boom camera shake on Roblox Noob slam (f22) and Question slam (f114)
  const shk1 = shake(frame, 22, 22, 12);
  const shk2 = shake(frame, 114, 16, 9);
  const camScale = keys(frame, [0, 22, 34, 114, 126, 238], [1, 1.07, 1.02, 1.05, 1.02, 1.03]);

  const noobPop = spr(frame, 18, { damping: 10, stiffness: 230 });
  const arrowPop = spr(frame, 28, { damping: 12, stiffness: 190 });
  const boxPop = spr(frame, 36, { damping: 11, stiffness: 210 });
  const questionPulse = 1 + Math.sin(frame * 0.28) * 0.05;

  return (
    <Background variant="voxPaper" drift={1.0}>
      <Camera scale={camScale} x={shk1.x + shk2.x} y={shk1.y + shk2.y} focusX={540} focusY={780}>
        <Header
          kicker="SEJARAH BAHASA PEMROGRAMAN · EP.03"
          title="Game Roblox Pakai Bahasa Apa?!"
          highlight={["Roblox", "Bahasa", "Apa?!"]}
        />

        {/* Vox Editorial + Meme Stage Card: Roblox Noob -> ??? Code */}
        <ExplainCard
          at={14}
          w={860}
          h={455}
          y={675}
          bg={C.black}
          accent={C.luaBlue}
          badge="MISTERI GAME ROBLOX"
          badgeIcon={<IconGamepad size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
          dark
          tape
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "0 16px" }}>
            {/* Roblox Noob Meme Cutout */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                transform: `scale(${noobPop}) rotate(${Math.sin(frame * 0.14) * 3}deg)`,
              }}
            >
              <div
                style={{
                  width: 240,
                  height: 250,
                  background: C.paper,
                  border: `4px solid ${C.white}`,
                  borderRadius: 20,
                  padding: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Img
                  src={staticFile("image-vidio/lua/roblox-noob.png")}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <Pill text="ROBLOX NOOB" bg={C.luaBlue} color={C.white} at={24} size={18} />
            </div>

            {/* Vox Editorial Arrow */}
            <div style={{ transform: `scale(${arrowPop})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <IconArrowRight size={56} color={C.yellow} />
              <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 16, color: C.luaIce }}>DIBUAT PAKAI</span>
            </div>

            {/* Mystery Programming Language Box */}
            <div
              style={{
                width: 295,
                height: 250,
                background: "#121833",
                border: `4px solid ${C.luaSky}`,
                borderRadius: 20,
                padding: 18,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                transform: `scale(${boxPop * questionPulse})`,
              }}
            >
              <IconHelp size={76} color={C.yellow} />
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontWeight: 900,
                  fontSize: 32,
                  color: C.white,
                  letterSpacing: "0.08em",
                }}
              >
                LANG: ???
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: C.luaDeep,
                  padding: "6px 14px",
                  borderRadius: 10,
                  border: `2px solid ${C.luaBlue}`,
                }}
              >
                <IconCode size={20} color={C.luaSky} />
                <span style={{ fontFamily: FONT.mono, fontSize: 18, fontWeight: 700, color: C.luaIce }}>
                  script.lua?
                </span>
              </div>
            </div>
          </div>
        </ExplainCard>

        {/* Bottom Meme Cutaways synced to VO */}
        <MemeSticker
          src="memes/iki_opo.jpg"
          x={575}
          y={1145}
          w={265}
          h={245}
          at={82}
          until={146}
          rotate={-5}
          accent={C.luaBlue}
        />
        <MemeSticker
          src="memes/wojak_point.jpg"
          x={745}
          y={1145}
          w={285}
          h={260}
          at={146}
          rotate={4}
          accent={C.black}
        />

        <DevtrineMascot
          x={205}
          y={jumpUp + Math.sin(frame * 0.16) * 7}
          size={130}
          expression={frame < 114 ? "curious" : "shocked"}
          magnifyingGlass={frame >= 114}
          blink={autoBlink(frame, 8)}
          rotate={flipRot}
          lookX={0.5}
          lookY={-0.35}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={22} color={C.luaIce} max={0.28} />

      <Subtitles
        cues={[
          { from: 4, to: 21, text: "WOI!", hi: ["WOI!"] },
          { from: 22, to: 80, text: "Kalian yang sering main Roblox,", hi: ["main", "Roblox,"] },
          { from: 81, to: 112, text: "pernah kepikiran nggak,", hi: ["kepikiran"] },
          { from: 113, to: 230, text: "game-game kayak gitu dibuat pakai bahasa pemrograman apa?!", hi: ["bahasa", "pemrograman", "apa?!"] },
        ]}
      />

      <Sfx name="pop" at={6} volume={0.85} />
      <Sfx name="vine_boom" at={22} volume={0.95} />
      <Sfx name="what_meme" at={82} volume={0.8} duration={24} />
      <Sfx name="boing" at={146} volume={0.75} />
    </Background>
  );
};
