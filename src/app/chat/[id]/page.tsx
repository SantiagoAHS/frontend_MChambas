// app/chat/[id]/page.tsx
"use client";
import React from "react";
import ChatPerson from "@/components/chat/chatperson";
import { useRouter } from "next/navigation";

interface Props {
  params: { id: string };
}

export default function ChatPage({ params }: Props) {
  const router = useRouter();

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
          <div className="bg-[#4b6fff] p-3 rounded text-white shadow cursor-pointer">
            <p className="font-semibold">Diego Montes</p>
            <p className="text-sm text-white/80 truncate">
              Hola, ¿como estás?
            </p>
          </div>
          <div className="bg-[#1c223a] p-3 rounded cursor-pointer">
            <p className="font-semibold text-white">Santiago A. Huerta</p>
            <p className="text-sm text-white/60 truncate">
              ¿Listo para la reunión?
            </p>
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-[#f1f4fb] flex flex-col">
        <div className="p-4 border-b border-gray-300 flex items-center justify-between bg-white">
          <h2 className="text-lg font-semibold">Usuario</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <ChatPerson chatId={params.id} />
        </div>

        <div className="p-4 border-t border-gray-300 bg-white">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="flex-1 p-2 rounded border border-gray-300"
            />
            <button className="bg-[#4b6fff] text-white px-4 py-2 rounded">Enviar</button>
          </div>
        </div>
      </main>
    </div>
  );
}
