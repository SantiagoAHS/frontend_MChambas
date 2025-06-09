'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { section } from 'framer-motion/client';

const faqs = [
  {
    question: '¿Cómo puedo crear una cuenta?',
    answer:
      'Para crear una cuenta, haz clic en el botón de registro en la esquina superior derecha y sigue los pasos indicados con tu correo electrónico.',
  },
  {
    question: '¿Olvidé mi contraseña, qué hago?',
    answer:
      'En la página de inicio de sesión, haz clic en "¿Olvidaste tu contraseña?" para recibir un enlace de recuperación vía correo electrónico.',
  },
  {
    question: '¿Dónde puedo contactar soporte técnico?',
    answer:
      'Puedes enviar un correo a soporte@mi-proyecto.com o usar el formulario de contacto en la sección "Contacto".',
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="max-w-3xl mx-auto px-6 py-16"
      style={{ '--color-accent': '#ff6600' } as React.CSSProperties}
    >
      <h2
        className="text-4xl font-extrabold mb-8 text-center"
        style={{ color: 'var(--color-accent)' }}
      >
        Centro de Ayuda de MiProyecto
      </h2>

      <p className="mb-12 text-center" style={{ color: '#000' }}>
        Aquí encontrarás respuestas a las preguntas más comunes. Si necesitas más ayuda, no dudes en
        contactarnos.
      </p>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-5 py-4 text-left flex justify-between items-center bg-gray-100 hover:bg-gray-200 focus:outline-none"
              aria-expanded={openIndex === index}
              aria-controls={`faq-content-${index}`}
              id={`faq-header-${index}`}
              style={{ color: '#111' }}
            >
              <span className="font-medium">{faq.question}</span>
              <svg
                className={`w-6 h-6 text-gray-600 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  id={`faq-content-${index}`}
                  role="region"
                  aria-labelledby={`faq-header-${index}`}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { height: 'auto', opacity: 1 },
                    collapsed: { height: 0, opacity: 0 },
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="px-5 pb-5 overflow-hidden"
                  style={{ color: '#000' }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="mt-16 text-center" style={{ color: '#000' }}>
        <p className="mb-4">
          ¿No encontraste lo que buscas?
        </p>
        <a
          href="mailto:soporte@mi-proyecto.com"
          className="inline-block px-6 py-3 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition"
        >
          Contactar Soporte
        </a>
      </div>
    </section>
  );
}