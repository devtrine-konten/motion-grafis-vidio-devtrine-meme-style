import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, easeOut, keys, lerp, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard, RedPushpin } from "../components/Explainers";
import { IconMapPin } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

export const Scene02LarryWall1987: React.FC = () => {
  const frame = useCurrentFrame();

  const yearNum = Math.round(lerp(frame, [140, 178], [1970, 1987], easeOut));
  const larryPop = spr(frame, 14, { damping: 12, stiffness: 195 });
  const usaPop = spr(frame, 87, { damping: 11, stiffness: 205 });
  const yearPop = spr(frame, 140, { damping: 11, stiffness: 210 });
  const camScale = keys(frame, [0, 30, 87, 140, 252], [1, 1.03, 1.04, 1.06, 1.02]);

  const mascotX = keys(frame, [0, 30, 87, 140, 252], [540, 610, 560, 465, 540]);
  const hop =
    (frame >= 87 && frame < 103 ? Math.sin(((frame - 87) / 16) * Math.PI) * -26 : 0) +
    (frame >= 140 && frame < 158 ? Math.sin(((frame - 140) / 18) * Math.PI) * -32 : 0);

  return (
    <Background variant="voxPaper" drift={0.9} polaroidMeme="memes/maomao.jpg">
      <Camera scale={camScale} focusX={540} focusY={725}>
        <Header
          title="Larry Wall & Rilis 1987"
          highlight={["Larry", "Wall", "1987"]}
        />

        <ExplainCard at={4} w={960} h={610} y={725} tape>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: 26 }}>
            {/* Left: Larry Wall Photo */}
            <div
              style={{
                position: "relative",
                width: 410,
                height: 470,
                background: "#FFFFFF",
                border: "2px solid rgba(0, 115, 161, 0.24)",
                borderRadius: 22,
                padding: "14px 14px 16px",
                boxShadow: "0 22px 44px rgba(4, 21, 39, 0.16)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                transform: `scale(${larryPop}) rotate(-2deg)`,
                flexShrink: 0,
              }}
            >
              <div style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
                <RedPushpin size={34} />
              </div>
              <div style={{ width: "100%", height: 385, borderRadius: 14, overflow: "hidden", background: C.perlDeep }}>
                <Img
                  src={staticFile("image-vidio/perl/larry-wall.jpg")}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%" }}
                />
              </div>
              <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 32, color: C.charcoal, letterSpacing: "-0.03em" }}>
                Larry Wall
              </div>
            </div>

            {/* Right: USA Map + 1987 Counter */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20, height: 470, justifyContent: "space-between" }}>
              {/* USA Map */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 225,
                  background: "#FFFFFF",
                  border: "1.5px solid rgba(0, 115, 161, 0.20)",
                  borderRadius: 20,
                  padding: 14,
                  boxShadow: "0 14px 28px rgba(4, 21, 39, 0.10)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${frame >= 85 ? usaPop : 0.9})`,
                  opacity: frame >= 85 ? 1 : 0.3,
                }}
              >
                <Img
                  src={staticFile("image-vidio/perl/usa-map.svg")}
                  style={{ width: "92%", height: 185, objectFit: "contain" }}
                />
                {frame >= 87 && (
                  <div
                    style={{
                      position: "absolute",
                      left: 130,
                      top: 120,
                      transform: `translate(-50%, -100%) scale(${usaPop})`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        background: C.perlTeal,
                        color: C.white,
                        fontFamily: FONT.sans,
                        fontWeight: 900,
                        fontSize: 18,
                        padding: "4px 14px",
                        borderRadius: 999,
                      }}
                    >
                      USA
                    </div>
                    <IconMapPin size={42} color={C.red} strokeWidth={2.6} />
                  </div>
                )}
              </div>

              {/* 1987 Big Number */}
              <div
                style={{
                  width: "100%",
                  height: 225,
                  background: "linear-gradient(145deg, #041527 0%, #0073A1 65%, #03537B 100%)",
                  borderRadius: 22,
                  border: `3px solid ${frame >= 140 ? C.camelGold : "rgba(56,189,248,0.3)"}`,
                  boxShadow: "0 20px 42px rgba(4, 21, 39, 0.28)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${frame >= 140 ? yearPop : 0.92})`,
                  opacity: frame >= 136 ? 1 : 0.3,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontWeight: 900,
                    fontSize: 132,
                    color: C.white,
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                  }}
                >
                  {frame >= 140 ? yearNum : "19??"}
                </div>
              </div>
            </div>
          </div>
        </ExplainCard>

        <MemeSticker src="memes/nerd_cat.jpg" x={205} y={1245} w={250} h={230} at={18} until={138} rotate={-5} />
        <MemeSticker src="memes/sigmacat.jpg" x={875} y={1245} w={285} h={285} at={140} rotate={5} />

        <DevtrineMascot
          x={mascotX}
          y={1245 + hop + Math.sin(frame * 0.15) * 6}
          size={156}
          expression={frame >= 140 ? "salute" : "detective"}
          magnifyingGlass={frame < 140}
          blink={autoBlink(frame, 19)}
          rotate={frame >= 140 ? Math.sin(frame * 0.12) * 4 : -4}
          lookX={frame >= 140 ? 0.3 : -0.25}
          lookY={-0.35}
          frame={frame}
          shadow
        />
      </Camera>

      <Subtitles
        cues={[
          { from: 12, to: 82, text: "Jadi, Perl diciptakan oleh Larry Wall,", hi: ["Perl", "Larry", "Wall,"] },
          { from: 87, to: 132, text: "programmer asal Amerika Serikat,", hi: ["programmer", "Amerika", "Serikat,"] },
          { from: 140, to: 238, text: "dan pertama kali dirilis tahun 1987.", hi: ["pertama", "dirilis", "1987."] },
        ]}
      />

      <Sfx name="pop" at={14} volume={0.85} />
      <Sfx name="paper" at={87} volume={0.8} />
      <Sfx name="ka_ching" at={140} volume={0.85} duration={24} />
      <Sfx name="confirm" at={178} volume={0.85} />
    </Background>
  );
};
