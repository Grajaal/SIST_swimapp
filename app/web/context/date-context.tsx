"use client";

import React, { createContext, useContext, useState } from "react";

// Define el tipo para el contexto
interface DateContextType {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

// Crea el contexto con un valor inicial
const DateContext = createContext<DateContextType | undefined>(undefined);

// Crea un proveedor del contexto
export const DateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};

// Hook para usar el contexto más fácilmente
export const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDate debe usarse dentro de un DateProvider");
  }
  return context;
};
