import { Config } from "@remotion/cli/config";

// Render configuration — 2x Retina Supersampling in Chromium (2160x3840) downscaled via Lanczos to 1080x1920 SDR Rec.709 (~20-23 MB for Instagram Reels, no HDR).
Config.setEntryPoint("src/index.ts");
Config.setScale(2);
Config.setVideoImageFormat("png");
Config.setColorSpace("bt709");
Config.setCodec("h264");
Config.setPixelFormat("yuv420p");
Config.setCrf(18);
Config.setEncodingMaxRate("2350k");
Config.setEncodingBufferSize("4700k");
Config.setX264Preset("slow");
Config.setAudioCodec("aac");
Config.setAudioBitrate("192k");
Config.setOverwriteOutput(true);
Config.overrideFfmpegCommand(({ type, args }) => {
  if (type !== "pre-stitcher") return args;
  const scaleFilter = "scale=1080:1920:flags=lanczos+accurate_rnd+full_chroma_int";
  const vfIdx = args.indexOf("-vf");
  if (vfIdx !== -1 && args[vfIdx + 1]) {
    const next = [...args];
    next[vfIdx + 1] = `${next[vfIdx + 1]},${scaleFilter}`;
    return next;
  }
  const yIdx = args.lastIndexOf("-y");
  if (yIdx !== -1) {
    return [...args.slice(0, yIdx), "-vf", scaleFilter, ...args.slice(yIdx)];
  }
  return args;
});
