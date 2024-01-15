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
