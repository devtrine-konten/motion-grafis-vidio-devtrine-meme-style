import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { autoBlink, keys, spr } from "../lib/anim";
import { Background } from "../components/Background";
import { Camera } from "../components/Camera";
import { DevtrineMascot } from "../components/DevtrineMascot";
import { ExplainCard } from "../components/Explainers";
import { IconCode, IconLayers, IconPlug } from "../components/Icons";
import { Header } from "../components/KineticTypography";
import { MemeSticker } from "../components/MemeKit";
import { Sfx } from "../components/SoundEffect";
import { Subtitles } from "../components/Subtitles";

export const Scene08WhyPerlStrong: React.FC = () => {
  const frame = useCurrentFrame();
  const camScale = keys(frame, [0, 36, 123, 146, 210], [1, 1.04, 1.03, 1.06, 1.02]);

  const ITEMS = [
    { label: "Teks Kuat", at: 36, icon: <IconCode size={78} color={C.perlSky} /> },
    { label: "Fleksibel", at: 123, icon: <IconLayers size={78} color={C.camelGold} /> },
    { label: "Gabung Tools", at: 146, icon: <IconPlug size={78} color={C.perlDeep} />, highlight: true },
  ];

  const mascotX = keys(frame, [0, 36, 123, 146, 210], [540, 610, 480, 560, 540]);
  const hop =
    (frame >= 36 && frame < 52 ? Math.sin(((frame - 36) / 16) * Math.PI) * -28 : 0) +
    (frame >= 123 && frame < 139 ? Math.sin(((frame - 123) / 16) * Math.PI) * -28 : 0) +
    (frame >= 146 && frame < 162 ? Math.sin(((frame - 146) / 16) * Math.PI) * -32 : 0);

  return (
    <Background variant="dotMatrix" drift={1.0}>
      <Camera scale={camScale} focusX={540} focusY={725}>
        <Header
          title="Kenapa Perl Begitu Kuat?"
          highlight={["Kenapa", "Perl", "Kuat?"]}
        />

        <ExplainCard at={4} w={960} h={610} y={725} dark>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, width: "100%", height: "100%", padding: "14px 4px" }}>
            {ITEMS.map((it) => {
              const show = frame >= it.at;
              const p = spr(frame, it.at, { damping: 11, stiffness: 210 });
              return (
                <div
                  key={it.label}
                  style={{
                    background: it.highlight && show ? C.camelGold : "rgba(255,255,255,0.10)",
                    border: it.highlight ? `3px solid ${C.white}` : "2px solid rgba(56,189,248,0.35)",
                    borderRadius: 26,
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 24,
                    transform: `scale(${show ? p : 0.86})`,
                    opacity: show ? 1 : 0.22,
                    boxShadow: show ? "0 18px 36px rgba(0,0,0,0.3)" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: 32,
                      background: it.highlight && show ? "rgba(255,255,255,0.35)" : "rgba(4,21,39,0.55)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {it.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.sans,
                      fontWeight: 900,
                      fontSize: 34,
                      color: it.highlight && show ? C.perlDeep : C.white,
                      textAlign: "center",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {it.label}
                  </div>
                </div>
              );
            })}
          </div>
        </ExplainCard>

        <MemeSticker src="memes/coba_jelaskan.jpg" x={205} y={1245} w={250} h={230} at={10} until={35} rotate={-5} />
        <MemeSticker src="memes/chad_gojo.jpg" x={205} y={1245} w={265} h={240} at={38} until={144} rotate={-4} />
        <MemeSticker src="memes/gacor.jpg" x={875} y={1245} w={265} h={240} at={146} rotate={4} />

        <DevtrineMascot
          x={mascotX}
          y={1245 + hop + Math.sin(frame * 0.16) * 6}
          size={156}
          expression={
            frame < 36
              ? "confused"
              : frame < 121
                ? "proud"
                : frame < 146
                  ? "happy"
                  : frame < 168
                    ? "amazed"
                    : "cool"
          }
          magnifyingGlass={frame < 36}
          headband={frame >= 36 && frame < 121}
          shield={frame >= 36 && frame < 121}
          sunglasses={frame >= 168}
          blink={autoBlink(frame, 12)}
          rotate={Math.sin(frame * 0.14) * 5}
          lookX={frame < 121 ? -0.35 : frame < 146 ? 0 : 0.35}
          lookY={-0.3}
          frame={frame}
          shadow
        />
      </Camera>

      <Subtitles
        cues={[
          { from: 11, to: 28, text: "Kenapa?", hi: ["Kenapa?"] },
          { from: 36, to: 115, text: "Karena Perl punya kemampuan mengolah teks yang kuat,", hi: ["mengolah", "teks", "kuat,"] },
          { from: 121, to: 142, text: "fleksibel,", hi: ["fleksibel,"] },
          { from: 146, to: 202, text: "dan bisa menggabungkan berbagai tools.", hi: ["menggabungkan", "berbagai", "tools."] },
        ]}
      />

      <Sfx name="what_meme" at={10} volume={0.85} duration={24} />
      <Sfx name="pop" at={36} volume={0.85} />
      <Sfx name="pop" at={123} volume={0.85} />
      <Sfx name="meme_click" at={146} volume={0.9} />
      <Sfx name="confirm" at={165} volume={0.9} />
    </Background>
  );
};
