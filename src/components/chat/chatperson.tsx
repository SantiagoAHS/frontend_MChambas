"use client";
import React from "react";

interface ChatPersonProps {
  chatId: string;
}

const ChatPerson: React.FC<ChatPersonProps> = ({ chatId }) => {
  return (
    <div style={{ padding: 16, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <p>Estás viendo el chat con ID <strong>{chatId}</strong></p>
      {/* Aquí puedes agregar el historial, input de mensaje, etc. */}
    </div>
  );
};

export default ChatPerson;
