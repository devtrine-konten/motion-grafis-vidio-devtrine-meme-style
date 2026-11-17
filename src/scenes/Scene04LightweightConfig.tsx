import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, lerp, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconCheck, IconCode, IconFeather, IconLayers, IconPlug, IconWrench } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

const CONFIG_CODE = `app_config = { mode = "engineering", auto = true }`;

export const Scene04LightweightConfig: React.FC = () => {
  const frame = useCurrentFrame();
  // Beat A (0..168): Proyek teknik & kebutuhan konfigurasi aplikasi
  // Beat B (168..350): Ringan, Fleksibel, Gampang disisipkan ke aplikasi lain
  const isPillars = frame >= 168;

  const camScale = keys(frame, [0, 80, 168, 260, 350], [1, 1.03, 1.01, 1.04, 1.02]);
  const typed = CONFIG_CODE.slice(0, Math.max(0, Math.floor((frame - 22) * 0.65)));

  const p1 = spr(frame, 173, { damping: 11, stiffness: 210 });
  const p2 = spr(frame, 242, { damping: 11, stiffness: 210 });
  const p3 = spr(frame, 275, { damping: 11, stiffness: 210 });
  const plugDrop = lerp(frame, [280, 308], [-16, 0]);

  return (
    <Background variant="noir" drift={1.0}>
      <Camera scale={camScale} focusX={540} focusY={720}>
        <Header
          kicker="MISI AWAL LUA"
          title="Ringan, Fleksibel & Embeddable"
          highlight={["Ringan,", "Fleksibel", "Embeddable"]}
          tone="dark"
        />

        {/* Beat A (0..168): Engineering & Config File Explainer */}
        <ExplainCard
          at={6}
          until={168}
          w={850}
          h={440}
          y={670}
          bg="#121622"
          accent={C.luaBlue}
          badge="PROYEK TEKNIK & KONFIGURASI"
          badgeIcon={<IconWrench size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
          dark
        >
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 22,
                  background: C.luaNavy,
                  border: `3px solid ${C.luaSky}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `rotate(${Math.sin(frame * 0.1) * 8}deg)`,
                }}
              >
                <IconWrench size={52} color={C.yellow} />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, color: C.luaSky }}>
                  TECGRAF · PETROBRAS PROJECTS
                </div>
                <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 34, color: C.white }}>
                  Alat Bantu & Konfigurasi
                </div>
              </div>
            </div>

            <div
              style={{
                width: "96%",
                background: C.black,
                border: `3px solid ${C.luaBlue}`,
                borderRadius: 16,
                padding: "16px 22px",
                fontFamily: FONT.mono,
                fontSize: 22,
                fontWeight: 700,
                color: C.luaIce,
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: 12,
                whiteSpace: "nowrap",
              }}
            >
              <IconCode size={26} color={C.green} />
              <span>
                {typed}
                <span style={{ opacity: frame % 12 < 6 ? 1 : 0 }}>|</span>
              </span>
            </div>
          </div>
        </ExplainCard>

        {/* Beat B (168..350): 3 Pillars Animated Explainer */}
        <ExplainCard
          at={168}
          w={870}
          h={460}
          y={675}
          bg="#121622"
          accent={C.luaSky}
          badge="3 KEUNGGULAN UTAMA LUA"
          badgeIcon={<IconLayers size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
          dark
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
            {/* Pillar 1: Ringan */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                background: "#0B0F1D",
                border: `3px solid ${C.luaSky}`,
                borderRadius: 18,
                padding: "14px 20px",
                transform: `scale(${p1})`,
              }}
            >
              <div style={{ width: 58, height: 58, borderRadius: 14, background: C.luaNavy, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconFeather size={34} color={C.luaIce} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 28, color: C.white }}>1. SUPER RINGAN</div>
                <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 18, color: C.luaSky }}>
                  Ukuran inti cuma ~200 KB!
                </div>
              </div>
              <IconCheck size={30} color={C.green} />
            </div>

            {/* Pillar 2: Fleksibel */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                background: "#0B0F1D",
                border: `3px solid ${C.luaBlue}`,
                borderRadius: 18,
                padding: "14px 20px",
                transform: `scale(${p2})`,
              }}
            >
              <div style={{ width: 58, height: 58, borderRadius: 14, background: C.luaBlue, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconLayers size={34} color={C.white} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 28, color: C.white }}>2. FLEKSIBEL</div>
                <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 18, color: C.luaIce }}>
                  Struktur data dinamis & simpel
                </div>
              </div>
              <IconCheck size={30} color={C.green} />
            </div>

            {/* Pillar 3: Gampang Disisipkan */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                background: "#0B0F1D",
                border: `3px solid ${C.yellow}`,
                borderRadius: 18,
                padding: "14px 20px",
                transform: `scale(${p3})`,
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 14,
                  background: C.yellow,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <div style={{ transform: `translateY(${plugDrop}px)` }}>
                  <IconPlug size={34} color={C.charcoal} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 28, color: C.white }}>3. MUDAH DISISIPKAN</div>
                <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 18, color: C.yellow }}>
                  Langsung colok ke aplikasi C/C++
                </div>
              </div>
              {frame >= 312 && <IconCheck size={30} color={C.green} />}
            </div>
          </div>
        </ExplainCard>

        <MemeSticker
          src="memes/mode_on.jpg"
          x={680}
          y={1145}
          w={275}
          h={245}
          at={28}
          until={168}
          rotate={-4}
          accent={C.luaBlue}
        />
        <MemeSticker
          src="memes/let_him_cook.jpg"
          x={680}
          y={1145}
          w={265}
          h={255}
          at={185}
          rotate={4}
          accent={C.yellow}
        />

        <DevtrineMascot
          x={205}
          y={1215 + Math.sin(frame * 0.15) * 7}
          size={130}
          expression={isPillars ? "happy" : "curious"}
          blink={autoBlink(frame, 12)}
          lookX={0.5}
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
      <Sfx name="confirm" at={312} volume={0.9} />
    </Background>
  );
};
