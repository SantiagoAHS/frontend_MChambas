'use client';
import React, { useState, useEffect } from 'react';

const detectCardType = (cardNumber: string): string => {
  const number = cardNumber.replace(/\D/g, '');

  const cardPatterns: { [key: string]: RegExp } = {
    Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    MasterCard: /^(?:5[1-5][0-9]{14}|2[2-7][0-9]{14})$/,
    'American Express': /^3[47][0-9]{13}$/,
    Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    'Diners Club': /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
  };

  for (const [cardType, pattern] of Object.entries(cardPatterns)) {
    if (pattern.test(number)) {
      return cardType;
    }
  }

  return 'Desconocida';
};

const formatCardNumber = (num: string) => {
  const cleaned = num.replace(/\D/g, '').slice(0, 16);
  const parts = [];
  for (let i = 0; i < cleaned.length; i += 4) {
    parts.push(cleaned.substring(i, i + 4));
  }
  return parts.join(' ') || '#### #### #### ####';
};

const CreditCardDetector: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('Desconocida');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [message, setMessage] = useState('');
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  useEffect(() => {
    setCardType(detectCardType(cardNumber));
  }, [cardNumber]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(input);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 4) input = input.slice(0, 4);
    if (input.length > 2) {
      input = `${input.slice(0, 2)}/${input.slice(2)}`;
    }
    setExpiry(input);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    setCvv(input.slice(0, 4));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      cardHolder.trim() === '' ||
      cardNumber.length < 13 ||
      !/^\d{2}\/\d{2}$/.test(expiry) ||
      !/^\d{3,4}$/.test(cvv)
    ) {
      setMessage('Por favor, completa todos los campos correctamente.');
      return;
    }

    setMessage(`✅ Pago exitoso con tarjeta ${cardType}`);
    console.log({
      Nombre: cardHolder,
      Número: cardNumber,
      Tipo: cardType,
      Expira: expiry,
      CVV: cvv,
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-lg">
      {/* Tarjeta visual */}
      <div className="relative w-full md:w-96 h-56 perspective">
        <div
          className={`relative w-full h-full rounded-xl text-white shadow-xl transition-transform duration-700 ${
            isCvvFocused ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Frente de la tarjeta */}
          <div
            className="absolute w-full h-full bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-semibold">{cardType}</div>
              <div className="text-sm">**** **** **** {cardNumber.slice(-4) || '####'}</div>
            </div>
            <div className="text-xl tracking-widest mb-6 font-mono">
              {formatCardNumber(cardNumber)}
            </div>
            <div className="flex justify-between items-center text-sm">
              <div>
                <div className="uppercase">Nombre</div>
                <div>{cardHolder || 'NOMBRE APELLIDO'}</div>
              </div>
              <div>
                <div className="uppercase">Expira</div>
                <div>{expiry || 'MM/AA'}</div>
              </div>
            </div>
          </div>

          {/* Parte trasera */}
          <div
            className="absolute w-full h-full bg-gray-900 rounded-xl p-6 rotate-y-180 text-white backface-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="bg-black h-12 rounded mb-6"></div>
            <div className="text-right">
              <div className="uppercase mb-1">CVV</div>
              <div className="bg-white text-black px-3 py-1 rounded font-mono tracking-widest inline-block">
                {cvv || '***'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="flex-1 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre del titular</label>
          <input
            type="text"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
            placeholder="Ej. JUAN PÉREZ"
            className="w-full p-2 border rounded"
            maxLength={30}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Número de tarjeta</label>
          <input
            type="text"
            inputMode="numeric"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="Ingrese solo números"
            className="w-full p-2 border rounded tracking-widest font-mono"
            maxLength={16}
          />
          <p className="text-sm mt-1 text-gray-600">
            Tipo detectado: <strong>{cardType}</strong>
          </p>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Fecha de expiración</label>
            <input
              type="text"
              placeholder="MM/AA"
              maxLength={5}
              value={expiry}
              onChange={handleExpiryChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">CVV</label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={cvv}
              onChange={handleCvvChange}
              onFocus={() => setIsCvvFocused(true)}
              onBlur={() => setIsCvvFocused(false)}
              placeholder="***"
              className="w-full p-2 border rounded tracking-widest font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Pagar
        </button>

        {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
      </form>

      {/* Estilos 3D para la tarjeta */}
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default CreditCardDetector;
