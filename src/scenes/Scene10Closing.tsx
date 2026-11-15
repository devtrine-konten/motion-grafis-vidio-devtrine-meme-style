import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { keys, lerp, rand, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconBug, IconCheck, IconHelp, IconShield, IconUserPlus } from "../components/Icons";
import { Header, KineticText, Pill } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

const CONFETTI = Array.from({ length: 18 }, (_, i) => ({
  ang: (i / 18) * Math.PI * 2,
  dist: 170 + rand(i * 5) * 280,
  col: i % 3 === 0 ? "#FF6B35" : i % 2 === 0 ? C.yellow : C.cyanLight,
  rot: rand(i * 9) * 360,
}));

export const Scene10Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const isOutro = frame >= 174;

  const shk = shake(frame, 88, 16, 10);
  const shkOutro = shake(frame, 178, 16, 10);
  const camScale = keys(frame, [0, 75, 174, 240, 366], [1, 1.04, 1, 1.03, 1.05]);

  const bugX = keys(frame, [62, 92, 122, 162], [290, 65, 65, 310]);
  const bugRetreats = frame >= 122;
  const bugThinking = frame >= 90 && frame < 126;

  const logoPop = spr(frame, 180, { damping: 10, stiffness: 170 });
  const ctaPop = spr(frame, 236, { damping: 10, stiffness: 190 });
  const btnPress = frame >= 264 && frame < 274 ? 0.9 : 1;
  const bounceY = Math.abs(Math.sin(frame * 0.22)) * -16;

  return (
    <Background variant={isOutro ? "blueprint" : "warm"} drift={1.0}>
      <Camera scale={camScale} x={shk.x + shkOutro.x} y={shk.y + shkOutro.y} focusX={540} focusY={880}>
        {/* PART A (0..174): Tapi itulah Rust! Cepat, aman, dan bikin bug mikir dua kali sebelum muncul! */}
        {!isOutro && (
          <>
            <Header
              kicker="KESIMPULAN"
              title="Bug Mikir 2 Kali Sebelum Muncul!"
              highlight={["Bug", "Mikir", "2", "Kali"]}
            />

            <ExplainCard
              at={6}
              w={840}
              h={435}
              y={670}
              bg="#161B22"
              accent="#FF6B35"
              badge="RUST: CEPAT & AMAN"
              badgeIcon={<IconShield size={20} color={C.charcoal} />}
              badgeBg={C.yellow}
              dark
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 38, width: "100%", height: 240, position: "relative" }}>
                <div
                  style={{
                    transform: `translateX(-110px) scale(${spr(frame, 10)})`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div style={{ width: 130, height: 130, borderRadius: 24, border: `4px solid #FF6B35`, background: "#0D1117", padding: 14 }}>
                    <Img src={staticFile("image-vidio/logo-rust.png")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <span style={{ fontFamily: FONT.mono, fontWeight: 900, fontSize: 19, color: C.green, display: "flex", alignItems: "center", gap: 6 }}>
                    <IconShield size={20} color={C.green} />
                    <span>BORROW CHECKER</span>
                  </span>
                </div>

                <div style={{ width: 8, height: 185, background: C.cyanLight, borderRadius: 999, boxShadow: `0 0 18px ${C.cyanLight}`, transform: "translateX(-85px)" }} />

                {frame >= 60 && (
                  <div
                    style={{
                      position: "absolute",
                      left: "60%",
                      transform: `translateX(${bugX - 50}px)`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      zIndex: 10,
                    }}
                  >
                    {bugThinking && (
                      <div
                        style={{
                          background: C.yellow,
                          color: C.charcoal,
                          fontFamily: FONT.mono,
                          fontWeight: 900,
                          fontSize: 19,
                          padding: "5px 14px",
                          borderRadius: 999,
                          border: `3px solid ${C.charcoal}`,
                          marginBottom: 8,
                          whiteSpace: "nowrap",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <IconHelp size={20} color={C.charcoal} />
                        <span>MIKIR 2 KALI...</span>
                      </div>
                    )}
                    <div style={{ transform: `scaleX(${bugRetreats ? -1 : 1})` }}>
                      <IconBug size={78} color={C.red} />
                    </div>
                    <div style={{ fontFamily: FONT.mono, fontWeight: 900, fontSize: 18, color: C.red, marginTop: 4 }}>
                      {bugRetreats ? "KABUR!" : "BUG MASUK"}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 26, color: C.white, marginTop: 8 }}>
                {lerp(frame, [20, 60], [0, 1]) > 0.5 ? "Cepat, Aman & Anti Bug Memori!" : "Itulah Kekuatan Rust!"}
              </div>
            </ExplainCard>

            {/* Bottom Meme Reactions synced to Part A */}
            <MemeSticker
              src="memes/gigachad_draw.jpg"
              x={555}
              y={1145}
              w={265}
              h={245}
              at={20}
              until={90}
              rotate={-4}
              accent={C.cyan}
            />
            <MemeSticker
              src="memes/besok_aja.jpg"
              x={805}
              y={1145}
              w={265}
              h={245}
              at={90}
              rotate={4}
              accent={C.red}
            />

            <DevtrineMascot
              x={205}
              y={1215 + Math.sin(frame * 0.18) * 7}
              size={130}
              expression="cool"
              sunglasses
              helmet
              shield
              frame={frame}
              shadow
            />
          </>
        )}

        {/* PART B (174..366): Clean Episode 02 Outro (Praised by User!) */}
        {isOutro && (
          <>
            {CONFETTI.map((c, i) => {
              const cp = spr(frame, 264, { damping: 14, stiffness: 180 });
              const dist = c.dist * cp;
              const x = 540 + Math.cos(c.ang) * dist;
              const y = 620 + Math.sin(c.ang) * dist + (frame > 268 ? (frame - 268) * 4 : 0);
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
                    transform: `translate(-50%, -50%) rotate(${c.rot + frame * 4}deg) scale(${frame >= 264 ? 1 : 0})`,
                    opacity: frame >= 264 ? 1 : 0,
                  }}
                />
              );
            })}

            <div style={{ position: "absolute", top: 170, left: 80, right: 80, textAlign: "center" }}>
              {/* <Pill text="EPISODE 02 SELESAI · NEXT EP.03!" bg="#FF6B35" color={C.white} at={178} size={24} /> */}
              <div style={{ marginTop: 18 }}>
                <KineticText
                  text="TERTARIK BELAJAR RUST?!"
                  start={182}
                  stagger={3}
                  size={64}
                  color={C.white}
                  variant="pop"
                  highlight={["BELAJAR", "RUST?!"]}
                  highlightColor="#FF6B35"
                />
              </div>
            </div>

            <DevtrineMascot
              x={540}
              y={630 + bounceY}
              size={200 * logoPop}
              expression={frame < 254 ? "salute" : "proud"}
              headband
              blush
              frame={frame}
              shadow
            />

            <div
              style={{
                position: "absolute",
                left: 540,
                top: 975,
                transform: `translate(-50%, -50%) scale(${ctaPop})`,
                display: "flex",
                alignItems: "center",
                gap: 18,
                background: C.white,
                border: `5px solid ${C.charcoal}`,
                borderRadius: 26,
                padding: "14px 30px",
                boxShadow: `8px 8px 0 #FF6B35`,
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
                top: 1135,
                transform: `translate(-50%, -50%) scale(${ctaPop * btnPress})`,
                background: frame >= 264 ? C.green : C.yellow,
                color: C.charcoal,
                border: `5px solid ${C.charcoal}`,
                borderRadius: 999,
                padding: "16px 40px",
                fontFamily: FONT.sans,
                fontWeight: 900,
                fontSize: 34,
                whiteSpace: "nowrap",
                boxShadow: `8px 8px 0 ${C.charcoal}`,
                display: "flex",
                alignItems: "center",
                gap: 14,
                zIndex: 35,
              }}
            >
              {frame >= 264 ? (
                <>
                  <IconCheck size={32} color={C.charcoal} />
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

      <Flash at={174} color={C.cyanLight} max={0.45} />

      <Subtitles
        cues={[
          { from: 4, to: 42, text: "Tapi itulah Rust!", hi: ["itulah", "Rust!"] },
          { from: 50, to: 166, text: "Cepat, aman, dan bikin bug mikir dua kali sebelum muncul!", hi: ["Cepat,", "aman,", "bug", "mikir"] },
          { from: 180, to: 248, text: "Gimana? Tertarik belajar Rust?", hi: ["Gimana?", "Tertarik", "Rust?"] },
          { from: 254, to: 356, text: "Follow dulu, kita bahas teknologi lainnya di video berikutnya!", hi: ["Follow", "dulu,", "teknologi", "berikutnya!"] },
        ]}
      />

      <Sfx name="vine_boom" at={20} volume={0.9} duration={20} />
      <Sfx name="meme_bonk" at={90} volume={0.85} duration={16} />
      <Sfx name="goofy_horn" at={264} volume={0.85} duration={20} />
      <Sfx name="vine_boom" at={330} volume={0.9} duration={20} />
    </Background>
  );
};
