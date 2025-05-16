"use client";
import { createContext, useContext, useState } from "react";

const ClickContext = createContext();

export function ClickProvider({ children }) {
  const [totalClicks, setTotalClicks] = useState(0);

  const incrementGlobalClicks = () => {
    setTotalClicks((prev) => prev + 1);
  };

  return (
    <ClickContext.Provider value={{ totalClicks, incrementGlobalClicks }}>
      {children}
    </ClickContext.Provider>
  );
}

export function useClickContext() {
  return useContext(ClickContext);
}
