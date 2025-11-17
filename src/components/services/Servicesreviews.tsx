"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

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

  const { theme } = useTheme();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const isDark = theme === "dark";

  const bg = isDark ? "bg-[#1b1b1b]" : "bg-white";
  const border = "border-red-500";
  const text = isDark ? "text-white" : "text-red-700";

  const inputBg = isDark
    ? "bg-[#2b2b2b] text-white border-red-500"
    : "bg-white text-red-700 border-red-500";

  const cardBg = isDark
    ? "bg-[#2b2b2b] border-red-500"
    : "bg-gray-50 border-red-500";

  const button =
    "bg-red-500 text-white border-red-500 hover:bg-white hover:text-red-500";

  useEffect(() => {
    async function fetchReviews() {
      setError(null);
      try {
        const res = await fetch(
          `https://mibackend-mchambas.onrender.com/api/services/${serviceId}/reviews/`
        );
        if (!res.ok) throw new Error("Error al cargar los comentarios");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    }
    if (serviceId) fetchReviews();
  }, [serviceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return alert("Debes escribir un comentario");
    if (rating === 0)
      return alert("Debes seleccionar una calificación");
    if (!token)
      return alert("Debes estar autenticado para enviar comentarios");

    setLoading(true);

    try {
      const res = await fetch(
        `https://mibackend-mchambas.onrender.com/api/services/${serviceId}/reviews/create/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ rating, comment }),
        }
      );

      if (!res.ok) throw new Error("Error al enviar comentario");

      const newReview = await res.json();
      setReviews((prev) => [newReview, ...prev]);
      setComment("");
      setRating(0);
    } catch {
      alert("Error al enviar el comentario");
    } finally {
      setLoading(false);
    }
  };

  const StarSelector = () => {
    const stars = [1, 2, 3, 4, 5];

    return (
      <div className="flex gap-2 mb-3 justify-center">
        {stars.map((star) => (
          <span
            key={star}
            className="text-2xl cursor-pointer transition-colors"
            style={{
              color:
                star <= rating
                  ? isDark
                    ? "#b28dff" 
                    : "#ffc107" 
                  : "#ccc",
            }}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <section
      className={`w-full p-6 rounded-lg border ${bg} ${border} ${text} transition-colors`}
    >
      <h2 className="text-center mb-5 font-bold text-2xl text-red-500">
        Comentarios
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto">
        <StarSelector />

        <textarea
          placeholder="Escribe un comentario..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className={`p-3 rounded border resize-none ${inputBg}`}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className={`${button} border px-4 py-2 rounded font-bold disabled:opacity-50 transition`}
        >
          {loading ? "Enviando..." : "Enviar comentario"}
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <ul className="list-none p-0 max-w-xl mx-auto mt-6">
        {reviews.length === 0 && <p>No hay comentarios aún.</p>}

        {reviews.map((review) => (
          <li
            key={review.id}
            className={`p-4 rounded-lg shadow mb-4 border ${cardBg}`}
          >
            <div className="mb-1 text-red-500">
              <strong>{review.user.nombre}</strong>{" "}
              <span className="text-gray-400 text-sm">
                ({new Date(review.created_at).toLocaleDateString()})
              </span>
            </div>

            <div
              className="mb-1"
              style={{ color: isDark ? "#b28dff" : "#ffc107" }}
            >
              {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
            </div>

            <p className="m-0">{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServicesReviews;
