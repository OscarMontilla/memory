'use client'
import React, { useEffect } from "react";
import { ClickProvider } from "@/miscomponentes/ClickContext";
import GrupoTarjetas from "@/miscomponentes/GrupoTarjetas";
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/juego');
    }
  }, [router]);

  return (
    <ClickProvider>
      <h1>Memory</h1>
      <GrupoTarjetas />
    </ClickProvider>
  );
}
