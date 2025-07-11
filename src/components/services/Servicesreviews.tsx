"use client";
import React, { useEffect, useState } from "react";

interface Review {
  id: number;
  user: { nombre: string };
  rating: number;
  comment: string;
  created_at: string;
}

interface Props {
  serviceId: number;
}

const ServicesReviews: React.FC<Props> = ({ serviceId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    async function fetchReviews() {
      setError(null);
      try {
        const res = await fetch(`http://localhost:8000/api/services/${serviceId}/reviews/`);
        if (!res.ok) throw new Error("Error al cargar los comentarios");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        console.error(err);
      }
    }
    if (serviceId) {
      fetchReviews();
    }
  }, [serviceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return alert("Debes escribir un comentario");
    if (rating === 0) return alert("Debes seleccionar una calificación de estrellas");
    if (!token) return alert("Debes estar autenticado para comentar");

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/api/services/${serviceId}/reviews/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(JSON.stringify(errData));
      }

      const newReview = await res.json();
      setReviews((prev) => [newReview, ...prev]);
      setComment("");
      setRating(0);
    } catch (err) {
      alert("Error al enviar el comentario");
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Componente para mostrar estrellas (clickeables)
  const StarSelector = () => {
    const stars = [1, 2, 3, 4, 5];
    return (
      <div style={{ display: "flex", gap: 8, marginBottom: 12, justifyContent: "center" }}>
        {stars.map((star) => (
          <span
            key={star}
            style={{
              fontSize: "24px",
              cursor: "pointer",
              color: star <= rating ? "#ffc107" : "#ddd",
            }}
            onClick={() => setRating(star)}
            aria-label={`${star} estrella${star > 1 ? "s" : ""}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <section style={{ width: "100%", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Comentarios de Servicios</h2>

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
        <StarSelector />

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
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#ff5733",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Enviando..." : "Enviar comentario"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "16px" }}>{error}</p>
      )}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          maxWidth: "600px",
          marginInline: "auto",
        }}
      >
        {reviews.length === 0 && <p>No hay comentarios aún.</p>}
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
              <strong>{review.user.nombre || "Usuario"}</strong>{" "}
              <span style={{ color: "#888", fontSize: "0.9em" }}>
                ({new Date(review.created_at).toLocaleDateString()})
              </span>
            </div>
            <div style={{ color: "#ffc107", marginBottom: 6 }}>
              {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
            </div>
            <p style={{ margin: 0 }}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServicesReviews;
