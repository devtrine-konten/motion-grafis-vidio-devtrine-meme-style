import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, lerp, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconTarget, IconUser, IconWrench } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

export const Scene09JourneyMeme: React.FC = () => {
  const frame = useCurrentFrame();
  const camScale = keys(frame, [0, 80, 140, 204], [1, 1.04, 1.05, 1.02]);

  const progress = lerp(frame, [24, 118], [0, 1]);
  const chaseX = lerp(frame, [62, 130], [-40, 380]);
  const isChasing = frame >= 60 && frame < 132;

  return (
    <Background variant="voxPaper" drift={1.0}>
      <Camera scale={camScale} focusX={540} focusY={700}>
        <Header
          kicker="PLOT TWIST PERJALANAN"
          title="Jauh Juga Perjalanan Si Lua!"
          highlight={["Jauh", "Perjalanan", "Lua!"]}
        />

        <ExplainCard
          at={6}
          w={870}
          h={455}
          y={675}
          bg={C.white}
          accent={C.luaNavy}
          badge="TIMELINE EVOLUSI · 1993 -> KINI"
          badgeIcon={<IconTarget size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
          tape
        >
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 28, alignItems: "center" }}>
            {/* Top Timeline Nodes: 1993 Teknik ---> Sekarang NPC Ngejar Player */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "96%", position: "relative" }}>
              <div
                style={{
                  width: 235,
                  background: C.paper,
                  border: `4px solid ${C.charcoal}`,
                  borderRadius: 18,
                  padding: "14px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  transform: `scale(${spr(frame, 16)})`,
                }}
              >
                <IconWrench size={44} color={C.luaNavy} />
                <div style={{ fontFamily: FONT.mono, fontWeight: 900, fontSize: 18, color: C.luaBlue }}>1993</div>
                <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 22, color: C.charcoal, textAlign: "center" }}>
                  Proyek Teknik
                </div>
              </div>

              {/* Growing Vox Dotted Line */}
              <div style={{ flex: 1, height: 8, margin: "0 12px", background: C.paperGrid, borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${progress * 100}%`, height: "100%", background: C.luaBlue }} />
              </div>

              <div
                style={{
                  width: 255,
                  background: C.black,
                  border: `4px solid ${C.luaSky}`,
                  borderRadius: 18,
                  padding: "14px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  transform: `scale(${spr(frame, 75)})`,
                }}
              >
                <IconTarget size={44} color={C.red} />
                <div style={{ fontFamily: FONT.mono, fontWeight: 900, fontSize: 18, color: C.yellow }}>SEKARANG</div>
                <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 22, color: C.white, textAlign: "center" }}>
                  NPC Ngejar Player!
                </div>
              </div>
            </div>

            {/* Animated Mini Chase Track */}
            <div
              style={{
                width: "92%",
                height: 82,
                background: C.black,
                borderRadius: 18,
                border: `4px solid ${C.charcoal}`,
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ position: "absolute", left: chaseX, display: "flex", alignItems: "center", gap: 6, background: C.red, padding: "6px 12px", borderRadius: 12 }}>
                <IconTarget size={26} color={C.white} />
                <span style={{ fontFamily: FONT.mono, fontWeight: 900, fontSize: 18, color: C.white }}>NPC</span>
              </div>
              <div style={{ position: "absolute", left: chaseX + 165, display: "flex", alignItems: "center", gap: 6, background: C.luaSky, padding: "6px 12px", borderRadius: 12 }}>
                <IconUser size={26} color={C.charcoal} />
                <span style={{ fontFamily: FONT.mono, fontWeight: 900, fontSize: 18, color: C.charcoal }}>PLAYER</span>
              </div>
            </div>
          </div>
        </ExplainCard>

        <MemeSticker
          src="memes/ngejar_deadline.jpg"
          x={680}
          y={1145}
          w={295}
          h={260}
          at={58}
          rotate={3}
          accent={C.red}
        />

        <DevtrineMascot
          x={205}
          y={1215 + (isChasing ? Math.abs(Math.sin(frame * 0.6)) * -20 : Math.sin(frame * 0.16) * 7)}
          size={130}
          expression={isChasing ? "panic" : "laughing"}
          tears={frame >= 132 ? 1 : 0}
          blink={autoBlink(frame, 15)}
          lookX={0.5}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Subtitles
        cues={[
          { from: 24, to: 122, text: "Dari proyek teknik sampai bikin NPC ngejar player.", hi: ["proyek", "teknik", "NPC", "ngejar"] },
          { from: 129, to: 196, text: "Jauh juga perjalanan si Lua!", hi: ["Jauh", "perjalanan", "Lua!"] },
        ]}
      />

      <Sfx name="running" at={60} volume={0.75} duration={54} />
      <Sfx name="meme_haha" at={176} volume={0.75} duration={26} />
    </Background>
  );
};
