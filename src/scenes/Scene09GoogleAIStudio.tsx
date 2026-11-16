import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { keys, shake } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconAlert, IconTerminal } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

const ERR_MSG = "error[E0382]: borrow of moved value: `x`";

export const Scene09GoogleAIStudio: React.FC = () => {
  const frame = useCurrentFrame();
  const shk = shake(frame, 112, 16, 10);
  const camScale = keys(frame, [0, 56, 112, 195], [1, 1.03, 1.06, 1.02]);
  const typedErr = ERR_MSG.slice(0, Math.max(0, Math.floor((frame - 16) * 0.9)));

  return (
    <Background variant="spotlight" drift={1.0}>
      <Camera scale={camScale} x={shk.x} y={shk.y} focusX={540} focusY={860}>
        <Header
          kicker="SUKA DUKA RUST"
          title="Diinterogasi Compiler Rust!"
          highlight={["Diinterogasi", "Compiler"]}
          tone="dark"
        />

        {/* Beat 1 (8..112): Compiler Interrogation Terminal */}
        <ExplainCard
          at={8}
          until={112}
          w={840}
          h={425}
          y={670}
          bg="#1B1316"
          accent={C.red}
          badge="INTEROGASI COMPILER"
          badgeBg={C.red}
          dark
        >
          <IconTerminal size={74} color={C.yellow} />
          <div
            style={{
              width: "92%",
              marginTop: 18,
              background: "#0D0F12",
              border: `3px solid ${C.red}`,
              borderRadius: 16,
              padding: "18px 22px",
              fontFamily: FONT.mono,
              fontWeight: 800,
              fontSize: 23,
              color: C.red,
              textAlign: "left",
            }}
          >
            <div>{typedErr}<span style={{ opacity: frame % 12 < 6 ? 1 : 0 }}>|</span></div>
            <div style={{ color: C.yellow, marginTop: 12, fontSize: 21 }}>
              rustc: &quot;SIAPA PEMILIK DATA INI?! JELASKAN!!&quot;
            </div>
          </div>
        </ExplainCard>

        {/* Beat 2 (112..195): Meme Cutaway Center */}
        <MemeSticker
          src="memes/tertawa_terluka.jpg"
          x={540}
          y={670}
          w={470}
          h={475}
          at={112}
          accent={C.yellow}
          badgeBg={C.yellow}
        />

        {/* Bottom Meme Reactions synced to VO */}
        <MemeSticker
          src="memes/interogasi.jpg"
          x={680}
          y={1145}
          w={275}
          h={245}
          at={34}
          until={112}
          rotate={-4}
          accent={C.red}
        />
        <MemeSticker
          src="memes/trauma_berat.jpg"
          x={680}
          y={1145}
          w={285}
          h={250}
          at={126}
          rotate={4}
          accent="#FF6B35"
        />

        <DevtrineMascot
          x={205}
          y={1215}
          size={130}
          expression={frame < 168 ? "interrogated" : "laughing"}
          angerVein={frame < 168}
          sweat={1}
          tears={frame >= 168 ? 1 : 0}
          frame={frame}
          shadow
        />
      </Camera>

      <Subtitles
        cues={[
          { from: 6, to: 54, text: "Walaupun ya...", hi: ["Walaupun"] },
          { from: 56, to: 172, text: "belajar Rust kadang bikin programmer merasa sedang diinterogasi sama compiler!", hi: ["belajar", "diinterogasi", "compiler!"] },
          { from: 172, to: 192, text: "WKWKWK!", hi: ["WKWKWK!"] },
        ]}
      />

      <Sfx name="sus" at={10} volume={0.9} duration={22} />
      <Sfx name="vine_boom" at={112} volume={0.95} duration={18} />
      <Sfx name="bruh" at={130} volume={0.9} duration={15} />
    </Background>
  );
};
