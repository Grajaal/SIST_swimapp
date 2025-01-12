"use client";

import { useStatistics } from "@/context/statistics-context";
import { SwimmerWithUser } from "@/prisma/custom";
import { useEffect } from "react";

import Select, { ActionMeta, MultiValue } from "react-select";
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

interface SwimmerOption {
  value: SwimmerWithUser;
  label: string;
}

export function SwimmersSelect({
  swimmers,
}: {
  swimmers: SwimmerWithUser[];
}) {

  const { selectedSwimmers, setSwimmers } = useStatistics();

  const options: SwimmerOption[] = swimmers.map((swimmer) => ({
    value: swimmer,
    label: swimmer.user.name ?? "Sin nombre",
  }))

  useEffect(() => {
    setSwimmers(swimmers);
  }, [])

  const handleChange = (selected: MultiValue<SwimmerOption>, actionMeta: ActionMeta<SwimmerOption>) => {
    setSwimmers(selected.map((swimmer) => swimmer.value));
  }

  return (
    <Select
      className="max-w-[500px] ml-4 "
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      placeholder="Selecciona a tus nadadores"
      options={options}
      onChange={handleChange}
      defaultValue={options}
    />
  )
}