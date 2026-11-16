import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, lerp, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconAlert, IconArrowRight, IconBug, IconUnlock, IconZap } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

const RAM_SLOTS = [
  { addr: "0x01", label: "DATA A" },
  { addr: "0x02", label: "FREED!" },
  { addr: "0x03", label: "DATA B" },
  { addr: "0x04", label: "SECRET" },
];

export const Scene05MachineLanguage: React.FC = () => {
  const frame = useCurrentFrame();
  const isCrash = frame >= 132;
  const shk = shake(frame, 134, 18, 12);
  const camScale = keys(frame, [0, 60, 132, 145, 294], [1, 1.03, 1.01, 1.05, 1.02]);

  const speedPct = lerp(frame, [28, 86], [0, 100]);
  const ptrX = lerp(frame, [142, 182], [0, 1]);
  const isErrorHit = frame >= 182;
  const exploitX = lerp(frame, [242, 282], [-170, 170]);

  return (
    <Background variant="blueprint" drift={1.0}>
      <Camera scale={camScale} x={shk.x} y={shk.y} focusX={540} focusY={860}>
        <Header
          kicker="MASALAH DI C & C++"
          title={isCrash ? "Risiko Error Memori & Crash!" : "C & C++ Memang Cepat, Tapi..."}
          highlight={isCrash ? ["Error", "Memori", "Crash!"] : ["C", "C++", "Cepat,"]}
          tone="dark"
        />

        {/* Beat 1 (10..132): C & C++ Native Speed Visualization */}
        <ExplainCard
          at={10}
          until={132}
          w={840}
          h={440}
          y={670}
          bg="#16212E"
          accent={C.cyan}
          badge="PERFORMA TINGGI"
          badgeIcon={<IconZap size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
          dark
        >
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            <div style={{ width: 170, height: 170, background: C.white, borderRadius: 24, border: `4px solid ${C.charcoal}`, padding: 18 }}>
              <Img src={staticFile("image-vidio/c-logo.png")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{ width: 170, height: 170, background: C.white, borderRadius: 24, border: `4px solid ${C.charcoal}`, padding: 18 }}>
              <Img src={staticFile("image-vidio/logo-c++.png")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          </div>

          <div style={{ width: "90%", marginTop: 26 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONT.mono, fontWeight: 800, fontSize: 21, color: C.cyanLight, marginBottom: 8 }}>
              <span>KECEPATAN EKSEKUSI</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <IconZap size={20} color={C.yellow} />
                <span>{Math.round(speedPct)}% NATIVE</span>
              </span>
            </div>
            <div style={{ height: 26, background: "#0D141C", borderRadius: 999, border: `3px solid ${C.cyanLight}`, overflow: "hidden" }}>
              <div style={{ width: `${speedPct}%`, height: "100%", background: C.green }} />
            </div>
          </div>
        </ExplainCard>

        {/* Beat 2 (132..230): RAM Pointer Error -> Crash */}
        <ExplainCard
          at={132}
          until={230}
          w={840}
          h={440}
          y={670}
          bg="#1E1318"
          accent={C.red}
          badge="ILUSTRASI ERROR MEMORI"
          badgeIcon={<IconAlert size={20} color={C.white} />}
          badgeBg={C.red}
          dark
        >
          <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 21, color: C.yellow, marginBottom: 16 }}>
            RAM MEMORY BLOCKS (POINTER AKSES SALAH ALAMAT)
          </div>
          <div style={{ display: "flex", gap: 16, width: "100%", justifyContent: "center" }}>
            {RAM_SLOTS.map((s, idx) => {
              const bad = idx === 1 && isErrorHit;
              return (
                <div
                  key={s.addr}
                  style={{
                    width: 150,
                    height: 145,
                    borderRadius: 20,
                    border: `4px solid ${bad ? C.red : C.cyanLight}`,
                    background: bad ? "#5A1620" : "#0D141C",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    transform: bad ? `scale(${1 + Math.sin(frame * 0.7) * 0.05})` : undefined,
                  }}
                >
                  <div style={{ fontFamily: FONT.mono, fontSize: 18, color: C.cyanLight }}>{s.addr}</div>
                  <div style={{ fontFamily: FONT.mono, fontWeight: 900, fontSize: 22, color: idx === 1 ? C.red : C.white, display: "flex", alignItems: "center", gap: 6 }}>
                    {bad && <IconAlert size={20} color={C.red} />}
                    <span>{bad ? "CRASH!" : s.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              marginTop: 20,
              fontFamily: FONT.mono,
              fontWeight: 900,
              fontSize: 24,
              color: isErrorHit ? C.red : C.yellow,
              transform: `translateX(${lerp(ptrX, [0, 1], [-120, -85])}px)`,
            }}
          >
            - ptr mengakses memori kosong (0x02)!
          </div>
        </ExplainCard>

        {/* Beat 3 (230..294): Security Breach Visualization */}
        <ExplainCard
          at={230}
          w={840}
          h={440}
          y={670}
          bg="#1E1318"
          accent={C.yellow}
          badge="CELAH KEAMANAN"
          badgeIcon={<IconUnlock size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
          dark
        >
          <div style={{ display: "flex", alignItems: "center", gap: 38, position: "relative", width: "100%", justifyContent: "center" }}>
            <div style={{ transform: `scale(${spr(frame, 232)})` }}>
              <IconUnlock size={92} color={C.red} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 46 }}>
              <div style={{ width: 22, height: 78, background: C.cyan, borderRadius: 8 }} />
              <div style={{ width: 22, height: 78, background: C.cyan, borderRadius: 8 }} />
            </div>
            <div style={{ fontFamily: FONT.mono, fontWeight: 900, fontSize: 28, color: C.red }}>
              DATA BOCOR!
            </div>
            <div
              style={{
                position: "absolute",
                transform: `translateX(${exploitX}px)`,
                background: C.red,
                color: C.white,
                fontFamily: FONT.mono,
                fontWeight: 900,
                fontSize: 21,
                padding: "8px 18px",
                borderRadius: 999,
                border: `3px solid ${C.white}`,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <IconBug size={22} color={C.white} />
              <span>EXPLOIT</span>
              <IconArrowRight size={20} color={C.white} />
            </div>
          </div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 25, color: C.yellow, marginTop: 18 }}>
            Bug memori bisa dimanfaatkan peretas!
          </div>
        </ExplainCard>

        {/* Bottom Meme Reactions synced to VO beats */}
        <MemeSticker
          src="memes/yare_yare.jpg"
          x={680}
          y={1145}
          w={215}
          h={215}
          at={52}
          until={132}
          rotate={4}
          accent={C.yellow}
        />
        <MemeSticker
          src="memes/patrick_jug.jpg"
          x={555}
          y={1145}
          w={265}
          h={245}
          at={138}
          until={188}
          rotate={-5}
          accent={C.yellow}
        />
        <MemeSticker
          src="memes/gak_beres.jpg"
          x={805}
          y={1145}
          w={265}
          h={245}
          at={186}
          until={232}
          rotate={4}
          accent={C.red}
        />
        <MemeSticker
          src="memes/merinding.jpg"
          x={680}
          y={1145}
          w={355}
          h={350}
          at={234}
          rotate={-3}
          accent={C.cyanLight}
        />

        <DevtrineMascot
          x={205}
          y={1215 + Math.sin(frame * 0.18) * 7}
          size={130}
          expression={isCrash ? "interrogated" : "cool"}
          sunglasses={!isCrash}
          angerVein={isCrash}
          sweat={isCrash ? 1 : 0}
          blink={autoBlink(frame, 12)}
          lookX={0.5}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={132} color={C.red} max={0.3} />

      <Subtitles
        cues={[
          { from: 10, to: 128, text: "Karena bahasa seperti C dan C++ memang cepat,", hi: ["C", "C++", "cepat,"] },
          { from: 134, to: 228, text: "tapi punya risiko error memori yang bisa bikin program crash", hi: ["risiko", "error", "memori", "crash"] },
          { from: 228, to: 288, text: "bahkan membuka celah keamanan.", hi: ["celah", "keamanan."] },
        ]}
      />

      <Sfx name="vine_boom" at={52} volume={0.9} duration={26} />
      <Sfx name="error_buzzer" at={134} volume={0.9} duration={22} />
      <Sfx name="bruh" at={186} volume={0.9} duration={15} />
      <Sfx name="sus" at={234} volume={0.9} duration={29} />
    </Background>
  );
};
