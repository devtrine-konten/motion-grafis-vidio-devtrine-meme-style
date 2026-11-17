import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconGamepad } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

const GAMES = [
  {
    name: "World of Warcraft",
    tag: "ADD-ON & UI",
    logo: "image-vidio/lua/wow-logo.png",
    bg: "#101830",
    at: 48,
    accent: C.yellow,
  },
  {
    name: "Factorio",
    tag: "SCRIPTING",
    logo: "image-vidio/lua/factorio-logo.png",
    bg: "#1A1410",
    at: 145,
    accent: C.luaSky,
  },
  {
    name: "Garry's Mod",
    tag: "MODIFIKASI",
    logo: "image-vidio/lua/gmod-logo.svg",
    bg: "#0F1B38",
    at: 192,
    accent: C.luaBlue,
  },
  {
    name: "Angry Birds",
    tag: "GAME ENGINE",
    logo: "image-vidio/lua/angry-birds-logo.svg",
    bg: C.paper,
    darkText: true,
    at: 235,
    accent: C.red,
  },
];

export const Scene08OtherGamesMontage: React.FC = () => {
  const frame = useCurrentFrame();
  const shk = shake(frame, 48, 12, 8);
  const shk2 = shake(frame, 145, 12, 8);
  const camScale = keys(frame, [0, 48, 145, 235, 296], [1, 1.04, 1.05, 1.03, 1.02]);

  return (
    <Background variant="noir" drift={1.1}>
      <Camera scale={camScale} x={shk.x + shk2.x} y={shk.y + shk2.y} focusX={540} focusY={700}>
        <Header
          kicker="BUKAN CUMA ROBLOX!"
          title="Game Legendaris Pakai Lua"
          highlight={["Game", "Legendaris", "Lua"]}
          tone="dark"
        />

        <ExplainCard
          at={6}
          w={870}
          h={480}
          y={680}
          bg="#0E121D"
          accent={C.luaSky}
          badge="GAME MONTAGE · POWERED BY LUA"
          badgeIcon={<IconGamepad size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
          dark
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              width: "100%",
              height: "100%",
            }}
          >
            {GAMES.map((g, i) => {
              const show = frame >= g.at;
              const pop = spr(frame, g.at, { damping: 10, stiffness: 220 });
              return (
                <div
                  key={g.name}
                  style={{
                    background: g.bg,
                    border: `4px solid ${show ? g.accent : "#262B3A"}`,
                    borderRadius: 18,
                    padding: "12px 14px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transform: `scale(${show ? pop : 0.85}) rotate(${show ? (i % 2 === 0 ? -1 : 1) : 0}deg)`,
                    opacity: show ? 1 : 0.16,
                  }}
                >
                  <div
                    style={{
                      background: g.accent,
                      color: g.accent === C.red ? C.white : C.charcoal,
                      fontFamily: FONT.mono,
                      fontWeight: 900,
                      fontSize: 15,
                      padding: "3px 12px",
                      borderRadius: 999,
                      border: `2px solid ${C.black}`,
                    }}
                  >
                    {g.tag}
                  </div>
                  <Img
                    src={staticFile(g.logo)}
                    style={{ width: "86%", height: 92, objectFit: "contain" }}
                  />
                  <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 20, color: (g as { darkText?: boolean }).darkText ? C.charcoal : C.white }}>
                    {g.name}
                  </div>
                </div>
              );
            })}
          </div>
        </ExplainCard>

        <MemeSticker
          src="memes/shocked_pikachu.jpg"
          x={680}
          y={1145}
          w={265}
          h={245}
          at={18}
          until={145}
          rotate={-4}
          accent={C.yellow}
        />
        <MemeSticker
          src="memes/edan.jpg"
          x={680}
          y={1145}
          w={265}
          h={250}
          at={145}
          rotate={4}
          accent={C.luaSky}
        />

        <DevtrineMascot
          x={205}
          y={1215 + Math.sin(frame * 0.18) * 8}
          size={130}
          expression={frame >= 145 ? "cool" : "happy"}
          sunglasses={frame >= 145}
          blink={autoBlink(frame, 7)}
          lookX={0.5}
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

      <Sfx name="pop" at={48} volume={0.85} />
      <Sfx name="pop" at={145} volume={0.85} />
      <Sfx name="pop" at={192} volume={0.85} />
      <Sfx name="ka_ching" at={235} volume={0.8} />
    </Background>
  );
};
