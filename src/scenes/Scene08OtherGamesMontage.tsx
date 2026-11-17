import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard, NodeTreeList } from "../components/Explainers";
import { IconGamepad } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

const GAMES = [
  { name: "World of Warcraft", logo: "image-vidio/lua/wow-logo.png", at: 48 },
  { name: "Factorio", logo: "image-vidio/lua/factorio-logo.png", at: 145 },
  { name: "Garry's Mod", logo: "image-vidio/lua/gmod-logo.svg", at: 192 },
  { name: "Angry Birds", logo: "image-vidio/lua/angry-birds-logo.svg", lightBg: true, at: 235 },
];

export const Scene08OtherGamesMontage: React.FC = () => {
  const frame = useCurrentFrame();
  const shk = shake(frame, 48, 12, 8);
  const shk2 = shake(frame, 145, 12, 8);
  const camScale = keys(frame, [0, 48, 145, 235, 296], [1, 1.04, 1.05, 1.03, 1.02]);

  // Mascot grooves side-to-side as games drop in
  const mascotX = keys(frame, [0, 48, 145, 192, 235, 296], [560, 500, 460, 560, 500, 540]);
  const hop =
    (frame >= 48 && frame < 64 ? Math.sin(((frame - 48) / 16) * Math.PI) * -26 : 0) +
    (frame >= 145 && frame < 161 ? Math.sin(((frame - 145) / 16) * Math.PI) * -32 : 0) +
    (frame >= 235 && frame < 251 ? Math.sin(((frame - 235) / 16) * Math.PI) * -28 : 0);

  return (
    <Background variant="dotMatrix" drift={1.1}>
      <Camera scale={camScale} x={shk.x + shk2.x} y={shk.y + shk2.y} focusX={540} focusY={710}>
        <Header
          kicker="BUKAN CUMA ROBLOX!"
          title="Game Legendaris Pakai Lua"
          highlight={["Game", "Legendaris", "Lua"]}
        />

        <ExplainCard
          at={6}
          w={960}
          h={310}
          y={555}
          badge="POWERED BY LUA"
          badgeIcon={<IconGamepad size={18} color={C.charcoal} />}
          watermark="GAME TITANS"
          dark
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, width: "100%", alignItems: "center" }}>
            {GAMES.map((g) => {
              const show = frame >= g.at;
              const pop = spr(frame, g.at, { damping: 11, stiffness: 215 });
              return (
                <div
                  key={g.name}
                  style={{
                    background: g.lightBg ? "#F8FAFC" : "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(219,234,254,0.28)",
                    borderRadius: 20,
                    padding: "16px 12px",
                    height: 185,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transform: `scale(${show ? pop : 0.86})`,
                    opacity: show ? 1 : 0.2,
                    boxShadow: show ? "0 14px 28px rgba(0,0,0,0.22)" : "none",
                  }}
                >
                  <Img src={staticFile(g.logo)} style={{ width: "88%", height: 96, objectFit: "contain" }} />
                  <div
                    style={{
                      fontFamily: FONT.sans,
                      fontWeight: 800,
                      fontSize: 17,
                      color: g.lightBg ? C.charcoal : C.white,
                      textAlign: "center",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                    }}
                  >
                    {g.name}
                  </div>
                </div>
              );
            })}
          </div>
        </ExplainCard>

        <NodeTreeList
          x={135}
          y={750}
          items={[
            { label: "World of Warcraft", sub: "add-on & custom UI", at: 48 },
            { label: "Factorio", sub: "automation scripting", at: 145 },
            { label: "Garry's Mod", sub: "sandbox modding", at: 192 },
            { label: "Angry Birds", sub: "physics engine levels", at: 235, highlight: true },
          ]}
        />

        <MemeSticker src="memes/shocked_pikachu.jpg" x={205} y={1245} w={250} h={230} at={14} until={46} rotate={-5} />
        <MemeSticker src="memes/edan.jpg" x={875} y={1245} w={255} h={235} at={145} rotate={4} />

        <DevtrineMascot
          x={mascotX}
          y={1245 + hop + Math.sin(frame * 0.18) * 7}
          size={156}
          expression={frame >= 145 ? "cool" : "happy"}
          sunglasses={frame >= 145}
          blink={autoBlink(frame, 7)}
          rotate={Math.sin(frame * 0.16) * 5}
          lookX={0.2}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Subtitles
        cues={[
          { from: 11, to: 42, text: "Bukan cuma Roblox!", hi: ["Bukan", "Roblox!"] },
          { from: 47, to: 138, text: "World of Warcraft menggunakan Lua untuk add-on,", hi: ["World", "Warcraft", "add-on,"] },
          { from: 143, to: 288, text: "sementara Factorio dan Garry's Mod juga memanfaatkannya untuk scripting dan modifikasi.", hi: ["Factorio", "Garry's", "Mod", "scripting"] },
        ]}
      />

      <Sfx name="what_meme" at={14} volume={0.85} duration={32} />
      <Sfx name="pop" at={48} volume={0.85} />
      <Sfx name="pop" at={145} volume={0.85} />
      <Sfx name="pop" at={192} volume={0.85} />
      <Sfx name="ka_ching" at={235} volume={0.85} duration={24} />
    </Background>
  );
};
