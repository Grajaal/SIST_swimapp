"use server";

import { db } from "@/lib/db";

interface Column {
  table_name: string;
  column_name: string;
  data_type: string;
}

export async function getDatabaseSchema(): Promise<string> {
  const schema = await db.$queryRawUnsafe<Column[]>(`
    SELECT table_name, column_name, data_type
    FROM information_schema.columns
    WHERE table_schema = 'public'
    ORDER BY table_name, ordinal_position;
  `);

  // Agrupa las columnas por tabla y formatea el resultado como un string
  const schemaString = schema.reduce((acc, row) => {
    const { table_name, column_name, data_type } = row;

    // Si la tabla no está en el acumulador, añádela
    if (!acc[table_name]) {
      acc[table_name] = [];
    }

    // Añade la columna a la tabla correspondiente
    acc[table_name].push(`  - ${column_name} (${data_type})`);
    return acc;
  }, {} as Record<string, string[]>);

  // Convierte el objeto agrupado en un string
  const formattedSchema = Object.entries(schemaString)
    .map(([table, columns]) => `Tabla: '${table}'\n${columns.join('\n')}`)
    .join('\n\n');

  return formattedSchema;
}