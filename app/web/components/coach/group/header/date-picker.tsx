"use client";

import { useState } from "react";
import clsx from "clsx";

import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  addDays,
  format,
  isToday,
  isYesterday,
  isBefore,
  startOfToday,
} from "date-fns";
import { es } from "date-fns/locale";
import { useDate } from "@/context/date-context";

export function DatePicker() {
  const { date, setDate } = useDate();

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Selecciona una fecha";
    if (isToday(date)) return "Hoy";
    if (isYesterday(date)) return "Ayer";
    return format(date, "d 'de' MMMM, yyyy", { locale: es });
  };

  const handlePreviousDay = () => {
    if (date) {
      setDate(addDays(date, -1));
    }
  };

  const handleNextDay = () => {
    if (date && !isToday(date)) {
      setDate(addDays(date, 1));
    }
  };

  return (
    <div className="flex space-x-2 items-center">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePreviousDay}
        disabled={!date}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Día anterior</span>
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={clsx("w-[240px]", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="h-4 w-4" />
            {formatDate(date)}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => isBefore(startOfToday(), date)}
            className="rounded-md border"
            initialFocus
          />
        </PopoverContent>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextDay}
          disabled={!date || isToday(date)}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Día siguiente</span>
        </Button>
      </Popover>
    </div>
  );
}
