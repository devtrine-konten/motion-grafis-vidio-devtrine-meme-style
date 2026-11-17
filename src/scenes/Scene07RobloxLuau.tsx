import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, lerp, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconArrowRight, IconCode, IconGamepad, IconTarget } from "../components/Icons";
import { Header, Pill } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

const LUAU_SNIPPET = `local npc = script.Parent; npc:MoveTo(player.Position)`;

export const Scene07RobloxLuau: React.FC = () => {
  const frame = useCurrentFrame();
  const camScale = keys(frame, [0, 80, 140, 264], [1, 1.03, 1.05, 1.02]);
  const typed = LUAU_SNIPPET.slice(0, Math.max(0, Math.floor((frame - 42) * 0.72)));

  // Animated mini NPC chase inside the Roblox Studio explainer card
  const npcProgress = (Math.max(0, frame - 130) % 60) / 60;
  const npcX = lerp(npcProgress, [0, 1], [15, 78]);

  return (
    <Background variant="voxPaper" drift={0.9}>
      <Camera scale={camScale} focusX={540} focusY={720}>
        <Header
          kicker="ROBLOX ENGINE · TURUNAN LUA"
          title="Roblox Pakai Bahasa Luau!"
          highlight={["Roblox", "Bahasa", "Luau!"]}
        />

        <ExplainCard
          at={6}
          w={870}
          h={480}
          y={680}
          bg={C.black}
          accent={C.luaBlue}
          badge="ROBLOX STUDIO + SCRIPT LUAU"
          badgeIcon={<IconCode size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
          dark
          tape
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", height: "100%", justifyContent: "space-between" }}>
            {/* Top Lineage Bar: Lua -> Luau + Roblox Studio Logo */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#121833", padding: "6px 14px", borderRadius: 12, border: `2px solid ${C.luaSky}` }}>
                <Img src={staticFile("image-vidio/lua/lua-logo.svg")} style={{ width: 34, height: 34, objectFit: "contain" }} />
                <span style={{ fontFamily: FONT.mono, fontWeight: 900, fontSize: 22, color: C.white }}>LUA</span>
              </div>
              <IconArrowRight size={28} color={C.yellow} />
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.luaBlue, padding: "6px 14px", borderRadius: 12, border: `2px solid ${C.white}` }}>
                <Img src={staticFile("image-vidio/lua/luau-logo.svg")} style={{ width: 34, height: 34, objectFit: "contain" }} />
                <span style={{ fontFamily: FONT.mono, fontWeight: 900, fontSize: 22, color: C.white }}>LUAU</span>
              </div>
              <Img src={staticFile("image-vidio/lua/roblox-studio-logo.png")} style={{ width: 44, height: 44, objectFit: "contain", marginLeft: 8 }} />
            </div>

            {/* Real Roblox Studio Script Editor Screenshot */}
            <div style={{ width: "100%", height: 195, borderRadius: 14, overflow: "hidden", border: `3px solid ${C.luaSky}`, position: "relative" }}>
              <Img
                src={staticFile("image-vidio/lua/roblox-studio-editor.png")}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "left top" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 8,
                  left: 10,
                  right: 10,
                  background: "rgba(11, 13, 18, 0.92)",
                  border: `2px solid ${C.yellow}`,
                  borderRadius: 10,
                  padding: "6px 12px",
                  fontFamily: FONT.mono,
                  fontSize: 17,
                  fontWeight: 700,
                  color: C.yellow,
                }}
              >
                {typed}
                <span style={{ opacity: frame % 12 < 6 ? 1 : 0 }}>|</span>
              </div>
            </div>

            {/* Feature Pills + Mini NPC Chase Visualizer (at 130..251) */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Pill text="GAMEPLAY" bg={C.luaBlue} color={C.white} at={126} size={17} icon={<IconGamepad size={17} color={C.white} />} />
                <Pill text="NPC AI" bg={C.yellow} color={C.charcoal} at={152} size={17} icon={<IconTarget size={17} color={C.red} />} />
                <Pill text="SISTEM GAME" bg={C.white} color={C.charcoal} at={188} size={17} icon={<IconCode size={17} color={C.luaBlue} />} />
              </div>

              {/* Mini Animated NPC -> Player track */}
              {frame >= 145 && (
                <div
                  style={{
                    width: 170,
                    height: 36,
                    background: "#161B2E",
                    border: `2px solid ${C.luaSky}`,
                    borderRadius: 999,
                    position: "relative",
                    overflow: "hidden",
                    transform: `scale(${spr(frame, 145)})`,
                  }}
                >
                  <div style={{ position: "absolute", left: `${npcX}%`, top: 6, width: 20, height: 20, borderRadius: 4, background: C.red }} />
                  <div style={{ position: "absolute", right: 12, top: 6, width: 20, height: 20, borderRadius: "50%", background: C.luaSky }} />
                </div>
              )}
            </div>
          </div>
        </ExplainCard>

        <MemeSticker
          src="memes/dahsyat.jpg"
          x={680}
          y={1145}
          w={265}
          h={250}
          at={36}
          until={152}
          rotate={-4}
          accent={C.luaBlue}
        />
        <MemeSticker
          src="memes/omg.jpg"
          x={680}
          y={1145}
          w={265}
          h={250}
          at={152}
          rotate={4}
          accent={C.black}
        />

        <DevtrineMascot
          x={205}
          y={1215 + Math.sin(frame * 0.16) * 7}
          size={130}
          expression="amazed"
          headband
          blink={autoBlink(frame, 11)}
          lookX={0.5}
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

      <Sfx name="typing" at={42} volume={0.65} duration={44} />
      <Sfx name="pop" at={126} volume={0.85} />
      <Sfx name="pop" at={152} volume={0.85} />
      <Sfx name="confirm" at={192} volume={0.85} />
    </Background>
  );
};
