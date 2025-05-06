"use client";
import React, { useState } from "react";
import { useClickContext } from "./ClickContext"; // Importamos el contexto global

function Tarjeta({ nombre, imagen, isFlipped, onClick }) {
  const [clicks, setClicks] = useState(0); // Contador de clics individual
  const { incrementGlobalClicks } = useClickContext(); // Función para incrementar los clics globales

  const handleClick = () => {
    setClicks(clicks + 1); // Incrementa el contador individual
    incrementGlobalClicks(); // Incrementa el contador global
    if (onClick) onClick(); // Llama a la función que se pase como prop
  };

  const cardStyle = {
    width: "120px",
    height: "150px",
    margin: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: isFlipped ? "#f0f0f0" : "blue", // Azul cuando está boca abajo
    color: isFlipped ? "black" : "white", // Texto en blanco cuando está boca abajo
    cursor: "pointer",
    userSelect: "none",
    display: "flex",
    flexDirection: "column", // Alinea los elementos dentro de la carta de manera vertical
    justifyContent: "center", // Centra los elementos dentro de la carta
    alignItems: "center", // Centra los elementos horizontalmente
    padding: "10px", // Añade un padding para evitar que los elementos queden demasiado pegados
  };

  return (
    <div style={cardStyle} onClick={handleClick}>
      {isFlipped ? (
        <>
          <img
            src={imagen}
            alt={nombre}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain", // Asegura que la imagen se ajuste sin perder su proporción
              marginBottom: "10px", // Añade un pequeño espacio debajo de la imagen
            }}
          />
          <div>
            <p>Clics: {clicks}</p> {/* Muestra el contador de clics debajo de la carta */}
          </div>
        </>
      ) : (
        <div></div> // Área vacía para la carta boca abajo
      )}
    </div>
  );
}

export default Tarjeta;
