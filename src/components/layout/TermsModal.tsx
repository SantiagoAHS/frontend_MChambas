"use client";
import React from "react";

export default function TermsModal({
  open,
  onClose,
  isDark,
}: {
  open: boolean;
  onClose: () => void;
  isDark: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`w-full max-w-xl p-6 rounded-xl shadow-lg max-h-[85vh] overflow-y-auto border ${
          isDark ? "bg-[#1e1e1e] border-red-500 text-white" : "bg-white border-red-500"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4 text-red-500">
          Términos y Condiciones & Política de Privacidad
        </h2>

        <p className="text-sm leading-6">
          Bienvenido/a a nuestra plataforma. Antes de continuar, te pedimos
          leer detenidamente los siguientes Términos y Condiciones junto con
          nuestra Política de Privacidad. Al crear una cuenta o utilizar nuestros
          servicios, confirmas haber leído, comprendido y aceptado este acuerdo.

          <br /><br />

          <strong className="text-red-500 text-lg">1. Uso General de la Plataforma</strong>
          <br />
          El usuario se compromete a utilizar el sitio web de forma responsable,
          respetuosa y conforme a la ley. Está prohibido:
          <br />
          • Proporcionar información falsa o engañosa. <br />
          • Realizar actividades que dañen la integridad del sistema. <br />
          • Intentar acceder a información de otros usuarios sin autorización. <br />
          • Utilizar la plataforma para fines ilícitos, maliciosos o comerciales
            no autorizados.

          <br /><br />

          <strong className="text-red-500 text-lg">2. Registro y Seguridad de la Cuenta</strong>
          <br />
          Para utilizar los servicios es necesario crear una cuenta personal.
          El usuario acepta:
          <br />
          • Mantener su contraseña segura y no compartirla con terceros. <br />
          • Notificar inmediatamente cualquier acceso no autorizado. <br />
          • Ser responsable de cualquier actividad realizada desde su cuenta.

          <br /><br />

          <strong className="text-red-500 text-lg">3. Exactitud de la Información</strong>
          <br />
          Durante el registro o uso de la plataforma, el usuario deberá
          proporcionar datos reales, actualizados y verificables. Nos reservamos
          el derecho de suspender cuentas que incumplan esta obligación.

          <br /><br />

          <strong className="text-red-500 text-lg">4. Privacidad y Protección de Datos</strong>
          <br />
          Respetamos tu privacidad y manejamos tus datos personales conforme a
          estándares internacionales de seguridad. Al usar nuestra plataforma,
          aceptas los siguientes puntos:

          <br /><br />
          <strong>4.1 Datos que recopilamos</strong>
          <br />
          Podemos recopilar información como:
          <br />
          • Nombre y correo electrónico. <br />
          • Información proporcionada al crear tu cuenta. <br />
          • Datos técnicos (IP, navegador, uso del sitio). <br />

          <br />
          <strong>4.2 Cómo usamos tus datos</strong>
          <br />
          Utilizamos tu información para:
          <br />
          • Crear y administrar tu cuenta. <br />
          • Mejorar nuestros servicios y experiencia de usuario. <br />
          • Comunicarnos contigo cuando sea necesario. <br />
          • Garantizar seguridad y cumplimiento de normas internas. <br />

          <br />
          <strong>4.3 Protección y seguridad</strong>
          <br />
          Implementamos medidas técnicas y administrativas para proteger tu
          información. Sin embargo, ningún sistema es 100% seguro, por lo que no
          podemos garantizar protección absoluta ante ataques externos.

          <br /><br />

          <strong className="text-red-500 text-lg">5. Actualizaciones de los Términos</strong>
          <br />
          Podemos actualizar estos Términos y Políticas en cualquier momento.
          Cuando lo hagamos, te notificaremos mediante la plataforma o correo
          electrónico. Continuar utilizando el servicio implica la aceptación de
          los cambios.

          <br /><br />

          <strong className="text-red-500 text-lg">6. Limitación de Responsabilidad</strong>
          <br />
          La plataforma no se hace responsable por:
          <br />
          • Daños derivados del uso incorrecto del sistema. <br />
          • Errores provocados por mala conexión a internet. <br />
          • Información ingresada incorrectamente por el usuario. <br />

          <br /><br />

          <strong className="text-red-500 text-lg">7. Eliminación de Cuenta</strong>
          <br />
          El usuario puede solicitar la eliminación de su cuenta en cualquier
          momento. Una vez eliminada, la información podría permanecer cifrada
          por motivos de seguridad o requerimientos legales.

          <br /><br />

          <strong className="text-red-500 text-lg">8. Aceptación Final</strong>
          <br />
          Al continuar, aceptas voluntariamente estos Términos y Condiciones y
          la Política de Privacidad, reconociendo que has leído toda la
          información de forma clara, completa y transparente.

          <br /><br />
          Si no estás de acuerdo con alguna parte, por favor no utilices la
          plataforma ni crees una cuenta.
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
