import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard, MiniCharacter, NodeTreeList, PuzzleGrid } from "../components/Explainers";
import { IconCheck, IconFeather, IconLayers, IconPlug, IconWrench } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

const CONFIG_CODE = `app_config = { mode = "engineering", auto = true }`;

export const Scene04LightweightConfig: React.FC = () => {
  const frame = useCurrentFrame();
  const isPillars = frame >= 168;

  const camScale = keys(frame, [0, 80, 168, 260, 350], [1, 1.03, 1.01, 1.04, 1.02]);
  const typed = CONFIG_CODE.slice(0, Math.max(0, Math.floor((frame - 22) * 0.65)));

  const p1 = spr(frame, 173, { damping: 12, stiffness: 200 });
  const p2 = spr(frame, 242, { damping: 12, stiffness: 200 });
  const p3 = spr(frame, 275, { damping: 12, stiffness: 200 });

  // Mascot moves dynamically between beats
  const mascotX = keys(frame, [0, 60, 168, 242, 275, 350], [580, 620, 480, 580, 480, 540]);
  const hop =
    (frame >= 173 && frame < 189 ? Math.sin(((frame - 173) / 16) * Math.PI) * -28 : 0) +
    (frame >= 242 && frame < 258 ? Math.sin(((frame - 242) / 16) * Math.PI) * -28 : 0) +
    (frame >= 312 && frame < 328 ? Math.sin(((frame - 312) / 16) * Math.PI) * -32 : 0);

  return (
    <Background variant={isPillars ? "dotMatrix" : "voxPaper"} drift={1.0} polaroidMeme="memes/menggoda.jpg">
      <Camera scale={camScale} focusX={540} focusY={725}>
        <Header
          title="Ringan, Fleksibel & Embeddable"
          highlight={["Ringan,", "Fleksibel", "Embeddable"]}
        />

        {/* Beat A: Puzzle Assembly + Animated Coder Character */}
        <ExplainCard
          at={6}
          until={168}
          w={960}
          h={630}
          y={725}
          badge="PROYEK TEKNIK & KONFIGURASI"
          badgeIcon={<IconWrench size={18} color={C.charcoal} />}
          tape
        >
          <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PuzzleGrid at={12} letter="LUA" sublabel={`${typed}${frame % 12 < 6 ? "|" : ""}`} />
            <MiniCharacter kind="coder" x={115} y={240} scale={1.15} running={false} frame={frame} />
          </div>
        </ExplainCard>

        {isPillars && (
          <>
            <ExplainCard
              at={168}
              w={960}
              h={320}
              y={555}
              badge="THE ALLROUNDER · EMBEDDABLE"
              badgeIcon={<IconLayers size={18} color={C.charcoal} />}
              watermark="ALLROUNDER"
              dark
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "0 20px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span
                      style={{
                        background: C.white,
                        color: C.luaNavy,
                        fontFamily: FONT.sans,
                        fontWeight: 900,
                        fontSize: 32,
                        padding: "4px 20px",
                        borderRadius: 12,
                      }}
                    >
                      LUA
                    </span>
                    <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 32, color: C.luaSky }}>
                      serba bisa
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.sans,
                      fontWeight: 900,
                      fontSize: 64,
                      color: C.white,
                      letterSpacing: "-0.04em",
                      lineHeight: 0.98,
                    }}
                  >
                    allrounder.
                  </div>
                </div>

                <div style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 22,
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(219,234,254,0.28)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: `scale(${p1})`,
                    }}
                  >
                    <IconFeather size={44} color={C.luaSky} />
                  </div>
                  <div
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 22,
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(219,234,254,0.28)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: `scale(${p2})`,
                    }}
                  >
                    <IconLayers size={44} color={C.white} />
                  </div>
                  <div
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 22,
                      background: frame >= 312 ? C.green : C.luaSky,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: `scale(${p3})`,
                    }}
                  >
                    {frame >= 312 ? <IconCheck size={46} color={C.white} /> : <IconPlug size={44} color={C.luaDeep} />}
                  </div>
                </div>
              </div>
            </ExplainCard>

            <NodeTreeList
              x={135}
              y={775}
              items={[
                { label: "Super Ringan", sub: "ukuran inti cuma ~200 KB!", at: 173 },
                { label: "Fleksibel", sub: "struktur data table dinamis", at: 242 },
                { label: "Mudah Disisipkan", sub: "colok langsung ke C / C++", at: 275, highlight: true },
              ]}
            />
          </>
        )}

        <MemeSticker src="memes/mode_on.jpg" x={205} y={1245} w={255} h={230} at={28} until={168} rotate={-5} />
        <MemeSticker src="memes/let_him_cook.jpg" x={875} y={1245} w={250} h={230} at={173} until={205} rotate={5} />
        <MemeSticker src="memes/deal_cat.jpg" x={205} y={1245} w={250} h={230} at={242} until={274} rotate={-4} />
        <MemeSticker src="memes/sudah_siap_suits.jpg" x={875} y={1245} w={265} h={235} at={275} rotate={4} />

        <DevtrineMascot
          x={mascotX}
          y={1245 + hop + Math.sin(frame * 0.15) * 6}
          size={156}
          expression={isPillars ? "happy" : "curious"}
          blink={autoBlink(frame, 12)}
          rotate={Math.sin(frame * 0.12) * 4}
          lookX={isPillars ? 0.3 : -0.2}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Subtitles
        cues={[
          { from: 10, to: 158, text: "Awalnya, Lua dibuat buat bantu proyek teknik dan konfigurasi aplikasi.", hi: ["proyek", "teknik", "konfigurasi"] },
          { from: 170, to: 238, text: "Tujuannya bikin bahasa yang ringan,", hi: ["ringan,"] },
          { from: 240, to: 338, text: "fleksibel, dan gampang disisipkan ke aplikasi lain.", hi: ["fleksibel,", "gampang", "disisipkan"] },
        ]}
      />

      <Sfx name="typing" at={24} volume={0.65} duration={44} />
      <Sfx name="pop" at={173} volume={0.85} />
      <Sfx name="pop" at={242} volume={0.85} />
      <Sfx name="meme_click" at={275} volume={0.9} />
      <Sfx name="confirm" at={312} volume={0.9} />
    </Background>
  );
};
