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
    about_text: "Ingeniero en Sistemas con años de experiencia en desarrollo fullstack. Uso herramientas de IA para optimizar procesos de desarrollo y mejorar la calidad del código. Me gusta resolver problemas con soluciones profesionales. Soy bueno colaborando en equipo y tengo habilidades para liderazgo. Soy bueno encontrando soluciones eficientes a problemas.",
    page_description: "En esta página vas a encontrar algunos de mis proyectos y podrás verlos en detalle",
    projects_title: "Proyectos Destacados",
    proj_1_desc: "Una aplicación que resuelve automáticamente sudokus partiendo de una interfaz gráfica, devolviendo la solución correcta siempre que sea posible.",
    proj_2_desc: "Un proyecto para predecir con modelos de inteligencia artificial el valor de la evapotranspiración del suelo basado en la obtención de miles de datos de satélites de la NASA.",
    proj_3_desc: "Una aplicación que permite gestionar notas personales categorizándolas, filtrandolas y pudiendo archivar, además de editar y borrar.",
    proj_4_desc: "Código para generar un wrapped de los clientes de Zaple en 2025 con sus números y logros del año.",
    proj_5_desc: "Un proyecto de ciencia de datos para predecir la calificación de libros en Amazon utilizando técnicas de machine learning.",
    proj_6_desc: "Una aplicación que funciona con un agente virtual de IA para tomar llamadas y atender pedidos, conectado con Vapi para gestionar las comunicaciones de voz."
  },
  en: {
    language_label: "Language",
    theme_label: "Mode",
    subtitle: "Software Engineer",
    about_title: "About Me",
    about_text: "Systems Engineer with years of experience in fullstack development. I use AI tools to optimize development processes and improve code quality. I enjoy solving problems with professional solutions. I'm good at collaborating in teams and have leadership skills. I'm skilled at finding efficient solutions to challenges.",
    page_description: "On this page you will find some of my projects and can view them in detail",
    projects_title: "Featured Projects",
    proj_1_desc: "An application that automatically solves sudoku puzzles from a graphical interface, returning the correct solution whenever possible.",
    proj_2_desc: "A project to predict the evapotranspiration value of soil using AI models based on thousands of data points from NASA satellites.",
    proj_3_desc: "An application that allows you to manage personal notes by categorizing them, filtering them, and archiving, as well as editing and deleting.",
    proj_4_desc: "Code to generate a Zaple wrapped for clients in 2025 with their numbers and year achievements.",
    proj_5_desc: "A data science project to predict book ratings on Amazon using machine learning techniques.",
    proj_6_desc: "An application that works with a virtual AI agent to take calls and handle orders, connected with Vapi to manage voice communications."
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

