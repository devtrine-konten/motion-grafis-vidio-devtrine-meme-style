import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, lerp, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard, MiniCharacter } from "../components/Explainers";
import { IconFile, IconWrench, IconXCircle } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

const TEXT_FILES = [
  { name: "report.txt", at: 16, rot: -4 },
  { name: "data.log", at: 34, rot: 3 },
  { name: "server.txt", at: 52, rot: -2 },
];

const OLD_TOOLS = [
  { cmd: "sed", load: 92, at: 106 },
  { cmd: "awk", load: 88, at: 122 },
  { cmd: "sh", load: 96, at: 138 },
];

export const Scene03TextReportProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const isToolsBeat = frame >= 104;

  const shk = shake(frame, 104, 15, 9);
  const camScale = keys(frame, [0, 52, 104, 150, 209], [1, 1.03, 1.06, 1.03, 1.02]);

  const mascotX = keys(frame, [0, 52, 104, 160, 209], [540, 610, 465, 510, 540]);
  const jitter = frame >= 104 ? Math.sin(frame * 0.55) * 6 : Math.sin(frame * 0.16) * 5;

  return (
    <Background variant="voxPaper" drift={1.0}>
      <Camera scale={camScale} x={shk.x} y={shk.y} focusX={540} focusY={725}>
        <Header
          title="Ribet Olah Teks & Laporan!"
          highlight={["Ribet", "Teks", "Laporan!"]}
        />

        <ExplainCard at={4} w={960} h={610} y={725} tape>
          <div style={{ display: "flex", alignItems: "stretch", justifyContent: "space-between", width: "100%", gap: 24, height: "100%" }}>
            {/* Left: Visual Stack of Text Files + Stressed Coder */}
            <div
              style={{
                width: 420,
                background: "#FFFFFF",
                border: "2px solid rgba(0, 115, 161, 0.20)",
                borderRadius: 24,
                padding: 22,
                boxShadow: "0 16px 34px rgba(4, 21, 39, 0.10)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
                {TEXT_FILES.map((f) => {
                  const pop = spr(frame, f.at, { damping: 11, stiffness: 210 });
                  return (
                    <div
                      key={f.name}
                      style={{
                        background: C.paper,
                        border: "2px solid rgba(0, 115, 161, 0.22)",
                        borderRadius: 16,
                        padding: "14px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        transform: `scale(${frame >= f.at ? pop : 0}) rotate(${f.rot}deg)`,
                      }}
                    >
                      <IconFile size={36} color={C.perlTeal} />
                      <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 26, color: C.charcoal }}>
                        {f.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{ position: "relative", width: "100%", height: 140 }}>
                <MiniCharacter kind="coder" x={190} y={85} scale={1.15} running={isToolsBeat} frame={frame} />
              </div>
            </div>

            {/* Right: Old Tools Overloading Visual Meters */}
            <div
              style={{
                flex: 1,
                background: C.perlDeep,
                border: "2px solid rgba(56, 189, 248, 0.3)",
                borderRadius: 24,
                padding: 24,
                boxShadow: "0 20px 42px rgba(4, 21, 39, 0.28)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconWrench size={54} color={C.camelGold} />

              <div style={{ display: "flex", flexDirection: "column", gap: 18, width: "100%" }}>
                {OLD_TOOLS.map((t) => {
                  const show = frame >= t.at;
                  const p = spr(frame, t.at, { damping: 12, stiffness: 200 });
                  const fillW = lerp(frame, [t.at, t.at + 24], [0, t.load]);
                  return (
                    <div
                      key={t.cmd}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        transform: `scale(${show ? p : 0.9})`,
                        opacity: show ? 1 : 0.25,
                      }}
                    >
                      <span style={{ fontFamily: FONT.mono, fontWeight: 900, fontSize: 28, color: C.camelGold, width: 75 }}>
                        {t.cmd}
                      </span>
                      <div style={{ flex: 1, height: 22, background: "rgba(255,255,255,0.12)", borderRadius: 999, overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${show ? fillW : 15}%`,
                            height: "100%",
                            background: C.red,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  transform: `scale(${frame >= 145 ? spr(frame, 145) : 0.85})`,
                  opacity: frame >= 145 ? 1 : 0.25,
                }}
              >
                <IconXCircle size={74} color={C.red} />
              </div>
            </div>
          </div>
        </ExplainCard>

        <MemeSticker src="memes/yare_yare.jpg" x={205} y={1245} w={255} h={250} at={22} until={103} rotate={-5} />
        <MemeSticker src="memes/sing_sabar.jpg" x={875} y={1245} w={270} h={270} at={104} rotate={4} />

        <DevtrineMascot
          x={mascotX}
          y={1245 + jitter}
          size={156}
          expression={
            frame < 52
              ? "confused"
              : frame < 104
                ? "annoyed"
                : frame < 145
                  ? "panic"
                  : "dizzy"
          }
          angerVein={frame >= 52 && frame < 104}
          sweat={frame < 52 ? 0.3 : frame < 104 ? 0.6 : 1}
          blink={autoBlink(frame, 11)}
          rotate={isToolsBeat ? Math.sin(frame * 0.4) * 7 : -3}
          lookX={isToolsBeat ? 0.35 : -0.3}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Subtitles
        cues={[
          { from: 17, to: 102, text: "Awalnya, Larry bikin Perl karena kesulitan mengolah file teks", hi: ["kesulitan", "mengolah", "file", "teks"] },
          { from: 104, to: 198, text: "dan membuat laporan menggunakan tools yang tersedia saat itu.", hi: ["membuat", "laporan", "tools"] },
        ]}
      />

      <Sfx name="paper" at={16} volume={0.8} />
      <Sfx name="pop" at={34} volume={0.8} />
      <Sfx name="pop" at={52} volume={0.8} />
      <Sfx name="bruh" at={106} volume={0.8} duration={20} />
    </Background>
  );
};
