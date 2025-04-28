import pool from "../db.js";

export const getCars = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cars");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCar = async (req, res) => {
  const { car_id, brand, model, notes, etc } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO cars (car_id, brand, model, notes, etc) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [car_id, brand, model, notes, etc]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCar = async (req, res) => {
  const { car_id } = req.params;
  const { brand, model, notes, etc } = req.body;
  try {
    const result = await pool.query(
      "UPDATE cars SET brand=$2, model=$3, notes=$4, etc=$5 WHERE car_id=$1 RETURNING *",
      [car_id, brand, model, notes, etc]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCar = async (req, res) => {
  const { car_id } = req.params;
  try {
    await pool.query("DELETE FROM cars WHERE car_id=$1", [car_id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
