import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconHelp } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

export const Scene04MakeOwnLanguage: React.FC = () => {
  const frame = useCurrentFrame();
  const isEureka = frame >= 58;

  const shk = shake(frame, 58, 18, 12);
  const camScale = keys(frame, [0, 44, 58, 74, 121], [1, 1.03, 1.09, 1.03, 1.05]);

  const mascotX = keys(frame, [0, 44, 58, 84, 121], [540, 590, 470, 510, 540]);
  const hop = frame >= 58 && frame < 76 ? Math.sin(((frame - 58) / 18) * Math.PI) * -40 : 0;

  const thinkPop = spr(frame, 10, { damping: 12, stiffness: 195 });
  const eurekaPop = spr(frame, 58, { damping: 10, stiffness: 220 });

  return (
    <Background variant="luaNight" drift={1.1}>
      <Camera scale={camScale} x={shk.x} y={shk.y} focusX={540} focusY={725}>
        <Header
          title={isEureka ? "Bikin Bahasa Sendiri?!" : "Larry Pun Berpikir..."}
          highlight={isEureka ? ["Bikin", "Bahasa", "Sendiri?!"] : ["Larry", "Berpikir..."]}
          tone="dark"
        />

        <ExplainCard at={4} w={960} h={610} y={725} dark>
          {!isEureka ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 48,
                transform: `scale(${thinkPop})`,
              }}
            >
              <div
                style={{
                  width: 280,
                  height: 320,
                  borderRadius: 26,
                  overflow: "hidden",
                  border: "3px solid rgba(56, 189, 248, 0.45)",
                  boxShadow: "0 20px 44px rgba(0,0,0,0.4)",
                }}
              >
                <Img
                  src={staticFile("image-vidio/perl/larry-wall.jpg")}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%" }}
                />
              </div>

              <IconHelp size={180} color={C.camelGold} />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 28,
                transform: `scale(${eurekaPop})`,
              }}
            >
              <div
                style={{
                  width: 230,
                  height: 230,
                  borderRadius: 32,
                  background: "#FFFFFF",
                  padding: 24,
                  boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Img
                  src={staticFile("image-vidio/perl/perl-logo.svg")}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>

              <div
                style={{
                  background: C.camelGold,
                  color: C.perlDeep,
                  borderRadius: 22,
                  padding: "16px 38px",
                  fontFamily: FONT.sans,
                  fontWeight: 900,
                  fontSize: 48,
                  letterSpacing: "-0.03em",
                  boxShadow: "0 18px 36px rgba(245, 158, 11, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <span>BIKIN SENDIRI!</span>
              </div>
            </div>
          )}
        </ExplainCard>

        <MemeSticker src="memes/berpikir.jpg" x={205} y={1245} w={255} h={235} at={8} until={57} rotate={-5} />
        <MemeSticker src="memes/him-cook.jpg" x={875} y={1245} w={270} h={260} at={58} rotate={4} />

        <DevtrineMascot
          x={mascotX}
          y={1245 + hop + Math.sin(frame * 0.18) * 6}
          size={156}
          expression={isEureka ? "shocked" : "curious"}
          headband={isEureka}
          blink={autoBlink(frame, 10)}
          rotate={isEureka ? Math.sin(frame * 0.25) * 6 : -4}
          lookX={isEureka ? 0.35 : -0.25}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={58} color={C.camelSand} max={0.35} />

      <Subtitles
        cues={[
          { from: 12, to: 48, text: "Akhirnya, dia berpikir...", hi: ["Akhirnya,", "berpikir..."] },
          { from: 58, to: 115, text: "kenapa nggak bikin bahasa sendiri aja?!", hi: ["bikin", "bahasa", "sendiri", "aja?!"] },
        ]}
      />

      <Sfx name="sus" at={10} volume={0.85} duration={36} />
      <Sfx name="vine_boom" at={58} volume={0.95} />
      <Sfx name="level_up" at={64} volume={0.75} duration={44} />
    </Background>
  );
};
