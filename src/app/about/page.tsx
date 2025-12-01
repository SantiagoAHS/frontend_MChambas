"use client";

import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { useTheme } from "@/context/ThemeContext";

export default function AboutPage() {
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const accentColor = "text-red-500";

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

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = sectionsRef.current.findIndex((sec) => sec === entry.target);
        if (entry.isIntersecting && index !== -1 && index !== activeIndex) {
          setActiveIndex(index);
        }
      });
    }, { threshold: 0.7 });

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

  const bgCard = isLight ? "#f3f4f6" : "#2d2d2d"; 
  const textMuted = isLight ? "#4b5563" : "#cccccc";
  const borderColor = isLight ? "#e5e7eb" : "#444";

  const sections = [
    {
      title: "Nuestra Misión",
      content:
        "Crear oportunidades laborales accesibles para todos, conectando talento con empresas que valoran el crecimiento y la diversidad. En MChambas, creemos en un futuro laboral más justo e inclusivo.",
      image: "/about/Mission.png",
      reverse: false,
    },
    {
      title: "Nuestra Historia",
      content:
        "Tres amigos con experiencias frustrantes en la búsqueda de empleo decidieron crear una plataforma diferente: sin barreras, sin filtros injustos, con tecnología al servicio del talento. Así nació MChambas.",
      image: "/about/Values.png",
      reverse: true,
    },
    {
      title: "Nuestra Visión",
      content:
        "Ser la comunidad laboral más confiable de Latinoamérica. Aspiramos a un mundo donde cada persona tenga acceso a un trabajo digno que reconozca su valor y potencial.",
      image: "/about/Vision.png",
      reverse: false,
    },
  ];

  return (
    <section
      className="overflow-y-scroll transition-colors duration-300"
      style={{
        scrollSnapType: "y mandatory",
        height: "70vh",
        backgroundColor: isLight ? "#ffffff" : "#3a3a3a",
        color: isLight ? "#111" : "#ddd",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {sections.map(({ title, content, image, reverse }, i) => (
          <div
            key={i}
            className={`flex ${
              reverse ? "flex-col-reverse md:flex-row-reverse" : "flex-col md:flex-row"
            } items-center gap-12 scroll-snap-align-start overflow-hidden`}
            ref={(el) => setRef(el, i)}
            style={{ scrollSnapAlign: "start", height: "70vh" }}
          >
            {/* Imagen */}
            <div
              className="image w-full md:w-1/2 flex items-center justify-center mb-6 md:mb-0"
              style={{ minHeight: 0, maxHeight: "40vh" }}
            >
              <div
                className="w-full max-w-md aspect-square rounded-lg shadow-md flex items-center justify-center"
                style={{ backgroundColor: bgCard, border: `1px solid ${borderColor}` }}
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-contain p-6"
                />
              </div>
            </div>

            {/* Texto */}
            <div
              className="text w-full md:w-1/2 flex flex-col justify-center"
              style={{
                minHeight: 0,
                maxHeight: "56vh",
                overflowY: "auto",
                paddingRight: "1rem",
              }}
            >
              <h2 className={`text-3xl font-bold mb-4 ${accentColor}`}>{title}</h2>
              <p style={{ color: textMuted }}>{content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
