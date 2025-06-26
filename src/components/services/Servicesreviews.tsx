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
        <section>
            <h2>Comentarios de Servicios</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ marginRight: "0.5rem" }}
                />
                <input
                    type="text"
                    placeholder="Tu comentario"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    style={{ marginRight: "0.5rem", width: "300px" }}
                />
                <button type="submit">Enviar</button>
            </form>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {reviews.map((review) => (
                    <li key={review.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>
                        <strong>{review.name}</strong> <span style={{ color: "#888", fontSize: "0.9em" }}>{review.date}</span>
                        <p style={{ margin: "0.5rem 0 0 0" }}>{review.comment}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ServicesReviews;