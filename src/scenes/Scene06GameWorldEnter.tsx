import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, easeOutBack, keys, lerp, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard, MiniCharacter } from "../components/Explainers";
import { IconGamepad, IconZap } from "../components/Icons";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

export const Scene06GameWorldEnter: React.FC = () => {
  const frame = useCurrentFrame();
  const shk = shake(frame, 12, 16, 10);
  const camScale = keys(frame, [0, 14, 45, 90], [0.97, 1.07, 1.03, 1.05]);
  const barPct = lerp(frame, [10, 62], [0, 100]);
  const mascotX = keys(frame, [0, 22, 90], [280, 560, 520]);
  const jumpY = lerp(frame, [0, 22], [1560, 1245], easeOutBack);
  const bounce = Math.abs(Math.sin(frame * 0.35)) * -20;
  const iconPop = spr(frame, 12, { damping: 10, stiffness: 220 });
  const headPop = spr(frame, 4, { damping: 12, stiffness: 200 });

  return (
    <Background variant="dotMatrix" drift={1.4} watermark="GAME">
      <Camera scale={camScale} x={shk.x} y={shk.y} focusX={540} focusY={725}>
        <div
          style={{
            position: "absolute",
            top: 112,
            left: 56,
            right: 56,
            textAlign: "center",
            transform: `scale(${headPop})`,
          }}
        >
          <div
            style={{
              fontFamily: FONT.mono,
              fontWeight: 800,
              fontSize: 28,
              color: C.luaBlue,
              letterSpacing: "0.1em",
            }}
          >
            NEXT LEVEL
          </div>
          <div
            style={{
              fontFamily: FONT.sans,
              fontWeight: 900,
              fontSize: 82,
              color: C.luaNavy,
              letterSpacing: "-0.04em",
              lineHeight: 0.98,
              marginTop: 8,
            }}
          >
            Masuk ke Dunia Game!
          </div>
        </div>

        <ExplainCard
          at={10}
          w={960}
          h={620}
          y={725}
          badge="LEVEL UP · GAME ENGINE"
          badgeIcon={<IconZap size={18} color={C.charcoal} />}
          watermark="GAME MODE"
          dark
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 34, width: "100%", position: "relative" }}>
            <div style={{ position: "relative", width: "100%", height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MiniCharacter kind="player" x={210} y={130} scale={1.5} running frame={frame} />
              <div
                style={{
                  transform: `scale(${iconPop}) rotate(${Math.sin(frame * 0.25) * 6}deg)`,
                  filter: "drop-shadow(0 24px 36px rgba(0,0,0,0.4))",
                }}
              >
                <IconGamepad size={185} color={C.luaSky} />
              </div>
              <MiniCharacter kind="coder" x={735} y={125} scale={1.35} running frame={frame} facing={-1} />
            </div>

            <div style={{ width: "88%", display: "flex", flexDirection: "column", gap: 14 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: FONT.mono,
                  fontWeight: 800,
                  fontSize: 24,
                  color: C.luaIce,
                  letterSpacing: "0.06em",
                }}
              >
                <span>LOADING GAME WORLD</span>
                <span>{Math.round(barPct)}%</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 28,
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: 999,
                  border: "1.5px solid rgba(219,234,254,0.30)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${barPct}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${C.luaBlue} 0%, ${C.luaSky} 60%, ${C.luaIce} 100%)`,
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>
          </div>
        </ExplainCard>

        <MemeSticker src="memes/cat_siap.jpg" x={205} y={1245} w={245} h={225} at={16} until={48} rotate={-6} />
        <MemeSticker src="memes/sudah_siap_suits.jpg" x={875} y={1245} w={275} h={235} at={44} rotate={4} />

        <DevtrineMascot
          x={mascotX}
          y={jumpY + bounce}
          size={158}
          expression="happy"
          headband
          blink={autoBlink(frame, 5)}
          rotate={Math.sin(frame * 0.25) * 6}
          lookX={0.2}
          lookY={-0.25}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={12} color={C.luaIce} max={0.3} />

      <Subtitles
        cues={[
          { from: 10, to: 84, text: "Sekarang kita masuk ke dunia game!", hi: ["dunia", "game!"] },
        ]}
      />

      <Sfx name="level_up" at={12} volume={0.85} duration={54} />
      <Sfx name="goofy_horn" at={44} volume={0.8} duration={36} />
    </Background>
  );
};
