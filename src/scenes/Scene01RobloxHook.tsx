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

  // Dynamic context-driven mascot movement: leaps up -> leans toward iki_opo -> hops right toward Roblox mystery
  const mascotX = keys(frame, [0, 22, 82, 114, 146, 238], [540, 540, 620, 490, 460, 540]);
  const jumpUp = lerp(frame, [0, 18], [1560, 1245], easeOutBack);
  const hop = frame >= 114 && frame < 130 ? Math.sin(((frame - 114) / 16) * Math.PI) * -32 : 0;
  const flipRot = frame < 18 ? lerp(frame, [0, 18], [360, 0]) : Math.sin(frame * 0.14) * 5;

  const shk1 = shake(frame, 22, 18, 12);
  const shk2 = shake(frame, 114, 14, 9);
  const camScale = keys(frame, [0, 22, 34, 114, 126, 238], [1, 1.06, 1.02, 1.05, 1.02, 1.04]);

  const noobPop = spr(frame, 18, { damping: 11, stiffness: 210 });
  const arrowPop = spr(frame, 28, { damping: 12, stiffness: 190 });
  const boxPop = spr(frame, 36, { damping: 11, stiffness: 210 });
  const questionPulse = 1 + Math.sin(frame * 0.24) * 0.04;

  return (
    <Background variant="voxPaper" drift={1.0} watermark="LUA" polaroidMeme="memes/well_well.jpg">
      <Camera scale={camScale} x={shk1.x + shk2.x} y={shk1.y + shk2.y} focusX={540} focusY={740}>
        <Header
          kicker="SEJARAH BAHASA PEMROGRAMAN · EP.03"
          title="Game Roblox Pakai Bahasa Apa?!"
          highlight={["Roblox", "Bahasa", "Apa?!"]}
        />

        <ExplainCard
          at={12}
          w={960}
          h={630}
          y={725}
          badge="MISTERI ENGINE"
          badgeIcon={<IconGamepad size={18} color={C.charcoal} />}
          tape
        >
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 30, color: C.charcoal, letterSpacing: "-0.02em" }}>
              Sering main tapi{" "}
              <span style={{ color: C.red, fontWeight: 800 }}>belum tahu</span>{" "}
              <span style={{ color: C.luaBlue, fontWeight: 800 }}>rahasia di baliknya?</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "0 24px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                transform: `scale(${noobPop}) rotate(${Math.sin(frame * 0.12) * 3}deg)`,
              }}
            >
              <div
                style={{
                  width: 300,
                  height: 310,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  filter: "drop-shadow(0 24px 32px rgba(5,9,41,0.32))",
                }}
              >
                <Img
                  src={staticFile("image-vidio/lua/roblox-noob.png")}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <Pill text="ROBLOX WORLD" bg={C.luaNavy} color={C.white} at={24} size={20} />
            </div>

            <div style={{ transform: `scale(${arrowPop})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <IconArrowRight size={56} color={C.luaBlue} />
              <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: C.slate }}>
                DIBUAT PAKAI
              </span>
            </div>

            <div
              style={{
                width: 340,
                height: 320,
                background: "linear-gradient(145deg, #1E3A8A 0%, #000080 55%, #050929 100%)",
                borderRadius: 28,
                padding: 22,
                boxShadow: "0 26px 52px rgba(0, 0, 128, 0.34)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                transform: `scale(${boxPop * questionPulse})`,
              }}
            >
              <IconHelp size={82} color={C.luaSky} />
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontWeight: 900,
                  fontSize: 38,
                  color: C.white,
                  letterSpacing: "-0.03em",
                }}
              >
                Bahasa <span style={{ color: C.luaSky }}>Apa?</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255,255,255,0.12)",
                  padding: "8px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(219,234,254,0.28)",
                }}
              >
                <IconCode size={22} color={C.luaSky} />
                <span style={{ fontFamily: FONT.mono, fontSize: 20, fontWeight: 700, color: C.white }}>
                  script.lua?
                </span>
              </div>
            </div>
          </div>
        </ExplainCard>

        {/* Sharp square meme stickers (rounded=0) */}
        <MemeSticker
          src="memes/iki_opo.jpg"
          x={205}
          y={1245}
          w={255}
          h={235}
          at={82}
          until={114}
          rotate={-5}
        />
        <MemeSticker
          src="memes/wojak_point.jpg"
          x={875}
          y={1245}
          w={265}
          h={240}
          at={146}
          rotate={4}
        />

        {/* Larger, Context-Reactive Mascot */}
        <DevtrineMascot
          x={mascotX}
          y={jumpUp + hop + Math.sin(frame * 0.16) * 7}
          size={156}
          expression={frame < 114 ? "curious" : "shocked"}
          magnifyingGlass={frame >= 114}
          blink={autoBlink(frame, 8)}
          rotate={flipRot}
          lookX={frame < 114 ? -0.35 : 0.45}
          lookY={-0.35}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={22} color={C.luaIce} max={0.3} />

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
      <Sfx name="what_meme" at={82} volume={0.9} duration={32} />
      <Sfx name="boing" at={146} volume={0.85} />
    </Background>
  );
};
