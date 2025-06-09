import { PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Formulario de contacto */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Envíanos un mensaje</h1>
          <p className="text-gray-600 mb-8">
            Llena el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                type="email"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea
                rows={4}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-orange-500 text-white font-bold py-2 px-6 rounded-md hover:bg-orange-600 transition"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Información de contacto */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contáctanos</h2>
            <p className="text-gray-600">
              También puedes comunicarte con nosotros directamente por teléfono o correo.
            </p>
          </div>

          <div className="flex items-start gap-4">
            <PhoneIcon className="h-6 w-6 text-red-500" />
            <div>
              <h3 className="font-semibold text-gray-900">Teléfono</h3>
              <p className="text-gray-600">+52 (241) 176-4468</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <EnvelopeIcon className="h-6 w-6 text-yellow-500" />
            <div>
              <h3 className="font-semibold text-gray-900">Correo electrónico</h3>
              <p className="text-gray-600">contacto@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ClockIcon className="h-6 w-6 text-green-500" />
            <div>
              <h3 className="font-semibold text-gray-900">Horario de atención</h3>
              <p className="text-gray-600">
                Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                Sábado: 10:00 AM - 4:00 PM<br />
                Domingo: Cerrado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}