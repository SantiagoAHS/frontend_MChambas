"use client";

import { PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useTheme } from "@/context/ThemeContext";

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

  return (
    <div
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
      style={{
        backgroundColor: isLight ? "#f9fafb" : "#3a3a3a",
        color: isLight ? "#111111" : "#dddddd",
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Formulario */}
        <div>
          <h1 className="text-3xl font-bold mb-4">Envíanos un mensaje</h1>
          <p className="mb-8">
            Llena el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
          </p>

          <form className="space-y-6">
            {['Nombre', 'Correo electrónico'].map((label, i) => (
              <div key={i}>
                <label className="block text-sm font-medium mb-1">
                  {label}
                </label>
                <input
                  type={label === 'Correo electrónico' ? 'email' : 'text'}
                  className="w-full rounded-md p-2 border transition focus:outline-none focus:ring-2 focus:ring-orange-400"
                  style={{
                    backgroundColor: isLight ? "#ffffff" : "#1f1f1f",
                    borderColor: isLight ? "#d1d5db" : "#4b5563",
                    color: isLight ? "#111" : "#fff",
                  }}
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium mb-1">
                Mensaje
              </label>
              <textarea
                rows={4}
                className="w-full rounded-md p-2 border transition focus:outline-none focus:ring-2 focus:ring-orange-400"
                style={{
                  backgroundColor: isLight ? "#ffffff" : "#1f1f1f",
                  borderColor: isLight ? "#d1d5db" : "#4b5563",
                  color: isLight ? "#111" : "#fff",
                }}
              ></textarea>
            </div>

            <button
              type="submit"
              className="font-bold py-2 px-6 rounded-md border-2 transition-colors duration-300"
              style={{
                backgroundColor: isLight ? "#f97316" : "#ea580c", 
                color: "#fff",
                borderColor: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = isLight ? "#f97316" : "#ea580c";
                (e.currentTarget as HTMLButtonElement).style.borderColor = isLight ? "#f97316" : "#ea580c";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = isLight ? "#f97316" : "#ea580c";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
              }}
            >
              Enviar
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Contáctanos</h2>
            <p>
              También puedes comunicarte con nosotros directamente por teléfono o correo.
            </p>
          </div>

          {contactDetails.map(({ icon: Icon, title, value }) => (
            <div className="flex items-start gap-4" key={title}>
              <Icon className="h-6 w-6" style={{ color: "#ff6600" }} />
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
