import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import timelineData from "./timeline-data.json";
import { AUDIO, C } from "./theme";
import { lerp } from "./lib/anim";
import { BLINK_DURATION, BlinkWipe } from "./components/Transition";
import { Scene01RobloxHook } from "./scenes/Scene01RobloxHook";
import { Scene02LuaReveal } from "./scenes/Scene02LuaReveal";
import { Scene03BrazilOrigin } from "./scenes/Scene03BrazilOrigin";
import { Scene04LightweightConfig } from "./scenes/Scene04LightweightConfig";
import { Scene05MoonName } from "./scenes/Scene05MoonName";
import { Scene06GameWorldEnter } from "./scenes/Scene06GameWorldEnter";
import { Scene07RobloxLuau } from "./scenes/Scene07RobloxLuau";
import { Scene08OtherGamesMontage } from "./scenes/Scene08OtherGamesMontage";
import { Scene09JourneyMeme } from "./scenes/Scene09JourneyMeme";
import { Scene10SmallButPowerfulClosing } from "./scenes/Scene10SmallButPowerfulClosing";

const SCENE_COMPONENTS: Record<string, React.FC> = {
  hook: Scene01RobloxHook,
  luaReveal: Scene02LuaReveal,
  brazilOrigin: Scene03BrazilOrigin,
  lightweightConfig: Scene04LightweightConfig,
  moonName: Scene05MoonName,
  gameWorldEnter: Scene06GameWorldEnter,
  robloxLuau: Scene07RobloxLuau,
  otherGames: Scene08OtherGamesMontage,
  journeyMeme: Scene09JourneyMeme,
  closing: Scene10SmallButPowerfulClosing,
};

let cursor = 0;
export const TIMELINE = timelineData.scenes.map((s) => {
  const from = cursor;
  cursor += s.duration;
  return { ...s, from };
});
export const TOTAL_FRAMES = cursor; // 2640 frames = 88.0s @ 30fps

export const MainComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.black, overflow: "hidden" }}>
      {/* Background Music with loop + automatic fade-in/out */}
      <Audio
        src={staticFile("audio/bgm/bgm.wav")}
        loop
        volume={(f) => {
          const fadeIn = lerp(f, [0, 18], [0, 1]);
          const fadeOut = lerp(f, [TOTAL_FRAMES - 35, TOTAL_FRAMES], [1, 0]);
          return AUDIO.bgm * fadeIn * fadeOut;
        }}
      />

      {/* Master Voice-Over (public/audio/vo/vo-synced.wav) */}
      <Audio
        src={staticFile("audio/vo/vo-synced.wav")}
        volume={AUDIO.vo}
      />

      {/* 10 Modular Lua EP.03 Scenes (Vox + Meme + Devtrine Mascot) */}
      {TIMELINE.map((sc) => {
        const Comp = SCENE_COMPONENTS[sc.id];
        return (
          <Sequence key={sc.id} from={sc.from} durationInFrames={sc.duration} name={sc.title}>
            <Comp />
          </Sequence>
        );
      })}

      {/* Signature Devtrine BlinkWipe Transitions at scene boundaries */}
      {TIMELINE.slice(1).map((sc) => (
        <Sequence
          key={`wipe-${sc.id}`}
          from={sc.from - BLINK_DURATION / 2}
          durationInFrames={BLINK_DURATION}
          name={`Transition → ${sc.id}`}
        >
          <BlinkWipe />
        </Sequence>
      ))}

      {/* Persistent Devtrine Studio Brand Pill (Top-Right Safe Area) */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: C.white,
          border: `3px solid ${C.charcoal}`,
          borderRadius: "50%",
          width: 80,
          height: 80,
          padding: 0,
          zIndex: 90,
        }}
      >
        <Img src={staticFile("images/devtrine-logo-removebg.png")} style={{ width: 60, objectFit: "contain" }} />
      </div>
    </AbsoluteFill>
  );
};
