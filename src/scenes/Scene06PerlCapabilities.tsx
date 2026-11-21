import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconCode, IconFile, IconGlobe, IconTerminal } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

export const Scene06PerlCapabilities: React.FC = () => {
  const frame = useCurrentFrame();
  const camScale = keys(frame, [0, 65, 101, 140, 183], [1, 1.03, 1.04, 1.05, 1.02]);

  const mascotX = keys(frame, [0, 65, 101, 140, 183], [540, 600, 480, 520, 540]);
  const hop =
    (frame >= 65 && frame < 81 ? Math.sin(((frame - 65) / 16) * Math.PI) * -26 : 0) +
    (frame >= 101 && frame < 117 ? Math.sin(((frame - 101) / 16) * Math.PI) * -28 : 0) +
    (frame >= 140 && frame < 156 ? Math.sin(((frame - 140) / 16) * Math.PI) * -30 : 0);

  const PILLARS = [
    { name: "Olah Teks", at: 6, icon: <IconFile size={68} color={C.perlSky} /> },
    { name: "Otomatisasi", at: 65, icon: <IconCode size={68} color={C.camelGold} /> },
    { name: "Sysadmin", at: 101, icon: <IconTerminal size={68} color={C.perlSky} /> },
    { name: "Website", at: 140, icon: <IconGlobe size={68} color={C.camelGold} />, gold: true },
  ];

  return (
    <Background variant="dotMatrix" drift={1.0}>
      <Camera scale={camScale} focusX={540} focusY={725}>
        <Header
          title="4 Fungsi Utama Perl"
          highlight={["4", "Fungsi", "Perl"]}
        />

        <ExplainCard at={4} w={960} h={610} y={725} dark>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, width: "100%", height: "100%" }}>
            {PILLARS.map((p) => {
              const show = frame >= p.at;
              const pop = spr(frame, p.at, { damping: 11, stiffness: 215 });
              return (
                <div
                  key={p.name}
                  style={{
                    background: p.gold && show ? "rgba(245, 158, 11, 0.22)" : "rgba(255, 255, 255, 0.10)",
                    border: p.gold && show ? `3px solid ${C.camelGold}` : "2px solid rgba(56, 189, 248, 0.30)",
                    borderRadius: 26,
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 16,
                    transform: `scale(${show ? pop : 0.86})`,
                    opacity: show ? 1 : 0.22,
                    boxShadow: show ? "0 16px 32px rgba(0,0,0,0.28)" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 112,
                      height: 112,
                      borderRadius: 26,
                      background: "rgba(4, 21, 39, 0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {p.icon}
                  </div>
                  <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 36, color: C.white, letterSpacing: "-0.02em" }}>
                    {p.name}
                  </div>
                </div>
              );
            })}
          </div>
        </ExplainCard>

        <MemeSticker src="memes/fungsi.jpg" x={225} y={1345} w={250} h={250} at={12} until={100} rotate={-5} />
        <MemeSticker src="memes/well_well.jpg" x={875} y={1245} w={260} h={235} at={101} rotate={4} />

        <DevtrineMascot
          x={mascotX}
          y={1245 + hop + Math.sin(frame * 0.16) * 6}
          size={156}
          expression={
            frame < 65
              ? "curious"
              : frame < 101
                ? "happy"
                : frame < 140
                  ? "salute"
                  : "amazed"
          }
          magnifyingGlass={frame < 65}
          headband={frame >= 65 && frame < 101}
          helmet={frame >= 101 && frame < 140}
          shield={frame >= 101 && frame < 140}
          blush={frame >= 140}
          blink={autoBlink(frame, 12)}
          rotate={Math.sin(frame * 0.14) * 5}
          lookX={frame < 65 || (frame >= 101 && frame < 140) ? -0.35 : 0.35}
          lookY={frame < 101 ? -0.42 : -0.22}
          frame={frame}
          shadow
        />
      </Camera>

      <Subtitles
        cues={[
          { from: 5, to: 60, text: "Perl dirancang untuk mengolah teks,", hi: ["mengolah", "teks,"] },
          { from: 65, to: 96, text: "otomatisasi,", hi: ["otomatisasi,"] },
          { from: 101, to: 136, text: "administrasi sistem,", hi: ["administrasi", "sistem,"] },
          { from: 140, to: 176, text: "sampai pengembangan website.", hi: ["pengembangan", "website."] },
        ]}
      />

      <Sfx name="pop" at={8} volume={0.85} />
      <Sfx name="pop" at={65} volume={0.85} />
      <Sfx name="pop" at={101} volume={0.85} />
      <Sfx name="confirm" at={140} volume={0.9} />
    </Background>
  );
};
