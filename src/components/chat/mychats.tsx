"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: "Juan Pérez",
    lastMessage: "Hola, ¿cómo estás?",
    time: "10:30 AM",
  },
  {
    id: 2,
    name: "María López",
    lastMessage: "¿Listo para la reunión?",
    time: "09:15 AM",
  },
];

const MyChats: React.FC = () => {
  const router = useRouter();

  const handleEnter = (id: number) => {
    router.push(`/chat/${id}`);
  };

  const handleDelete = (id: number) => {
    alert(`Borrar chat con ID: ${id}`);
  };

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Mis Chats</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {mockChats.map((chat) => (
          <li
            key={chat.id}
            style={{
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "16px",
              marginBottom: "16px",
              background: "#f9f9f9",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div style={{ flexGrow: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong>{chat.name}</strong>
                <small style={{ color: "#888" }}>{chat.time}</small>
              </div>
              <div style={{ color: "#444" }}>{chat.lastMessage}</div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => handleEnter(chat.id)}
                style={{
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                Entrar
              </button>
              <button
                onClick={() => handleDelete(chat.id)}
                style={{
                  background: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                Borrar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyChats;
