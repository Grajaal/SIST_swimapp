import { SwimmerData } from "@prisma/client";

export function getSwimmerDataByDate(swimmerData: SwimmerData[], date: Date) {
  const dateEntry = swimmerData.find((entry) => {
    const entryDate = new Date(entry.date);
    return (
      entryDate.getFullYear() === date.getFullYear() &&
      entryDate.getMonth() === date.getMonth() &&
      entryDate.getDate() === date.getDate()
    )
  })

  return dateEntry;
}