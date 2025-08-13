'use client';
import React, { useState, useEffect } from 'react';

interface Tarjeta {
  id: number;
  nombre_titular: string;
  numero_enmascarado: string;
  exp_mes: number;
  exp_ano: number;
}

const TarjetasManager: React.FC = () => {
  const [tarjetas, setTarjetas] = useState<Tarjeta[]>([]);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [message, setMessage] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Carga las tarjetas guardadas desde la API
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:8000/api/pagos/tarjetas/', {
      headers: { Authorization: `Token ${token}` },
    })
      .then(res => res.json())
      .then(data => setTarjetas(data))
      .catch(() => setMessage('Error cargando tarjetas'));
  }, []);

  // Cuando cambias selección, carga datos en formulario
  const handleSelectTarjeta = (id: number) => {
    setSelectedId(id);
    const tarjeta = tarjetas.find(t => t.id === id);
    if (tarjeta) {
      setCardHolder(tarjeta.nombre_titular);
      // No se puede rellenar número completo, solo enmascarado, dejamos vacío para que el usuario ingrese
      setCardNumber('');
      // Formatear MM/AA
      const mesStr = String(tarjeta.exp_mes).padStart(2, '0');
      const anoStr = String(tarjeta.exp_ano).slice(-2);
      setExpiry(`${mesStr}/${anoStr}`);
      setCvv('');
      setMessage('');
    }
  };

  // Función para guardar tarjeta nueva o actualizar
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (
      cardHolder.trim() === '' ||
      cardNumber.length < 13 ||
      !/^\d{2}\/\d{2}$/.test(expiry) ||
      !/^\d{3,4}$/.test(cvv)
    ) {
      setMessage('Por favor, completa todos los campos correctamente.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Debes iniciar sesión para guardar tarjetas');
      return;
    }

    const [mesStr, anoStr] = expiry.split('/');
    const exp_mes = parseInt(mesStr, 10);
    const exp_ano = 2000 + parseInt(anoStr, 10);

    const payload = {
      numero: cardNumber,
      nombre_titular: cardHolder,
      exp_mes,
      exp_ano,
    };

    fetch('http://localhost:8000/api/pagos/tarjetas/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async res => {
        if (res.ok) {
          const nuevaTarjeta = await res.json();
          setTarjetas([...tarjetas, nuevaTarjeta]);
          setMessage('Tarjeta guardada correctamente');
          setSelectedId(null);
          setCardNumber('');
          setCardHolder('');
          setExpiry('');
          setCvv('');
        } else {
          const error = await res.json();
          setMessage('Error guardando tarjeta: ' + (error.detail || JSON.stringify(error)));
        }
      })
      .catch(() => setMessage('Error de conexión con el servidor'));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-6">
      <h2 className="text-xl font-bold">Tus tarjetas guardadas</h2>

      {tarjetas.length > 0 && (
        <select
          className="w-full border p-2 rounded"
          value={selectedId ?? ''}
          onChange={e => handleSelectTarjeta(Number(e.target.value))}
        >
          <option value="" disabled>
            Selecciona una tarjeta para usar
          </option>
          {tarjetas.map(t => (
            <option key={t.id} value={t.id}>
              {t.nombre_titular} - {t.numero_enmascarado} - Expira {String(t.exp_mes).padStart(2, '0')}/{String(t.exp_ano).slice(-2)}
            </option>
          ))}
        </select>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nombre del titular</label>
          <input
            type="text"
            value={cardHolder}
            onChange={e => setCardHolder(e.target.value.toUpperCase())}
            className="w-full border p-2 rounded"
            placeholder="JUAN PEREZ"
            maxLength={30}
          />
        </div>
        <div>
          <label className="block font-medium">Número de tarjeta</label>
          <input
            type="text"
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
            className="w-full border p-2 rounded font-mono tracking-widest"
            placeholder="Solo números"
            maxLength={16}
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block font-medium">Fecha expiración (MM/AA)</label>
            <input
              type="text"
              value={expiry}
              onChange={e => {
                let val = e.target.value.replace(/\D/g, '');
                if (val.length > 4) val = val.slice(0, 4);
                if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
                setExpiry(val);
              }}
              className="w-full border p-2 rounded"
              placeholder="MM/AA"
              maxLength={5}
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">CVV</label>
            <input
              type="password"
              value={cvv}
              onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="w-full border p-2 rounded font-mono tracking-widest"
              placeholder="***"
              maxLength={4}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Guardar tarjeta
        </button>

        {message && <p className="mt-2 text-center text-red-600">{message}</p>}
      </form>
    </div>
  );
};

export default TarjetasManager;
