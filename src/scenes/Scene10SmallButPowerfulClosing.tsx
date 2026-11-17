import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { keys, rand, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconCheck, IconFlame, IconUserPlus } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker, MemeText } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

const CONFETTI = Array.from({ length: 18 }, (_, i) => ({
  ang: (i / 18) * Math.PI * 2,
  dist: 170 + rand(i * 5) * 280,
  col: i % 3 === 0 ? C.luaBlue : i % 2 === 0 ? C.luaSky : C.luaNavy,
  rot: rand(i * 9) * 360,
}));

export const Scene10SmallButPowerfulClosing: React.FC = () => {
  const frame = useCurrentFrame();
  const isOutro = frame >= 158;

  const shk1 = shake(frame, 105, 16, 10);
  const shkOutro = shake(frame, 162, 12, 9);
  const camScale = keys(frame, [0, 105, 158, 236, 306], [1, 1.05, 1, 1.03, 1.05]);

  const dogePop = spr(frame, 18, { damping: 12, stiffness: 195 });
  const stampPop = spr(frame, 105, { damping: 10, stiffness: 230 });

  const logoPop = spr(frame, 164, { damping: 11, stiffness: 180 });
  const ctaPop = spr(frame, 194, { damping: 11, stiffness: 190 });
  const btnPress = frame >= 236 && frame < 246 ? 0.92 : 1;
  const bounceY = Math.abs(Math.sin(frame * 0.22)) * -16;

  // Dynamic Mascot position in Part A
  const mascotX = keys(frame, [0, 105, 158], [470, 540, 510]);

  return (
    <Background variant={isOutro ? "dotMatrix" : "voxPaper"} drift={1.0} watermark={isOutro ? undefined : "LUA"} polaroidMeme="memes/kelas_king.jpg">
      <Camera scale={camScale} x={shk1.x + shkOutro.x} y={shk1.y + shkOutro.y} focusX={540} focusY={820}>
        {!isOutro && (
          <>
            <Header
              title="Kecil-Kecil Cabe Rawit!"
              highlight={["Kecil-Kecil", "Cabe", "Rawit!"]}
            />

            <ExplainCard
              at={6}
              w={960}
              h={630}
              y={725}
              badge="SMALL BUT POWERFUL"
              badgeIcon={<IconFlame size={18} color={C.red} />}
              tape
            >
              <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div
                  style={{
                    position: "relative",
                    width: "96%",
                    height: 440,
                    transform: `scale(${dogePop})`,
                    filter: "drop-shadow(0 20px 30px rgba(5,9,41,0.20))",
                  }}
                >
                  <Img
                    src={staticFile("memes/small_but_powerful.png")}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                  <div style={{ position: "absolute", left: "2%", top: "-3%" }}>
                    <MemeText text="DAMPAK DI GAME WORLD" size={26} color={C.yellow} stroke={8} />
                  </div>
                  <div style={{ position: "absolute", right: "2%", top: "20%" }}>
                    <MemeText text="UKURAN LUA (200 KB)" size={26} color={C.luaSky} stroke={8} />
                  </div>
                </div>

                {frame >= 105 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 10,
                      transform: `scale(${stampPop}) rotate(-2deg)`,
                      background: "linear-gradient(135deg, #1E3A8A 0%, #000080 100%)",
                      color: C.white,
                      borderRadius: 18,
                      padding: "12px 34px",
                      fontFamily: FONT.sans,
                      fontWeight: 900,
                      fontSize: 36,
                      boxShadow: "0 20px 40px rgba(0, 0, 128, 0.35)",
                    }}
                  >
                    Small <span style={{ color: C.luaSky }}>but Powerful!</span>
                  </div>
                )}
              </div>
            </ExplainCard>

            <MemeSticker src="memes/kelas_king.jpg" x={875} y={1245} w={250} h={230} at={105} until={137} rotate={5} />

            <DevtrineMascot
              x={mascotX}
              y={1245 + Math.sin(frame * 0.22) * 8}
              size={156}
              expression="happy"
              blush
              rotate={Math.sin(frame * 0.14) * 5}
              frame={frame}
              shadow
            />
          </>
        )}

        {isOutro && (
          <>
            {CONFETTI.map((c, i) => {
              const cp = spr(frame, 236, { damping: 14, stiffness: 180 });
              const dist = c.dist * cp;
              const x = 540 + Math.cos(c.ang) * dist;
              const y = 660 + Math.sin(c.ang) * dist + (frame > 240 ? (frame - 240) * 4 : 0);
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
                    borderRadius: i % 2 === 0 ? "50%" : 4,
                    transform: `translate(-50%, -50%) rotate(${c.rot + frame * 4}deg) scale(${frame >= 236 ? 1 : 0})`,
                    opacity: frame >= 236 ? 1 : 0,
                  }}
                />
              );
            })}

            <div
              style={{
                position: "absolute",
                top: 175,
                left: 60,
                right: 60,
                textAlign: "center",
                transform: `scale(${logoPop})`,
              }}
            >
              <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 68, color: C.charcoal, lineHeight: 1.04, letterSpacing: "-0.035em" }}>
                Mau tahu <span style={{ color: C.luaBlue }}>fakta teknologi</span>
                <br />
                unik lainnya?
              </div>
            </div>

            <DevtrineMascot
              x={540}
              y={650 + bounceY}
              size={225 * logoPop}
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
                textAlign: "center",
                zIndex: 35,
              }}
            >
              <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, color: C.luaBlue, letterSpacing: "0.08em", marginBottom: 6 }}>
                IKUTI EPISODE BERIKUTNYA DI
              </div>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontWeight: 900,
                  fontSize: 72,
                  color: C.luaNavy,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.04,
                }}
              >
                Devtrine Studio
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                left: 540,
                top: 1150,
                transform: `translate(-50%, -50%) scale(${ctaPop * btnPress})`,
                background: frame >= 236 ? C.green : C.luaNavy,
                color: C.white,
                borderRadius: 999,
                padding: "18px 46px",
                fontFamily: FONT.sans,
                fontWeight: 800,
                fontSize: 32,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
                boxShadow: "0 24px 48px rgba(0, 0, 128, 0.28)",
                display: "flex",
                alignItems: "center",
                gap: 14,
                zIndex: 35,
              }}
            >
              {frame >= 236 ? (
                <>
                  <IconCheck size={30} color={C.white} />
                  <span>Followed Devtrine Studio!</span>
                </>
              ) : (
                <>
                  <IconUserPlus size={30} color={C.luaSky} />
                  <span>
                    Follow <span style={{ color: C.luaSky }}>Devtrine Studio</span>
                  </span>
                </>
              )}
            </div>

            <MemeSticker src="memes/horee.jpg" x={875} y={1345} w={245} h={220} at={238} until={270} rotate={5} />
          </>
        )}
      </Camera>

      <Flash at={158} color={C.luaIce} max={0.32} />

      <Subtitles
        cues={[
          { from: 7, to: 96, text: "Jadi, jangan remehkan bahasa pemrograman yang satu ini.", hi: ["jangan", "remehkan"] },
          { from: 103, to: 146, text: "Kecil-kecil cabe rawit!", hi: ["Kecil-kecil", "cabe", "rawit!"] },
          { from: 162, to: 262, text: "Follow Devtrine Studio buat fakta teknologi unik lainnya!", hi: ["Follow", "Devtrine", "Studio"] },
        ]}
      />

      <Sfx name="vine_boom" at={105} volume={0.95} />
      <Sfx name="meme_click" at={236} volume={0.95} />
      <Sfx name="confetti" at={238} volume={0.8} />
    </Background>
  );
};
