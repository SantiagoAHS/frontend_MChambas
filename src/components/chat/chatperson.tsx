"use client";
import React, { useEffect, useState } from "react";

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

interface ChatPersonProps {
  chatId: string;
  reloadTrigger?: number;  // nuevo prop para forzar recarga
}

const ChatPerson: React.FC<ChatPersonProps> = ({ chatId, reloadTrigger }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;
    async function fetchMessages() {
      try {
        const res = await fetch(`http://localhost:8000/api/chats/${chatId}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        if (!res.ok) throw new Error("Error al cargar mensajes");
        const data = await res.json();
        setMessages(data.messages || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMessages();
  }, [chatId, reloadTrigger, token]); 

  return (
    <div style={{ padding: 16, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <p>Estás viendo el chat con ID <strong>{chatId}</strong></p>
      <div style={{ maxHeight: "60vh", overflowY: "auto", marginTop: 16 }}>
        {messages.length === 0 && <p>No hay mensajes aún</p>}
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: 10 }}>
            <strong>{msg.sender.nombre}:</strong> {msg.content}
            <br />
            <small style={{ color: "#666" }}>{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatPerson;
