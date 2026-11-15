import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, easeOutBack, keys, lerp, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconAlert, IconCode, IconGear, IconXCircle } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

const CODE_LINE = 'println!("Halo, Rust!");';

export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const isJoke = frame >= 118;

  const jumpUp = lerp(frame, [0, 18], [1560, 1215], easeOutBack);
  const flipRot = frame < 18 ? lerp(frame, [0, 18], [360, 0]) : Math.sin(frame * 0.14) * 4;
  const laughBounce = frame >= 168 ? Math.abs(Math.sin((frame - 168) * 0.45)) * -24 : 0;

  const shk = shake(frame, 24, 14, 8);
  const shk2 = shake(frame, 120, 18, 10);
  const camScale = keys(frame, [0, 24, 118, 128, 192], [1, 1.04, 1.01, 1.06, 1.02]);

  const typed = CODE_LINE.slice(0, Math.max(0, Math.floor((frame - 36) * 0.7)));
  const xPop = spr(frame, 130, { damping: 9, stiffness: 240 });

  return (
    <Background variant="warm" drift={1.0}>
      <Camera scale={camScale} x={shk.x + shk2.x} y={shk.y + shk2.y} focusX={540} focusY={860}>
        <Header
          kicker="SEJARAH BAHASA PEMROGRAMAN · EP.02"
          title="Pernah Dengar Bahasa Rust?!"
          highlight={["Bahasa", "Rust?!"]}
        />

        {/* Explanatory Animation 1 (18..118): Rust Logo + Gear + Typing Code */}
        <ExplainCard
          at={18}
          until={118}
          w={840}
          h={440}
          y={670}
          bg="#161B22"
          accent="#FF6B35"
          badge="BAHASA PEMROGRAMAN RUST"
          badgeIcon={<IconGear size={22} color={C.charcoal} />}
          badgeBg={C.yellow}
        >
          <div style={{ position: "relative", width: 195, height: 195, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={195} height={195} viewBox="-100 -100 200 200" style={{ position: "absolute", transform: `rotate(${frame * 1.1}deg)` }}>
              <circle r={88} fill="none" stroke="#FF6B35" strokeWidth={8} strokeDasharray="18 13" opacity={0.6} />
            </svg>
            <Img src={staticFile("image-vidio/logo-rust.png")} style={{ width: 145, height: 145, objectFit: "contain" }} />
          </div>
          <div
            style={{
              marginTop: 18,
              background: "#0D1117",
              border: `3px solid ${C.cyan}`,
              borderRadius: 16,
              padding: "12px 24px",
              fontFamily: FONT.mono,
              fontWeight: 800,
              fontSize: 26,
              color: C.cyanLight,
              width: "92%",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <IconCode size={26} color={C.green} />
            <span>
              <span style={{ color: "#FF6B35" }}>fn</span> main() {"{ "}
              <span style={{ color: C.yellow }}>{typed}</span>
              <span style={{ opacity: frame % 14 < 7 ? 1 : 0 }}>|</span>
              {" }"}
            </span>
          </div>
        </ExplainCard>

        {/* Bottom Reaction Memes during Beat 1 (sequential like reference video!) */}
        <MemeSticker
          src="memes/iki_opo.jpg"
          x={555}
          y={1145}
          w={270}
          h={250}
          at={42}
          until={80}
          rotate={-5}
          accent={C.cyan}
        />
        <MemeSticker
          src="memes/reaksi_gue.jpg"
          x={805}
          y={1145}
          w={270}
          h={250}
          at={78}
          until={118}
          rotate={5}
          accent={C.yellow}
        />

        {/* Beat 2 (118..192): Joke Cutaway — Bukan Karat di Pagar Rumah */}
        <MemeSticker
          src="memes/pagar_cicak.jpg"
          x={540}
          y={670}
          w={600}
          h={430}
          at={118}
          until={192}
          accent={C.red}
          badge="BUKAN KARAT PAGAR RUMAH"
          badgeIcon={<IconXCircle size={22} color={C.white} />}
          badgeBg={C.red}
        />
        {frame >= 130 && (
          <div
            style={{
              position: "absolute",
              left: 540,
              top: 670,
              transform: `translate(-50%, -50%) scale(${xPop}) rotate(-10deg)`,
              border: `7px solid ${C.red}`,
              borderRadius: 18,
              padding: "8px 26px",
              background: "rgba(20, 20, 20, 0.86)",
              color: C.red,
              fontFamily: FONT.mono,
              fontWeight: 900,
              fontSize: 42,
              display: "flex",
              alignItems: "center",
              gap: 12,
              zIndex: 30,
            }}
          >
            <IconAlert size={40} color={C.red} />
            <span>BUKAN INI!</span>
          </div>
        )}

        {/* WKWK Meme Reaction beside Devtrine */}
        <MemeSticker
          src="memes/malu_tuh.jpg"
          x={680}
          y={1150}
          w={290}
          h={260}
          at={154}
          rotate={4}
          accent={C.yellow}
        />

        <DevtrineMascot
          x={205}
          y={jumpUp + laughBounce}
          size={130}
          expression={!isJoke ? "cool" : frame < 168 ? "deadpan" : "laughing"}
          sunglasses={!isJoke}
          angerVein={isJoke && frame < 168}
          tears={frame >= 168 ? 1 : 0}
          blink={autoBlink(frame, 10)}
          rotate={flipRot}
          lookX={0.5}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={118} color={C.yellow} max={0.3} />

      <Subtitles
        cues={[
          { from: 4, to: 35, text: "Guys!", hi: ["Guys!"] },
          { from: 35, to: 116, text: "Kalian pernah dengar bahasa pemrograman Rust?", hi: ["pernah", "bahasa", "Rust?"] },
          { from: 120, to: 173, text: "Bukan karat di pagar rumah, ya!", hi: ["Bukan", "karat", "pagar"] },
          { from: 173, to: 191, text: "WKWK!", hi: ["WKWK!"] },
        ]}
      />

      <Sfx name="vine_boom" at={20} volume={0.9} duration={20} />
      {/* <Sfx name="sus" at={42} volume={0.85} duration={18} /> */}
      <Sfx name="sus" at={78} volume={0.85} duration={16} />
      <Sfx name="error_buzzer" at={118} volume={0.85} duration={18} />
      <Sfx name="goofy_horn" at={154} volume={0.9} duration={20} />
    </Background>
  );
};
