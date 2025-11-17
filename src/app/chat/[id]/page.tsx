"use client";
import React, { useState } from "react";
import ChatPerson from "@/components/chat/chatperson";

interface ChatPageProps {
  params: { id: string };
}

export default function ChatPage({ params }: ChatPageProps) {
  const [newMessage, setNewMessage] = useState<string>("");
  const [reloadTrigger, setReloadTrigger] = useState<number>(0);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleSend = async () => {
    if (!newMessage.trim() || !token) return;

    try {
      const res = await fetch(
        `https://mibackend-mchambas.onrender.com/api/chats/${params.id}/send/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ content: newMessage }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Error del backend:", data);
        alert("Error al enviar el mensaje");
        return;
      }

      setNewMessage("");
      setReloadTrigger((prev) => prev + 1);
    } catch (err) {
      console.error("Error al enviar mensaje", err);
      alert("Error al enviar mensaje");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-black dark:bg-[#121212] dark:text-white transition-colors duration-300">
      <aside className="w-1/4 p-4 flex flex-col bg-white text-black border-r border-gray-300 dark:bg-[#1a1a2e] dark:text-white dark:border-[#333] transition-colors duration-300">
        <div className="text-2xl font-bold mb-6">MChambas</div>
        <input
          type="text"
          placeholder="Buscar..."
          className="mb-4 p-2 rounded border bg-white text-black border-gray-300 placeholder-gray-500 dark:bg-[#2a2a40] dark:border-[#444] dark:text-white dark:placeholder-gray-400 transition-colors duration-300"
        />
        <div className="flex-1 overflow-y-auto space-y-2">
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="p-4 flex items-center justify-between bg-white border-b border-gray-300 dark:bg-[#232323] dark:border-[#444] transition-colors duration-300">
          <h2 className="text-lg font-semibold">Usuario</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <ChatPerson chatId={params.id} reloadTrigger={reloadTrigger} />
        </div>

        <div className="p-4 bg-white border-t border-gray-300 dark:bg-[#232323] dark:border-[#444] transition-colors duration-300">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 p-2 rounded border bg-white text-black border-gray-300 placeholder-gray-500 dark:bg-[#2e2e2e] dark:text-white dark:border-[#555] dark:placeholder-gray-400 transition-all duration-300"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 rounded font-semibold bg-green-500 hover:bg-green-600 text-white dark:bg-purple-600 dark:hover:bg-purple-700 transition-all duration-300"
            >
              Enviar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}