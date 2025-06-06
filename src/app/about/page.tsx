'use client';
import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.animated-item');

    items.forEach((item, index) => {
      const image = item.querySelector('.square');
      const info = item.querySelector('.info');

      if (image && info) {
        animate(image, {
          x: '18rem',
          duration: 1800,
          easing: 'easeOutCubic',
          delay: index * 300,
        });

        animate(info, {
          opacity: [0, 1],
          translateX: [-50, 0],
          duration: 1200,
          delay: 1800 + index * 300,
          easing: 'easeOutQuad',
        });
      }
    });
  }, []);

  return (
    <section className="min-h-screen bg-white dark:bg-white flex flex-col items-center justify-center px-4 py-16">
      <h2 className="text-4xl font-bold text-red-600 mb-12 text-center">
        Acerca de MChambas
      </h2>

      <div ref={containerRef} className="space-y-12 w-full max-w-5xl">
        {/* Bloque animado 1 */}
        <div className="flex items-center gap-8 animated-item">
          <div className="w-32 h-32 rounded overflow-hidden shadow-lg square -translate-x-[18rem]">
            <img
              src="https://source.unsplash.com/200x200/?person,developer"
              alt="Desarrollador"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="info opacity-0">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              ¿Quiénes somos?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Somos una plataforma diseñada para conectar personas con oportunidades laborales.
            </p>
          </div>
        </div>

        {/* Bloque animado 2 */}
        <div className="flex items-center gap-8 animated-item">
           <div className="w-32 h-32 rounded overflow-hidden shadow-lg square -translate-x-[18rem]">
            <img
              src="https://source.unsplash.com/200x200/?team,office"
              alt="Equipo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="info opacity-0">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Nuestro equipo
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Formado por profesionales apasionados por la tecnología y el desarrollo humano.
            </p>
          </div>
        </div>

        {/* Bloque animado 3 */}
        <div className="flex items-center gap-8 animated-item">
           <div className="w-32 h-32 rounded overflow-hidden shadow-lg square -translate-x-[18rem]">
            <img
              src="https://source.unsplash.com/200x200/?technology,future"
              alt="Futuro"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="info opacity-0">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Nuestra visión
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Crear un futuro laboral más accesible y justo para todos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
