import express from "express";
import cors from "cors";
import carRoutes from "./routes/cars.js";
import { createCarsTable } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/cars", carRoutes);

const startServer = async () => {
  await createCarsTable();

  app.listen(5001, () => {
    console.log(" Server running on http://localhost:5001");
  });
};

startServer();
