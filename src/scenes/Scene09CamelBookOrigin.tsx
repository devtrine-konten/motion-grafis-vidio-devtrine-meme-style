import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard, RedPushpin } from "../components/Explainers";
import { IconSparkles } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

export const Scene09CamelBookOrigin: React.FC = () => {
  const frame = useCurrentFrame();
  const isBookReveal = frame >= 122;
  const isIconic = frame >= 302;

  const shk1 = shake(frame, 53, 14, 9);
  const shk2 = shake(frame, 123, 18, 12);
  const camScale = keys(frame, [0, 53, 122, 138, 302, 382], [1, 1.04, 1.08, 1.03, 1.05, 1.02]);

  const camelQPop = spr(frame, 18, { damping: 11, stiffness: 205 });
  const bookPop = spr(frame, 123, { damping: 11, stiffness: 200 });
  const iconicPop = spr(frame, 302, { damping: 10, stiffness: 230 });

  const mascotX = keys(frame, [0, 53, 123, 302, 382], [540, 610, 465, 525, 540]);
  const hop =
    (frame >= 123 && frame < 141 ? Math.sin(((frame - 123) / 18) * Math.PI) * -34 : 0) +
    (frame >= 302 && frame < 318 ? Math.sin(((frame - 302) / 16) * Math.PI) * -28 : 0);

  return (
    <Background variant="voxPaper" drift={0.9} polaroidMeme="memes/mengapa.jpg">
      <Camera scale={camScale} x={shk1.x + shk2.x} y={shk1.y + shk2.y} focusX={540} focusY={725}>
        <Header
          title={isBookReveal ? "Buku Programming Perl (1991)" : "Kenapa Maskotnya Onta?!"}
          highlight={isBookReveal ? ["Programming", "Perl", "(1991)"] : ["Kenapa", "Maskotnya", "Onta?!"]}
        />

        {/* Beat A (0..122): Golden Camel + ? */}
        <ExplainCard at={4} until={122} w={960} h={610} y={725} tape>
          <div
            style={{
              width: 340,
              height: 340,
              borderRadius: "50%",
              background: C.perlDeep,
              border: `5px dashed ${C.camelGold}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              boxShadow: "0 24px 48px rgba(4, 21, 39, 0.25)",
              transform: `scale(${camelQPop})`,
            }}
          >
            <Img
              src={staticFile("image-vidio/perl/perl-camel-gold.svg")}
              style={{ width: 225, height: 225, objectFit: "contain" }}
            />
            <div
              style={{
                position: "absolute",
                right: -14,
                top: -14,
                width: 96,
                height: 96,
                borderRadius: "50%",
                background: C.red,
                color: C.white,
                fontFamily: FONT.sans,
                fontWeight: 900,
                fontSize: 58,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 22px rgba(0,0,0,0.3)",
              }}
            >
              ?
            </div>
          </div>
        </ExplainCard>

        {/* Beat B (122..382): Clean Huge Book Cover + 1991 */}
        <ExplainCard at={122} w={960} h={610} y={725} tape>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 48, width: "100%" }}>
            <div
              style={{
                position: "relative",
                width: 365,
                height: 475,
                background: "#FFFFFF",
                border: "2.5px solid rgba(0, 115, 161, 0.28)",
                borderRadius: 20,
                padding: 12,
                boxShadow: "0 26px 52px rgba(4, 21, 39, 0.22)",
                transform: `scale(${bookPop}) rotate(-2.5deg)`,
              }}
            >
              <div style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
                <RedPushpin size={34} />
              </div>
              <Img
                src={staticFile("image-vidio/perl/programming-perl-cover.jpg")}
                style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 10 }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontWeight: 900,
                  fontSize: 124,
                  color: C.perlTeal,
                  lineHeight: 0.95,
                  letterSpacing: "-0.05em",
                }}
              >
                1991
              </div>

              {isIconic && (
                <div
                  style={{
                    background: C.camelGold,
                    color: C.perlDeep,
                    border: `4px solid ${C.perlDeep}`,
                    borderRadius: 20,
                    padding: "14px 32px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    transform: `scale(${iconicPop}) rotate(-2deg)`,
                    boxShadow: "0 18px 36px rgba(4, 21, 39, 0.28)",
                    fontFamily: FONT.sans,
                    fontWeight: 900,
                    fontSize: 40,
                  }}
                >
                  <IconSparkles size={36} color={C.perlDeep} />
                  <span>IKONIK!</span>
                </div>
              )}
            </div>
          </div>
        </ExplainCard>

        <MemeSticker src="memes/mengapa.jpg" x={205} y={1245} w={250} h={235} at={16} until={121} rotate={-5} />
        <MemeSticker src="memes/shocked_pikachu.jpg" x={875} y={1245} w={255} h={235} at={124} until={300} rotate={5} />
        <MemeSticker src="memes/ditawari.jpg" x={875} y={1245} w={260} h={240} at={302} rotate={4} />

        <DevtrineMascot
          x={mascotX}
          y={1245 + hop + Math.sin(frame * 0.16) * 6}
          size={156}
          expression={!isBookReveal ? "detective" : isIconic ? "happy" : "amazed"}
          magnifyingGlass={!isBookReveal}
          blink={autoBlink(frame, 15)}
          rotate={Math.sin(frame * 0.14) * 5}
          lookX={!isBookReveal ? -0.3 : 0.3}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={123} color={C.camelSand} max={0.3} />

      <Subtitles
        cues={[
          { from: 14, to: 42, text: "Tapi, tunggu dulu.", hi: ["tunggu", "dulu."] },
          { from: 53, to: 108, text: "Kenapa maskotnya malah onta?", hi: ["Kenapa", "maskotnya", "onta?"] },
          { from: 123, to: 290, text: "Ternyata, gambar onta muncul di sampul buku Programming Perl tahun 1991,", hi: ["onta", "sampul", "Programming", "Perl", "1991,"] },
          { from: 302, to: 376, text: "dan akhirnya menjadi simbol ikonik bahasa ini.", hi: ["simbol", "ikonik", "bahasa"] },
        ]}
      />

      <Sfx name="record_scratch" at={14} volume={0.8} duration={17} />
      <Sfx name="what_meme" at={53} volume={0.85} duration={32} />
      <Sfx name="thud" at={123} volume={0.95} duration={42} />
      <Sfx name="level_up" at={302} volume={0.8} duration={48} />
    </Background>
  );
};
