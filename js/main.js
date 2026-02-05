/* =====================
   DARK / LIGHT MODE
===================== */
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

themeToggle.onclick = () => {
  const next = html.dataset.theme === "light" ? "dark" : "light";
  html.dataset.theme = next;
  themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
};

/* =====================
   IDIOMAS
===================== */
const translations = {
  es: {
    about_title: "Sobre mí",
    about_text: "Ingeniero en Sistemas. Me interesa IA, backend y proyectos bien hechos.",
    projects_title: "Proyectos"
  },
  en: {
    about_title: "About me",
    about_text: "Systems Engineer. Interested in AI, backend and well-built projects.",
    projects_title: "Projects"
  }
};

let currentLang = "es";

document.getElementById("langToggle").onclick = () => {
  currentLang = currentLang === "es" ? "en" : "es";
  document.getElementById("langToggle").textContent =
    currentLang === "es" ? "EN" : "ES";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = translations[currentLang][key];
  });
};

/* =====================
   FETCH GITHUB (opcional)
===================== */
// Acá después reemplazás los cards hardcodeados
// fetch("https://api.github.com/users/TU_USUARIO/repos")
