import React from "react";
import { Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, lerp, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard, MiniCharacter } from "../components/Explainers";
import { IconArrowRight, IconCode, IconGamepad, IconTarget } from "../components/Icons";
import { Header, Pill } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

export const Scene07RobloxLuau: React.FC = () => {
  const frame = useCurrentFrame();
  const camScale = keys(frame, [0, 80, 140, 264], [1, 1.03, 1.05, 1.02]);

  const npcProgress = (Math.max(0, frame - 130) % 60) / 60;
  const npcX = lerp(npcProgress, [0, 1], [35, 165]);

  // Dynamic Mascot position reacting to Luau beats
  const mascotX = keys(frame, [0, 36, 126, 152, 192, 264], [540, 610, 560, 480, 520, 540]);
  const hop =
    (frame >= 152 && frame < 168 ? Math.sin(((frame - 152) / 16) * Math.PI) * -28 : 0) +
    (frame >= 192 && frame < 208 ? Math.sin(((frame - 192) / 16) * Math.PI) * -28 : 0);

  return (
    <Background variant="voxPaper" drift={0.9} watermark="LUAU" polaroidMeme="memes/mode_on.jpg">
      <Camera scale={camScale} focusX={540} focusY={725}>
        <Header
          title="Roblox Pakai Bahasa Luau!"
          highlight={["Roblox", "Bahasa", "Luau!"]}
        />

        <ExplainCard
          at={6}
          w={960}
          h={660}
          y={725}
          badge="ROBLOX STUDIO · LUAU"
          badgeIcon={<IconCode size={18} color={C.charcoal} />}
          tape
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", height: "100%", paddingTop: 18, justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22, flexShrink: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: C.white,
                  padding: "8px 20px",
                  borderRadius: 14,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(0,0,128,0.14)",
                }}
              >
                <Img src={staticFile("image-vidio/lua/lua-logo.svg")} style={{ width: 38, height: 38, objectFit: "contain" }} />
                <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 25, color: C.luaNavy }}>Lua</span>
              </div>
              <IconArrowRight size={32} color={C.luaBlue} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "linear-gradient(135deg, #1E3A8A 0%, #000080 100%)",
                  padding: "8px 22px",
                  borderRadius: 14,
                  boxShadow: "0 12px 26px rgba(0, 0, 128, 0.28)",
                }}
              >
                <Img src={staticFile("image-vidio/lua/luau-logo.svg")} style={{ width: 38, height: 38, objectFit: "contain" }} />
                <span style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 26, color: C.white }}>
                  Luau
                </span>
              </div>
              <Img
                src={staticFile("image-vidio/lua/roblox-studio-logo.png")}
                style={{ width: 50, height: 50, objectFit: "contain", marginLeft: 8, filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.18))" }}
              />
            </div>

            <div
              style={{
                width: "100%",
                height: 365,
                flexShrink: 0,
                borderRadius: 16,
                overflow: "hidden",
                background: "#1E1E1E",
                border: "1.5px solid rgba(0,0,128,0.18)",
                boxShadow: "0 18px 36px rgba(5,9,41,0.16)",
                position: "relative",
              }}
            >
              <Sequence from={6} layout="none">
                <OffthreadVideo
                  src={staticFile("video/lua-coding.mp4")}
                  muted
                  playbackRate={1.32}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    // objectPosition: "center 80%",
                  }}
                />
              </Sequence>
              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 12,
                  background: "rgba(5, 9, 41, 0.86)",
                  border: "1px solid rgba(96, 165, 250, 0.38)",
                  borderRadius: 999,
                  padding: "5px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: FONT.mono,
                  fontSize: 15,
                  fontWeight: 700,
                  color: C.white,
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.35)",
                  zIndex: 5,
                }}
              >
                <span style={{ opacity: 0.78 }}>Sumber:</span>
                <span style={{ color: C.luaSky }}>TikTok @steasdarcinn</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Pill text="Gameplay" bg={C.luaNavy} color={C.white} at={126} size={19} icon={<IconGamepad size={19} color={C.luaSky} />} />
                <Pill text="NPC AI" bg={C.luaBlue} color={C.white} at={152} size={19} icon={<IconTarget size={19} color={C.white} />} />
                <Pill text="Sistem Game" bg={C.charcoal} color={C.white} at={188} size={19} icon={<IconCode size={19} color={C.luaSky} />} />
              </div>

              {/* Mini Animated Character Chase (NPC Bot vs Roblox Noob Player!) */}
              {frame >= 145 && (
                <div
                  style={{
                    width: 245,
                    height: 64,
                    background: C.luaDeep,
                    borderRadius: 16,
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.4)",
                    transform: `scale(${spr(frame, 145)})`,
                  }}
                >
                  <MiniCharacter kind="npc" x={npcX} y={36} scale={0.44} running frame={frame} />
                  <MiniCharacter kind="player" x={npcX + 52} y={34} scale={0.5} running frame={frame} />
                </div>
              )}
            </div>
          </div>
        </ExplainCard>

        <MemeSticker src="memes/ceval.jpg" x={205} y={1245} w={250} h={230} at={36} until={152} rotate={-5} />
        <MemeSticker src="memes/walawe.jpg" x={875} y={1245} w={280} h={280} at={152} until={184} rotate={5} />
        <MemeSticker src="memes/reaksi_gue.jpg" x={875} y={1245} w={255} h={235} at={192} rotate={4} />

        <DevtrineMascot
          x={mascotX}
          y={1245 + hop + Math.sin(frame * 0.16) * 6}
          size={156}
          expression="amazed"
          headband
          blink={autoBlink(frame, 11)}
          rotate={Math.sin(frame * 0.14) * 5}
          lookX={frame < 152 ? -0.3 : 0.3}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Subtitles
        cues={[
          { from: 11, to: 124, text: "Roblox menggunakan bahasa turunan Lua bernama Luau", hi: ["Roblox", "turunan", "Luau"] },
          { from: 128, to: 193, text: "buat mengatur gameplay, NPC,", hi: ["gameplay,", "NPC,"] },
          { from: 197, to: 254, text: "dan sistem game di Roblox Studio.", hi: ["sistem", "Roblox", "Studio."] },
        ]}
      />

      <Sfx name="typing" at={14} volume={0.65} duration={65} />
      <Sfx name="pop" at={126} volume={0.85} />
      <Sfx name="meme_wow" at={152} volume={0.75} duration={36} />
      <Sfx name="confirm" at={192} volume={0.85} />
    </Background>
  );
};
