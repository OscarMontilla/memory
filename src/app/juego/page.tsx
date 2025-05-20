import React from "react";
import { ClickProvider } from "@/miscomponentes/ClickContext";
import GrupoTarjetas from "@/miscomponentes/GrupoTarjetas";

export default function Page() {
  return (
    <ClickProvider>
      <h1>Memory</h1>
      <GrupoTarjetas />
    </ClickProvider>
  );
}
