let viewer;

let autoRotate = true;

let backgroundIndex = 0;

// =========================
// FUNDOS
// =========================

const backgrounds = [

  "#0b0f14",
  "#ffffff",
  "#1a1026",
  "#001219",
  "#202020"

];

// =========================
// ESTILO PRINCIPAL
// =========================

function applyStyle() {

  // IMPORTANTE:
  // NÃO usar singleBonds:true

  viewer.setStyle({}, {

    stick: {

      radius: 0.12,

      smoothBond: false

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

  // COBRE
  viewer.addStyle(
    { elem: "Cu" },

    {

      sphere: {
        scale: 0.40
      },

      stick: {
        radius: 0.14
      },

      color: "#d89c59"

    }

  );

}

// =========================
// CARREGAR MOLÉCULA
// =========================

async function loadMolecule() {

  // Carrega MOL
  const response =
    await fetch(
      "complexoatualizado.mol"
    );

  const mol =
    await response.text();

  // Viewer
  viewer =
    $3Dmol.createViewer(
      "viewer",
      {

        backgroundColor:
          backgrounds[0],

        antialias: false

      }
    );

  // Outline melhora FPS
  viewer.setViewStyle({
    style: "outline"
  });

  // IMPORTANTE:
  // usa MOL e não XYZ
  viewer.addModel(
    mol,
    "mol"
  );

  // Aplica estilos
  applyStyle();

  // Centraliza
  viewer.zoomTo();

  // Renderiza
  viewer.render();

  // Auto rotação
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
  canvas.addEventListener(
    "mousemove",
    e => {

      if (
        autoRotate &&
        e.buttons === 1
      ) {

        e.stopImmediatePropagation();

      }

    },
    true
  );

  // Mouse down
  canvas.addEventListener(
    "mousedown",
    e => {

      if (autoRotate) {

        e.stopImmediatePropagation();

      }

    },
    true
  );

  // Touch
  canvas.addEventListener(
    "touchmove",
    e => {

      if (autoRotate) {

        if (
          e.touches.length === 1
        ) {

          e.stopImmediatePropagation();

        }

      }

    },
    true
  );

}

// =========================
// ROTAÇÃO
// =========================

function toggleRotation() {

  autoRotate = !autoRotate;

  if (autoRotate) {

    viewer.spin("y", 0.08);

    document
      .getElementById(
        "rotateBtn"
      )
      .innerText =
      "Rotação: Automática";

  }

  else {

    viewer.spin(false);

    document
      .getElementById(
        "rotateBtn"
      )
      .innerText =
      "Rotação: Manual";

  }

}

// =========================
// INFO
// =========================

function toggleInfo() {

  const infoBox =
    document.getElementById(
      "infoBox"
    );

  infoBox.classList.toggle(
    "hidden"
  );

}

// =========================
// OCULTAR UI
// =========================

function toggleUI() {

  document.body.classList.toggle(
    "ui-hidden"
  );

}

// =========================
// FULLSCREEN
// =========================

function toggleFullscreen() {

  // Entrar
  if (
    !document.fullscreenElement
  ) {

    document.documentElement
      .requestFullscreen();

  }

  // Sair
  else {

    document.exitFullscreen();

  }

  // Ajuste render
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

  if (
    backgroundIndex >=
    backgrounds.length
  ) {

    backgroundIndex = 0;

  }

  const currentBackground =
    backgrounds[
      backgroundIndex
    ];

  // Fundo viewer
  viewer.setBackgroundColor(
    currentBackground
  );

  viewer.render();

  // Fundo claro
  const isLightBackground =
    currentBackground ===
    "#ffffff";

  // Elementos
  const title =
    document.querySelector(
      ".title"
    );

  const legend =
    document.querySelector(
      ".legend"
    );

  const infoBox =
    document.querySelector(
      ".info-box"
    );

  const buttons =
    document.querySelectorAll(
      ".controls button"
    );

  // Tema claro
  if (isLightBackground) {

    title.style.color =
      "#111";

    legend.style.color =
      "#111";

    infoBox.style.color =
      "#111";

    infoBox.style.background =
      "rgba(255,255,255,0.85)";

    buttons.forEach(button => {

      button.style.color =
        "#111";

      button.style.background =
        "rgba(0,0,0,0.06)";

      button.style.border =
        "1px solid rgba(0,0,0,0.08)";

    });

  }

  // Tema escuro
  else {

    title.style.color =
      "white";

    legend.style.color =
      "white";

    infoBox.style.color =
      "white";

    infoBox.style.background =
      "rgba(255,255,255,0.08)";

    buttons.forEach(button => {

      button.style.color =
        "white";

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
