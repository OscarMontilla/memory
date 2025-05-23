"use client";
import React, { useEffect, useState } from "react";
import Tarjeta from "./Tarjeta";
import { useClickContext } from "./ClickContext";

interface ResultadoPokemon {
  nombre: string;
  url: string;
}

interface DetallesPokemon {
  id: number;
  nombre: string;
  sprites: {
    front_default: string;
  };
}

interface RespuestaAPI {
  results: ResultadoPokemon[];
}

interface TarjetaPokemon {
  id: number;
  nombre: string;
  imagen: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface FlippedCard extends TarjetaPokemon {
  index: number;
}

function GrupoTarjetas() {
  const { totalClicks, incrementGlobalClicks } = useClickContext();
  const [tarjetas, setTarjetas] = useState<TarjetaPokemon[]>([]);
  const [flippedCards, setFlippedCards] = useState<FlippedCard[]>([]);
  const [puntuacion, setPuntuacion] = useState(0);
  const [tiempo, setTiempo] = useState(20);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=6');
        const data: RespuestaAPI = await response.json();
        
        const pokemonPromises = data.results.map((pokemon: ResultadoPokemon) => 
          fetch(pokemon.url).then(res => res.json())
        );
        
        const pokemonDetails = await Promise.all<DetallesPokemon>(pokemonPromises);
        
        const pokemonCards: TarjetaPokemon[] = pokemonDetails.flatMap(pokemon => [
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
        setTarjetas(shuffledCards);
        setCargando(false);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
        setCargando(false);
      }
    };

    fetchPokemons();
  }, []);

  // Temporizador
  useEffect(() => {
    if (tiempo <= 0) return;
    const timer = setTimeout(() => setTiempo((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [tiempo]);

  const manejarClickTarjeta = (indice: number): void => {
    if (tarjetas[indice].isFlipped || tarjetas[indice].isMatched || flippedCards.length === 2) return;

    incrementGlobalClicks();

    const nuevasTarjetas = [...tarjetas];
    nuevasTarjetas[indice].isFlipped = true;
    const newFlipped = [...flippedCards, { ...nuevasTarjetas[indice], index: indice }] as FlippedCard[];
    setTarjetas(nuevasTarjetas);
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);

      const [card1, card2] = newFlipped;
      if (card1.nombre === card2.nombre) {
        // emparejada se quedan fijas
        setTimeout(() => {
          const updated = [...nuevasTarjetas];
          updated[card1.index].isMatched = true;
          updated[card2.index].isMatched = true;
          setTarjetas(updated);
          setFlippedCards([]);
          setPuntuacion((s) => s + 1);
          setIsProcessing(false);
        }, 500);
      } else {
        // No emparejada se dan la vuelta
        setTimeout(() => {
          const updated = [...nuevasTarjetas];
          updated[card1.index].isFlipped = false;
          updated[card2.index].isFlipped = false;
          setTarjetas(updated);
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  return (
    <div>
      <h2>Tiempo: {tiempo}s</h2>
      <h2>Clicks globales: {totalClicks}</h2>
      <h2>Puntuación: {puntuacion}</h2>
      <div style={{ 
        display: "grid",
        gridTemplateRows: "repeat(2, 1fr)", // 2 filas
        gridTemplateColumns: "repeat(6, 1fr)", // 6 columnas
        gap: "1rem",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "1rem"
      }}>
        {cargando ? (
          <p>Cargando Pokémons...</p>
        ) : (
          tarjetas.map((card, i) => (
            <Tarjeta
              key={i}
              imagen={card.imagen}
              nombre={card.nombre}
              isFlipped={card.isFlipped || card.isMatched}
              onClick={() => manejarClickTarjeta(i)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default GrupoTarjetas;
