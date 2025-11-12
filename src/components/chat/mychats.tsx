"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface User {
  id: number;
  nombre: string;
}

interface Message {
  id: number;
  chat: number;
  sender: User;
  content: string;
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
  const { theme } = useTheme();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 🔹 Función para obtener chats
  const fetchChats = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://mibackend-mchambas.onrender.com/api/chats/", {
        headers: { Authorization: `Token ${token}` },
      });
      const data = await res.json();
      setChats(data.chats || data);
      setUserId(data.user_id || parseInt(localStorage.getItem("user_id") || "0"));

      // 🔹 Actualizar activeChat si está abierto
      if (activeChat) {
        const updated = (data.chats || data).find((c: Chat) => c.id === activeChat.id);
        if (updated) setActiveChat(updated);
      }
    } catch (err) {
      console.error("Error al obtener chats", err);
    }
  };

  // 🔹 Auto-refresh con interval
  useEffect(() => {
    fetchChats(); // fetch inicial
    const interval = setInterval(fetchChats, 5000); // cada 5s
    return () => clearInterval(interval);
  }, [token, activeChat]);

  const handleSend = async () => {
    if (!newMessage.trim() || !activeChat || !token) return;

    try {
      const res = await fetch(`https://mibackend-mchambas.onrender.com/api/chats/${activeChat.id}/send/`, {
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

  // 🔹 Función para saber si hay mensajes pendientes de respuesta
  const hasPendingResponse = (chat: Chat) => {
    if (!userId) return false;

    const lastFromOther = [...chat.messages].reverse().find(msg => msg.sender.id !== userId);
    if (!lastFromOther) return false; // No hay mensajes del otro usuario

    const lastFromUser = [...chat.messages].reverse().find(msg => msg.sender.id === userId);

    if (lastFromUser && new Date(lastFromUser.timestamp) > new Date(lastFromOther.timestamp)) {
      return false; // Ya respondiste
    }

    return true; // Pendiente de respuesta
  };

  return (
    <div className={`flex h-screen ${theme === "dark" ? "bg-[#3a3a3a] text-white" : "bg-gray-100 text-black"}`}>
      <aside className={`w-1/4 p-4 ${theme === "dark" ? "bg-[#3a3a3a] border-r border-gray-700" : "bg-white border-r"}`}>
        <h2 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-purple-500" : "text-green-500"}`}>Chats</h2>
        {userId !== null &&
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 rounded cursor-pointer mb-2 flex justify-between items-center ${
                activeChat?.id === chat.id
                  ? theme === "dark"
                    ? "bg-purple-500 text-white"
                    : "bg-green-500 text-white"
                  : theme === "dark"
                  ? "bg-[#3a3a3a] border border-gray-600"
                  : "bg-gray-100"
              }`}
              onClick={() => setActiveChat(chat)}
            >
              <div>
                <p className="font-semibold">{getOtherParticipantName(chat)}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  {chat.messages.at(-1)?.content || "Sin mensajes"}
                </p>
              </div>
              {hasPendingResponse(chat) && <span className="w-3 h-3 bg-red-500 rounded-full ml-2"></span>}
            </div>
          ))}
      </aside>

      <main className={`flex-1 flex flex-col ${theme === "dark" ? "bg-[#3a3a3a] text-white" : "bg-gray-50"}`}>
        <div className={`p-4 border-b ${theme === "dark" ? "bg-[#3a3a3a] border-gray-700" : "bg-white"} font-semibold text-lg`}>
          {activeChat ? getOtherParticipantName(activeChat) : "Selecciona un chat"}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeChat?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender.id === userId ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-md p-3 rounded shadow ${
                  msg.sender.id === userId
                    ? theme === "dark"
                      ? "bg-purple-500 text-white"
                      : "bg-green-500 text-white"
                    : theme === "dark"
                    ? "bg-[#3a3a3a] border border-gray-600 text-white"
                    : "bg-white"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {activeChat && (
          <div className={`p-4 ${theme === "dark" ? "bg-[#3a3a3a] border-t border-gray-700" : "bg-white border-t"}`}>
            <div className="flex gap-2">
              <input
                className={`flex-1 p-2 rounded border ${theme === "dark" ? "bg-[#3a3a3a] text-white border-gray-600" : ""}`}
                placeholder="Escribe un mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className={`px-4 py-2 rounded text-white ${theme === "dark" ? "bg-purple-500 hover:bg-purple-600" : "bg-green-500 hover:bg-green-600"}`}
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
