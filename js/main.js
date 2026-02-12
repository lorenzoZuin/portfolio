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
    subtitle: "Ingeniero en Sistemas de Información",
    about_title: "Sobre mí",
    about_text: "Ingeniero en Sistemas con años de experiencia en desarrollo fullstack. Uso herramientas de IA para optimizar procesos de desarrollo y mejorar la calidad del código. Me gusta resolver problemas con soluciones profesionales. Soy bueno colaborando en equipo y tengo habilidades para liderazgo. Soy bueno encontrando soluciones eficientes a problemas.",
    page_description: "En esta página vas a encontrar algunos de mis proyectos y podrás verlos en detalle",
    education_title: "Educación",
    edu_1_degree: "Ingeniero en Sistemas de Información",
    edu_1_place: "UTN - Facultad Regional Córdoba",
    edu_1_time: "Graduado en Diciembre 2024",
    edu_1_gpa: "Promedio: 8.6",
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
    education_title: "Education",
    edu_1_degree: "Information Systems Engineer",
    edu_1_place: "UTN - Cordoba Regional Faculty",
    edu_1_time: "Graduated December 2024",
    edu_1_gpa: "GPA: 8.6",
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
      // If element has animation classes, we might want to re-trigger? 
      // For now just update text.
      
      // Special case for typing text if we implement it, but for now simple textContent is safe.
      el.textContent = translations[lang][key];
    }
  });
}

function updateTheme(theme) {
  html.dataset.theme = theme;
  // Persist if needed: localStorage.setItem('theme', theme);
  
  // Sync checkbox state
  if(themeSwitch) themeSwitch.checked = theme === "dark";
}

/* =====================
   EVENT LISTENERS
===================== */

// Theme Toggle
if (html.dataset.theme === "dark" && themeSwitch) {
  themeSwitch.checked = true;
}

if(themeSwitch) {
  themeSwitch.addEventListener("change", (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    updateTheme(newTheme);
  });
}

// Language Toggle
if(langSwitch) {
  langSwitch.checked = false; // Reset to ES on load or check localStorage

  langSwitch.addEventListener("change", (e) => {
    const newLang = e.target.checked ? "en" : "es";
    updateLanguage(newLang);
  });
}

/* =====================
   SCROLL ANIMATIONS
===================== */
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Once revealed, stay revealed
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.reveal');
  elements.forEach(el => observer.observe(el));
});

/* =====================
   PARALLAX BACKGROUND
===================== */
const aboutWrapper = document.getElementById('about-wrapper');
const aboutBg = document.querySelector('.about-bg');

if (aboutWrapper && aboutBg) {
  const handleParallax = () => {
    // Calculamos el desplazamiento relativo al inicio de la sección
    // Usamos el scroll de la ventana
    const scrollPosition = window.scrollY;
    const sectionOffset = aboutWrapper.offsetTop;
    
    // Solo animar si estamos cerca de la sección
    if (scrollPosition + window.innerHeight > sectionOffset && 
        scrollPosition < sectionOffset + aboutWrapper.offsetHeight) {
      
      // La velocidad con la que se mueve (menor a 1 para que sea más lento que el scroll)
      const speed = 0.3;
      
      // Calculamos cuánto se ha movido el scroll desde el inicio de la sección
      // Si queremos que se mueva RELATIVO a la sección, calculamos la diferencia
      const yPos = (scrollPosition - sectionOffset) * speed;
      
      aboutBg.style.transform = `translateY(${yPos}px)`;
    }
  };
  
  // Ejecutar en scroll
  window.addEventListener('scroll', handleParallax);
  
  // Ejecutar una vez después de que el DOM esté listo
  window.addEventListener('load', handleParallax);
  setTimeout(handleParallax, 100);
}
