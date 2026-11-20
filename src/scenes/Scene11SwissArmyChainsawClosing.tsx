import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { keys, rand, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconArrowRight, IconCheck, IconFlame, IconUserPlus } from "../components/Icons";
import { Header, KineticText } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

const CONFETTI = Array.from({ length: 18 }, (_, i) => ({
  ang: (i / 18) * Math.PI * 2,
  dist: 170 + rand(i * 5) * 280,
  col: i % 3 === 0 ? C.perlSky : i % 2 === 0 ? C.camelGold : C.white,
  rot: rand(i * 9) * 360,
}));

export const Scene11SwissArmyChainsawClosing: React.FC = () => {
  const frame = useCurrentFrame();
  const isOutro = frame >= 195;

  const shk1 = shake(frame, 39, 16, 10);
  const shk2 = shake(frame, 129, 14, 9);
  const shkOutro = shake(frame, 198, 14, 9);
  const camScale = keys(frame, [0, 39, 129, 195, 260, 318], [1, 1.05, 1.06, 1, 1.03, 1.05]);

  const knifePop = spr(frame, 14, { damping: 11, stiffness: 200 });
  const chainsawPop = spr(frame, 39, { damping: 10, stiffness: 215 });
  const stampPop = spr(frame, 129, { damping: 9, stiffness: 240 });

  const logoPop = spr(frame, 200, { damping: 10, stiffness: 175 });
  const ctaPop = spr(frame, 226, { damping: 10, stiffness: 190 });
  const btnPress = frame >= 262 && frame < 272 ? 0.9 : 1;
  const bounceY = Math.abs(Math.sin(frame * 0.22)) * -15;

  return (
    <Background variant={isOutro ? "luaNight" : "voxPaper"} drift={1.0} polaroidMeme="memes/bahagia.jpg">
      <Camera scale={camScale} x={shk1.x + shk2.x + shkOutro.x} y={shk1.y + shk2.y + shkOutro.y} focusX={540} focusY={780}>
        {/* PART A (0..195): Clean Visual Knife -> Chainsaw */}
        {!isOutro && (
          <>
            <Header
              title="Swiss Army Chainsaw!"
              highlight={["Swiss", "Army", "Chainsaw!"]}
              tone="light"
            />

            <ExplainCard at={4} w={960} h={610} y={725} tape>
              <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px" }}>
                {/* Left: Swiss Army Knife */}
                <div
                  style={{
                    width: 350,
                    height: 390,
                    background: "#FFFFFF",
                    border: "2px solid rgba(0, 115, 161, 0.22)",
                    borderRadius: 26,
                    padding: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: `scale(${knifePop})`,
                    boxShadow: "0 16px 32px rgba(4, 21, 39, 0.10)",
                  }}
                >
                  <Img
                    src={staticFile("image-vidio/perl/swiss-army-knife.svg")}
                    style={{ width: 225, height: 225, objectFit: "contain" }}
                  />
                </div>

                <IconArrowRight size={60} color={C.camelGold} />

                {/* Right: Swiss Army Chainsaw */}
                <div
                  style={{
                    width: 370,
                    height: 390,
                    background: "linear-gradient(145deg, #041527 0%, #0073A1 60%, #03537B 100%)",
                    border: `3.5px solid ${C.camelGold}`,
                    borderRadius: 26,
                    padding: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: `scale(${frame >= 39 ? chainsawPop : 0.86})`,
                    opacity: frame >= 39 ? 1 : 0.25,
                    boxShadow: "0 24px 48px rgba(4, 21, 39, 0.32)",
                  }}
                >
                  <Img
                    src={staticFile("image-vidio/perl/chainsaw.svg")}
                    style={{
                      width: 240,
                      height: 240,
                      objectFit: "contain",
                      transform: `rotate(${Math.sin(frame * 0.6) * 3}deg)`,
                      filter: "drop-shadow(0 14px 26px rgba(245,158,11,0.45))",
                    }}
                  />
                </div>

                {frame >= 129 && (
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: 10,
                      transform: `translateX(-50%) scale(${stampPop}) rotate(-2deg)`,
                      background: C.camelGold,
                      color: C.perlDeep,
                      border: `4px solid ${C.perlDeep}`,
                      borderRadius: 20,
                      padding: "12px 34px",
                      fontFamily: FONT.sans,
                      fontWeight: 900,
                      fontSize: 40,
                      boxShadow: "0 18px 36px rgba(4,21,39,0.38)",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      whiteSpace: "nowrap",
                      zIndex: 30,
                    }}
                  >
                    <IconFlame size={36} color={C.perlDeep} />
                    <span>SERBA GUNA!</span>
                  </div>
                )}
              </div>
            </ExplainCard>

            <MemeSticker src="memes/reaksi_gue.jpg" x={205} y={1245} w={255} h={235} at={18} until={128} rotate={-5} />
            <MemeSticker src="memes/bahagia.jpg" x={875} y={1245} w={265} h={240} at={129} until={193} rotate={4} />

            <DevtrineMascot
              x={540}
              y={1245 + Math.sin(frame * 0.18) * 7}
              size={152}
              expression={frame >= 129 ? "cool" : "amazed"}
              sunglasses={frame >= 129}
              frame={frame}
              shadow
            />
          </>
        )}

        {/* PART B (195..318): Clean Devtrine Studio EP.04 Outro */}
        {isOutro && (
          <>
            {CONFETTI.map((c, i) => {
              const cp = spr(frame, 262, { damping: 14, stiffness: 180 });
              const dist = c.dist * cp;
              const x = 540 + Math.cos(c.ang) * dist;
              const y = 620 + Math.sin(c.ang) * dist + (frame > 266 ? (frame - 266) * 4 : 0);
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
                    transform: `translate(-50%, -50%) rotate(${c.rot + frame * 4}deg) scale(${frame >= 262 ? 1 : 0})`,
                    opacity: frame >= 262 ? 1 : 0,
                  }}
                />
              );
            })}

            <div style={{ position: "absolute", top: 155, left: 80, right: 80, textAlign: "center" }}>
              <div style={{ marginTop: 22 }}>
                <KineticText
                  text="SEJARAH TEKNOLOGI UNIK?"
                  start={202}
                  stagger={3}
                  size={60}
                  color={C.white}
                  variant="pop"
                  highlight={["SEJARAH", "TEKNOLOGI"]}
                  highlightColor={C.perlTeal}
                />
              </div>
            </div>

            <DevtrineMascot
              x={540}
              y={630 + bounceY}
              size={195 * logoPop}
              expression={frame < 262 ? "salute" : "happy"}
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
                border: `5px solid ${C.perlDeep}`,
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
                background: frame >= 262 ? C.green : C.camelGold,
                color: frame >= 262 ? C.white : C.perlDeep,
                border: `5px solid ${C.perlDeep}`,
                borderRadius: 999,
                padding: "16px 40px",
                fontFamily: FONT.sans,
                fontWeight: 900,
                fontSize: 33,
                whiteSpace: "nowrap",
                boxShadow: `8px 8px 0 ${C.perlTeal}`,
                display: "flex",
                alignItems: "center",
                gap: 14,
                zIndex: 35,
              }}
            >
              {frame >= 262 ? (
                <>
                  <IconCheck size={32} color={C.white} />
                  <span>FOLLOWED!</span>
                </>
              ) : (
                <>
                  <IconUserPlus size={32} color={C.perlDeep} />
                  <span>FOLLOW</span>
                </>
              )}
            </div>
          </>
        )}
      </Camera>

      <Flash at={195} color={C.perlIce} max={0.28} />

      <Subtitles
        cues={[
          { from: 15, to: 122, text: "Oh iya, Perl juga punya julukan Swiss Army Chainsaw,", hi: ["Perl", "Swiss", "Army", "Chainsaw,"] },
          { from: 129, to: 178, text: "karena kemampuannya yang serba guna.", hi: ["kemampuannya", "serba", "guna."] },
          { from: 203, to: 310, text: "Follow Devtrine Studio, karena masih banyak sejarah teknologi unik yang belum kalian tahu!", hi: ["Follow", "Devtrine", "Studio,", "sejarah", "teknologi"] },
        ]}
      />

      <Sfx name="vine_boom" at={39} volume={0.9} />
      <Sfx name="ka_ching" at={129} volume={0.85} duration={24} />
      <Sfx name="meme_click" at={262} volume={0.9} />
      <Sfx name="confetti" at={264} volume={0.75} />
    </Background>
  );
};
