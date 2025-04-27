import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",
  database: "haup",
  port: 5432,
});

export default pool;
