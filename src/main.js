console.log("MAIN: Script is loading...");

import { RadioPlayer } from "./audio.js";
import { initUI, animatePlayState } from "./ui.js";
import { initBackground } from "./fx.js";
import { CONFIG } from "./config.js";

console.log("MAIN: Imports successful.");

const player = new RadioPlayer(CONFIG.streamUrl);

document.addEventListener("DOMContentLoaded", () => {
  console.log("MAIN: DOM Content Loaded. Initializing...");

  try {
    initBackground();
    initUI();

    const playBtn = document.getElementById("playTrigger");
    if (playBtn) {
      console.log("MAIN: Play button found!");
      playBtn.addEventListener("click", () => {
        const isPlaying = player.toggle();
        animatePlayState(isPlaying);
      });
    } else {
      console.error("MAIN ERROR: playTrigger not found!");
    }
  } catch (error) {
    console.error("MAIN CRASHED during init:", error);
  }
});
