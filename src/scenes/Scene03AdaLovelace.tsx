import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, lerp, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconCheck, IconClock, IconHandshake, IconLaptop, IconRocket } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

const MILESTONES = [
  { year: "2006" },
  { year: "2009" },
  { year: "2015" },
];

export const Scene03AdaLovelace: React.FC = () => {
  const frame = useCurrentFrame();
  const stage = frame < 80 ? 0 : frame < 202 ? 1 : 2;
  const camScale = keys(frame, [0, 80, 202, 360], [1, 1.03, 1.05, 1.02]);
  const spin = frame >= 202 && frame < 224 ? lerp(frame, [202, 224], [0, 360]) : 0;

  const trackPct = keys(frame, [0, 75, 85, 195, 210, 360], [10, 20, 50, 55, 100, 100]);
  const rocketY = lerp(frame, [206, 255], [24, -10]);

  return (
    <Background variant="light" drift={1.0}>
      <Camera scale={camScale} focusX={540} focusY={860}>
        <Header
          kicker="PERJALANAN RUST"
          title="Dari Proyek Pribadi ke Rilis 1.0"
          highlight={["Proyek", "Rilis", "1.0"]}
        />

        {/* Horizontal Progress Timeline Bar */}
        <div style={{ position: "absolute", left: 110, right: 110, top: 410, zIndex: 25 }}>
          <div style={{ height: 14, background: "#D7ECEE", borderRadius: 999, border: `3px solid ${C.charcoal}`, overflow: "hidden" }}>
            <div style={{ width: `${trackPct}%`, height: "100%", background: stage === 2 ? C.green : stage === 1 ? "#FF6B35" : C.cyan }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
            {MILESTONES.map((m, idx) => {
              const active = stage >= idx;
              return (
                <div
                  key={m.year}
                  style={{
                    background: stage === idx ? C.yellow : active ? C.cyanLight : C.white,
                    border: `3px solid ${C.charcoal}`,
                    borderRadius: 999,
                    padding: "4px 16px",
                    fontFamily: FONT.mono,
                    fontWeight: 900,
                    fontSize: 20,
                    color: C.charcoal,
                    opacity: active ? 1 : 0.45,
                  }}
                >
                  {m.year}
                </div>
              );
            })}
          </div>
        </div>

        {/* Beat 1 (6..80): 2006 — Animated Solo Project Card */}
        <ExplainCard
          at={6}
          until={80}
          w={840}
          h={385}
          y={730}
          accent={C.cyan}
          badge="2006 · PROYEK PRIBADI"
          badgeIcon={<IconClock size={20} color={C.charcoal} />}
          badgeBg={C.cyanLight}
        >
          <IconLaptop size={96} color={C.cyan} />
          <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 34, color: C.charcoal, marginTop: 16 }}>
            Dibangun 1 Orang di Waktu Luang
          </div>
          <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 22, color: "#4B5563", marginTop: 8 }}>
            Eksperimen bahasa sistem yang aman
          </div>
        </ExplainCard>

        {/* Beat 2 (80..202): 2009 — Mozilla Sponsorship Flow */}
        <ExplainCard
          at={80}
          until={202}
          w={840}
          h={390}
          y={730}
          accent="#FF6B35"
          badge="2009 · DIDUKUNG MOZILLA"
          badgeIcon={<IconHandshake size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <div style={{ width: 155, height: 155, borderRadius: 24, overflow: "hidden", border: `4px solid ${C.charcoal}`, background: "#111", padding: 14 }}>
              <Img src={staticFile("image-vidio/logo-rust.png")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <IconHandshake size={58} color="#FF6B35" />
            <div style={{ width: 225, height: 155, borderRadius: 24, overflow: "hidden", border: `4px solid ${C.charcoal}` }}>
              <Img src={staticFile("image-vidio/firefox.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, color: C.charcoal, marginTop: 20 }}>
            Mozilla Sponsor Resmi Pengembangan Rust!
          </div>
        </ExplainCard>

        {/* Beat 3 (202..360): 2015 — Rust 1.0 Launch Card */}
        <ExplainCard
          at={202}
          w={840}
          h={390}
          y={730}
          bg="#16212E"
          accent={C.green}
          badge="2015 · RILIS STABIL PERTAMA"
          badgeIcon={<IconRocket size={20} color={C.charcoal} />}
          badgeBg={C.green}
          dark
        >
          <div style={{ transform: `translateY(${rocketY}px) scale(${spr(frame, 208)})` }}>
            <IconRocket size={86} color={C.green} />
          </div>
          <div
            style={{
              marginTop: 14,
              background: C.green,
              color: C.charcoal,
              fontFamily: FONT.mono,
              fontWeight: 900,
              fontSize: 40,
              padding: "8px 28px",
              borderRadius: 18,
              border: `4px solid ${C.white}`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <IconCheck size={34} color={C.charcoal} />
            <span>RUST v1.0.0 STABLE</span>
          </div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 26, color: C.cyanLight, marginTop: 14 }}>
            Siap Dipakai Developer di Seluruh Dunia!
          </div>
        </ExplainCard>

        {/* Bottom Meme Cutaways synced to 2006 / 2009 / 2015 */}
        <MemeSticker
          src="memes/ngejar_deadline.jpg"
          x={680}
          y={1145}
          w={285}
          h={250}
          at={18}
          until={80}
          rotate={4}
          accent={C.cyan}
        />
        <MemeSticker
          src="memes/dana_masuk.jpg"
          x={545}
          y={1145}
          w={265}
          h={245}
          at={96}
          until={146}
          rotate={-5}
          accent={C.green}
        />
        <MemeSticker
          src="memes/deal_cat.jpg"
          x={805}
          y={1145}
          w={265}
          h={245}
          at={146}
          until={202}
          rotate={5}
          accent={C.yellow}
        />
        <MemeSticker
          src="memes/sudah_siap_suits.jpg"
          x={555}
          y={1145}
          w={275}
          h={250}
          at={214}
          until={286}
          rotate={-4}
          accent={C.green}
        />
        <MemeSticker
          src="memes/horee.jpg"
          x={805}
          y={1145}
          w={265}
          h={245}
          at={284}
          rotate={4}
          accent={C.yellow}
        />

        <DevtrineMascot
          x={205}
          y={1215 + Math.sin(frame * 0.16) * 7}
          size={130}
          expression={stage === 2 ? "proud" : stage === 1 ? "amazed" : "happy"}
          headband
          blush={stage === 2}
          rotate={spin}
          blink={autoBlink(frame, 14)}
          lookX={0.5}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={80} color={C.yellow} max={0.25} />
      <Flash at={202} color={C.green} max={0.25} />

      <Subtitles
        cues={[
          { from: 10, to: 72, text: "Awalnya, Rust cuma proyek pribadi.", hi: ["Awalnya,", "proyek", "pribadi."] },
          { from: 80, to: 196, text: "Tapi pada tahun 2009, Mozilla mulai mendukung pengembangannya,", hi: ["2009,", "Mozilla", "mendukung"] },
          { from: 202, to: 350, text: "dan tahun 2015 Rust resmi merilis versi stabil pertamanya!", hi: ["2015", "resmi", "stabil", "pertamanya!"] },
        ]}
      />

      <Sfx name="meme_bonk" at={18} volume={0.8} duration={16} />
      <Sfx name="vine_boom" at={80} volume={0.9} duration={20} />
      <Sfx name="goofy_horn" at={146} volume={0.85} duration={20} />
      <Sfx name="vine_boom" at={202} volume={0.95} duration={20} />
      <Sfx name="meme_bonk" at={284} volume={0.85} duration={16} />
    </Background>
  );
};
