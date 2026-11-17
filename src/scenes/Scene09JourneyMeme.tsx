import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, lerp, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard, MiniCharacter } from "../components/Explainers";
import { IconTarget, IconWrench } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

export const Scene09JourneyMeme: React.FC = () => {
  const frame = useCurrentFrame();
  const camScale = keys(frame, [0, 80, 140, 204], [1, 1.04, 1.05, 1.02]);

  const progress = lerp(frame, [24, 118], [0, 1]);
  const chaseX = lerp(frame, [45, 140], [50, 620]);
  const isChasing = frame >= 45 && frame < 136;

  // Mascot actively runs back & forth in panic during chase, then lands laughing at center!
  const mascotX = isChasing
    ? 540 + Math.sin((frame - 45) * 0.22) * 145
    : lerp(frame, [136, 154], [540 + Math.sin(91 * 0.22) * 145, 540]);
  const mascotHop = isChasing ? Math.abs(Math.sin(frame * 0.65)) * -24 : Math.sin(frame * 0.16) * 6;

  return (
    <Background variant="voxPaper" drift={1.0} watermark="93" polaroidMeme="memes/hontoni.jpg">
      <Camera scale={camScale} focusX={540} focusY={725}>
        <Header
          kicker="PLOT TWIST PERJALANAN"
          title="Jauh Juga Perjalanan Si Lua!"
          highlight={["Jauh", "Perjalanan", "Lua!"]}
        />

        <ExplainCard
          at={6}
          w={960}
          h={630}
          y={725}
          badge="TIMELINE EVOLUSI · 1993 -> KINI"
          badgeIcon={<IconTarget size={18} color={C.charcoal} />}
          tape
        >
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "96%", position: "relative" }}>
              <div
                style={{
                  width: 270,
                  background: "#FFFFFF",
                  border: "1px solid rgba(0,0,128,0.16)",
                  borderRadius: 20,
                  padding: "18px 16px",
                  boxShadow: "0 14px 28px rgba(5,9,41,0.10)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  transform: `scale(${spr(frame, 16)})`,
                }}
              >
                <IconWrench size={46} color={C.luaNavy} />
                <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: C.luaBlue }}>
                  1993 · ORIGIN
                </div>
                <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 25, color: C.charcoal, textAlign: "center" }}>
                  Proyek Teknik
                </div>
              </div>

              <div style={{ flex: 1, height: 10, margin: "0 18px", background: "rgba(0,0,128,0.12)", borderRadius: 999, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${progress * 100}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${C.luaNavy} 0%, ${C.luaBlue} 60%, ${C.red} 100%)`,
                  }}
                />
              </div>

              <div
                style={{
                  width: 290,
                  background: "linear-gradient(145deg, #1E3A8A 0%, #000080 55%, #050929 100%)",
                  borderRadius: 20,
                  padding: "18px 16px",
                  boxShadow: "0 18px 36px rgba(0,0,128,0.28)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  transform: `scale(${spr(frame, 72)})`,
                }}
              >
                <IconTarget size={46} color={C.red} />
                <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: C.luaSky }}>
                  SEKARANG
                </div>
                <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 25, color: C.white, textAlign: "center" }}>
                  NPC Ngejar Player!
                </div>
              </div>
            </div>

            {/* Animated Character Chase Stage (NPC Character chasing Roblox Noob Player!) */}
            <div
              style={{
                width: "96%",
                height: 175,
                background: "linear-gradient(180deg, #091342 0%, #050929 72%, #1E293B 72%, #0F172A 100%)",
                borderRadius: 24,
                border: "1.5px solid rgba(96,165,250,0.3)",
                boxShadow: "0 20px 40px rgba(5,9,41,0.24)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Motion speed lines */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "repeating-linear-gradient(90deg, rgba(96,165,250,0.12) 0px, rgba(96,165,250,0.12) 24px, transparent 24px, transparent 60px)",
                  backgroundPosition: `${-frame * 12}px 0`,
                }}
              />
              {/* Angry Red NPC Bot Character */}
              <MiniCharacter kind="npc" x={chaseX} y={100} scale={1.05} running frame={frame} />
              {/* Running Roblox Noob Player Character */}
              <MiniCharacter kind="player" x={chaseX + 165} y={96} scale={1.15} running frame={frame} />
            </div>
          </div>
        </ExplainCard>

        <MemeSticker src="memes/ngejar_deadline.jpg" x={875} y={1245} w={265} h={235} at={54} rotate={4} />
        <MemeSticker src="memes/trauma_berat.jpg" x={205} y={1245} w={250} h={230} at={132} until={164} rotate={-5} />

        <DevtrineMascot
          x={mascotX}
          y={1245 + mascotHop}
          size={156}
          expression={isChasing ? "panic" : "laughing"}
          sweat={isChasing ? 1 : 0}
          tears={frame >= 136 ? 1 : 0}
          blink={autoBlink(frame, 15)}
          rotate={isChasing ? Math.sin(frame * 0.5) * 10 : Math.sin(frame * 0.2) * 4}
          lookX={isChasing ? (Math.cos((frame - 45) * 0.22) >= 0 ? 0.5 : -0.5) : 0}
          lookY={-0.25}
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
      <Sfx name="funny_fail" at={132} volume={0.85} duration={22} />
      <Sfx name="meme_haha" at={172} volume={0.8} duration={30} />
    </Background>
  );
};
