import express from "express";
import cors from "cors";
import carRoutes from "./routes/cars.js";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use("/api/cars", carRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
