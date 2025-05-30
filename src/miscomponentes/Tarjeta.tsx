"use client";
import React, { useState, CSSProperties } from "react";
import { useClickContext } from "./ClickContext";

interface TarjetaProps {
  nombre: string;
  imagen: string;
  isFlipped: boolean;
  isMatched?: boolean;
  onClick: () => void;
}

function Tarjeta({ nombre, imagen, isFlipped, isMatched, onClick }: TarjetaProps) {
  const [clicks, setClicks] = useState(0);
  const { incrementGlobalClicks } = useClickContext();

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      setClicks(clicks + 1);
      incrementGlobalClicks();
      onClick();
    }
  };

  const cardStyle: CSSProperties = {
    width: "120px",
    height: "150px",
    margin: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: isFlipped ? "#f0f0f0" : "blue",
    color: isFlipped ? "black" : "white",
    cursor: "pointer",
    userSelect: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
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
              objectFit: "contain",
              marginBottom: "10px",
            }}
          />
          <div>
            <p>Clics: {clicks}</p>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Tarjeta;
