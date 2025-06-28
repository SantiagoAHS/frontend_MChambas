"use client";
import React, { useState } from "react";

interface Review {
  id: number;
  name: string;
  comment: string;
  date: string;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Juan Pérez",
    comment: "Excelente servicio, muy recomendado.",
    date: "2024-06-01",
  },
  {
    id: 2,
    name: "María López",
    comment: "Muy buena atención y rapidez.",
    date: "2024-06-02",
  },
];

const ServicesReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    const newReview: Review = {
      id: reviews.length + 1,
      name,
      comment,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews([newReview, ...reviews]);
    setName("");
    setComment("");
  };

  return (
    <section style={{ width: "100%", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Comentarios de Servicios
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "600px",
          marginInline: "auto",
        }}
      >
        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <textarea
          placeholder="Tu comentario"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={4}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            resize: "none",
          }}
        />
        <button
          type="submit"
          style={{
            background: "#ff5733",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Enviar comentario
        </button>
      </form>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          maxWidth: "600px",
          marginInline: "auto",
        }}
      >
        {reviews.map((review) => (
          <li
            key={review.id}
            style={{
              background: "#f9f9f9",
              padding: "16px",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              marginBottom: "16px",
            }}
          >
            <div style={{ marginBottom: "6px" }}>
              <strong>{review.name}</strong>{" "}
              <span style={{ color: "#888", fontSize: "0.9em" }}>
                ({review.date})
              </span>
            </div>
            <p style={{ margin: 0 }}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServicesReviews;
