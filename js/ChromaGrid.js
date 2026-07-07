import React, { useEffect, useRef, useState } from 'https://esm.sh/react@18';
import { gsap } from 'https://esm.sh/gsap';

const getProjectItems = (lang = 'es') => {
  const translations = {
    es: {
      sudoku: 'Resolución automática de sudokus con interfaz visual. Utiliza métodos avanzados como backtracking y algoritmos de búsqueda para encontrar soluciones de manera eficiente.',
      evapotranspiration: 'Predicción de un valor llamado evapotranspiración, se entrenó un modelo de machine learning con datos de años pasados para predecir el valor futuro.',
      notes: 'Gestión de notas con categorías, filtros y archivado.',
      zaple: 'Wrapped de clientes de Zaple con métricas y logros del año. Se utilizó scrapeo de datos de instagram y posterior procesamieto para generar resportes de cada cliente.',
      Centralizaple: 'Sistema CRM personalizado de gestión de clientes, empleados y gastos de Zaple, esta integrado con ARCA para realizar facturación automática desde la plataforma.',
      books: 'Predicción de calificación de libros en Amazon con machine learning. Se entrenó un modelo con datos de libros y sus calificaciones para predecir la calificación de libros nuevos.',
      nexobit: 'Agente virtual de IA para atender llamadas y pedidos. Esd un agente que atiende llamadas telefónicas para cargar pedidos de manera automática.',
      mindgames: 'Juego cognitivo para entrenar atención, memoria y velocidad de respuesta. Hecho especialmente para personas adultas para ayudar a reducir el deterioro cognitivo',
      hunters: 'Pagina web profesional de un grupo de entrenamiento de OCR de Córdoba tiene la información de los entrenamientos, horarios y contacto.'
    },
    en: {
      sudoku: 'Automatic sudoku solving with a visual interface. Uses advanced methods like backtracking and search algorithms to find solutions efficiently.',
      evapotranspiration: 'Evapotranspiration prediction, a machine learning model was trained with past data to predict future values.',
      notes: 'Note management with categories, filters, and archiving.',
      zaple: 'Zaple client wrapped with key metrics and yearly achievements. Data was scraped from Instagram and processed to generate reports for each client.',
      Centralizaple: 'Custom CRM system for managing clients, employees, and expenses for Zaple, integrated with ARCA for automatic invoicing from the platform.',
      books: 'Amazon book rating prediction with machine learning. A model was trained with book data and their ratings to predict the rating of new books.',
      nexobit: 'Virtual AI agent for handling calls and orders. It is an agent that answers phone calls to automatically process orders.',
      mindgames: 'Cognitive game to train attention, memory, and response speed. Made especially for adults to help reduce cognitive decline.',
      hunters: 'Professional website for a training group in OCR of Córdoba, providing information about training sessions, schedules, and contact details.'
    }
  };

  const copy = translations[lang] || translations.es;

  return [
    {
        title: 'Evapotranspiración',
        subtitle: copy.evapotranspiration,
        tags: ['ML', 'Python'],
        borderColor: '#10B981',
        gradient: 'linear-gradient(135deg, #40b910 0%, #07140f 100%)',
        image: './source/projects/evapotranspiracion.png',
        links: [{ label: 'GitHub', href: 'https://github.com/lorenzoZuin/EvapoTranspiracion' }, { label: 'Web', href: 'https://evapo-transpiracion-ai.vercel.app/' }]
    },
    {
        title: 'Centralizaple',
        subtitle: copy.Centralizaple,
        tags: ['Python', 'Data'],
        borderColor: '#74098f',
        gradient: 'linear-gradient(135deg, #74098f 0%, #180707 100%)',
        image: './source/projects/centralizaple.jpeg',
        links: [{ label: 'GitHub', href: 'https://github.com/lorenzoZuin/Zaple-wraped' }]
    },
    {
        title: 'Books Reviews',
        subtitle: copy.books,
        tags: ['Data Science', 'ML'],
        borderColor: '#4df794',
        gradient: 'linear-gradient(135deg, #4df794 0%, #120818 100%)',
        links: [{ label: 'GitHub', href: '#' }]
    },
    {
        title: 'Hunters',
        subtitle: copy.hunters,
        tags: ['Web', 'JavaScript'],
        borderColor: '#5b11bb',
        gradient: 'linear-gradient(135deg, #5b11bb 0%, #1A1204 100%)',
        image: './source/projects/hunters.png',
        links: [{ label: 'GitHub', href: 'https://github.com/lorenzoZuin/Hunters-ocr' }, { label: 'Web', href: 'https://hunters-ocr.vercel.app/' }]
    },
    {
        title: 'Nexobit',
        subtitle: copy.nexobit,
        tags: ['AI', 'Vapi'],
        borderColor: '#06B6D4',
        gradient: 'linear-gradient(135deg, #06B6D4 0%, #02131a 100%)',
        image: './source/projects/nexobit.png',
        links: [{ label: 'GitHub', href: 'https://github.com/lorenzoZuin/nexobit' }]
    },
    {
        title: 'MindGames',
        subtitle: copy.mindgames,
        tags: ['React'],
        borderColor: '#2a50b8',
        gradient: 'linear-gradient(135deg, #2a50b8 0%, #1a0710 100%)',
        image: './source/projects/mindgames.png',
        links: [{ label: 'GitHub', href: 'https://github.com/lorenzoZuin/MindGames' }, { label: 'Web', href: 'https://mind-games-eight.vercel.app/' }]
    },
    {
      title: 'Notes App',
      subtitle: copy.notes,
      tags: ['React'],
      borderColor: '#18d15f',
      gradient: 'linear-gradient(135deg, #18d15f 0%, #1a1204 100%)',
      image: './source/projects/notesapp.png',
      links: [{ label: 'GitHub', href: 'https://github.com/lorenzoZuin/Notes-app' }]
    },
    {
      title: 'Sudoku Solver',
      subtitle: copy.sudoku,
      tags: ['Python', 'GUI'],
      borderColor: '#d49d06',
      gradient: 'linear-gradient(135deg, #d49d06 0%, #07111f 100%)',
      links: [{ label: 'GitHub', href: 'https://github.com/lorenzoZuin/sudokuSolver' }]
    }
  ];
};

const ChromaGrid = ({
  items,
  className = '',
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const [lang, setLang] = useState('es');
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || 'dark');
  const isLightTheme = theme === 'light';
  const backgroundColor = isLightTheme ? 'rgba(219, 219, 219, 0.95)' : 'rgba(8, 5, 10, 0.35)';

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');

    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event) => {
      const nextLang = event.detail?.lang || 'es';
      setLang(nextLang);
    };

    document.addEventListener('portfolio:languagechange', handleLanguageChange);
    return () => document.removeEventListener('portfolio:languagechange', handleLanguageChange);
  }, []);

  useEffect(() => {
    const cards = rootRef.current?.querySelectorAll('.project-card');
    if (!cards?.length) return;

    cards.forEach((card, index) => {
      window.setTimeout(() => card.classList.add('active'), index * 70);
    });
  }, [lang, items]);

  const data = items?.length ? items : getProjectItems(lang);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = (event) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;

    moveTo(event.clientX - rect.left, event.clientY - rect.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = (url) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return React.createElement(
    'div',
    {
      ref: rootRef,
      className: `chroma-grid ${className}`.trim(),
      style: {
        '--r': `${radius}px`,
        '--cols': columns,
        '--rows': rows
      },
      onPointerMove: handleMove,
      onPointerLeave: handleLeave
    },
    data.map((card, index) => {
      const linkItems = (card.links || []).map((link, linkIndex) =>
        React.createElement(
          link.href && link.href !== '#' ? 'a' : 'span',
          {
            key: `${card.title}-${link.label}-${linkIndex}`,
            className: `project-link${link.href && link.href !== '#' ? '' : ' is-disabled'}`,
            href: link.href && link.href !== '#' ? link.href : undefined,
            target: link.href && link.href !== '#' ? '_blank' : undefined,
            rel: link.href && link.href !== '#' ? 'noopener noreferrer' : undefined,
            onClick: (event) => {
              event.stopPropagation();
              if (link.href && link.href !== '#') {
                window.open(link.href, '_blank', 'noopener,noreferrer');
              }
            }
          },
          `${link.label} →`
        )
      );

      return React.createElement(
        'article',
        {
          key: `${card.title}-${index}`,
          className: 'chroma-card project-card reveal',
          onMouseMove: handleCardMove,
          style: {
            '--card-border': card.borderColor || 'transparent',
            '--card-gradient': card.gradient,
            cursor: 'default'
          }
        },
        React.createElement(
          'div',
          { className: 'project-visual' },
          card.image ? React.createElement('img', { className: 'project-visual__image', src: card.image, alt: card.title, loading: 'lazy' }) : null,
        ),
        React.createElement(
          'div',
          { className: 'project-body' },
          React.createElement(
            'div',
            { className: 'project-header' },
            React.createElement('h3', { className: 'name' }, card.title),
        ),
          React.createElement(
          'div',
          { className: 'project-tags' },
          ...(card.tags || []).map((tag) => React.createElement('span', { key: `${card.title}-${tag}`, className: 'project-tag' }, tag))
          ),
          React.createElement('p', { className: 'role' }, card.subtitle),
          React.createElement('div', { className: 'project-links' }, linkItems)
        )
      );
    }),
    React.createElement('div', { className: 'chroma-overlay' }),
    React.createElement('div', { ref: fadeRef, className: 'chroma-fade' })
  );
};

export default ChromaGrid;
