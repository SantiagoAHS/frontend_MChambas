"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  nombre: string;
}

interface Message {
  id: number;
  chat: number;
  sender: User;
  content: string; // corregido: es `content`, no `text`
  timestamp: string;
}

interface Chat {
  id: number;
  participants: User[];
  messages: Message[];
}

export default function MyChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    async function fetchChats() {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:8000/api/chats/", {
          headers: { Authorization: `Token ${token}` },
        });
        const data = await res.json();

        // Ajusta esto según cómo tu backend esté enviando la respuesta
        setChats(data.chats || data); // si es solo array, mantén `data`
        setUserId(data.user_id || parseInt(localStorage.getItem("user_id") || "0")); // fallback
      } catch (err) {
        console.error("Error al obtener chats", err);
      }
    }
    fetchChats();
  }, [token]);

  const handleSend = async () => {
    if (!newMessage.trim() || !activeChat || !token) return;

    try {
      const res = await fetch(`http://localhost:8000/api/chats/${activeChat.id}/send/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ content: newMessage }),
      });

      if (!res.ok) throw new Error("No se pudo enviar el mensaje");

      const newMsg = await res.json();

      setActiveChat((prev) =>
        prev ? { ...prev, messages: [...prev.messages, newMsg] } : prev
      );
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  const getOtherParticipantName = (chat: Chat) => {
    if (!chat.participants || chat.participants.length === 0 || userId === null) {
      return "Usuario desconocido";
    }
    const other = chat.participants.find((user) => user.id !== userId);
    return other ? other.nombre : "Tú";
  };

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 p-4 bg-white border-r">
        <h2 className="text-xl font-bold text-orange-600 mb-4">Chats</h2>
        {userId !== null &&
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 rounded cursor-pointer mb-2 ${
                activeChat?.id === chat.id ? "bg-orange-600 text-white" : "bg-gray-100"
              }`}
              onClick={() => setActiveChat(chat)}
            >
              <p className="font-semibold">{getOtherParticipantName(chat)}</p>
              <p className="text-sm text-gray-600 truncate">
                {chat.messages.at(-1)?.content || "Sin mensajes"}
              </p>
            </div>
          ))}
      </aside>

      <main className="flex-1 flex flex-col bg-gray-50">
        <div className="p-4 border-b bg-white font-semibold text-lg">
          {activeChat ? getOtherParticipantName(activeChat) : "Selecciona un chat"}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeChat?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender.id === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md p-3 rounded shadow ${
                  msg.sender.id === userId ? "bg-orange-600 text-white" : "bg-white"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {activeChat && (
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input
                className="flex-1 p-2 border rounded"
                placeholder="Escribe un mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className="bg-orange-600 text-white px-4 py-2 rounded"
                onClick={handleSend}
              >
                Enviar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
