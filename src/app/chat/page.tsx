"use client";
import React, { useEffect, useState, useRef } from "react";

const ChatPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "¡Hola! ¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("chat_open");
    if (saved !== null) setIsOpen(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("chat_open", String(isOpen));
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Tu madre 😊" },
      ]);
    }, 800);
  };

  return (
    <>
      {isOpen ? (
        <div style={styles.chatBox}>
          <div style={styles.header}>
            <strong>Asistente</strong>
            <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>✖</button>
          </div>
          <div style={styles.chatBody}>
            {messages.map((msg, i) => (
              <div key={i} style={msg.sender === "user" ? styles.userMsg : styles.botMsg}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe un mensaje..."
              style={styles.input}
            />
            <button onClick={handleSend} style={styles.sendBtn}>Enviar</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} style={styles.openBtn}>💬</button>
      )}
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  chatBox: {
    position: "fixed",
    bottom: 20,
    right: 20,
    width: 320,
    height: 460,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    zIndex: 1000,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#ff6600",
    color: "#fff",
    padding: "10px 15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatBody: {
    flex: 1,
    padding: 10,
    overflowY: "auto",
    backgroundColor: "#f5f5f5",
  },
  inputContainer: {
    display: "flex",
    padding: 10,
    borderTop: "1px solid #ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 8,
    borderRadius: 20,
    border: "1px solid #ccc",
    marginRight: 8,
    outline: "none",
  },
  sendBtn: {
    padding: "8px 12px",
    border: "none",
    backgroundColor: "#ff6600",
    color: "#fff",
    borderRadius: 20,
    cursor: "pointer",
  },
  openBtn: {
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: 1000,
    padding: 14,
    fontSize: 24,
    borderRadius: "50%",
    border: "2px solid #ff6600",
    backgroundColor: "#fff",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: 18,
    cursor: "pointer",
  },
  botMsg: {
    backgroundColor: "#e4e6eb",
    padding: "8px 12px",
    borderRadius: 12,
    marginBottom: 8,
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  userMsg: {
    backgroundColor: "#ff6600",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: 12,
    marginBottom: 8,
    alignSelf: "flex-end",
    maxWidth: "80%",
  },
};

export default ChatPopup;
