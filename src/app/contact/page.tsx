"use client";

import { useState } from "react";
import { PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useTheme } from "@/context/ThemeContext";
import TermsModal from "@/components/layout/TermsModal"; // <-- IMPORTA EL MODAL

const contactDetails = [
  {
    icon: PhoneIcon,
    title: 'Teléfono',
    value: '+52 (241) 176-4468',
  },
  {
    icon: EnvelopeIcon,
    title: 'Correo electrónico',
    value: 'mrchambasmx@gmail.com',
  },
  {
    icon: ClockIcon,
    title: 'Horario de atención',
    value: (
      <>
        Lunes a Viernes: 9:00 AM - 6:00 PM<br />
        Sábado: 10:00 AM - 4:00 PM<br />
        Domingo: Cerrado
      </>
    ),
  },
];

export default function Contact() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  // Estado para abrir el modal
  const [openTerms, setOpenTerms] = useState(false);

  return (
    <>
      {/* MODAL */}
      <TermsModal
        open={openTerms}
        onClose={() => setOpenTerms(false)}
        isDark={!isLight}
      />

      <div
        className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
        style={{
          backgroundColor: isLight ? "#f9fafb" : "#3a3a3a",
          color: isLight ? "#111111" : "#dddddd",
        }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-red-500">Envíanos un mensaje</h1>
            <p className="mb-8">
              Llena el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
            </p>

            <form className="space-y-6">
              {['Nombre', 'Correo electrónico'].map((label, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium mb-1 text-red-500">
                    {label}
                  </label>
                  <input
                    type={label === 'Correo electrónico' ? 'email' : 'text'}
                    className="w-full rounded-md p-2 border transition focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: isLight ? "#ffffff" : "#1f1f1f",
                      borderColor: "#ef4444",
                      color: isLight ? "#111" : "#fff",
                    }}
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium mb-1 text-red-500">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-md p-2 border transition focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: isLight ? "#ffffff" : "#1f1f1f",
                    borderColor: "#ef4444",
                    color: isLight ? "#111" : "#fff",
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="font-bold py-2 px-6 rounded-md border-2 transition-colors duration-300"
                style={{
                  backgroundColor: "#ef4444",
                  color: "#fff",
                  borderColor: "#ef4444",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#ef4444";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ef4444";
                  e.currentTarget.style.color = "#fff";
                }}
              >
                Enviar
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-red-500">Contáctanos</h2>
              <p>
                También puedes comunicarte con nosotros directamente por teléfono o correo.
              </p>
            </div>

            {contactDetails.map(({ icon: Icon, title, value }) => (
              <div className="flex items-start gap-4" key={title}>
                <Icon className="h-6 w-6" style={{ color: "#ef4444" }} />
                <div>
                  <h3 className="font-semibold text-red-500">{title}</h3>
                  <p>{value}</p>

                  {/* 🔥 AQUI AGREGAMOS EL LINK PARA ABRIR EL MODAL */}
                  {title === "Horario de atención" && (
                    <p className="mt-2">
                      <button
                        className="text-red-500 underline hover:text-red-700 transition"
                        onClick={() => setOpenTerms(true)}
                      >
                        Ver términos y condiciones
                      </button>
                    </p>
                  )}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}
