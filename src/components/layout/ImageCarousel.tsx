"use client";

import React, { useState, useEffect } from "react";

const images = [
  "/images/floreria.jpg",
  "/images/fiesta.jpg",
  "/images/medico.jpg",
  "/images/contruccion.jpg",
];

const ImageCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);
  if (!ready) return null;

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  // Posiciones visibles
  const center = index;
  const left = (index - 1 + images.length) % images.length;
  const right = (index + 1) % images.length;

  return (
    <div style={styles.wrapper}>
      <button style={styles.btn} onClick={prev}>{"<"}</button>

      <div style={styles.carousel}>
        {images.map((img, i) => {
          let style = { ...styles.hidden };

          if (i === center) style = { ...styles.center };
          else if (i === left) style = { ...styles.left };
          else if (i === right) style = { ...styles.right };

          return (
            <img
              key={i}
              src={img}
              onClick={() => setIndex(i)}
              style={style}
            />
          );
        })}
      </div>

      <button style={styles.btn} onClick={next}>{">"}</button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    width: "100%",
    maxWidth: "900px",
    margin: "40px auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  carousel: {
    position: "relative",
    width: "100%",
    height: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  // Imagen principal
  center: {
    position: "absolute",
    width: "480px",
    height: "340px",
    borderRadius: "14px",
    objectFit: "cover",
    transform: "translateX(0px) scale(1)",
    transition: "all 0.45s ease",
    zIndex: 10,
    opacity: 1,
  },

  // Izquierda
  left: {
    position: "absolute",
    width: "300px",
    height: "230px",
    borderRadius: "12px",
    objectFit: "cover",
    transform: "translateX(-260px) scale(0.75)",
    transition: "all 0.45s ease",
    opacity: 0.7,
    zIndex: 5,
    cursor: "pointer",
  },

  // Derecha
  right: {
    position: "absolute",
    width: "300px",
    height: "230px",
    borderRadius: "12px",
    objectFit: "cover",
    transform: "translateX(260px) scale(0.75)",
    transition: "all 0.45s ease",
    opacity: 0.7,
    zIndex: 5,
    cursor: "pointer",
  },

  // Ocultas
  hidden: {
    display: "none",
  },

  btn: {
    background: "#00000088",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    fontSize: "20px",
    cursor: "pointer",
  },
};

export default ImageCarousel;
