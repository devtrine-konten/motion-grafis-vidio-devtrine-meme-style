import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, easeOutBack, keys, lerp, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconGamepad, IconZap } from "../components/Icons";
import { KineticText } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

export const Scene06GameWorldEnter: React.FC = () => {
  const frame = useCurrentFrame();
  const shk = shake(frame, 12, 18, 10);
  const camScale = keys(frame, [0, 14, 45, 90], [0.97, 1.07, 1.03, 1.05]);
  const barPct = lerp(frame, [10, 62], [0, 100]);
  const jumpX = lerp(frame, [0, 22], [-150, 205], easeOutBack);
  const bounce = Math.abs(Math.sin(frame * 0.35)) * -18;
  const iconPop = spr(frame, 12, { damping: 9, stiffness: 230 });

  return (
    <Background variant="luaBlue" drift={1.5}>
      <Camera scale={camScale} x={shk.x} y={shk.y} focusX={540} focusY={720}>
        <div style={{ position: "absolute", top: 150, left: 80, right: 80, textAlign: "center" }}>
          <KineticText
            text="MASUK KE DUNIA GAME!"
            start={8}
            stagger={3}
            size={74}
            color={C.white}
            variant="slam"
            highlight={["DUNIA", "GAME!"]}
            highlightColor={C.black}
          />
        </div>

        <ExplainCard
          at={10}
          w={850}
          h={420}
          y={670}
          bg={C.black}
          accent={C.yellow}
          badge="LEVEL UP · GAME ENGINE"
          badgeIcon={<IconZap size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
          dark
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22, width: "100%" }}>
            <div style={{ transform: `scale(${iconPop}) rotate(${Math.sin(frame * 0.25) * 6}deg)` }}>
              <IconGamepad size={135} color={C.luaSky} />
            </div>

            <div style={{ width: "86%", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONT.mono, fontWeight: 900, fontSize: 20, color: C.luaIce }}>
                <span>LOADING GAME MODE</span>
                <span>{Math.round(barPct)}%</span>
              </div>
              <div style={{ width: "100%", height: 26, background: "#182038", borderRadius: 999, border: `3px solid ${C.white}`, overflow: "hidden" }}>
                <div style={{ width: `${barPct}%`, height: "100%", background: C.yellow, borderRadius: 999 }} />
              </div>
            </div>
          </div>
        </ExplainCard>

        <MemeSticker
          src="memes/sudah_siap_suits.jpg"
          x={680}
          y={1145}
          w={320}
          h={260}
          at={22}
          rotate={3}
          accent={C.yellow}
        />

        <DevtrineMascot
          x={jumpX}
          y={1210 + bounce}
          size={135}
          expression="happy"
          headband
          blink={autoBlink(frame, 5)}
          lookX={0.5}
          lookY={-0.25}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={12} color={C.luaIce} max={0.28} />

      <Subtitles
        cues={[
          { from: 10, to: 84, text: "Sekarang kita masuk ke dunia game!", hi: ["dunia", "game!"] },
        ]}
      />

      <Sfx name="level_up" at={12} volume={0.85} duration={48} />
    </Background>
  );
};
