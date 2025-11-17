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
  const isDark = theme === "dark";

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 🔹 Obtener chats
  const fetchChats = async () => {
    if (!token) return;

    try {
      const res = await fetch(
        "https://mibackend-mchambas.onrender.com/api/chats/",
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      const data = await res.json();

      setChats(data.chats || data);

      const stored = data.user_id || localStorage.getItem("user_id");
      if (stored) setUserId(parseInt(stored));

      if (activeChat) {
        const updatedChat = (data.chats || data).find(
          (c: Chat) => c.id === activeChat.id
        );
        if (updatedChat) setActiveChat(updatedChat);
      }
    } catch (err) {
      console.error("Error al obtener chats", err);
    }
  };

  useEffect(() => {
    fetchChats();
    const interval = setInterval(fetchChats, 5000);
    return () => clearInterval(interval);
  }, [token, activeChat]);

  // 🔹 Enviar mensaje
  const handleSend = async () => {
    if (!newMessage.trim() || !activeChat || !token) return;

    try {
      const res = await fetch(
        `https://mibackend-mchambas.onrender.com/api/chats/${activeChat.id}/send/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ content: newMessage }),
        }
      );

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

  // 🔹 Obtener nombre del otro usuario
  const getOtherParticipantName = (chat: Chat) => {
    if (!chat.participants.length || userId === null)
      return "Usuario desconocido";

    const other = chat.participants.find((u) => u.id !== userId);
    return other ? other.nombre : "Tú";
  };

  // 🔹 Mensaje pendiente (sin responder)
  const hasPendingResponse = (chat: Chat): boolean => {
    if (!userId) return false;

    const lastOther = [...chat.messages]
      .reverse()
      .find((m) => m.sender.id !== userId);

    if (!lastOther) return false;

    const lastMine = [...chat.messages]
      .reverse()
      .find((m) => m.sender.id === userId);

    if (lastMine && new Date(lastMine.timestamp) > new Date(lastOther.timestamp))
      return false;

    return true;
  };

  return (
    <div
      className={`flex h-screen transition-colors ${
        isDark ? "bg-[#3a3a3a] text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* SIDEBAR */}
      <aside
        className={`w-1/4 p-4 border-r ${
          isDark
            ? "bg-[#3a3a3a] border-gray-500"
            : "bg-white border-gray-300"
        }`}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            isDark ? "text-red-400" : "text-red-500"
          }`}
        >
          Chats
        </h2>

        {userId !== null &&
          chats.map((chat) => {
            const isActive = activeChat?.id === chat.id;

            return (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`p-3 rounded cursor-pointer mb-2 flex justify-between items-center transition-colors
                ${
                  isActive
                    ? isDark
                      ? "bg-red-500 text-white"
                      : "bg-red-500 text-white"
                    : isDark
                    ? "bg-[#2f2f2f] border border-gray-500"
                    : "bg-gray-100 border border-gray-300"
                }`}
              >
                <div>
                  <p className="font-semibold">
                    {getOtherParticipantName(chat)}
                  </p>
                  <p className="text-sm opacity-80 truncate">
                    {chat.messages.at(-1)?.content || "Sin mensajes"}
                  </p>
                </div>

                {hasPendingResponse(chat) && (
                  <span className="w-3 h-3 bg-red-500 rounded-full" />
                )}
              </div>
            );
          })}
      </aside>

      {/* CHAT PRINCIPAL */}
      <main
        className={`flex-1 flex flex-col ${
          isDark ? "bg-[#3a3a3a] text-white" : "bg-gray-50"
        }`}
      >
        {/* HEADER */}
        <div
          className={`p-4 border-b font-semibold text-lg ${
            isDark
              ? "bg-[#2f2f2f] border-gray-500"
              : "bg-white border-gray-300"
          }`}
        >
          {activeChat ? getOtherParticipantName(activeChat) : "Selecciona un chat"}
        </div>

        {/* MENSAJES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeChat?.messages.map((msg) => {
            const mine = msg.sender.id === userId;
            return (
              <div
                key={msg.id}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md p-3 rounded shadow ${
                    mine
                      ? isDark
                        ? "bg-red-500 text-white"
                        : "bg-red-500 text-white"
                      : isDark
                      ? "bg-[#2f2f2f] border border-gray-500"
                      : "bg-white border border-gray-300"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* INPUT */}
        {activeChat && (
          <div
            className={`p-4 border-t ${
              isDark
                ? "bg-[#2f2f2f] border-gray-500"
                : "bg-white border-gray-300"
            }`}
          >
            <div className="flex gap-2">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Escribe un mensaje..."
                className={`flex-1 p-2 rounded border transition-colors ${
                  isDark
                    ? "bg-[#1f1f1f] text-white border-gray-500"
                    : "bg-white border-gray-300"
                }`}
              />

              <button
                onClick={handleSend}
                className={`px-4 py-2 rounded text-white font-semibold transition ${
                  isDark
                    ? "bg-red-500 hover:bg-red-500"
                    : "bg-red-500 hover:bg-red-500"
                }`}
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
