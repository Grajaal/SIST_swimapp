import { getDatabaseSchema } from "@/actions/get-db-schema";
import { getTeamByCoachId } from "@/data/team";
import { currentUser } from "./auth";

export async function createQuery(prompt: string) {
  const schema = await getDatabaseSchema();

  const filledTemplate = template
    .replace("{ database_schema }", schema)
    .replace("{ user_message }", prompt);

  return filledTemplate;
}

const template: string = `
  ### Instrucciones:
  Utilizando el esquema de la base de datos proporcionado, genera una consulta PostgreSQL válida basada en la intención del usuario. Asegúrate de que la consulta sea precisa y tenga en cuenta las restricciones del esquema.

  ### Esquema de la base de datos:
  { database_schema }

  ### Ejemplo de esquema:
  Si tu esquema es grande, incluye una descripción resumida o los puntos clave, como:
  - Tablas y columnas(con tipos de datos)
    - Relaciones(si hay claves externas)
    - Índices relevantes

  ### Ejemplo:
  Dada una base de datos con las siguientes tablas y columnas:
  1. Tabla: 'users'
    - 'id'(INTEGER, PRIMARY KEY)
    - 'name'(VARCHAR)
    - 'email'(VARCHAR)
    - 'created_at'(TIMESTAMP)

  2. Tabla: 'orders'
    - 'id'(INTEGER, PRIMARY KEY)
    - 'user_id'(INTEGER, FOREIGN KEY -> users.id)
    - 'product'(VARCHAR)
    - 'price'(DECIMAL)
    - 'created_at'(TIMESTAMP)

  3. Relaciones:
  - 'users.id' está relacionado con'orders.user_id'.

  ### Mensaje del usuario:
  { user_message }

  ### Reglas adicionales: 
  1. SOLO GENERA LA CONSULTA, NADA MÁS. 
  2. Los nombres tanto de los entrenadores como de los nadadores se encuentran en la tabla 'users'. 
  3. Los roles son 'swimmer' y 'coach', en minúsculas. 
  4. Quiero la consulta SQL pura, sin etiquetas de formato ni comentarios.
  5. Los entrenamientos se refieren a las columnas 'meters' y 'minutes' en la tabla 'swimmers_data'.
  8. La tabla 'swimmers_data' no tiene nada que ver con la tabla 'groups' o 'coaches'. 
  10. Si el entrenador pide recomendaciones, toma simplemente los datos de los nadadores.
  11. La columna 'id' de la tabla 'users' no tiene nada que ver con la columna 'teamId' de 'swimmers'.
  13. Siempre que el usuario te pregunte por nadadores, hace un JOIN con la tabla 'swimmers'.
  14. El team_id siempre se encuentra en swimmer y no en users.
  15. Utiliza PostgreSQL para escribir la consulta. No utilices la función DATE.
  16. Los metros y los minutos se encuentran en la tabla 'swimmers_data'.
  17. En los AVG quiero que utilices AS para darle un alias a la columna.

  -- NOTA IMPORTANTE:
  -- Cuando hagas una unión entre "users" y "swimmers", usa la columna 'u.id = s.id'.
  -- NO utilices 'u.id = s.swimmer_id'.

  ### Consulta SQL generada:
`;
