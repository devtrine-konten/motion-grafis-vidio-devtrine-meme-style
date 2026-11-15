import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, easeOut, keys, lerp, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconArrowRight, IconBan, IconBox, IconCheck, IconClock, IconCrown, IconFile, IconSearch, IconShield, IconXCircle } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

export const Scene06OtpJoke: React.FC = () => {
  const frame = useCurrentFrame();
  const stage = frame < 88 ? 0 : frame < 198 ? 1 : 2;
  const camScale = keys(frame, [0, 90, 200, 333], [1, 1.03, 1.05, 1.02]);

  const tokenMove = lerp(frame, [104, 132], [-175, 175], easeOut);
  const movedDone = frame >= 130;
  const compileProgress = lerp(frame, [206, 260], [0, 1], easeOut);

  return (
    <Background variant="warm" drift={1.0}>
      <Camera scale={camScale} focusX={540} focusY={860}>
        <Header
          kicker="SISTEM KEAMANAN MEMORI"
          title="Ownership & Borrow Checker"
          highlight={["Ownership", "Borrow", "Checker"]}
        />

        {/* Beat 1 (6..88): Rust Membawa Solusi */}
        <ExplainCard
          at={6}
          until={88}
          w={840}
          h={435}
          y={670}
          bg="#161B22"
          accent="#FF6B35"
          badge="SOLUSI DARI RUST"
          badgeIcon={<IconShield size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
          dark
        >
          <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
            <Img src={staticFile("image-vidio/logo-rust.png")} style={{ width: 155, height: 155, objectFit: "contain" }} />
            <div style={{ transform: `scale(${spr(frame, 20)})` }}>
              <IconShield size={120} color={C.green} />
            </div>
          </div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 32, color: C.white, marginTop: 20 }}>
            Memori Aman Tanpa Ribet Atur Manual!
          </div>
        </ExplainCard>

        {/* Beat 2 (88..146): Ownership Transfer */}
        <ExplainCard
          at={88}
          until={146}
          w={840}
          h={440}
          y={670}
          accent="#FF6B35"
          badge="1. OWNERSHIP (1 DATA = 1 PEMILIK)"
          badgeIcon={<IconCrown size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
        >
          <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, color: "#4B5563", marginBottom: 56 }}>
            let b = a; // kepemilikan berpindah!
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "86%", position: "relative" }}>
            <div
              style={{
                width: 210,
                height: 160,
                borderRadius: 22,
                border: `4px dashed ${movedDone ? "#9CA3AF" : C.charcoal}`,
                background: movedDone ? "#F3F4F6" : C.cyanPale,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                opacity: movedDone ? 0.55 : 1,
                gap: 6,
              }}
            >
              <div style={{ fontFamily: FONT.mono, fontWeight: 900, fontSize: 28, color: C.charcoal }}>var a</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 18, color: movedDone ? C.red : C.charcoal, display: "flex", alignItems: "center", gap: 6 }}>
                {movedDone && <IconXCircle size={18} color={C.red} />}
                <span>{movedDone ? "NONAKTIF" : "PEMILIK"}</span>
              </div>
            </div>

            <IconArrowRight size={42} color="#FF6B35" />

            <div
              style={{
                width: 210,
                height: 160,
                borderRadius: 22,
                border: `4px solid ${C.charcoal}`,
                background: movedDone ? C.green : C.white,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <div style={{ fontFamily: FONT.mono, fontWeight: 900, fontSize: 28, color: C.charcoal }}>var b</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 18, color: C.charcoal, display: "flex", alignItems: "center", gap: 6 }}>
                {movedDone && <IconCrown size={18} color={C.yellow} />}
                <span>{movedDone ? "OWNER BARU" : "MENUNGGU..."}</span>
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                left: "50%",
                top: -28,
                transform: `translate(calc(-50% + ${tokenMove}px), -50%)`,
                background: C.yellow,
                border: `4px solid ${C.charcoal}`,
                borderRadius: 16,
                padding: "7px 18px",
                fontFamily: FONT.mono,
                fontWeight: 900,
                fontSize: 21,
                color: C.charcoal,
                boxShadow: `4px 4px 0 ${C.charcoal}`,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <IconBox size={22} color={C.charcoal} />
              <span>DATA "Rust"</span>
            </div>
          </div>
        </ExplainCard>

        {/* Beat 3 (146..198): Borrow Checker */}
        <ExplainCard
          at={146}
          until={198}
          w={840}
          h={440}
          y={670}
          accent={C.cyan}
          badge="2. BORROW CHECKER (PENGAWAS)"
          badgeIcon={<IconSearch size={20} color={C.charcoal} />}
          badgeBg={C.cyanLight}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "92%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#ECFDF5",
                border: `4px solid ${C.charcoal}`,
                borderRadius: 18,
                padding: "14px 22px",
                transform: `scale(${spr(frame, 150)})`,
              }}
            >
              <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 23, color: C.charcoal }}>
                &amp;data (Pinjam Baca Saja)
              </span>
              <span style={{ background: C.green, border: `3px solid ${C.charcoal}`, borderRadius: 999, padding: "4px 16px", fontFamily: FONT.mono, fontWeight: 900, fontSize: 19, display: "flex", alignItems: "center", gap: 6 }}>
                <IconCheck size={18} color={C.charcoal} />
                <span>BOLEH!</span>
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#FEF2F2",
                border: `4px solid ${C.charcoal}`,
                borderRadius: 18,
                padding: "14px 22px",
                transform: `scale(${spr(frame, 166)})`,
              }}
            >
              <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 23, color: C.charcoal }}>
                2x &amp;mut data (Ubah Barengan)
              </span>
              <span style={{ background: C.red, color: C.white, border: `3px solid ${C.charcoal}`, borderRadius: 999, padding: "4px 16px", fontFamily: FONT.mono, fontWeight: 900, fontSize: 19, display: "flex", alignItems: "center", gap: 6 }}>
                <IconBan size={18} color={C.white} />
                <span>DITOLAK!</span>
              </span>
            </div>
          </div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 23, color: "#4B5563", marginTop: 18 }}>
            Mencegah data rusak sebelum program dijalankan!
          </div>
        </ExplainCard>

        {/* Beat 4 (198..333): Compile-Time Checkpoint */}
        <ExplainCard
          at={198}
          w={840}
          h={440}
          y={670}
          bg="#16212E"
          accent={C.green}
          badge="DICEK SEJAK PROSES KOMPILASI"
          badgeIcon={<IconShield size={20} color={C.charcoal} />}
          badgeBg={C.green}
          dark
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "92%" }}>
            <div style={{ width: 185, padding: "16px 12px", borderRadius: 20, border: `4px solid ${C.cyanLight}`, background: "#0D141C", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <IconFile size={44} color={C.cyanLight} />
              <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, color: C.white }}>main.rs</div>
            </div>

            <div style={{ width: 225, padding: "18px 14px", borderRadius: 22, border: `4px solid ${C.yellow}`, background: "#232A34", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, transform: `scale(${1 + Math.sin(frame * 0.2) * 0.03})` }}>
              <IconSearch size={46} color={C.yellow} />
              <div style={{ fontFamily: FONT.mono, fontWeight: 900, fontSize: 21, color: C.yellow }}>rustc CHECK</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 16, color: C.cyanLight }}>Cek Error Memori</div>
            </div>

            <div
              style={{
                width: 185,
                padding: "16px 12px",
                borderRadius: 20,
                border: `4px solid ${compileProgress > 0.8 ? C.green : "#4B5563"}`,
                background: compileProgress > 0.8 ? "#113B2B" : "#0D141C",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              {compileProgress > 0.8 ? <IconCheck size={44} color={C.green} /> : <IconClock size={44} color={C.cyanLight} />}
              <div style={{ fontFamily: FONT.mono, fontWeight: 900, fontSize: 20, color: C.green }}>
                {compileProgress > 0.8 ? "APP AMAN!" : "CEK..."}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 26,
              background: C.green,
              color: C.charcoal,
              fontFamily: FONT.mono,
              fontWeight: 900,
              fontSize: 22,
              padding: "9px 24px",
              borderRadius: 999,
              border: `3.5px solid ${C.white}`,
              display: "flex",
              alignItems: "center",
              gap: 10,
              transform: `scale(${spr(frame, 252)})`,
            }}
          >
            <IconCheck size={24} color={C.charcoal} />
            <span>ERROR MEMORI DICEGAH SEBELUM RUN!</span>
          </div>
        </ExplainCard>

        {/* Bottom Meme Reactions synced to VO beats */}
        <MemeSticker
          src="memes/chad_gojo.jpg"
          x={680}
          y={1145}
          w={275}
          h={250}
          at={14}
          until={88}
          rotate={4}
          accent="#FF6B35"
        />
        <MemeSticker
          src="memes/bukankah_ini_my.jpg"
          x={555}
          y={1145}
          w={265}
          h={245}
          at={92}
          until={146}
          fit="contain"
          bg="#111111"
          rotate={-4}
          accent="#FF6B35"
        />
        <MemeSticker
          src="memes/lawliet_nerd.jpg"
          x={805}
          y={1145}
          w={265}
          h={245}
          at={148}
          until={198}
          rotate={4}
          accent={C.cyan}
        />
        <MemeSticker
          src="memes/perbaiki_bahasamu.jpg"
          x={680}
          y={1145}
          w={285}
          h={250}
          at={212}
          rotate={-3}
          accent={C.green}
        />

        <DevtrineMascot
          x={205}
          y={1215 + Math.sin(frame * 0.16) * 7}
          size={130}
          expression={stage === 2 ? "proud" : "salute"}
          helmet
          shield
          blush={stage === 2}
          blink={autoBlink(frame, 11)}
          lookX={0.5}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={88} color={C.cyanLight} max={0.25} />
      <Flash at={198} color={C.green} max={0.25} />

      <Subtitles
        cues={[
          { from: 8, to: 82, text: "Nah, Rust datang membawa solusi!", hi: ["Rust", "membawa", "solusi!"] },
          { from: 90, to: 196, text: "Dia punya sistem bernama Ownership dan Borrow Checker", hi: ["Ownership", "Borrow", "Checker"] },
          { from: 198, to: 324, text: "yang membantu mencegah kesalahan pengelolaan memori sejak proses kompilasi.", hi: ["mencegah", "memori", "kompilasi."] },
        ]}
      />

      <Sfx name="vine_boom" at={14} volume={0.9} duration={20} />
      <Sfx name="meme_bonk" at={92} volume={0.85} duration={16} />
      <Sfx name="sus" at={148} volume={0.85} duration={20} />
      <Sfx name="goofy_horn" at={212} volume={0.85} duration={20} />
    </Background>
  );
};
