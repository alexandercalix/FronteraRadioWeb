// src/main.js
import { RadioPlayer } from "./audio.js";
import { initUI, animatePlayState } from "./ui.js";
import { CONFIG } from "./config.js";

const player = new RadioPlayer(CONFIG.streamUrl);

document.addEventListener("DOMContentLoaded", () => {
  initUI();

  const playBtn = document.getElementById("playTrigger");

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      console.log("Play button clicked!"); // Log 1
      const isPlaying = player.toggle();
      console.log("Is playing state:", isPlaying); // Log 2
      animatePlayState(isPlaying);
    });
  } else {
    console.error("CRITICAL: playTrigger button not found in DOM.");
  }
});
