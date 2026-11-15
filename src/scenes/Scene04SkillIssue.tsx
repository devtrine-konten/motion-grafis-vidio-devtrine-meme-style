import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { keys, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconHelp, IconPlus, IconShield, IconZap } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

export const Scene04SkillIssue: React.FC = () => {
  const frame = useCurrentFrame();
  const shk = shake(frame, 10, 14, 8);
  const camScale = keys(frame, [0, 20, 90], [1, 1.04, 1.07]);
  const tilt = Math.sin(frame * 0.25) * 10;
  const qScale = 1 + Math.sin(frame * 0.22) * 0.08;

  return (
    <Background variant="warm" drift={1.0}>
      <Camera scale={camScale} x={shk.x} y={shk.y} focusX={540} focusY={860}>
        <Header
          kicker="PERTANYAAN BESAR · EP.02"
          title="Kenapa Rust Diciptakan?!"
          highlight={["Kenapa", "Diciptakan?!"]}
        />

        <ExplainCard
          at={6}
          w={840}
          h={430}
          y={670}
          accent={C.red}
          badge="MASALAH DI BAHASA SISTEM"
          badgeIcon={<IconHelp size={20} color={C.red} />}
          badgeBg={C.yellow}
        >
          <div style={{ transform: `scale(${qScale})` }}>
            <IconHelp size={96} color={C.red} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 18 }}>
            <div
              style={{
                background: C.yellow,
                border: `4px solid ${C.charcoal}`,
                borderRadius: 18,
                padding: "12px 24px",
                fontFamily: FONT.sans,
                fontWeight: 900,
                fontSize: 28,
                color: C.charcoal,
                display: "flex",
                alignItems: "center",
                gap: 10,
                transform: `scale(${spr(frame, 18)})`,
              }}
            >
              <IconZap size={28} color={C.charcoal} />
              <span>CEPAT</span>
            </div>
            <IconPlus size={30} color={C.charcoal} />
            <div
              style={{
                background: C.green,
                border: `4px solid ${C.charcoal}`,
                borderRadius: 18,
                padding: "12px 24px",
                fontFamily: FONT.sans,
                fontWeight: 900,
                fontSize: 28,
                color: C.charcoal,
                display: "flex",
                alignItems: "center",
                gap: 10,
                transform: `scale(${spr(frame, 32)})`,
              }}
            >
              <IconShield size={28} color={C.charcoal} />
              <span>AMAN</span>
            </div>
          </div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 25, color: "#4B5563", marginTop: 18 }}>
            Bisa nggak keduanya jalan barengan?
          </div>
        </ExplainCard>

        {/* Bottom Meme Reactions */}
        <MemeSticker
          src="memes/coba_jelaskan.jpg"
          x={555}
          y={1145}
          w={265}
          h={245}
          at={12}
          until={52}
          rotate={-4}
          accent={C.red}
        />
        <MemeSticker
          src="memes/loading_girl.jpg"
          x={805}
          y={1145}
          w={265}
          h={245}
          at={46}
          rotate={4}
          accent={C.cyan}
        />

        <DevtrineMascot
          x={205}
          y={1215}
          size={130}
          expression="detective"
          magnifyingGlass
          rotate={tilt}
          lookX={0.5}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Subtitles
        cues={[
          { from: 8, to: 46, text: "Terus, kenapa sih", hi: ["kenapa", "sih"] },
          { from: 46, to: 85, text: "Rust diciptakan?", hi: ["Rust", "diciptakan?"] },
        ]}
      />

      <Sfx name="sus" at={8} volume={0.9} duration={20} />
      <Sfx name="vine_boom" at={46} volume={0.9} duration={20} />
    </Background>
  );
};
