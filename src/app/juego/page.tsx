'use client'

import React from "react";
import { ClickProvider } from "@/miscomponentes/ClickContext";
import GrupoTarjetas from "@/miscomponentes/GrupoTarjetas";

export default function Page() {
  return (
    <ClickProvider>
      <GrupoTarjetas />
    </ClickProvider>
  );
}
