"use client";

import React, { useEffect, useState } from "react";

type Partida = {
  id: string;
  usuario: string;
  fecha: string;
  hora: string;
  puntuacion: number;
  clics: number;
};

export default function Partidas() {
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [usuario, setUsuario] = useState<string | null>(null);

  // Cargar usuario y partidas desde localStorage
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const userObj = JSON.parse(userStr);
      setUsuario(userObj.email || userObj.name || null);
    } else {
      setUsuario(null);
    }

    const partidasStr = localStorage.getItem("partidas");
    const partidasArr = partidasStr ? JSON.parse(partidasStr) : [];
    setPartidas(partidasArr);
  }, []);

  // Guardar partidas en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("partidas", JSON.stringify(partidas));
  }, [partidas]);

  // Filtrar partidas propias
  const partidasPropias = usuario
    ? partidas.filter((p) => p.usuario === usuario)
    : [];

  // Eliminar partida propia por id
  const eliminarPartida = (id: string) => {
    if (!usuario) return;
    const nuevasPartidas = partidas.filter((p) => p.id !== id || p.usuario !== usuario);
    setPartidas(nuevasPartidas);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Listado de Partidas</h1>

      {usuario ? (
        <>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Tus partidas</h2>
            {partidasPropias.length === 0 ? (
              <p>No tienes partidas guardadas.</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Fecha</th>
                    <th className="border border-gray-300 p-2">Hora</th>
                    <th className="border border-gray-300 p-2">Puntuación</th>
                    <th className="border border-gray-300 p-2">Clics</th>
                    <th className="border border-gray-300 p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {partidasPropias.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2">{p.fecha}</td>
                      <td className="border border-gray-300 p-2">{p.hora}</td>
                      <td className="border border-gray-300 p-2">{p.puntuacion}</td>
                      <td className="border border-gray-300 p-2">{p.clics}</td>
                      <td className="border border-gray-300 p-2 text-center">
                        <button
                          onClick={() => eliminarPartida(p.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </>
      ) : (
        <p className="mb-6 text-center text-red-600">
          Para eliminar partidas debes estar autenticado.
        </p>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-4">Partidas generales</h2>
        {partidas.length === 0 ? (
          <p>No hay partidas registradas.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Usuario</th>
                <th className="border border-gray-300 p-2">Fecha</th>
                <th className="border border-gray-300 p-2">Hora</th>
                <th className="border border-gray-300 p-2">Puntuación</th>
                <th className="border border-gray-300 p-2">Clics</th>
              </tr>
            </thead>
            <tbody>
              {partidas.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{p.usuario}</td>
                  <td className="border border-gray-300 p-2">{p.fecha}</td>
                  <td className="border border-gray-300 p-2">{p.hora}</td>
                  <td className="border border-gray-300 p-2">{p.puntuacion}</td>
                  <td className="border border-gray-300 p-2">{p.clics}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
