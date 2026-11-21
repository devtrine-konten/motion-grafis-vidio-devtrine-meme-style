import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { autoBlink, keys, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";
import { C } from "../theme";

export const Scene07AmazonMorganStanley: React.FC = () => {
  const frame = useCurrentFrame();

  const shk1 = shake(frame, 26, 12, 8);
  const shk2 = shake(frame, 56, 12, 8);
  const camScale = keys(frame, [0, 26, 56, 100, 144], [1, 1.04, 1.06, 1.03, 1.02]);

  const amzPop = spr(frame, 24, { damping: 11, stiffness: 210 });
  const msPop = spr(frame, 54, { damping: 11, stiffness: 210 });

  const mascotX = keys(frame, [0, 26, 56, 100, 144], [540, 470, 590, 520, 540]);
  const hop =
    (frame >= 26 && frame < 42 ? Math.sin(((frame - 26) / 16) * Math.PI) * -28 : 0) +
    (frame >= 56 && frame < 72 ? Math.sin(((frame - 56) / 16) * Math.PI) * -28 : 0);

  return (
    <Background variant="voxPaper" drift={1.0}>
      <Camera scale={camScale} x={shk1.x + shk2.x} y={shk1.y + shk2.y} focusX={540} focusY={725}>
        <Header
          title="Dipakai Amazon & Morgan Stanley!"
          highlight={["Amazon", "Morgan", "Stanley!"]}
        />

        <ExplainCard at={4} w={960} h={610} y={725} tape>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26, width: "100%", height: "100%", padding: "12px 6px" }}>
            {/* Left: Amazon Logo */}
            <div
              style={{
                background: "#FFFFFF",
                border: "2.5px solid rgba(0, 115, 161, 0.24)",
                borderRadius: 28,
                padding: 32,
                boxShadow: "0 20px 42px rgba(4, 21, 39, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${frame >= 24 ? amzPop : 0.88})`,
                opacity: frame >= 24 ? 1 : 0.25,
              }}
            >
              <Img
                src={staticFile("image-vidio/perl/amazon-logo.svg")}
                style={{ width: "92%", height: 180, objectFit: "contain" }}
              />
            </div>

            {/* Right: Morgan Stanley Logo */}
            <div
              style={{
                background: "#FFFFFF",
                border: `3px solid ${frame >= 54 ? C.camelGold : "rgba(0, 115, 161, 0.24)"}`,
                borderRadius: 28,
                padding: 32,
                boxShadow: "0 20px 42px rgba(4, 21, 39, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${frame >= 54 ? msPop : 0.88})`,
                opacity: frame >= 54 ? 1 : 0.25,
              }}
            >
              <Img
                src={staticFile("image-vidio/perl/morgan-stanley-logo.svg")}
                style={{ width: "96%", height: 180, objectFit: "contain" }}
              />
            </div>
          </div>
        </ExplainCard>

        <MemeSticker src="memes/reaksi_gue.jpg" x={205} y={1245} w={255} h={235} at={24} until={69} rotate={-5} />
        <MemeSticker src="memes/survei.jpg" x={875} y={1245} w={270} h={250} at={70} rotate={4} />

        <DevtrineMascot
          x={mascotX}
          y={1245 + hop + Math.sin(frame * 0.16) * 6}
          size={156}
          expression="cool"
          sunglasses
          blink={autoBlink(frame, 10)}
          rotate={Math.sin(frame * 0.14) * 5}
          lookX={frame < 56 ? -0.3 : 0.3}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={26} color={C.perlIce} max={0.22} />

      <Subtitles
        cues={[
          { from: 9, to: 24, text: "Bahkan,", hi: ["Bahkan,"] },
          { from: 27, to: 135, text: "Amazon dan Morgan Stanley pernah menggunakan Perl untuk kebutuhan sistem mereka!", hi: ["Amazon", "Morgan", "Stanley", "Perl"] },
        ]}
      />

      <Sfx name="pop" at={10} volume={0.8} />
      <Sfx name="ka_ching" at={26} volume={0.9} duration={24} />
      <Sfx name="vine_boom" at={56} volume={0.85} />
    </Background>
  );
};
