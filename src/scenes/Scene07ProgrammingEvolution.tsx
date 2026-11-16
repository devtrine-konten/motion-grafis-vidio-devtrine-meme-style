import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, easeOut, keys, lerp, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconBan, IconPause, IconShield, IconZap } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

export const Scene07ProgrammingEvolution: React.FC = () => {
  const frame = useCurrentFrame();
  const camScale = keys(frame, [0, 36, 84, 189], [1, 1.03, 1.05, 1.02]);
  const danceRot = Math.sin(frame * 0.28) * 10;
  const danceY = Math.abs(Math.sin(frame * 0.28)) * -14;

  const otherPct = keys(frame, [88, 120, 165, 185], [0, 48, 48, 72]);
  const rustPct = lerp(frame, [88, 146], [0, 100], easeOut);
  const isGcPaused = frame >= 120 && frame < 165;

  return (
    <Background variant="light" drift={1.0}>
      <Camera scale={camScale} focusX={540} focusY={860}>
        <Header
          kicker="HASILNYA"
          title="Cepat, Aman & Tanpa GC!"
          highlight={["Cepat,", "Aman", "Tanpa", "GC!"]}
        />

        {/* Beat 1 (6..82): Dual Animated Feature Badges */}
        <ExplainCard
          at={6}
          until={82}
          w={840}
          h={430}
          y={670}
          accent={C.green}
          badge="HASIL SISTEM RUST"
          badgeIcon={<IconZap size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
        >
          <div style={{ display: "flex", gap: 36 }}>
            <div
              style={{
                width: 280,
                padding: "28px 20px",
                borderRadius: 24,
                background: C.yellow,
                border: `5px solid ${C.charcoal}`,
                boxShadow: `6px 6px 0 ${C.charcoal}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `scale(${spr(frame, 30)})`,
              }}
            >
              <IconZap size={60} color={C.charcoal} />
              <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 34, color: C.charcoal, marginTop: 10 }}>
                CEPAT
              </div>
              <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, color: C.charcoal }}>
                SELEVEL C/C++
              </div>
            </div>

            <div
              style={{
                width: 280,
                padding: "28px 20px",
                borderRadius: 24,
                background: C.green,
                border: `5px solid ${C.charcoal}`,
                boxShadow: `6px 6px 0 ${C.charcoal}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `scale(${spr(frame, 48)})`,
              }}
            >
              <IconShield size={60} color={C.charcoal} />
              <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 34, color: C.charcoal, marginTop: 10 }}>
                AMAN
              </div>
              <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, color: C.charcoal }}>
                MEMORI TERJAGA
              </div>
            </div>
          </div>
        </ExplainCard>

        {/* Beat 2 (82..189): GC Comparison 2-Lane Race */}
        <ExplainCard
          at={82}
          w={840}
          h={435}
          y={670}
          accent={C.cyan}
          badge="TANPA GARBAGE COLLECTOR"
          badgeIcon={<IconBan size={20} color={C.red} />}
          badgeBg={C.cyanLight}
        >
          <div style={{ width: "92%", display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: FONT.sans, fontWeight: 800, fontSize: 20, marginBottom: 10, whiteSpace: "nowrap" }}>
                <span style={{ color: C.charcoal }}>Bahasa Lain (Pakai GC)</span>
                <span style={{ color: isGcPaused ? C.red : "#6B7280", fontFamily: FONT.mono, display: "flex", alignItems: "center", gap: 6 }}>
                  {isGcPaused && <IconPause size={18} color={C.red} />}
                  <span>{isGcPaused ? "STOP! BERSIHIN MEMORI" : "JALAN..."}</span>
                </span>
              </div>
              <div style={{ height: 36, background: "#E5E7EB", borderRadius: 999, border: `4px solid ${C.charcoal}`, overflow: "hidden" }}>
                <div style={{ width: `${otherPct}%`, height: "100%", background: isGcPaused ? C.red : "#9CA3AF" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: FONT.sans, fontWeight: 900, fontSize: 20, marginBottom: 10, whiteSpace: "nowrap" }}>
                <span style={{ color: C.charcoal }}>Rust (Tanpa GC)</span>
                <span style={{ color: "#059669", fontFamily: FONT.mono, display: "flex", alignItems: "center", gap: 6 }}>
                  <IconZap size={18} color="#059669" />
                  <span>LANGSUNG GAS TERUS!</span>
                </span>
              </div>
              <div style={{ height: 36, background: "#E5E7EB", borderRadius: 999, border: `4px solid ${C.charcoal}`, overflow: "hidden" }}>
                <div style={{ width: `${rustPct}%`, height: "100%", background: C.green }} />
              </div>
            </div>
          </div>
        </ExplainCard>

        {/* Bottom Meme Reactions synced to VO */}
        <MemeSticker
          src="memes/mode_on.jpg"
          x={680}
          y={1145}
          w={275}
          h={245}
          at={34}
          until={84}
          rotate={4}
          accent={C.yellow}
        />
        <MemeSticker
          src="memes/omg.jpg"
          x={555}
          y={1145}
          w={265}
          h={245}
          at={86}
          until={142}
          rotate={-4}
          accent={C.cyan}
        />
        <MemeSticker
          src="memes/dahsyat.jpg"
          x={805}
          y={1145}
          w={265}
          h={245}
          at={140}
          rotate={4}
          accent="#FF6B35"
        />

        <DevtrineMascot
          x={205}
          y={1215 + danceY}
          size={130}
          expression="cool"
          sunglasses
          rotate={danceRot}
          blink={autoBlink(frame, 9)}
          frame={frame}
          shadow
        />
      </Camera>

      <Subtitles
        cues={[
          { from: 6, to: 34, text: "Hasilnya?", hi: ["Hasilnya?"] },
          { from: 36, to: 80, text: "Cepat, aman,", hi: ["Cepat,", "aman,"] },
          { from: 82, to: 184, text: "dan nggak butuh Garbage Collector seperti banyak bahasa lainnya!", hi: ["nggak", "Garbage", "Collector"] },
        ]}
      />

      <Sfx name="vine_boom" at={34} volume={0.9} duration={26} />
      <Sfx name="meme_bonk" at={86} volume={0.85} duration={14} />
      {/* <Sfx name="goofy_horn" at={140} volume={0.85} duration={24} /> */}
    </Background>
  );
};
