// app/chat/[id]/page.tsx
import ChatPerson from "@/components/chat/chatperson";
import React from "react";


interface Props {
  params: { id: string };
}

export default function ChatPage({ params }: Props) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Chat con ID: {params.id}</h1>
      <ChatPerson chatId={params.id} />
    </div>
  );
}
