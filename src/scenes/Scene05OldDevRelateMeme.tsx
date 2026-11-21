import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconArrowRight, IconCheck } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

export const Scene05OldDevRelateMeme: React.FC = () => {
  const frame = useCurrentFrame();
  const isRelate = frame >= 135;

  const shk = shake(frame, 135, 16, 10);
  const camScale = keys(frame, [0, 64, 135, 152, 186], [1, 1.03, 1.08, 1.03, 1.04]);

  const card1Pop = spr(frame, 18, { damping: 11, stiffness: 205 });
  const card2Pop = spr(frame, 66, { damping: 11, stiffness: 205 });
  const stampPop = spr(frame, 135, { damping: 9, stiffness: 245 });

  const mascotX = keys(frame, [0, 66, 135, 186], [560, 470, 520, 540]);
  const laughBounce = isRelate ? Math.abs(Math.sin(frame * 0.45)) * -24 : Math.sin(frame * 0.16) * 6;

  return (
    <Background variant="dotMatrix" drift={1.0}>
      <Camera scale={camScale} x={shk.x} y={shk.y} focusX={540} focusY={725}>
        <Header
          title="Dev Zaman Dulu: Bikin Sendiri!"
          highlight={["Zaman", "Dulu:", "Bikin", "Sendiri!"]}
        />

        <ExplainCard at={4} w={960} h={610} y={725} tape>
          <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px" }}>
            {/* Left: Masalah */}
            <div
              style={{
                width: 360,
                height: 390,
                background: "#FFFFFF",
                border: "2px solid rgba(0, 115, 161, 0.22)",
                borderRadius: 26,
                padding: 20,
                boxShadow: "0 16px 32px rgba(4, 21, 39, 0.10)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                transform: `scale(${card1Pop})`,
              }}
            >
              <div style={{ width: 250, height: 250, overflow: "hidden" }}>
                <Img
                  src={staticFile("memes/well_well.jpg")}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 34, color: C.charcoal }}>
                Nggak Cocok?
              </div>
            </div>

            <IconArrowRight size={56} color={C.camelGold} />

            {/* Right: Bikin Sendiri */}
            <div
              style={{
                width: 360,
                height: 390,
                background: C.perlDeep,
                border: `3px solid ${C.camelGold}`,
                borderRadius: 26,
                padding: 20,
                boxShadow: "0 20px 42px rgba(4, 21, 39, 0.28)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                transform: `scale(${frame >= 66 ? card2Pop : 0.9})`,
                opacity: frame >= 66 ? 1 : 0.3,
              }}
            >
              <div
                style={{
                  width: 210,
                  height: 210,
                  borderRadius: 22,
                  background: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 18,
                }}
              >
                <Img
                  src={staticFile("image-vidio/perl/perl-logo.svg")}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 36, color: C.camelGold }}>
                Bikin Sendiri!
              </div>
            </div>

            {isRelate && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: 8,
                  transform: `translateX(-50%) scale(${stampPop}) rotate(-3deg)`,
                  background: C.camelGold,
                  color: C.perlDeep,
                  border: `4px solid ${C.perlDeep}`,
                  borderRadius: 20,
                  padding: "12px 36px",
                  fontFamily: FONT.sans,
                  fontWeight: 900,
                  fontSize: 44,
                  boxShadow: "0 20px 40px rgba(4,21,39,0.4)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  whiteSpace: "nowrap",
                  zIndex: 30,
                }}
              >
                <IconCheck size={38} color={C.perlDeep} />
                <span>RELATE?!</span>
              </div>
            )}
          </div>
        </ExplainCard>

        <MemeSticker src="memes/gigachad_draw.jpg" x={205} y={1245} w={270} h={250} at={21} until={134} rotate={-5} />
        <MemeSticker src="memes/kelas_king.jpg" x={875} y={1245} w={270} h={250} at={135} rotate={5} />

        <DevtrineMascot
          x={mascotX}
          y={1245 + laughBounce}
          size={156}
          expression={
            frame < 66
              ? "annoyed"
              : frame < 135
                ? "cool"
                : frame < 160
                  ? "happy"
                  : "laughing"
          }
          angerVein={frame < 66}
          sunglasses={frame >= 66 && frame < 135}
          headband={frame >= 66 && frame < 135}
          tears={frame >= 160 ? 1 : 0}
          blink={autoBlink(frame, 14)}
          rotate={Math.sin(frame * 0.25) * 6}
          lookX={frame < 66 ? -0.35 : frame < 135 ? 0.35 : 0}
          lookY={isRelate ? -0.15 : -0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={135} color={C.camelSand} max={0.28} />

      <Subtitles
        cues={[
          { from: 21, to: 124, text: "Developer zaman dulu kalau nggak cocok sama tools, solusinya bikin sendiri.", hi: ["nggak", "cocok", "bikin", "sendiri."] },
          { from: 135, to: 176, text: "Relate banget nggak?!", hi: ["Relate", "banget", "nggak?!"] },
        ]}
      />

      <Sfx name="pop" at={21} volume={0.85} />
      <Sfx name="ka_ching" at={66} volume={0.85} duration={24} />
      <Sfx name="meme_bonk" at={135} volume={0.9} duration={14} />
      <Sfx name="hahahaha" at={162} volume={0.8} duration={22} />
    </Background>
  );
};
