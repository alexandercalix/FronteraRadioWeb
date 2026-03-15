import { CONFIG } from "./config.js";

export const initBackground = () => {
  const fxLayer = document.querySelector("#fx-layer");
  if (!fxLayer) return;

  fxLayer.innerHTML = `
    <div class="video-container">
      <video muted playsinline loop id="bgVideo" preload="auto">
        <source src="${CONFIG.video.src}" type="video/mp4">
      </video>
      <div class="video-overlay"></div>
    </div>
  `;

  const video = document.getElementById("bgVideo");

  video.addEventListener("loadedmetadata", () => {
    // Apply the speed from your config
    video.playbackRate = CONFIG.video.speed || 0.5;

    // Play the video with a safety catch for browser restrictions
    video.play().catch((err) => {
      console.log("FX: Waiting for user interaction to start video engine.");
    });
  });
};
