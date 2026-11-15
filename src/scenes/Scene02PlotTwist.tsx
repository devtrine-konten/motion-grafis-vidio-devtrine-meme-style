import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, easeOut, keys, lerp, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconCheck, IconClock, IconCode, IconUser } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

export const Scene02PlotTwist: React.FC = () => {
  const frame = useCurrentFrame();
  const isCreator = frame >= 108;
  const slideX = lerp(frame, [0, 24], [-160, 205], easeOut);
  const camScale = keys(frame, [0, 45, 115, 222], [1, 1.03, 1.05, 1.02]);

  const yearNum = Math.round(lerp(frame, [8, 42], [1995, 2006], easeOut));
  const scanY = lerp(frame % 50, [0, 50], [0, 240]);

  return (
    <Background variant="blueprint" drift={1.0}>
      <Camera scale={camScale} focusX={540} focusY={860}>
        <Header
          kicker="SEJARAH AWAL · TAHUN 2006"
          title="Sosok di Balik Bahasa Rust"
          highlight={["Sosok", "Rust"]}
          tone="dark"
        />

        {/* Explanatory Card 1 (6..108): Year 2006 Origin Animation */}
        <ExplainCard
          at={6}
          until={108}
          w={840}
          h={435}
          y={670}
          bg="#16212E"
          accent={C.cyan}
          badge="AWAL MULA RUST"
          badgeIcon={<IconClock size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
          dark
        >
          <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 22, color: C.cyanLight, letterSpacing: "0.14em" }}>
            TAHUN DIKEMBANGKAN
          </div>
          <div
            style={{
              fontFamily: FONT.mono,
              fontWeight: 900,
              fontSize: 128,
              color: C.yellow,
              lineHeight: 1.05,
              textShadow: `6px 6px 0 #FF6B35`,
            }}
          >
            {yearNum}
          </div>
          <div
            style={{
              marginTop: 14,
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#0D141C",
              border: `3px solid ${C.cyanLight}`,
              borderRadius: 16,
              padding: "10px 22px",
              opacity: spr(frame, 44),
            }}
          >
            <IconCode size={26} color={C.green} />
            <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 23, color: C.white }}>
              git init rust-lang · v0.1
            </span>
          </div>
        </ExplainCard>

        {/* Explanatory Card 2 (108..222): Creator Dossier for Graydon Hoare */}
        <ExplainCard
          at={108}
          w={840}
          h={440}
          y={670}
          bg="#16212E"
          accent="#FF6B35"
          badge="PENCIPTA RUST · 2006"
          badgeIcon={<IconUser size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
          dark
        >
          <div style={{ display: "flex", alignItems: "center", gap: 30, width: "100%", padding: "0 12px" }}>
            <div
              style={{
                position: "relative",
                width: 240,
                height: 240,
                borderRadius: 24,
                overflow: "hidden",
                border: `5px solid ${C.cyanLight}`,
                flexShrink: 0,
              }}
            >
              <Img src={staticFile("image-vidio/profil.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: scanY,
                  height: 4,
                  background: C.cyanLight,
                  boxShadow: `0 0 12px ${C.cyanLight}`,
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
              <div style={{ fontFamily: FONT.mono, fontSize: 20, fontWeight: 800, color: C.cyanLight }}>
                PROGRAMMER / CREATOR
              </div>
              <div style={{ fontFamily: FONT.sans, fontSize: 42, fontWeight: 900, color: C.white, lineHeight: 1.08 }}>
                Graydon Hoare
              </div>
              <div
                style={{
                  background: "#FF6B35",
                  color: C.white,
                  fontFamily: FONT.mono,
                  fontWeight: 800,
                  fontSize: 20,
                  padding: "8px 16px",
                  borderRadius: 12,
                  alignSelf: "flex-start",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transform: `scale(${spr(frame, 128)})`,
                }}
              >
                <IconCheck size={20} color={C.white} />
                <span>Merancang Rust (2006)</span>
              </div>
            </div>
          </div>
        </ExplainCard>

        {/* Bottom Meme Reactions synced to VO */}
        <MemeSticker
          src="memes/nerd_cat.jpg"
          x={555}
          y={1145}
          w={265}
          h={245}
          at={46}
          until={112}
          rotate={-5}
          accent={C.cyanLight}
        />
        <MemeSticker
          src="memes/let_him_cook.jpg"
          x={805}
          y={1145}
          w={265}
          h={245}
          at={116}
          until={168}
          rotate={4}
          accent="#FF6B35"
        />
        <MemeSticker
          src="memes/kelas_king.jpg"
          x={680}
          y={1145}
          w={285}
          h={255}
          at={166}
          rotate={4}
          accent={C.yellow}
        />

        <DevtrineMascot
          x={slideX}
          y={1215 + Math.sin(frame * 0.15) * 7}
          size={130}
          expression={isCreator ? "salute" : "detective"}
          magnifyingGlass={!isCreator}
          blink={autoBlink(frame, 13)}
          lookX={0.5}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Subtitles
        cues={[
          { from: 5, to: 112, text: "Jadi, Rust itu mulai dikembangkan tahun 2006", hi: ["Rust", "dikembangkan", "2006"] },
          { from: 112, to: 214, text: "oleh seorang programmer bernama Graydon Hoare.", hi: ["programmer", "Graydon", "Hoare."] },
        ]}
      />

      {/* <Sfx name="sus" at={12} volume={0.85} duration={18} /> */}
      <Sfx name="meme_bonk" at={46} volume={0.85} duration={16} />
      {/* <Sfx name="vine_boom" at={108} volume={0.9} duration={20} /> */}
      <Sfx name="meme_bonk" at={166} volume={0.85} duration={20} />
    </Background>
  );
};
