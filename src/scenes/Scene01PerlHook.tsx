import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, easeOutBack, keys, lerp, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconArrowRight, IconHelp } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

export const Scene01PerlHook: React.FC = () => {
  const frame = useCurrentFrame();
  const isCamelRevealed = frame >= 196;

  const mascotX = keys(frame, [0, 24, 108, 132, 196, 279], [540, 540, 610, 480, 460, 540]);
  const jumpUp = lerp(frame, [0, 18], [1560, 1245], easeOutBack);
  const hop =
    (frame >= 108 && frame < 124 ? Math.sin(((frame - 108) / 16) * Math.PI) * -28 : 0) +
    (frame >= 196 && frame < 214 ? Math.sin(((frame - 196) / 18) * Math.PI) * -36 : 0);
  const flipRot = frame < 18 ? lerp(frame, [0, 18], [360, 0]) : Math.sin(frame * 0.14) * 5;

  const shk1 = shake(frame, 52, 14, 9);
  const shk2 = shake(frame, 196, 18, 12);
  const camScale = keys(frame, [0, 24, 52, 130, 196, 212, 279], [1, 1.05, 1.02, 1.04, 1.08, 1.03, 1.04]);

  const perlPop = spr(frame, 50, { damping: 11, stiffness: 210 });
  const arrowPop = spr(frame, 128, { damping: 12, stiffness: 190 });
  const rightPop = spr(frame, isCamelRevealed ? 196 : 132, { damping: 10, stiffness: 220 });
  const pulse = 1 + Math.sin(frame * 0.22) * 0.035;

  return (
    <Background variant="voxPaper" drift={1.0} polaroidMeme="memes/well_well.jpg">
      <Camera scale={camScale} x={shk1.x + shk2.x} y={shk1.y + shk2.y} focusX={540} focusY={740}>
        <Header
          kicker="SEJARAH BAHASA PEMROGRAMAN · EP.04"
          title="Bahasa Perl & Logo Onta?!"
          highlight={["Perl", "Logo", "Onta?!"]}
        />

        <ExplainCard at={10} w={960} h={610} y={725} tape>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "0 24px" }}>
            {/* Left: Huge Perl Logo */}
            <div
              style={{
                width: 350,
                height: 390,
                background: "#FFFFFF",
                border: "2px solid rgba(0, 115, 161, 0.22)",
                borderRadius: 28,
                padding: 24,
                boxShadow: "0 20px 42px rgba(4, 21, 39, 0.12)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 18,
                transform: `scale(${perlPop}) rotate(${Math.sin(frame * 0.1) * 2}deg)`,
              }}
            >
              <Img
                src={staticFile("image-vidio/perl/perl-logo.svg")}
                style={{
                  width: 225,
                  height: 225,
                  objectFit: "contain",
                  filter: "drop-shadow(0 14px 24px rgba(0,115,161,0.25))",
                }}
              />
              <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 52, color: C.perlDeep, letterSpacing: "-0.04em" }}>
                PERL
              </div>
            </div>

            {/* Center Arrow */}
            <div style={{ transform: `scale(${arrowPop})` }}>
              <IconArrowRight size={64} color={C.camelGold} />
            </div>

            {/* Right: Mystery Question -> Giant Camel Mascot */}
            <div
              style={{
                width: 350,
                height: 390,
                background: isCamelRevealed
                  ? "linear-gradient(145deg, #041527 0%, #0073A1 55%, #03537B 100%)"
                  : "linear-gradient(145deg, #0073A1 0%, #041527 100%)",
                borderRadius: 28,
                border: isCamelRevealed ? `3.5px solid ${C.camelGold}` : "2px solid rgba(56,189,248,0.35)",
                padding: 24,
                boxShadow: isCamelRevealed
                  ? "0 26px 52px rgba(245, 158, 11, 0.35)"
                  : "0 24px 48px rgba(4, 21, 39, 0.32)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                transform: `scale(${rightPop * pulse})`,
              }}
            >
              {!isCamelRevealed ? (
                <IconHelp size={150} color={C.camelGold} />
              ) : (
                <>
                  <Img
                    src={staticFile("image-vidio/perl/perl-camel-gold.svg")}
                    style={{
                      width: 215,
                      height: 215,
                      objectFit: "contain",
                      filter: "drop-shadow(0 14px 24px rgba(0,0,0,0.45))",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: FONT.sans,
                      fontWeight: 900,
                      fontSize: 50,
                      color: C.camelGold,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    ONTA?!
                  </div>
                </>
              )}
            </div>
          </div>
        </ExplainCard>

        <MemeSticker src="memes/iki_opo.jpg" x={205} y={1245} w={250} h={230} at={22} until={130} rotate={-5} />
        <MemeSticker src="memes/kaget.jpg" x={875} y={1245} w={250} h={230} at={131} until={195} rotate={5} />
        <MemeSticker src="memes/wojak_point.jpg" x={875} y={1245} w={265} h={240} at={196} rotate={4} />

        <DevtrineMascot
          x={mascotX}
          y={jumpUp + hop + Math.sin(frame * 0.16) * 7}
          size={156}
          expression={frame < 130 ? "curious" : frame < 196 ? "amazed" : "laughing"}
          magnifyingGlass={frame >= 130 && frame < 196}
          blink={autoBlink(frame, 8)}
          rotate={flipRot}
          lookX={frame < 130 ? -0.35 : 0.45}
          lookY={-0.35}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={52} color={C.perlIce} max={0.25} />
      <Flash at={196} color={C.camelSand} max={0.35} />

      <Subtitles
        cues={[
          { from: 8, to: 44, text: "Guys! Kalian tahu nggak?", hi: ["Guys!", "tahu", "nggak?"] },
          { from: 52, to: 124, text: "Ada bahasa pemrograman yang namanya Perl,", hi: ["bahasa", "pemrograman", "Perl,"] },
          { from: 130, to: 188, text: "dan ternyata punya cerita unik,", hi: ["cerita", "unik,"] },
          { from: 196, to: 268, text: "bahkan logonya onta!", hi: ["logonya", "onta!"] },
        ]}
      />

      <Sfx name="pop" at={8} volume={0.85} />
      <Sfx name="vine_boom" at={52} volume={0.9} />
      <Sfx name="what_meme" at={131} volume={0.85} duration={32} />
      <Sfx name="thud" at={196} volume={0.95} duration={40} />
      <Sfx name="meme_haha" at={248} volume={0.75} duration={28} />
    </Background>
  );
};
