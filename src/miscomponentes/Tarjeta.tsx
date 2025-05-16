"use client";
import React, { useState } from "react";
import { useClickContext } from "./ClickContext"; 

function Tarjeta({ nombre, imagen, isFlipped, onClick }) {
  const [clicks, setClicks] = useState(0); 
  const { incrementGlobalClicks } = useClickContext(); 

  const handleClick = () => {
    setClicks(clicks + 1); 
    incrementGlobalClicks(); 
    if (onClick) onClick(); 
  };

  const cardStyle = {
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
