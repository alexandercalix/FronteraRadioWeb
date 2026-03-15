import { CONFIG } from "./config.js";

export const initUI = () => {
  const uiLayer = document.querySelector("#ui-layer");

  const socialHTML = CONFIG.socials
    .map(
      (s) => `
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-link">
        <i class="${s.iconClass}"></i>
      </a>
    `,
    )
    .join("");

  uiLayer.innerHTML = `
    <div class="control-bar">
      <div class="bar-left">
        <i class="fa-solid fa-play play-btn" id="playTrigger"></i>
      </div>
      
      <div class="bar-center">
        <img src="assets/logo.png" id="navLogo" 
             style="height: 45px; width: auto; object-fit: contain; 
                    filter: drop-shadow(0 0 8px var(--neon-cyan)); 
                    pointer-events: none; user-select: none;">
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
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15474.068214234557!2d-88.357159!3d14.164843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6504a3e4756623%3A0x67341e33c70f8664!2sCamasca!5e0!3m2!1ses-419!2shn!4v1710000000000!5m2!1ses-419!2shn" 
            width="100%" height="150" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
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

  setupModalLogic();
};

const setupModalLogic = () => {
  const modal = document.getElementById("aboutModal");
  const btn = document.getElementById("aboutBtn");
  const close = document.getElementById("closeModal");

  if (!modal || !btn || !close) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.style.display = "flex";
    modal.style.pointerEvents = "auto";
    gsap.fromTo(
      ".modal-content",
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
    );
  });

  const closeModalFunc = (e) => {
    if (e) e.stopPropagation();
    gsap.to(".modal-content", {
      scale: 0.5,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        modal.style.display = "none";
        modal.style.pointerEvents = "none";
      },
    });
  };

  close.addEventListener("click", closeModalFunc);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModalFunc(e);
  });
};

export const animatePlayState = (isPlaying) => {
  const btn = document.getElementById("playTrigger");
  const logo = document.getElementById("navLogo");
  const bar = document.querySelector(".control-bar");

  if (!btn || !logo || !bar) return;

  btn.className = isPlaying
    ? "fa-solid fa-pause play-btn"
    : "fa-solid fa-play play-btn";
  const targetColor = isPlaying
    ? CONFIG.style.activeColor
    : CONFIG.style.neonColor;

  gsap.killTweensOf([logo, bar, btn]);

  if (isPlaying) {
    gsap.to(logo, {
      filter: `drop-shadow(0 0 15px ${targetColor})`,
      scale: 1.05,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(bar, {
      borderColor: targetColor,
      boxShadow: `0 -5px 20px ${targetColor}44`,
      duration: 1,
      repeat: -1,
      yoyo: true,
    });
  } else {
    gsap.to(logo, {
      filter: `drop-shadow(0 0 5px ${targetColor})`,
      scale: 1,
      duration: 0.5,
    });
    gsap.to(bar, { boxShadow: "0 0 0px transparent", duration: 0.5 });
  }
};
