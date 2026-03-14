import { CONFIG } from "./config.js";

export const initUI = () => {
  const playerLayer = document.querySelector("#player-layer");
  const uiLayer = document.querySelector("#ui-layer");

  playerLayer.innerHTML = `<img src="assets/logo.png" class="logo-main" id="mainLogo" style="pointer-events:none">`;

  // Generate Social Icon HTML from Config
  const socialHTML = CONFIG.socials
    .map(
      (s) => `
    <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-link">
      <i class="${s.iconClass}"></i>
    </a>
  `,
    )
    .join("");

  // Updated Control Bar Structure
  // Inside initUI in src/ui.js
  uiLayer.innerHTML = `
    <div class="control-bar">
      <div class="bar-left">
        <i class="fa-solid fa-play play-btn" id="playTrigger"></i>
      </div>
      
      <div class="bar-center">
        <span class="station-name">FRONTERA 95.1 FM</span>
      </div>

      <div class="bar-right">
        <div class="social-cluster">
          ${socialHTML}
        </div>
        <i class="fa-solid fa-circle-info info-btn" id="aboutBtn"></i>
      </div>
    </div>

    <div id="aboutModal" class="modal-overlay">
      <div class="modal-content glass-panel">
        <i class="fa-solid fa-xmark close-btn" id="closeModal"></i>
        
        <p class="location-text">Desde Camasca, Intibucá, Honduras para el mundo</p>
        
        <h2 class="cyber-title">FRONTERA 95.1</h2>
        <h3 class="slogan-text">LA LEY DEL FM</h3>

        <div class="map-container">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4274.623918264991!2d-88.37805502448444!3d13.996796586421128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f64e9e498f2bcc7%3A0xb590f9a6b6464a74!2sRADIO%20FRONTERA%2095.1FM!5e1!3m2!1sen!2sus!4v1773519674544!5m2!1sen!2sus" width="100%" height="150" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <div class="modal-footer">
            <span>Developed By: O.C.</span>
            <a href="https://www.linkedin.com/in/oscarcalixnolasco/" target="_blank" class="dev-link">
              <i class="fa-brands fa-linkedin"></i>
            </a>
        </div>
      </div>
    </div>
  `;

  startDVDBounce();
  setupModalLogic(); // Initialize the listeners
};

const startDVDBounce = () => {
  const logo = document.getElementById("mainLogo");
  if (!logo) return;

  const logoSize = 200;
  let x = window.innerWidth / 2 - logoSize / 2;
  let y = window.innerHeight / 2 - logoSize / 2;
  let vx = 3;
  let vy = 3;
  let rotation = 0;

  gsap.ticker.add(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (x + logoSize >= w || x <= 0) vx *= -1;
    if (y + logoSize >= h || y <= 0) vy *= -1;

    x += vx;
    y += vy;
    rotation += 1;

    gsap.set(logo, { x, y, rotation });
  });
};

const setupModalLogic = () => {
  const modal = document.getElementById("aboutModal");
  const btn = document.getElementById("aboutBtn");
  const close = document.getElementById("closeModal");

  if (!modal || !btn || !close) return;

  // 1. OPEN MODAL
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent bar from handling the click
    modal.style.display = "flex";
    modal.style.pointerEvents = "auto"; // Enable clicks

    gsap.fromTo(
      ".modal-content",
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
    );
  });

  // 2. CLOSE FUNCTION
  const closeModalFunc = (e) => {
    if (e) e.stopPropagation();

    gsap.to(".modal-content", {
      scale: 0.5,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        modal.style.display = "none";
        modal.style.pointerEvents = "none"; // Disable clicks so it doesn't block the UI
      },
    });
  };

  // 3. EVENT LISTENERS
  close.addEventListener("click", closeModalFunc);

  // Close if clicking the dark overlay area (but not the content box)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc(e);
    }
  });
};

export const animatePlayState = (isPlaying) => {
  const btn = document.getElementById("playTrigger");
  const logo = document.getElementById("mainLogo");
  const bar = document.querySelector(".control-bar");

  if (!btn || !logo || !bar) return;

  // 1. Toggle Icon Class
  btn.className = isPlaying
    ? "fa-solid fa-pause play-btn"
    : "fa-solid fa-play play-btn";
  const targetColor = isPlaying
    ? CONFIG.style.activeColor
    : CONFIG.style.neonColor;

  // Kill any previous pulsing animations to avoid overlaps
  gsap.killTweensOf([logo, bar, btn]);

  if (isPlaying) {
    // --- PLAYING STATE (Pulsing / Breathing) ---

    // Pulse the Logo Glow & Scale
    gsap.to(logo, {
      scale: 1.25,
      filter: `drop-shadow(0 0 50px ${targetColor})`,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Animate the Bar: Change border thickness and glow size
    gsap.to(bar, {
      borderColor: targetColor,
      // borderTopWidth: "4px", // Make it thicker when playing
      boxShadow: `0 -8px 25px ${targetColor}66`, // "66" adds transparency to the glow
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Pulse the Play Button icon color/glow
    gsap.to(btn, {
      color: targetColor,
      textShadow: `0 0 20px ${targetColor}`,
      boxShadow: "none", // Ensures no square shadow
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".social-link", {
      color: targetColor,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  } else {
    // --- PAUSED STATE (Static / Idle) ---

    gsap.to(logo, {
      scale: 1,
      filter: `drop-shadow(0 0 10px ${targetColor})`,
      duration: 0.5,
    });

    gsap.to(bar, {
      borderColor: targetColor,
      borderTopWidth: "2px", // Back to normal thickness
      boxShadow: "0 0 0px transparent",
      duration: 0.5,
    });

    gsap.to(btn, {
      color: targetColor,
      textShadow: "0 0 0px transparent",
      boxShadow: "none",
      duration: 0.5,
    });

    gsap.to(".social-link", {
      color: targetColor,
      duration: 0.5,
    });
  }
};
