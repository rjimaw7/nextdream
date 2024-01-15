import { sql } from "@vercel/postgres";
import { Dreams } from "./definitions";

export const fetchDreams = async () => {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = await sql<Dreams>`SELECT * FROM dreams LIMIT 10`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch dreams.");
  }
};

export async function fetchDreamsById(id: string) {
  try {
    const data = await sql<Dreams>`
      SELECT
        dreams.id,
        dreams.title,
        dreams.date,
        dreams.dream
      FROM dreams
      WHERE dreams.id = ${id};
    `;

    const dreams = data.rows.map((dreams) => ({
      ...dreams,
    }));

    return dreams[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch dreams.");
  }
}
