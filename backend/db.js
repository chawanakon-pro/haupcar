import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",
  database: "haup",
  port: 5432,
});

const createCarsTable = async () => {
  try {
    const client = await pool.connect();

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS cars (
        car_id VARCHAR PRIMARY KEY NOT NULL,
        brand VARCHAR NOT NULL,
        model VARCHAR NOT NULL,
        notes VARCHAR,
        etc VARCHAR
      )
    `;

    await client.query(createTableQuery);
    console.log(" Table 'cars' is ready.");

    client.release();
  } catch (err) {
    console.error(" Error creating 'cars' table:", err);
  }
};

export { pool, createCarsTable };
