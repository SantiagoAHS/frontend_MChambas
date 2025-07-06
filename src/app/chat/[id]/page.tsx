"use client";
import React, { useState } from "react";
import ChatPerson from "@/components/chat/chatperson";

interface Props {
  params: { id: string };
}

export default function ChatPage({ params }: Props) {
  const [newMessage, setNewMessage] = useState("");
  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Obtener token y userId desde localStorage (ajusta si usas otro método)
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleSend = async () => {
    if (!newMessage.trim() || !token) return;

    try {
      const res = await fetch(
        `http://localhost:8000/api/chats/${params.id}/send/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ content: newMessage }), // el campo content es el que espera tu backend
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Error del backend:", data);
        alert("Error al enviar el mensaje");
        return;
      }
      if (res.ok) {
        setNewMessage("");
        setReloadTrigger(prev => prev + 1); // fuerza recarga de mensajes en ChatPerson
      }

      setNewMessage("");
      // Aquí podrías actualizar la lista de mensajes si ChatPerson lo soporta
      // Por ejemplo, pasando un callback o recargando el componente.
    } catch (err) {
      console.error("Error al enviar mensaje", err);
      alert("Error al enviar mensaje");
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-[#0d1224] text-white p-4 flex flex-col">
        <div className="text-2xl font-bold mb-6">MChambas</div>
        <input
          type="text"
          placeholder="Buscar..."
          className="mb-4 p-2 rounded bg-[#1c223a] border border-[#2a314f] text-white"
        />
        <div className="flex-1 overflow-y-auto space-y-2">
          {/* Aquí puedes cargar la lista de chats */}
        </div>
      </aside>

      <main className="flex-1 bg-[#f1f4fb] flex flex-col">
        <div className="p-4 border-b border-gray-300 flex items-center justify-between bg-white">
          <h2 className="text-lg font-semibold">Usuario</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <ChatPerson chatId={params.id} reloadTrigger={reloadTrigger} />
        </div>

        <div className="p-4 border-t border-gray-300 bg-white">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 p-2 rounded border border-gray-300"
            />
            <button
              className="bg-[#4b6fff] text-white px-4 py-2 rounded"
              onClick={handleSend}
            >
              Enviar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
