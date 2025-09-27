'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';

interface Tarjeta {
  id: number;
  nombre_titular: string;
  numero_enmascarado: string;
  exp_mes: number;
  exp_ano: number;
  default?: boolean;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || '');

const TarjetasForm: React.FC<{ onSaved: (t: Tarjeta) => void }> = ({ onSaved }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const stripe = useStripe();
  const elements = useElements();

  const [tarjetas, setTarjetas] = useState<Tarjeta[]>([]);
  const [cardHolder, setCardHolder] = useState('');
  const [message, setMessage] = useState('');

  // Cargar tarjetas desde API
  const fetchTarjetas = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch('http://localhost:8000/api/pagos/tarjetas/', {
        headers: { Authorization: `Token ${token}` },
      });
      const data = await res.json();
      setTarjetas(data);
    } catch {
      setMessage('Error cargando tarjetas');
    }
  };

  useEffect(() => { fetchTarjetas(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!stripe || !elements) { setMessage('Stripe no está cargado'); return; }
    if (!cardHolder.trim()) { setMessage('Ingresa el nombre del titular'); return; }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    try {
      const token = localStorage.getItem('token');

      // 1. Crear SetupIntent
      const intentRes = await fetch('http://localhost:8000/api/pagos/stripe/setup-intent/', {
        method: 'POST',
        headers: { Authorization: `Token ${token}` },
      });
      const { client_secret } = await intentRes.json();

      // 2. Confirmar método de pago
      const result = await stripe.confirmCardSetup(client_secret, {
        payment_method: { card: cardElement, billing_details: { name: cardHolder } },
      });

      if (result.error) { setMessage(result.error.message || 'Error creando método de pago'); return; }

      const setupIntent = result.setupIntent;

      // 3. Guardar en backend
      const saveRes = await fetch('http://localhost:8000/api/pagos/stripe/attach-payment-method/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
        body: JSON.stringify({ payment_method_id: setupIntent.payment_method }),
      });

      if (!saveRes.ok) { const err = await saveRes.json(); setMessage('Error guardando tarjeta: ' + JSON.stringify(err)); return; }

      const nuevaTarjeta: Tarjeta = await saveRes.json();

      setTarjetas(prev => [...prev, nuevaTarjeta]);
      onSaved(nuevaTarjeta);
      setCardHolder('');
      setMessage('Tarjeta guardada y verificada correctamente');
    } catch (err) {
      console.error(err);
      setMessage('Error al guardar la tarjeta');
    }
  };

  // Eliminar tarjeta
  const handleEliminar = async (id: number) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:8000/api/pagos/tarjetas/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Token ${token}` }
      });
      setTarjetas(prev => prev.filter(t => t.id !== id));
    } catch {
      setMessage('Error eliminando tarjeta');
    }
  };

  // Marcar tarjeta como por defecto
  const handleDefault = async (id: number) => {
    const token = localStorage.getItem('token');
    setMessage(''); // limpiar mensajes previos
    try {
      // 1. Llamar al backend para marcar la tarjeta por defecto
      const res = await fetch(`http://localhost:8000/api/pagos/tarjetas/${id}/set-default/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token}` }
      });

      if (!res.ok) {
        const err = await res.json();
        setMessage('Error estableciendo tarjeta por defecto: ' + (err.detail || err.error));
        return;
      }

      // 2. Recargar la lista de tarjetas desde la API para reflejar cambios
      await fetchTarjetas(); // actualizamos tarjetas desde el backend

    } catch {
      setMessage('Error estableciendo tarjeta por defecto');
    }
  };

  const borderColor = isDark ? 'border-purple-600 focus:border-purple-600 focus:ring-purple-600'
                             : 'border-green-600 focus:border-green-600 focus:ring-green-600';
  const buttonStyle = isDark ? 'bg-purple-600 text-white border-purple-600 hover:bg-white hover:text-purple-600'
                             : 'bg-green-600 text-white border-green-600 hover:bg-white hover:text-green-600';
  const containerBg = isDark ? 'bg-[#2a2a2a] border-gray-600' : 'bg-white border-gray-300';
  const inputBg = isDark ? 'bg-[#1f1f1f] text-white border-gray-500' : 'bg-white text-gray-800 border-gray-300';
  const textColor = isDark ? 'text-white' : 'text-black';

  return (
    <div className={`max-w-xl mx-auto p-6 rounded-lg shadow space-y-6 transition-colors duration-300 border ${containerBg} ${textColor}`}>
      <h2 className="text-xl font-bold">Tus tarjetas guardadas</h2>

      {tarjetas.length > 0 && (
        <ul className="mb-4 space-y-2">
          {tarjetas.map(t => (
            <li key={t.id} className="flex justify-between items-center">
              <span>
                {t.nombre_titular} - {t.numero_enmascarado} - Expira {String(t.exp_mes).padStart(2,'0')}/{String(t.exp_ano).slice(-2)}
                {t.default && ' (Por defecto)'}
              </span>
              <div className="flex gap-2">
                {!t.default && <button onClick={() => handleDefault(t.id)} className="text-blue-600 hover:underline">Por defecto</button>}
                <button onClick={() => handleEliminar(t.id)} className="text-red-600 hover:underline">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nombre del titular</label>
          <input type="text" value={cardHolder} onChange={e => setCardHolder(e.target.value.toUpperCase())}
                 className={`w-full border p-2 rounded ${inputBg} ${borderColor} focus:ring-2 focus:outline-none`} placeholder="JUAN PEREZ" maxLength={30}/>
        </div>

        <div>
          <label className="block font-medium">Datos de la tarjeta</label>
          <div className={`border p-2 rounded ${inputBg} ${borderColor} focus:ring-2 focus:outline-none`}>
            <CardElement options={{ style: { base: { color: isDark ? 'white' : 'black', fontSize: '16px' } } }}/>
          </div>
        </div>

        <button type="submit" className={`w-full py-2 rounded-lg font-semibold border-2 transition duration-200 ${buttonStyle}`}>
          Guardar tarjeta
        </button>

        {message && <p className="mt-2 text-center text-red-600">{message}</p>}
      </form>
    </div>
  );
};

const TarjetasManager: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <TarjetasForm onSaved={() => {}} />
    </Elements>
  );
};

export default TarjetasManager;
