import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconSparkles } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

export const Scene10ProgrammerZooMeme: React.FC = () => {
  const frame = useCurrentFrame();
  const isZoo = frame >= 98;

  const shk = shake(frame, 98, 16, 10);
  const camScale = keys(frame, [0, 56, 98, 118, 188], [1, 1.03, 1.08, 1.03, 1.04]);

  const pyPop = spr(frame, 8, { damping: 11, stiffness: 205 });
  const perlPop = spr(frame, 56, { damping: 11, stiffness: 205 });
  const zooPop = spr(frame, 98, { damping: 9, stiffness: 240 });

  const mascotX = keys(frame, [0, 56, 98, 188], [540, 470, 520, 540]);
  const laughBounce = isZoo ? Math.abs(Math.sin(frame * 0.48)) * -26 : Math.sin(frame * 0.16) * 6;

  return (
    <Background variant="dotMatrix" drift={1.0}>
      <Camera scale={camScale} x={shk.x} y={shk.y} focusX={540} focusY={725}>
        <Header
          title="Kebun Binatang Programmer?!"
          highlight={["Kebun", "Binatang", "Programmer?!"]}
        />

        <ExplainCard at={4} w={960} h={610} y={725} tape>
          <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26, width: "100%", height: "100%", padding: "10px 4px" }}>
              {/* Left: Python Snake Logo */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "2.5px solid rgba(0, 115, 161, 0.22)",
                  borderRadius: 26,
                  padding: 24,
                  boxShadow: "0 18px 36px rgba(4, 21, 39, 0.10)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                  transform: `scale(${pyPop})`,
                }}
              >
                <Img
                  src={staticFile("image-vidio/perl/python-logo.svg")}
                  style={{ width: 200, height: 200, objectFit: "contain" }}
                />
                <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 44, color: C.charcoal }}>
                  Python
                </div>
              </div>

              {/* Right: Perl Camel Logo */}
              <div
                style={{
                  background: "linear-gradient(145deg, #041527 0%, #0073A1 65%, #03537B 100%)",
                  border: `3px solid ${C.camelGold}`,
                  borderRadius: 26,
                  padding: 24,
                  boxShadow: "0 20px 42px rgba(4, 21, 39, 0.26)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                  transform: `scale(${frame >= 56 ? perlPop : 0.88})`,
                  opacity: frame >= 56 ? 1 : 0.25,
                }}
              >
                <Img
                  src={staticFile("image-vidio/perl/perl-camel-gold.svg")}
                  style={{ width: 200, height: 200, objectFit: "contain" }}
                />
                <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 44, color: C.camelGold }}>
                  Perl
                </div>
              </div>
            </div>

            {isZoo && (
              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  transform: `scale(${zooPop}) rotate(-2.5deg)`,
                  background: C.camelGold,
                  color: C.perlDeep,
                  border: `4px solid ${C.perlDeep}`,
                  borderRadius: 20,
                  padding: "12px 34px",
                  fontFamily: FONT.sans,
                  fontWeight: 900,
                  fontSize: 40,
                  boxShadow: "0 20px 40px rgba(4, 21, 39, 0.42)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  whiteSpace: "nowrap",
                  zIndex: 30,
                }}
              >
                <IconSparkles size={36} color={C.perlDeep} />
                <span>KEBUN BINATANG!</span>
              </div>
            )}
          </div>
        </ExplainCard>

        <MemeSticker src="memes/walawe.jpg" x={205} y={1245} w={265} h={250} at={12} until={97} rotate={-5} />
        <MemeSticker src="memes/pura.jpg" x={875} y={1245} w={275} h={285} at={98} rotate={4} />

        <DevtrineMascot
          x={mascotX}
          y={1245 + laughBounce}
          size={156}
          expression={isZoo ? "laughing" : "happy"}
          tears={isZoo ? 1 : 0}
          blink={autoBlink(frame, 13)}
          rotate={Math.sin(frame * 0.25) * 6}
          lookX={frame < 56 ? -0.3 : 0.3}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={98} color={C.camelSand} max={0.28} />

      <Subtitles
        cues={[
          { from: 9, to: 50, text: "Kalau Python punya ular,", hi: ["Python", "ular,"] },
          { from: 56, to: 88, text: "Perl punya onta.", hi: ["Perl", "onta."] },
          { from: 98, to: 170, text: "Programmer ternyata punya kebun binatang sendiri!", hi: ["Programmer", "kebun", "binatang", "sendiri!"] },
        ]}
      />

      <Sfx name="pop" at={9} volume={0.85} />
      <Sfx name="boing" at={56} volume={0.85} />
      <Sfx name="goofy_horn" at={98} volume={0.85} duration={34} />
      <Sfx name="meme_haha" at={154} volume={0.8} duration={30} />
    </Background>
  );
};
