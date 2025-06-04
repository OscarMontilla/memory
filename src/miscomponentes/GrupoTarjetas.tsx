"use client";
import React, { useEffect, useState } from "react";
import Tarjeta from "./Tarjeta";
import { useClickContext } from "./ClickContext";

interface PokemonResult {
  name: string;
  url: string;
}
interface PokemonDetails {
  id: number;
  name: string;
  sprites: { front_default: string };
}
interface ApiResponse {
  results: PokemonResult[];
}
interface PokemonCard {
  id: number;
  nombre: string;
  imagen: string;
  isFlipped: boolean;
  isMatched: boolean;
}
interface FlippedCard extends PokemonCard {
  index: number;
}

interface Partida {
  id: string;
  usuario: string;
  fecha: string;
  hora: string;
  puntuacion: number;
  clics: number;
}

function GrupoTarjetas() {
  const { totalClicks, incrementGlobalClicks } = useClickContext();
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<FlippedCard[]>([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(20);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=6');
      const data: ApiResponse = await response.json();
      
      const pokemonPromises = data.results.map((pokemon: PokemonResult) => 
        fetch(pokemon.url).then(res => res.json())
      );
      
      const pokemonDetails = await Promise.all<PokemonDetails>(pokemonPromises);
      
      const pokemonCards: PokemonCard[] = pokemonDetails.flatMap(pokemon => [
        {
          id: pokemon.id,
          nombre: pokemon.name,
          imagen: pokemon.sprites.front_default,
          isFlipped: false,
          isMatched: false
        },
        {
          id: pokemon.id + 1000,
          nombre: pokemon.name,
          imagen: pokemon.sprites.front_default,
          isFlipped: false,
          isMatched: false
        }
      ]);

      const shuffledCards = pokemonCards.sort(() => Math.random() - 0.5);
      setCards(shuffledCards);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    if (time <= 0) {
      setGameOver(true);
      return;
    }
    const timer = setTimeout(() => setTime((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [time]);

  // Guardar partida cuando el juego termina
  useEffect(() => {
    if (gameOver) {
      const usuario = localStorage.getItem("user") || "invitado";
      const now = new Date();
      const fecha = now.toLocaleDateString();
      const hora = now.toLocaleTimeString();

      const nuevaPartida: Partida = {
        id: `${now.getTime()}`,
        usuario,
        fecha,
        hora,
        puntuacion: score,
        clics: totalClicks,
      };

      const partidasStr = localStorage.getItem("partidas") || "[]";
      const partidas: Partida[] = JSON.parse(partidasStr);

      partidas.push(nuevaPartida);
      localStorage.setItem("partidas", JSON.stringify(partidas));
    }
  }, [gameOver, score, totalClicks]);

  const resetGame = () => {
    setTime(20);
    setScore(0);
    setGameOver(false);
    setFlippedCards([]);
    setIsProcessing(false);
    fetchPokemons();
  };

  const handleCardClick = (index: number): void => {
    if (isProcessing || cards[index].isFlipped || cards[index].isMatched || flippedCards.length === 2) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    const newFlipped = [...flippedCards, { ...newCards[index], index }];
    setCards(newCards);
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);

      const [card1, card2] = newFlipped;
      if (card1.nombre === card2.nombre) {
        setTimeout(() => {
          const updated = [...newCards];
          updated[card1.index].isMatched = true;
          updated[card2.index].isMatched = true;
          setCards(updated);
          setFlippedCards([]);
          setScore((s) => s + 1);
          setIsProcessing(false);
        }, 500);
      } else {
        setTimeout(() => {
          const updated = [...newCards];
          updated[card1.index].isFlipped = false;
          updated[card2.index].isFlipped = false;
          setCards(updated);
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center gap-8 mb-6 flex-wrap">
        <h2 className="bg-blue-100 text-blue-800 font-semibold px-6 py-3 rounded-lg shadow-md text-xl">
          Tiempo: <span className="font-bold">{time}s</span>
        </h2>
        <h2 className="bg-green-100 text-green-800 font-semibold px-6 py-3 rounded-lg shadow-md text-xl">
          Clicks globales: <span className="font-bold">{totalClicks}</span>
        </h2>
        <h2 className="bg-yellow-100 text-yellow-800 font-semibold px-6 py-3 rounded-lg shadow-md text-xl">
          Puntuación: <span className="font-bold">{score}</span>
        </h2>
      </div>
  
      {gameOver && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            zIndex: 1000,
          }}
        >
          <h2>¡Game Over!</h2>
          <p>Puntuación final: {score}</p>
          <button
            onClick={resetGame}
            style={{
              backgroundColor: "#4CAF50",
              border: "none",
              color: "white",
              padding: "15px 32px",
              fontSize: "16px",
              margin: "4px 2px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Jugar de nuevo
          </button>
        </div>
      )}
  
      <div
        style={{
          display: "grid",
          gridTemplateRows: "repeat(2, 1fr)",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "1rem",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1rem",
          opacity: gameOver ? "0.5" : "1",
        }}
      >
        {loading ? (
          <p>Cargando Pokémons...</p>
        ) : (
          cards.map((card, i) => (
            <Tarjeta
              key={i}
              imagen={card.imagen}
              nombre={card.nombre}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onClick={() => !gameOver && handleCardClick(i)}
            />
          ))
        )}
      </div>
    </div>
  );
  
}

export default GrupoTarjetas;
