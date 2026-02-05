/* =====================
   CONFIG & STATE
===================== */
const themeSwitch = document.getElementById("themeToggle");
const langSwitch = document.getElementById("langToggle");
const html = document.documentElement;

// Initialize state
let currentLang = "es";

const translations = {
  es: {
    language_label: "Lenguaje",
    theme_label: "Modo",
    subtitle: "Ingeniero de Software",
    about_title: "Sobre mí",
    about_text: "Ingeniero en Sistemas con sólida experiencia en desarrollo backend y arquitecturas de microservicios. Me especializo en construir sistemas robustos y escalables, integrando tecnologías de Inteligencia Artificial para optimizar procesos. Siempre busco la excelencia técnica y el código limpio.",
    page_description: "En esta página vas a encontrar algunos de mis proyectos y podrás verlos en detalle",
    projects_title: "Proyectos Destacados",
    proj_1_desc: "Sistema de procesamiento de lenguaje natural para análisis de sentimientos en tiempo real de grandes volúmenes de datos.",
    proj_2_desc: "Arquitectura de microservicios para plataforma de comercio electrónico de alta concurrencia, soportando miles de transacciones por segundo.",
    proj_3_desc: "Panel de control interactivo para dispositivos IoT domésticos con visualización de datos de consumo energético.",
    proj_4_desc: "Núcleo transaccional bancario con estricto cumplimiento de seguridad y auditoría en tiempo real."
  },
  en: {
    language_label: "Language",
    theme_label: "Mode",
    subtitle: "Software Engineer",
    about_title: "About Me",
    about_text: "Systems Engineer with solid experience in backend development and microservices architectures. I specialize in building robust and scalable systems, integrating Artificial Intelligence technologies to optimize processes. I always strive for technical excellence and clean code.",
    page_description: "In this page you will find some of my projects and you can see them in detail",
    projects_title: "Featured Projects",
    proj_1_desc: "Natural language processing system for real-time sentiment analysis of large data volumes.",
    proj_2_desc: "Microservices architecture for high-concurrency e-commerce platform, supporting thousands of transactions per second.",
    proj_3_desc: "Interactive dashboard for home IoT devices with energy consumption data visualization.",
    proj_4_desc: "Banking transaction core with strict security compliance and real-time auditing."
  }
};

/* =====================
   FUNCTIONS
===================== */

function updateLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

function updateTheme(theme) {
  html.dataset.theme = theme;
  // Persist if needed: localStorage.setItem('theme', theme);
  
  // Sync checkbox state
  themeSwitch.checked = theme === "dark";
}

/* =====================
   EVENT LISTENERS
===================== */

// Theme Toggle
// Check system preference initially if not set? For now default to light/unchecked in HTML.
// If HTML has data-theme="light", checkbox should be unchecked.
if (html.dataset.theme === "dark") {
  themeSwitch.checked = true;
}

themeSwitch.addEventListener("change", (e) => {
  const newTheme = e.target.checked ? "dark" : "light";
  updateTheme(newTheme);
});

// Language Toggle
// Unchecked = ES, Checked = EN
langSwitch.checked = false; // Reset to ES on load or check localStorage

langSwitch.addEventListener("change", (e) => {
  const newLang = e.target.checked ? "en" : "es";
  updateLanguage(newLang);
});

