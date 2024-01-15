const { db } = require("@vercel/postgres");
const { dreams } = require("../lib/placeholder-data");

async function seedDreams(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "DREAMS" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS dreams (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          date DATE NOT NULL,
          dream VARCHAR(255) NOT NULL
        );
      `;

    // Insert data into the "dreams" table
    const insertedDreams = await Promise.all(
      dreams.map(
        (dream) => client.sql`
          INSERT INTO dreams (title, date, dream)
          VALUES (${dream.title}, ${dream.date}, ${dream.dream})
          ON CONFLICT (id) DO NOTHING;
        `
      )
    );

    return {
      createTable,
      dreams: insertedDreams,
    };
  } catch (error) {
    console.error("Error seeding dreams:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedDreams(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
