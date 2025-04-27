import pool from "../db.js";

export const getCars = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cars");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
