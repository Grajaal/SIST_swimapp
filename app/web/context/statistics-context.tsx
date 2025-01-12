"use client";

import { SwimmerWithUser } from "@/prisma/custom";
import React, { createContext, useContext, useState } from "react";

// Define el tipo para el contexto
interface StatisticsContextType {
  selectedSwimmers: SwimmerWithUser[] | undefined;
  setSwimmers: (swimmers: SwimmerWithUser[] | undefined) => void;
}

// Crea el contexto con un valor inicial
const StatisticsContext = createContext<StatisticsContextType | undefined>(undefined);

// Crea un proveedor del contexto
export const StatisticsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedSwimmers, setSwimmers] = useState<SwimmerWithUser[] | undefined>([]);

  return (
    <StatisticsContext.Provider value={{ selectedSwimmers, setSwimmers }}>
      {children}
    </StatisticsContext.Provider>
  );
};

// Hook para usar el contexto más fácilmente
export const useStatistics = () => {
  const context = useContext(StatisticsContext);
  if (!context) {
    throw new Error("useDate debe usarse dentro de un StatisticsProvider");
  }
  return context;
};
