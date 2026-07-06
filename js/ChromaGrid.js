import React, { useEffect, useRef, useState } from 'https://esm.sh/react@18';
import { gsap } from 'https://esm.sh/gsap';

const getProjectItems = (lang = 'es') => {
  const translations = {
    es: {
      sudoku: 'Resolución automática de sudokus con interfaz visual.',
      evapotranspiration: 'Predicción de evapotranspiración con modelos de IA.',
      notes: 'Gestión de notas con categorías, filtros y archivado.',
      zaple: 'Wrapped de clientes de Zaple con métricas y logros del año.',
      books: 'Predicción de calificación de libros en Amazon con machine learning.',
      nexobit: 'Agente virtual de IA para atender llamadas y pedidos.',
      mindgames: 'Juego cognitivo para entrenar atención y velocidad de respuesta.'
    },
    en: {
      sudoku: 'Automatic sudoku solving with a visual interface.',
      evapotranspiration: 'Evapotranspiration prediction with AI models.',
      notes: 'Note management with categories, filters, and archiving.',
      zaple: 'Zaple client wrapped with key metrics and yearly achievements.',
      books: 'Amazon book rating prediction with machine learning.',
      nexobit: 'Virtual AI agent for handling calls and orders.',
      mindgames: 'Cognitive game to train attention and response speed.'
    }
  };

  const copy = translations[lang] || translations.es;

  return [
    {
      title: 'Sudoku Solver',
      subtitle: copy.sudoku,
      handle: 'Python • GUI',
      tags: ['Python', 'GUI'],
      borderColor: '#3B82F6',
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #07111f 100%)',
      links: [{ label: 'GitHub', href: 'https://github.com/lorenzoZuin/sudokuSolver' }]
    },
    {
      title: 'Evapotranspiración',
      subtitle: copy.evapotranspiration,
      handle: 'ML • Python',
      tags: ['ML', 'Python'],
      borderColor: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981 0%, #07140f 100%)',
      links: [{ label: 'GitHub', href: 'https://github.com/lorenzoZuin/EvapoTranspiracion' }, { label: 'Web', href: 'https://evapo-transpiracion-ai.vercel.app/' }]
    },
    {
      title: 'Notes App',
      subtitle: copy.notes,
      handle: 'React',
      tags: ['React'],
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #1a1204 100%)',
      links: [{ label: 'GitHub', href: 'https://github.com/lorenzoZuin/Notes-app' }]
    },
    {
      title: 'Zaple Wrapped',
      subtitle: copy.zaple,
      handle: 'Python • Data',
      tags: ['Python', 'Data'],
      borderColor: '#EF4444',
      gradient: 'linear-gradient(135deg, #EF4444 0%, #180707 100%)',
      links: [{ label: 'GitHub', href: 'https://github.com/lorenzoZuin/Zaple-wraped' }]
    },
    {
      title: 'Books Reviews',
      subtitle: copy.books,
      handle: 'Data Science • ML',
      tags: ['Data Science', 'ML'],
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #120818 100%)',
      links: [{ label: 'GitHub', href: '#' }]
    },
    {
      title: 'Nexobit',
      subtitle: copy.nexobit,
      handle: 'AI • Vapi',
      tags: ['AI', 'Vapi'],
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(135deg, #06B6D4 0%, #02131a 100%)',
      links: [{ label: 'GitHub', href: 'https://github.com/lorenzoZuin/nexobit' }]
    },
    {
      title: 'MindGames',
      subtitle: copy.mindgames,
      handle: 'React',
      tags: ['React'],
      borderColor: '#E11D48',
      gradient: 'linear-gradient(135deg, #E11D48 0%, #1a0710 100%)',
      links: [{ label: 'GitHub', href: 'https://github.com/lorenzoZuin/MindGames' }, { label: 'Web', href: 'https://mind-games-eight.vercel.app/' }]
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
      const firstLink = card.links?.find((link) => link?.href && link.href !== '#');
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
              if (!link.href || link.href === '#') {
                event.stopPropagation();
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
          onClick: () => handleCardClick(firstLink?.href),
          style: {
            '--card-border': card.borderColor || 'transparent',
            '--card-gradient': card.gradient,
            cursor: firstLink?.href ? 'pointer' : 'default'
          }
        },
        React.createElement(
          'div',
          { className: 'project-visual' },
          React.createElement('span', { className: 'project-visual__badge' }, card.title)
        ),
        React.createElement(
          'div',
          { className: 'project-body' },
          React.createElement(
            'div',
            { className: 'project-header' },
            React.createElement('h3', { className: 'name' }, card.title),
            card.handle ? React.createElement('span', { className: 'handle' }, card.handle) : null
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
