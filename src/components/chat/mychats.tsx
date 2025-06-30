"use client";
import React, { useState } from "react";

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  messages: { sender: "me" | "them"; text: string; time: string }[];
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: "Santiago A. Huerta",
    lastMessage: "Hola, ¿como estás?",
    time: "10:30 AM",
    messages: [
      { sender: "them", text: "Hola, ¿como estás?", time: "10:30 AM" },
      { sender: "me", text: "Todo bien, ¿y tú?", time: "10:31 AM" },
    ],
  },
  {
    id: 2,
    name: "Diego Montes",
    lastMessage: "¿Listo para la reunión?",
    time: "09:15 AM",
    messages: [
      { sender: "them", text: "¿Listo para la reunión?", time: "09:15 AM" },
      { sender: "me", text: "Sí, ya estoy conectado.", time: "09:16 AM" },
    ],
  },
];

const ChatPage: React.FC = () => {
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleEnter = (chat: Chat) => setActiveChat(chat);
  const handleSend = () => {
    if (!newMessage.trim() || !activeChat) return;
    const updated = {
      ...activeChat,
      messages: [
        ...activeChat.messages,
        {
          sender: "me",
          text: newMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    };
    setActiveChat(updated);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 text-white p-4 flex flex-col">
        <div className="text-2xl text-red-500 font-bold mb-6">Chats</div>
        <input
          type="text"
          placeholder="Buscar..."
          className="mb-4 p-2 rounded bg-gray-100 border border-gray-400 text-gray-400"
        />
        <div className="flex-1 overflow-y-auto space-y-2">
          {mockChats.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 rounded cursor-pointer ${
                activeChat?.id === chat.id
                  ? "bg-orange-600"
                  : "bg-gray-400 hover:bg-gray-600"
              }`}
              onClick={() => handleEnter(chat)}
            >
              <p className="font-semibold text-white">{chat.name}</p>
              <p className="text-sm text-white/60 truncate">
                {chat.lastMessage}
              </p>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 bg-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-300 flex items-center justify-between bg-white">
          <h2 className="text-lg font-semibold">
            {activeChat ? activeChat.name : "Selecciona un chat"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeChat?.messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                msg.sender === "me" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`p-3 rounded shadow max-w-md ${
                  msg.sender === "me"
                    ? "bg-orange-600 text-white"
                    : "bg-white"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-xs text-gray-500 mt-1">{msg.time}</span>
            </div>
          ))}
        </div>

        {activeChat && (
          <div className="p-4 border-t border-gray-300 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="flex-1 p-2 rounded border border-gray-300"
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
};

export default ChatPage;
