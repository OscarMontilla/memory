"use client";
import React, { useEffect, useState } from "react";

interface Partida {
  id: string;
  usuario: string; // se espera que sea JSON string o email directamente
  fecha: string;
  hora: string;
  puntuacion: number;
  clics: number;
}

export default function PartidasPage() {
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [usuario, setUsuario] = useState<string | null>(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    setUsuario(userStorage);

    const partidasStr = localStorage.getItem("partidas") || "[]";
    const partidasGuardadas: Partida[] = JSON.parse(partidasStr);
    setPartidas(partidasGuardadas);
  }, []);

  const eliminarPartida = (id: string) => {
    if (!usuario) {
      alert("Debes estar logueado para eliminar partidas.");
      return;
    }

    const nuevasPartidas = partidas.filter((p) => p.id !== id);
    setPartidas(nuevasPartidas);
    localStorage.setItem("partidas", JSON.stringify(nuevasPartidas));
  };

  const partidasPropias = partidas.filter((p) => p.usuario === usuario);
  const partidasGenerales = partidas;

  // Función para obtener nombre o email desde p.usuario
  const mostrarUsuario = (usuarioStr: string) => {
    try {
      const u = JSON.parse(usuarioStr);
      return u.name || u.email || usuarioStr;
    } catch {
      return usuarioStr; // si no es JSON válido
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Listado de Partidas</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Mis Partidas</h2>
        {partidasPropias.length === 0 ? (
          <p className="text-gray-600">No tienes partidas registradas.</p>
        ) : (
          <ul>
            {partidasPropias.map((p) => (
              <li
                key={p.id}
                className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <p>
                  <span className="font-semibold">Usuario:</span> {mostrarUsuario(p.usuario)}
                </p>
                <p>
                  <span className="font-semibold">Fecha:</span> {p.fecha}
                </p>
                <p>
                  <span className="font-semibold">Hora:</span> {p.hora}
                </p>
                <p>
                  <span className="font-semibold">Puntuación:</span> {p.puntuacion}
                </p>
                <p>
                  <span className="font-semibold">Clics:</span> {p.clics}
                </p>
                <button
                  onClick={() => eliminarPartida(p.id)}
                  className="mt-3 inline-block bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Partidas Generales</h2>
        {partidasGenerales.length === 0 ? (
          <p className="text-gray-600">No hay partidas registradas.</p>
        ) : (
          <ul>
            {partidasGenerales.map((p) => (
              <li
                key={p.id}
                className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm"
              >
                <p>
                  <span className="font-semibold">Usuario:</span> {mostrarUsuario(p.usuario)}
                </p>
                <p>
                  <span className="font-semibold">Fecha:</span> {p.fecha}
                </p>
                <p>
                  <span className="font-semibold">Hora:</span> {p.hora}
                </p>
                <p>
                  <span className="font-semibold">Puntuación:</span> {p.puntuacion}
                </p>
                <p>
                  <span className="font-semibold">Clics:</span> {p.clics}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
