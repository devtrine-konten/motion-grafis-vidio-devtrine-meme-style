import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, shake, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard, MiniCharacter } from "../components/Explainers";
import { IconArrowRight, IconBook, IconHelp, IconLaptop, IconMoon, IconXCircle } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";
import { Flash } from "../components/Transition";

export const Scene05MoonName: React.FC = () => {
  const frame = useCurrentFrame();
  const isMoon = frame >= 86 && frame < 220;
  const isJoke = frame >= 220;

  const shk1 = shake(frame, 89, 14, 9);
  const shk2 = shake(frame, 224, 16, 10);
  const camScale = keys(frame, [0, 86, 98, 220, 234, 340], [1, 1.02, 1.06, 1.02, 1.06, 1.02]);

  const moonSwing = Math.sin(frame * 0.08) * 5;
  const moonScale = spr(frame, 90, { damping: 11, stiffness: 185 });
  const xStamp = spr(frame, 250, { damping: 9, stiffness: 250 });

  // Mascot moves actively across beats: right when coba_jelaskan -> center-left on Moon -> jumps/shakes laughing on Joke!
  const mascotX = keys(frame, [0, 35, 86, 220, 295, 340], [540, 610, 480, 560, 500, 540]);
  const hop = isJoke && frame >= 295 ? Math.abs(Math.sin(frame * 0.45)) * -24 : Math.sin(frame * 0.15) * 6;

  return (
    <Background variant={isJoke ? "dotMatrix" : "voxPaper"} drift={0.85} watermark="LUA" polaroidMeme="memes/towewew.jpg">
      <Camera scale={camScale} x={shk1.x + shk2.x} y={shk1.y + shk2.y} focusX={540} focusY={725}>
        <Header
          title={isMoon || isJoke ? "Lua = BULAN (Portugis)" : "Kenapa Namanya Lua?"}
          highlight={["BULAN", "Namanya", "Lua?"]}
        />

        {/* Beat A: Question */}
        <ExplainCard
          at={4}
          until={86}
          w={960}
          h={620}
          y={725}
          badge="ASAL NAMA LUA"
          badgeIcon={<IconHelp size={18} color={C.charcoal} />}
          tape
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
            <IconHelp size={135} color={C.luaBlue} />
            <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 66, color: C.charcoal, letterSpacing: "-0.04em" }}>
              Kenapa namanya <span style={{ color: C.luaBlue }}>Lua?</span>
            </div>
          </div>
        </ExplainCard>

        {/* Beat B: Hanging Moon Medallion + Lua = Bulan */}
        <ExplainCard
          at={86}
          until={220}
          w={960}
          h={630}
          y={725}
          badge="BAHASA PORTUGIS"
          badgeIcon={<IconBook size={18} color={C.charcoal} />}
          tape
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <div
              style={{
                transform: `scale(${moonScale}) rotate(${moonSwing}deg)`,
                transformOrigin: "50% 0%",
                filter: "drop-shadow(0 24px 32px rgba(5,9,41,0.24))",
              }}
            >
              <svg width={275} height={280} viewBox="-105 -115 210 215">
                <line x1={-40} y1={-115} x2={-12} y2={-86} stroke="#64748B" strokeWidth={5} strokeDasharray="8 5" />
                <circle cx={0} cy={-86} r={14} fill="none" stroke={C.luaNavy} strokeWidth={5} />
                <rect x={-10} y={-76} width={20} height={12} rx={3} fill={C.luaBlue} />
                <circle cx={0} cy={0} r={72} fill={C.luaNavy} stroke={C.luaSky} strokeWidth={8} />
                <circle cx={0} cy={0} r={59} fill={C.luaIce} />
                <circle cx={-16} cy={-12} r={11} fill="#93C5FD" opacity={0.6} />
                <circle cx={20} cy={14} r={15} fill="#93C5FD" opacity={0.5} />
                <circle cx={12} cy={-22} r={7} fill="#93C5FD" opacity={0.45} />
              </svg>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <span style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 64, color: C.luaNavy, letterSpacing: "-0.04em" }}>
                Lua
              </span>
              <IconArrowRight size={44} color={C.luaBlue} />
              <span style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 72, color: C.luaBlue, letterSpacing: "-0.03em" }}>
                BULAN
              </span>
            </div>
          </div>
        </ExplainCard>

        {/* Beat C: Character Illustration — Developer staring at Moon while coding! */}
        <ExplainCard
          at={220}
          w={960}
          h={620}
          y={725}
          badge="BUKAN GITU KONSEPNYA!"
          badgeIcon={<IconXCircle size={18} color={C.red} />}
          watermark="MYTH BUSTED"
          dark
        >
          <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-around", paddingTop: 40 }}>
            <div style={{ position: "relative", width: 280, height: 260, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
              <MiniCharacter kind="coder" x={115} y={115} scale={1.45} running={false} frame={frame} />
              <div style={{ marginTop: 185, display: "flex", alignItems: "center", gap: 10 }}>
                <IconLaptop size={44} color={C.luaIce} />
                <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 26, color: C.white }}>Ngoding Malam</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <div style={{ transform: `rotate(${Math.sin(frame * 0.1) * 8}deg)` }}>
                <IconMoon size={150} color={C.luaSky} />
              </div>
              <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 30, color: C.luaSky }}>
                Sambil Natap Bulan
              </span>
            </div>

            {frame >= 250 && (
              <div
                style={{
                  position: "absolute",
                  transform: `scale(${xStamp}) rotate(-8deg)`,
                  background: C.red,
                  color: C.white,
                  border: "3px solid rgba(255,255,255,0.92)",
                  borderRadius: 24,
                  padding: "16px 38px",
                  fontFamily: FONT.sans,
                  fontWeight: 900,
                  fontSize: 50,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  boxShadow: "0 24px 48px rgba(0,0,0,0.45)",
                }}
              >
                <IconXCircle size={50} color={C.white} />
                <span>BUKAN YA!</span>
              </div>
            )}
          </div>
        </ExplainCard>

        <MemeSticker src="memes/coba_jelaskan.jpg" x={205} y={1245} w={245} h={225} at={35} until={67} rotate={-6} />
        <MemeSticker src="memes/shocked_pikachu.jpg" x={875} y={1245} w={255} h={230} at={108} until={220} rotate={5} />
        <MemeSticker src="memes/gak_beres.jpg" x={205} y={1245} w={250} h={230} at={250} until={282} rotate={-5} />
        <MemeSticker src="memes/pura.jpg" x={875} y={1245} w={295} h={325} at={292} rotate={4} />

        <DevtrineMascot
          x={mascotX}
          y={1245 + hop}
          size={156}
          expression={isJoke ? "laughing" : isMoon ? "amazed" : "curious"}
          tears={isJoke && frame >= 295 ? 1 : 0}
          blink={autoBlink(frame, 17)}
          rotate={isJoke ? Math.sin(frame * 0.3) * 7 : 0}
          lookX={0}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Flash at={89} color={C.luaIce} max={0.3} />

      <Subtitles
        cues={[
          { from: 12, to: 72, text: "Terus, kenapa namanya Lua?", hi: ["namanya", "Lua?"] },
          { from: 88, to: 112, text: "Fun fact!", hi: ["Fun", "fact!"] },
          { from: 115, to: 214, text: "Lua berarti BULAN dalam bahasa Portugis!", hi: ["BULAN", "Portugis!"] },
          { from: 222, to: 332, text: "Bukan karena developernya ngoding sambil menatap bulan ya, hahaha!", hi: ["Bukan", "menatap", "bulan"] },
        ]}
      />

      <Sfx name="sus" at={35} volume={0.85} duration={36} />
      <Sfx name="thud" at={89} volume={0.9} duration={44} />
      <Sfx name="shimmer" at={115} volume={0.65} duration={36} />
      <Sfx name="bruh" at={250} volume={0.95} duration={16} />
      <Sfx name="meme_haha" at={306} volume={0.85} duration={32} />
    </Background>
  );
};
