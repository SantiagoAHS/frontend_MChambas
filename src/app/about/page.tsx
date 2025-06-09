'use client';
import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

export default function AboutPage() {
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const accentColor = '#ff6600'; 

  const animateSection = (section: HTMLDivElement, index: number) => {
    const image = section.querySelector<HTMLElement>('.image');
    const text = section.querySelector<HTMLElement>('.text');

    if (image && text) {
      image.style.opacity = '0';
      image.style.transform = 'scale(0.8)';

      text.style.opacity = '0';
      text.style.transform = 'translateY(50px)';

      animate(image, {
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: index * 300,
      });

      animate(text, {
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 300 + index * 300,
        easing: 'easeOutCubic',
      });
    }
  };

  useEffect(() => {
    if (!sectionsRef.current.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = sectionsRef.current.findIndex((sec) => sec === entry.target);
        if (entry.isIntersecting && index !== -1) {
          if (index !== activeIndex) {
            setActiveIndex(index);
          }
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex !== null && sectionsRef.current[activeIndex]) {
      animateSection(sectionsRef.current[activeIndex], activeIndex);
    }
  }, [activeIndex]);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    if (el) sectionsRef.current[index] = el;
  };

  return (
    <section
      className="overflow-y-scroll"
      style={{ scrollSnapType: 'y mandatory', height: '70vh' }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="flex flex-col md:flex-row items-center gap-12 scroll-snap-align-start overflow-hidden"
          ref={(el) => setRef(el, 0)}
          style={{ scrollSnapAlign: 'start', height: '70vh' }}
        >
          <div
            className="image w-full md:w-1/2 flex items-center justify-center"
            style={{ minHeight: 0 }}
          >
            <div className="w-full aspect-square bg-gray-100 rounded-lg shadow-md flex items-center justify-center">
              <span className="text-gray-400">[Animación / Imagen de Misión]</span>
            </div>
          </div>
          <div
            className="text w-full md:w-1/2 flex flex-col justify-center"
            style={{ minHeight: 0, maxHeight: '56vh', overflowY: 'auto', paddingRight: '1rem' }}
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: accentColor }}
            >
              Nuestra Misión
            </h2>
            <p className="text-gray-600">
              Crear oportunidades laborales accesibles para todos, conectando talento con empresas que valoran el crecimiento y la diversidad. En MChambas, creemos en un futuro laboral más justo e inclusivo.
            </p>
          </div>
        </div>

        <div
          className="flex flex-col-reverse md:flex-row items-center gap-12 scroll-snap-align-start overflow-hidden"
          ref={(el) => setRef(el, 1)}
          style={{ scrollSnapAlign: 'start', height: '70vh' }}
        >
          <div
            className="text w-full md:w-1/2 flex flex-col justify-center"
            style={{ minHeight: 0, maxHeight: '56vh', overflowY: 'auto', paddingRight: '1rem' }}
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: accentColor }}
            >
              Nuestra Historia
            </h2>
            <p className="text-gray-600">
              Tres amigos con experiencias frustrantes en la búsqueda de empleo decidieron crear una plataforma diferente: sin barreras, sin filtros injustos, con tecnología al servicio del talento. Así nació MChambas.
            </p>
          </div>
          <div
            className="image w-full md:w-1/2 flex items-center justify-center"
            style={{ minHeight: 0 }}
          >
            <div className="w-full aspect-square bg-gray-100 rounded-lg shadow-md flex items-center justify-center">
              <span className="text-gray-400">[Animación / Imagen de Historia]</span>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-center gap-12 scroll-snap-align-start overflow-hidden"
          ref={(el) => setRef(el, 2)}
          style={{ scrollSnapAlign: 'start', height: '70vh' }}
        >
          <div
            className="image w-full md:w-1/2 flex items-center justify-center"
            style={{ minHeight: 0 }}
          >
            <div className="w-full aspect-square bg-gray-100 rounded-lg shadow-md flex items-center justify-center">
              <span className="text-gray-400">[Animación / Imagen de Visión]</span>
            </div>
          </div>
          <div
            className="text w-full md:w-1/2 flex flex-col justify-center"
            style={{ minHeight: 0, maxHeight: '56vh', overflowY: 'auto', paddingRight: '1rem' }}
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: accentColor }}
            >
              Nuestra Visión
            </h2>
            <p className="text-gray-600">
              Ser la comunidad laboral más confiable de Latinoamérica. Aspiramos a un mundo donde cada persona tenga acceso a un trabajo digno que reconozca su valor y potencial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}