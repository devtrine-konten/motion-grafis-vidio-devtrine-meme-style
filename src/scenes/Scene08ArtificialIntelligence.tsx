import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, lerp, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconRocket, IconServer, IconTerminal, IconTrendUp, IconWrench } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

const USE_CASES = [
  { Icon: IconTerminal, title: "Sistem Operasi", sub: "Kernel & Driver", bg: C.cyanLight, at: 116 },
  { Icon: IconWrench, title: "Tools & CLI", sub: "Cepat & Ringan", bg: C.green, at: 168 },
  { Icon: IconServer, title: "Server Backend", sub: "Tahan Beban Berat", bg: C.yellow, at: 192 },
  { Icon: IconRocket, title: "High-Perf App", sub: "Game & Browser", bg: "#FF6B35", at: 218, lightText: true },
];

const BARS = [
  { label: "2018", h: 85, at: 20 },
  { label: "2020", h: 140, at: 32 },
  { label: "2022", h: 195, at: 44 },
  { label: "KINI", h: 245, at: 56 },
];

export const Scene08ArtificialIntelligence: React.FC = () => {
  const frame = useCurrentFrame();
  const isUseCases = frame >= 112;
  const camScale = keys(frame, [0, 112, 200, 279], [1, 1.03, 1.05, 1.02]);

  return (
    <Background variant="dark" drift={1.0}>
      <Camera scale={camScale} focusX={540} focusY={860}>
        <Header
          kicker="KEGUNAAN RUST"
          title={isUseCases ? "OS, Tools, Server & High-Perf!" : "Mulai Dilirik Banyak Developer!"}
          highlight={isUseCases ? ["OS,", "Tools,", "Server"] : ["Dilirik", "Developer!"]}
          tone="dark"
        />

        {/* Beat 1 (8..112): Rising Developer Adoption Chart */}
        <ExplainCard
          at={8}
          until={112}
          w={840}
          h={435}
          y={670}
          bg="#16212E"
          accent={C.cyan}
          badge="TREN DEVELOPER"
          badgeIcon={<IconTrendUp size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
          dark
        >
          <div style={{ display: "flex", alignItems: "flex-end", gap: 40, height: 275, paddingBottom: 8 }}>
            {BARS.map((b, idx) => {
              const barH = lerp(frame, [b.at, b.at + 20], [0, b.h]);
              const isLast = idx === BARS.length - 1;
              return (
                <div key={b.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 92,
                      height: barH,
                      background: isLast ? "#FF6B35" : C.cyanLight,
                      border: `4px solid ${C.white}`,
                      borderRadius: "16px 16px 6px 6px",
                    }}
                  />
                  <div style={{ fontFamily: FONT.mono, fontWeight: 900, fontSize: 22, color: isLast ? C.yellow : C.white }}>
                    {b.label}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, color: C.green, marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
            <IconTrendUp size={24} color={C.green} />
            <span>Semakin Banyak Tim Migrasi ke Rust!</span>
          </div>
        </ExplainCard>

        {/* Beat 2 (112..279): 4-Card Use Case Showcase with SVG Icons */}
        <ExplainCard
          at={112}
          w={840}
          h={440}
          y={670}
          bg="#16212E"
          accent="#FF6B35"
          badge="DIPAKAI UNTUK MEMBUAT:"
          badgeIcon={<IconRocket size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
          dark
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, width: "100%" }}>
            {USE_CASES.map((u) => {
              const s = spr(frame, u.at, { damping: 11, stiffness: 200 });
              const txtCol = u.lightText ? C.white : C.charcoal;
              const IconComp = u.Icon;
              return (
                <div
                  key={u.title}
                  style={{
                    background: u.bg,
                    border: `4px solid ${C.charcoal}`,
                    borderRadius: 22,
                    padding: "18px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    transform: `scale(${s})`,
                    opacity: frame >= u.at ? 1 : 0,
                  }}
                >
                  <IconComp size={44} color={txtCol} />
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 24, color: txtCol, lineHeight: 1.1 }}>
                      {u.title}
                    </div>
                    <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 16, color: txtCol, opacity: 0.85, marginTop: 4 }}>
                      {u.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ExplainCard>

        {/* Bottom Meme Reactions synced to VO beats */}
        <MemeSticker
          src="memes/menggoda.jpg"
          x={555}
          y={1145}
          w={265}
          h={245}
          at={18}
          until={66}
          rotate={-4}
          accent={C.cyan}
        />
        <MemeSticker
          src="memes/towewew.jpg"
          x={805}
          y={1145}
          w={265}
          h={245}
          at={64}
          until={112}
          rotate={4}
          accent={C.yellow}
        />
        <MemeSticker
          src="memes/well_well.jpg"
          x={555}
          y={1145}
          w={265}
          h={245}
          at={166}
          until={218}
          rotate={-4}
          accent={C.green}
        />
        <MemeSticker
          src="memes/edan.jpg"
          x={805}
          y={1145}
          w={265}
          h={245}
          at={216}
          rotate={4}
          accent="#FF6B35"
        />

        <DevtrineMascot
          x={205}
          y={1215 + Math.sin(frame * 0.16) * 7}
          size={130}
          expression={isUseCases ? "proud" : "amazed"}
          headband={isUseCases}
          blush={isUseCases}
          blink={autoBlink(frame, 12)}
          lookX={0.5}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={112} color={C.cyanLight} max={0.25} />

      <Subtitles
        cues={[
          { from: 7, to: 112, text: "Makanya, Rust mulai dilirik banyak developer", hi: ["Rust", "dilirik", "developer"] },
          { from: 112, to: 168, text: "untuk bikin sistem operasi,", hi: ["sistem", "operasi,"] },
          { from: 168, to: 272, text: "tools, server, sampai software berperforma tinggi.", hi: ["tools,", "server,", "berperforma", "tinggi."] },
        ]}
      />

      <Sfx name="sus" at={18} volume={0.85} duration={18} />
      <Sfx name="vine_boom" at={112} volume={0.9} duration={20} />
      <Sfx name="meme_bonk" at={166} volume={0.85} duration={16} />
      <Sfx name="goofy_horn" at={216} volume={0.9} duration={20} />
    </Background>
  );
};
