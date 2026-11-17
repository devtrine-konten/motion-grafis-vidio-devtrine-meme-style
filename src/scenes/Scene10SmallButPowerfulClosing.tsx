import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { keys, rand, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconCheck, IconFlame, IconUserPlus } from "../components/Icons";
import { Header, KineticText, Pill } from "../components/KineticTypography";
import { MemeText } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

const CONFETTI = Array.from({ length: 18 }, (_, i) => ({
  ang: (i / 18) * Math.PI * 2,
  dist: 170 + rand(i * 5) * 280,
  col: i % 3 === 0 ? C.luaSky : i % 2 === 0 ? C.yellow : C.white,
  rot: rand(i * 9) * 360,
}));

export const Scene10SmallButPowerfulClosing: React.FC = () => {
  const frame = useCurrentFrame();
  // Part A (0..158): "Jadi, jangan remehkan bahasa pemrograman yang satu ini. Kecil-kecil cabe rawit!"
  // Part B (158..306): "Follow Devtrine Studio buat fakta teknologi unik lainnya!"
  const isOutro = frame >= 158;

  const shk1 = shake(frame, 105, 18, 10);
  const shkOutro = shake(frame, 162, 14, 9);
  const camScale = keys(frame, [0, 105, 158, 236, 306], [1, 1.06, 1, 1.03, 1.05]);

  const dogePop = spr(frame, 18, { damping: 11, stiffness: 200 });
  const stampPop = spr(frame, 105, { damping: 9, stiffness: 240 });

  const logoPop = spr(frame, 164, { damping: 10, stiffness: 175 });
  const ctaPop = spr(frame, 198, { damping: 10, stiffness: 190 });
  const btnPress = frame >= 236 && frame < 246 ? 0.9 : 1;
  const bounceY = Math.abs(Math.sin(frame * 0.22)) * -15;

  return (
    <Background variant={isOutro ? "luaNight" : "noir"} drift={1.0}>
      <Camera scale={camScale} x={shk1.x + shkOutro.x} y={shk1.y + shkOutro.y} focusX={540} focusY={840}>
        {/* PART A (0..158): Meme "Small but powerful" / Kecil-kecil cabe rawit! */}
        {!isOutro && (
          <>
            <Header
              kicker="KESIMPULAN · EP.03"
              title="Kecil-Kecil Cabe Rawit!"
              highlight={["Kecil-Kecil", "Cabe", "Rawit!"]}
              tone="dark"
            />

            <ExplainCard
              at={6}
              w={870}
              h={475}
              y={680}
              bg={C.paper}
              accent={C.luaBlue}
              badge="SMALL BUT POWERFUL"
              badgeIcon={<IconFlame size={20} color={C.charcoal} />}
              badgeBg={C.yellow}
              tape
            >
              <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "relative", width: "92%", height: 325, transform: `scale(${dogePop})` }}>
                  <Img
                    src={staticFile("memes/small_but_powerful.png")}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                  {/* Labels on Buff Doge (left) and Small Cheems (right) */}
                  <div style={{ position: "absolute", left: "2%", top: "-5%" }}>
                    <MemeText text="POWER: GAME WORLD" size={23} color={C.yellow} stroke={7} />
                  </div>
                  <div style={{ position: "absolute", right: "2%", top: "20%" }}>
                    <MemeText text="LUA (200 KB)" size={23} color={C.luaSky} stroke={7} />
                  </div>
                </div>

                {frame >= 105 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 8,
                      transform: `scale(${stampPop}) rotate(-2deg)`,
                      background: C.luaNavy,
                      color: C.white,
                      border: `4px solid ${C.charcoal}`,
                      borderRadius: 16,
                      padding: "8px 26px",
                      fontFamily: FONT.sans,
                      fontWeight: 900,
                      fontSize: 32,
                      boxShadow: `6px 6px 0 ${C.yellow}`,
                    }}
                  >
                    SMALL BUT POWERFUL!
                  </div>
                )}
              </div>
            </ExplainCard>

            <DevtrineMascot
              x={205}
              y={1215 + Math.sin(frame * 0.18) * 7}
              size={130}
              expression="happy"
              blush
              frame={frame}
              shadow
            />
          </>
        )}

        {/* PART B (158..306): Clean Devtrine Studio EP.03 Outro */}
        {isOutro && (
          <>
            {CONFETTI.map((c, i) => {
              const cp = spr(frame, 236, { damping: 14, stiffness: 180 });
              const dist = c.dist * cp;
              const x = 540 + Math.cos(c.ang) * dist;
              const y = 620 + Math.sin(c.ang) * dist + (frame > 240 ? (frame - 240) * 4 : 0);
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: 14,
                    height: 14,
                    background: c.col,
                    border: `2px solid ${C.charcoal}`,
                    borderRadius: i % 2 === 0 ? "50%" : 3,
                    transform: `translate(-50%, -50%) rotate(${c.rot + frame * 4}deg) scale(${frame >= 236 ? 1 : 0})`,
                    opacity: frame >= 236 ? 1 : 0,
                  }}
                />
              );
            })}

            <div style={{ position: "absolute", top: 155, left: 80, right: 80, textAlign: "center" }}>
              <div style={{ marginTop: 22 }}>
                <KineticText
                  text="FAKTA TEKNOLOGI UNIK LAINNYA?"
                  start={166}
                  stagger={3}
                  size={60}
                  color={C.white}
                  variant="pop"
                  highlight={["FAKTA", "TEKNOLOGI"]}
                  highlightColor={C.luaBlue}
                />
              </div>
            </div>

            <DevtrineMascot
              x={540}
              y={630 + bounceY}
              size={195 * logoPop}
              expression={frame < 236 ? "salute" : "happy"}
              headband
              blush
              frame={frame}
              shadow
            />

            <div
              style={{
                position: "absolute",
                left: 540,
                top: 970,
                transform: `translate(-50%, -50%) scale(${ctaPop})`,
                display: "flex",
                alignItems: "center",
                gap: 18,
                background: C.white,
                border: `5px solid ${C.charcoal}`,
                borderRadius: 26,
                padding: "14px 30px",
                zIndex: 35,
              }}
            >
              <Img
                src={staticFile("images/devtrine-logo-removebg.png")}
                style={{ width: 58, height: 58, objectFit: "contain" }}
              />
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontWeight: 900,
                  fontSize: 40,
                  color: C.charcoal,
                  lineHeight: 1.05,
                  whiteSpace: "nowrap",
                }}
              >
                DEVTRINE STUDIO
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                left: 540,
                top: 1125,
                transform: `translate(-50%, -50%) scale(${ctaPop * btnPress})`,
                background: frame >= 236 ? C.green : C.yellow,
                color: frame >= 236 ? C.white : C.charcoal,
                border: `5px solid ${C.charcoal}`,
                borderRadius: 999,
                padding: "16px 40px",
                fontFamily: FONT.sans,
                fontWeight: 900,
                fontSize: 33,
                whiteSpace: "nowrap",
                boxShadow: `8px 8px 0 ${C.luaBlue}`,
                display: "flex",
                alignItems: "center",
                gap: 14,
                zIndex: 35,
              }}
            >
              {frame >= 236 ? (
                <>
                  <IconCheck size={32} color={C.white} />
                  <span>FOLLOWED DEVTRINE STUDIO!</span>
                </>
              ) : (
                <>
                  <IconUserPlus size={32} color={C.charcoal} />
                  <span>FOLLOW DEVTRINE STUDIO</span>
                </>
              )}
            </div>
          </>
        )}
      </Camera>

      <Flash at={158} color={C.luaIce} max={0.28} />

      <Subtitles
        cues={[
          { from: 7, to: 96, text: "Jadi, jangan remehkan bahasa pemrograman yang satu ini.", hi: ["jangan", "remehkan"] },
          { from: 103, to: 146, text: "Kecil-kecil cabe rawit!", hi: ["Kecil-kecil", "cabe", "rawit!"] },
          { from: 162, to: 262, text: "Follow Devtrine Studio buat fakta teknologi unik lainnya!", hi: ["Follow", "Devtrine", "Studio"] },
        ]}
      />

      <Sfx name="vine_boom" at={105} volume={0.9} />
      <Sfx name="meme_click" at={236} volume={0.9} />
      <Sfx name="confetti" at={238} volume={0.75} />
    </Background>
  );
};
