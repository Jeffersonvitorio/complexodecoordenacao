let viewer;

let autoRotate = true;

let backgroundIndex = 0;

// Fundos
const backgrounds = [

  "#0b0f14",
  "#ffffff",
  "#1a1026",
  "#001219",
  "#202020"

];

// =========================
// ESTILO ALTO FPS
// =========================

function applyPerformanceStyle() {

  // Render mais leve
  viewer.setStyle({}, {

    stick: {
      radius: 0.15
    },

    sphere: {
      scale: 0.17
    }

  });

  // Oxigênio
  viewer.addStyle(
    { elem: "O" },
    {
      color: "#ff3b3b"
    }
  );

  // Nitrogênio
  viewer.addStyle(
    { elem: "N" },
    {
      color: "#3b82ff"
    }
  );

  // Carbono
  viewer.addStyle(
    { elem: "C" },
    {
      color: "#777777"
    }
  );

  // Hidrogênio
  viewer.addStyle(
    { elem: "H" },
    {
      color: "#f5f5f5"
    }
  );

  // Cobre
  viewer.addStyle(
    { elem: "Cu" },

    {

      sphere: {
        scale: 0.38
      },

      stick: {
        radius: 0.24
      },

      color: "#d89c59"

    }

  );

}

// =========================
// CARREGAR MOLÉCULA
// =========================

async function loadMolecule() {

  // Arquivo XYZ
  const response =
    await fetch("complexo.xyz");

  const xyz =
    await response.text();

  // Viewer otimizado
  viewer =
    $3Dmol.createViewer("viewer", {

      backgroundColor: backgrounds[0],

      antialias: false

    });

  // Outline melhora FPS
  viewer.setViewStyle({
    style: "outline"
  });

  // Modelo
  viewer.addModel(xyz, "xyz");

  // Estilo
  applyPerformanceStyle();

  // Centraliza
  viewer.zoomTo();

  // Renderiza
  viewer.render();

  // Rotação suave
  viewer.spin("y", 0.08);

  // Controles
  setupControls();

}

// =========================
// CONTROLES
// =========================

function setupControls() {

  const canvas =
    document.querySelector("canvas");

  // Mouse
  canvas.addEventListener("mousemove", e => {

    if (autoRotate && e.buttons === 1) {

      e.stopImmediatePropagation();

    }

  }, true);

  // Mouse down
  canvas.addEventListener("mousedown", e => {

    if (autoRotate) {

      e.stopImmediatePropagation();

    }

  }, true);

  // Touch
  canvas.addEventListener("touchmove", e => {

    if (autoRotate) {

      if (e.touches.length === 1) {

        e.stopImmediatePropagation();

      }

    }

  }, true);

}

// =========================
// TOGGLE ROTAÇÃO
// =========================

function toggleRotation() {

  autoRotate = !autoRotate;

  if (autoRotate) {

    // Rotação mais leve
    viewer.spin("y", 0.08);

    document
      .getElementById("rotateBtn")
      .innerText =
      "Rotação: Automática";

  }

  else {

    viewer.spin(false);

    document
      .getElementById("rotateBtn")
      .innerText =
      "Rotação: Manual";

  }

}

// =========================
// INFO
// =========================

function toggleInfo() {

  const infoBox =
    document.getElementById("infoBox");

  infoBox.classList.toggle("hidden");

}

// =========================
// FULLSCREEN
// =========================

function toggleFullscreen() {

  // Entrar
  if (!document.fullscreenElement) {

    document.documentElement
      .requestFullscreen();

  }

  // Sair
  else {

    document.exitFullscreen();

  }

  // Re-render otimizado
  setTimeout(() => {

    viewer.resize();

    viewer.render();

  }, 120);

}

// =========================
// TROCAR FUNDO
// =========================

function changeBackground() {

  backgroundIndex++;

  if (backgroundIndex >= backgrounds.length) {

    backgroundIndex = 0;

  }

  const currentBackground =
    backgrounds[backgroundIndex];

  // Fundo viewer
  viewer.setBackgroundColor(
    currentBackground
  );

  viewer.render();

  // Fundo claro
  const isLightBackground =
    currentBackground === "#ffffff";

  // Elementos
  const title =
    document.querySelector(".title");

  const legend =
    document.querySelector(".legend");

  const infoBox =
    document.querySelector(".info-box");

  const buttons =
    document.querySelectorAll(".controls button");

  // Tema claro
  if (isLightBackground) {

    title.style.color = "#111";
    legend.style.color = "#111";
    infoBox.style.color = "#111";

    infoBox.style.background =
      "rgba(255,255,255,0.85)";

    buttons.forEach(button => {

      button.style.color = "#111";

      button.style.background =
        "rgba(0,0,0,0.06)";

      button.style.border =
        "1px solid rgba(0,0,0,0.08)";

    });

  }

  // Tema escuro
  else {

    title.style.color = "white";
    legend.style.color = "white";
    infoBox.style.color = "white";

    infoBox.style.background =
      "rgba(255,255,255,0.08)";

    buttons.forEach(button => {

      button.style.color = "white";

      button.style.background =
        "rgba(255,255,255,0.08)";

      button.style.border =
        "1px solid rgba(255,255,255,0.08)";

    });

  }

}

// =========================
// INICIALIZA
// =========================

loadMolecule();