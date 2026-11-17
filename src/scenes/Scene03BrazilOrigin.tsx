import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, easeOut, keys, lerp, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard, VoxCutout } from "../components/Explainers";
import { IconClock, IconMapPin, IconUsers } from "../components/Icons";
import { Header, Pill } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

export const Scene03BrazilOrigin: React.FC = () => {
  const frame = useCurrentFrame();
  // Beat A: 0..182 ("Lua lahir tahun 1993 di Brasil, tepatnya di PUC-Rio.")
  // Beat B: 182..400 ("Bahasa ini dibuat oleh Roberto Ierusalimschy, Luiz Henrique de Figueiredo, dan Waldemar Celes.")
  const isCreators = frame >= 182;

  const yearNum = Math.round(lerp(frame, [10, 48], [1980, 1993], easeOut));
  const pinDrop = spr(frame, 48, { damping: 9, stiffness: 220 });
  const pucSlide = spr(frame, 113, { damping: 12, stiffness: 190 });
  const camScale = keys(frame, [0, 60, 182, 287, 351, 400], [1, 1.03, 1.01, 1.04, 1.05, 1.02]);

  return (
    <Background variant="voxPaper" drift={0.9}>
      <Camera scale={camScale} focusX={540} focusY={720}>
        <Header
          kicker="VOX ARCHIVE · BRASIL 1993"
          title={isCreators ? "3 Pencipta Bahasa Lua" : "Lahir Tahun 1993 di Brasil"}
          highlight={isCreators ? ["3", "Pencipta", "Lua"] : ["1993", "Brasil"]}
        />

        {/* BEAT A (0..182): Brazil Map + 1993 Counter + PUC-Rio Campus */}
        <ExplainCard
          at={4}
          until={182}
          w={870}
          h={470}
          y={675}
          bg={C.white}
          accent={C.luaNavy}
          badge="ORIGIN MAP · PUC-RIO (1993)"
          badgeIcon={<IconMapPin size={20} color={C.charcoal} />}
          badgeBg={C.yellow}
          tape
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: 18 }}>
            {/* Left: Brazil Map + Animated Pin on Rio de Janeiro */}
            <div
              style={{
                position: "relative",
                width: 375,
                height: 360,
                background: C.paper,
                border: `4px solid ${C.charcoal}`,
                borderRadius: 18,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <Img
                src={staticFile("image-vidio/lua/brazil-map.png")}
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.05) saturate(0.85)" }}
              />
              {/* Animated Vox Map Pin at Rio de Janeiro (southeast coast) */}
              <div
                style={{
                  position: "absolute",
                  left: 262,
                  top: 245,
                  transform: `translate(-50%, -100%) scale(${pinDrop})`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    background: C.luaBlue,
                    color: C.white,
                    fontFamily: FONT.mono,
                    fontWeight: 900,
                    fontSize: 16,
                    padding: "4px 10px",
                    borderRadius: 8,
                    border: `3px solid ${C.charcoal}`,
                    whiteSpace: "nowrap",
                    marginBottom: 4,
                  }}
                >
                  RIO DE JANEIRO
                </div>
                <IconMapPin size={44} color={C.red} strokeWidth={2.8} />
              </div>
            </div>

            {/* Right: 1993 Counter & PUC-Rio Campus Photo Cutout */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IconClock size={26} color={C.luaBlue} />
                <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, color: C.slate }}>TAHUN LAHIR</span>
              </div>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontWeight: 900,
                  fontSize: 96,
                  color: C.luaNavy,
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                {yearNum}
              </div>

              <div
                style={{
                  width: "100%",
                  background: C.black,
                  border: `4px solid ${C.charcoal}`,
                  borderRadius: 16,
                  padding: 8,
                  transform: `scale(${pucSlide})`,
                  opacity: frame >= 110 ? 1 : 0,
                }}
              >
                <Img
                  src={staticFile("image-vidio/lua/puc-rio.jpg")}
                  style={{ width: "100%", height: 155, objectFit: "cover", borderRadius: 10 }}
                />
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontWeight: 900,
                    fontSize: 18,
                    color: C.yellow,
                    textAlign: "center",
                    marginTop: 6,
                  }}
                >
                  KAMPUS PUC-RIO, BRASIL
                </div>
              </div>
            </div>
          </div>
        </ExplainCard>

        {/* BEAT B (182..400): Vox Cutout Collage of the 3 Lua Creators */}
        {isCreators && (
          <>
            <div style={{ position: "absolute", left: 540, top: 418, transform: "translateX(-50%)", zIndex: 25 }}>
              <Pill
                text="TIM TECGRAF · PUC-RIO"
                bg={C.luaNavy}
                color={C.white}
                at={184}
                size={22}
                icon={<IconUsers size={22} color={C.yellow} />}
              />
            </div>

            {/* 1. Roberto Ierusalimschy (at 186) */}
            <VoxCutout
              x={235}
              y={665}
              w={315}
              h={280}
              at={186}
              rotate={-3}
              accent={C.luaBlue}
              caption="Roberto Ierusalimschy"
              subcaption="CREATOR #1"
              zIndex={22}
            >
              <Img src={staticFile("image-vidio/lua/roberto-crop.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </VoxCutout>

            {/* 2. Luiz Henrique de Figueiredo (at 287) */}
            <VoxCutout
              x={545}
              y={635}
              w={315}
              h={280}
              at={287}
              rotate={2}
              accent={C.black}
              caption="Luiz H. de Figueiredo"
              subcaption="CREATOR #2"
              zIndex={23}
            >
              <Img src={staticFile("image-vidio/lua/luiz.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </VoxCutout>

            {/* 3. Waldemar Celes (at 351) */}
            <VoxCutout
              x={845}
              y={685}
              w={315}
              h={280}
              at={351}
              rotate={-2}
              accent={C.luaSky}
              caption="Waldemar Celes"
              subcaption="CREATOR #3"
              zIndex={24}
            >
              <Img src={staticFile("image-vidio/lua/waldemar.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </VoxCutout>
          </>
        )}

        {/* Bottom Meme Reactions */}
        <MemeSticker
          src="memes/nerd_cat.jpg"
          x={680}
          y={1145}
          w={265}
          h={250}
          at={36}
          until={180}
          rotate={-4}
          accent={C.luaBlue}
        />
        <MemeSticker
          src="memes/gigachad_draw.jpg"
          x={680}
          y={1145}
          w={285}
          h={275}
          at={195}
          rotate={4}
          accent={C.black}
        />

        <DevtrineMascot
          x={205}
          y={1215 + Math.sin(frame * 0.15) * 7}
          size={130}
          expression={isCreators ? "salute" : "detective"}
          magnifyingGlass={!isCreators}
          blink={autoBlink(frame, 19)}
          lookX={0.5}
          lookY={-0.3}
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
      <Sfx name="pop" at={186} volume={0.85} />
      <Sfx name="pop" at={287} volume={0.85} />
      <Sfx name="confirm" at={351} volume={0.85} />
    </Background>
  );
};
