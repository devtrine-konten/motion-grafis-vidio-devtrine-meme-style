import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, easeOut, keys, lerp, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard, NodeTreeList, VoxCutout } from "../components/Explainers";
import { IconClock, IconMapPin } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

export const Scene03BrazilOrigin: React.FC = () => {
  const frame = useCurrentFrame();
  const isCreators = frame >= 182;

  const yearNum = Math.round(lerp(frame, [10, 48], [1980, 1993], easeOut));
  const pinDrop = spr(frame, 48, { damping: 10, stiffness: 210 });
  const pucSlide = spr(frame, 113, { damping: 12, stiffness: 190 });
  const camScale = keys(frame, [0, 60, 182, 287, 351, 400], [1, 1.03, 1.01, 1.04, 1.05, 1.02]);

  // Dynamic Mascot position: patrols right -> center during map -> hops left/center during creators
  const mascotX = keys(frame, [0, 48, 113, 182, 287, 351, 400], [540, 620, 560, 460, 520, 480, 540]);
  const hop =
    (frame >= 182 && frame < 198 ? Math.sin(((frame - 182) / 16) * Math.PI) * -28 : 0) +
    (frame >= 351 && frame < 367 ? Math.sin(((frame - 351) / 16) * Math.PI) * -26 : 0);

  return (
    <Background variant={isCreators ? "dotMatrix" : "voxPaper"} drift={0.9} watermark={isCreators ? undefined : "93"} polaroidMeme="memes/lawliet_nerd.jpg">
      <Camera scale={camScale} focusX={540} focusY={725}>
        <Header
          title={isCreators ? "3 Pencipta Bahasa Lua" : "Lahir Tahun 1993 di Brasil"}
          highlight={isCreators ? ["Pencipta", "Lua"] : ["1993", "Brasil"]}
        />

        <ExplainCard
          at={4}
          until={182}
          w={960}
          h={630}
          y={725}
          badge="ORIGIN MAP · PUC-RIO"
          badgeIcon={<IconMapPin size={18} color={C.charcoal} />}
          tape
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: 26 }}>
            <div
              style={{
                position: "relative",
                width: 440,
                height: 470,
                background: C.paper,
                border: "1px solid rgba(0,0,128,0.16)",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 18px 36px rgba(5,9,41,0.14)",
                flexShrink: 0,
              }}
            >
              <Img
                src={staticFile("image-vidio/lua/brazil-map.png")}
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.04) saturate(0.88)" }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 305,
                  top: 325,
                  transform: `translate(-50%, -100%) scale(${pinDrop})`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    background: C.luaNavy,
                    color: C.white,
                    fontFamily: FONT.sans,
                    fontWeight: 800,
                    fontSize: 17,
                    padding: "5px 14px",
                    borderRadius: 999,
                    boxShadow: "0 8px 18px rgba(0,0,0,0.25)",
                    whiteSpace: "nowrap",
                    marginBottom: 4,
                  }}
                >
                  Rio de Janeiro
                </div>
                <IconMapPin size={46} color={C.red} strokeWidth={2.6} />
              </div>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IconClock size={24} color={C.luaBlue} />
                <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, color: C.luaBlue }}>
                  TAHUN LAHIR
                </span>
              </div>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontWeight: 900,
                  fontSize: 108,
                  color: C.luaNavy,
                  lineHeight: 0.92,
                  letterSpacing: "-0.05em",
                }}
              >
                {yearNum}
              </div>

              <div
                style={{
                  width: "100%",
                  background: "#FFFFFF",
                  border: "1px solid rgba(0,0,128,0.12)",
                  borderRadius: 16,
                  padding: 10,
                  boxShadow: "0 16px 32px rgba(5,9,41,0.14)",
                  transform: `scale(${pucSlide})`,
                  opacity: frame >= 110 ? 1 : 0,
                }}
              >
                <Img
                  src={staticFile("image-vidio/lua/puc-rio.jpg")}
                  style={{ width: "100%", height: 215, objectFit: "cover", borderRadius: 10 }}
                />
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontWeight: 800,
                    fontSize: 20,
                    color: C.charcoal,
                    textAlign: "center",
                    marginTop: 8,
                  }}
                >
                  Kampus <span style={{ color: C.luaBlue }}>PUC-Rio, Brasil</span>
                </div>
              </div>
            </div>
          </div>
        </ExplainCard>

        {isCreators && (
          <>
            <ExplainCard at={182} w={960} h={355} y={565} watermark="PUC-RIO" dark>
              <div style={{ width: "100%", height: "100%", position: "relative" }} />
            </ExplainCard>

            <VoxCutout x={225} y={575} w={285} h={235} at={186} rotate={-3} caption="Roberto Ierusalimschy" subcaption="Lead Architect" zIndex={22}>
              <Img src={staticFile("image-vidio/lua/roberto-crop.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </VoxCutout>

            <VoxCutout x={540} y={560} w={285} h={235} at={287} rotate={2} caption="Luiz H. de Figueiredo" subcaption="Core Engine" zIndex={23}>
              <Img src={staticFile("image-vidio/lua/luiz.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </VoxCutout>

            <VoxCutout x={855} y={575} w={285} h={235} at={351} rotate={-2} caption="Waldemar Celes" subcaption="C API & Systems" zIndex={24}>
              <Img src={staticFile("image-vidio/lua/waldemar.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </VoxCutout>

            <NodeTreeList
              x={125}
              y={795}
              items={[
                { label: "Roberto Ierusalimschy", sub: "syntax & design", at: 192 },
                { label: "Luiz H. de Figueiredo", sub: "compiler & VM", at: 290 },
                { label: "Waldemar Celes", sub: "C API integration", at: 354, highlight: true },
              ]}
            />
          </>
        )}

        <MemeSticker src="memes/nerd_cat.jpg" x={205} y={1245} w={250} h={230} at={36} until={180} rotate={-5} />
        <MemeSticker src="memes/sigmacat.jpg" x={825} y={1245} w={405} h={405} at={186} until={218} rotate={5} />
        <MemeSticker src="memes/gigachad_draw.jpg" x={875} y={1245} w={305} h={305} at={287} rotate={4} />

        <DevtrineMascot
          x={mascotX}
          y={1245 + hop + Math.sin(frame * 0.15) * 6}
          size={156}
          expression={isCreators ? "salute" : "detective"}
          magnifyingGlass={!isCreators}
          blink={autoBlink(frame, 19)}
          rotate={isCreators ? Math.sin(frame * 0.1) * 4 : -4}
          lookX={isCreators ? 0.3 : -0.25}
          lookY={-0.35}
          frame={frame}
          shadow
        />
      </Camera>

      <Subtitles
        cues={[
          { from: 12, to: 105, text: "Lua lahir tahun 1993 di Brasil,", hi: ["1993", "Brasil,"] },
          { from: 111, to: 176, text: "tepatnya di PUC-Rio.", hi: ["PUC-Rio."] },
          { from: 184, to: 280, text: "Bahasa ini dibuat oleh Roberto Ierusalimschy,", hi: ["Roberto", "Ierusalimschy,"] },
          { from: 285, to: 344, text: "Luiz Henrique de Figueiredo,", hi: ["Luiz", "Henrique"] },
          { from: 349, to: 394, text: "dan Waldemar Celes.", hi: ["Waldemar", "Celes."] },
        ]}
      />

      <Sfx name="pop" at={48} volume={0.85} />
      <Sfx name="paper" at={113} volume={0.8} />
      <Sfx name="ka_ching" at={186} volume={0.85} duration={24} />
      <Sfx name="pop" at={287} volume={0.85} />
      <Sfx name="confirm" at={351} volume={0.85} />
    </Background>
  );
};
