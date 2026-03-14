export class RadioPlayer {
  constructor(url) {
    this.url = url;
    this.audio = new Audio();
    this.audio.src = this.url;
    this.audio.preload = "none";
    this.audio.crossOrigin = "anonymous";
  }

  play() {
    // Re-assigning the SRC on play is a classic "Radio Hack"
    // to ensure you get the LATEST data, not the cached buffer.
    this.audio.src = this.url;
    this.audio.load();

    const playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error("Playback failed:", error);
      });
    }
  }

  pause() {
    this.audio.pause();
    this.audio.src = ""; // Stops the data stream immediately
  }

  toggle() {
    if (this.audio.paused) {
      this.play();
      return true;
    } else {
      this.pause();
      return false;
    }
  }
}
