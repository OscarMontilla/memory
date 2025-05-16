"use client";
import React, { useEffect, useState } from "react";
import Tarjeta from "./Tarjeta";
import { useClickContext } from "./ClickContext";

const tarjetasOriginales = [
  { id: 1, nombre: "Raticate", imagen: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/d/d6/latest/20200307022931/Raticate.png/800px-Raticate.png" },
  { id: 2, nombre: "Psyduck", imagen: "https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/pokemon-unite/art/psyduck.png" },
  { id: 3, nombre: "Raticate", imagen: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/d/d6/latest/20200307022931/Raticate.png/800px-Raticate.png" }, // pareja
  { id: 4, nombre: "Psyduck", imagen: "https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/pokemon-unite/art/psyduck.png" },  // pareja
];

function GrupoTarjetas() {
  const { totalClicks, incrementGlobalClicks } = useClickContext();
  const [cards, setCards] = useState(
    tarjetasOriginales.map((card) => ({ ...card, isFlipped: false, isMatched: false }))
  );
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(20);
<<<<<<< HEAD
=======
  const [isProcessing, setIsProcessing] = useState(false); 
>>>>>>> d18ec34497831f0c2d2c48655027d2f576dfa364

  // Temporizador
  useEffect(() => {
    if (time <= 0) return;
    const timer = setTimeout(() => setTime((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [time]);

  const handleCardClick = (index) => {
    if (cards[index].isFlipped || cards[index].isMatched || flippedCards.length === 2) return;

    incrementGlobalClicks();

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    const newFlipped = [...flippedCards, { ...newCards[index], index }];
    setCards(newCards);
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
<<<<<<< HEAD
=======
      setIsProcessing(true); 
>>>>>>> d18ec34497831f0c2d2c48655027d2f576dfa364
      const [card1, card2] = newFlipped;
      if (card1.nombre === card2.nombre) {
        // Match!
        setTimeout(() => {
          const updated = [...newCards];
          updated[card1.index].isMatched = true;
          updated[card2.index].isMatched = true;
          setCards(updated);
          setFlippedCards([]);
          setScore((s) => s + 1);
<<<<<<< HEAD
=======
          setIsProcessing(false); 
>>>>>>> d18ec34497831f0c2d2c48655027d2f576dfa364
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const updated = [...newCards];
          updated[card1.index].isFlipped = false;
          updated[card2.index].isFlipped = false;
          setCards(updated);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div>
      <h2>Tiempo: {time}s</h2>
      <h2>Clicks globales: {totalClicks}</h2>
      <h2>Puntuación: {score}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {cards.map((card, i) => (
          <Tarjeta
            key={i}
            imagen={card.imagen}
            nombre={card.nombre}
            isFlipped={card.isFlipped || card.isMatched}
            onClick={() => handleCardClick(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default GrupoTarjetas;
