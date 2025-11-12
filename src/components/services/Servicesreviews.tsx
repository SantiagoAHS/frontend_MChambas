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
    if (rating === 0)
      return alert("Debes seleccionar una calificación de estrellas");
    if (!token) return alert("Debes estar autenticado para comentar");

    setLoading(true);
    setError(null);
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

  const StarSelector = () => {
    const stars = [1, 2, 3, 4, 5];
    return (
      <div className="flex gap-2 mb-3 justify-center">
        {stars.map((star) => (
          <span
            key={star}
            className="text-2xl cursor-pointer transition-colors duration-300"
            style={{
              color:
                star <= rating
                  ? theme === "dark"
                    ? "#b28dff"
                    : "#ffc107"
                  : "#ccc",
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
    <section
      className={`w-full p-5 rounded-lg border transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#3a3a3a] text-white border-purple-500"
          : "bg-white text-black border-green-500"
      }`}
    >
      <h2 className="text-center mb-5 font-bold text-lg">
        Comentarios de Servicios
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mb-6 flex flex-col gap-3 max-w-xl mx-auto"
      >
        <StarSelector />

        <textarea
          placeholder="Tu comentario"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={4}
          className={`p-2 rounded resize-none border transition-colors duration-300 ${
            theme === "dark"
              ? "bg-[#2b2b2b] border-purple-500 text-white"
              : "bg-white border-green-500 text-black"
          }`}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className={`font-bold px-4 py-2 rounded transition-colors duration-300 disabled:opacity-50 ${
            theme === "dark"
              ? "bg-purple-500 hover:bg-purple-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {loading ? "Enviando..." : "Enviar comentario"}
        </button>
      </form>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <ul className="list-none p-0 max-w-xl mx-auto">
        {reviews.length === 0 && <p>No hay comentarios aún.</p>}
        {reviews.map((review) => (
          <li
            key={review.id}
            className={`p-4 rounded-lg shadow mb-4 border transition-colors duration-300 ${
              theme === "dark"
                ? "bg-[#2b2b2b] border-purple-500"
                : "bg-gray-50 border-green-500"
            }`}
          >
            <div className="mb-1">
              <strong>{review.user.nombre || "Usuario"}</strong>{" "}
              <span className="text-gray-500 text-sm">
                ({new Date(review.created_at).toLocaleDateString()})
              </span>
            </div>
            <div
              className="mb-1"
              style={{
                color: theme === "dark" ? "#b28dff" : "#ffc107",
              }}
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
