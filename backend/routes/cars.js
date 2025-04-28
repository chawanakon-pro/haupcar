import express from "express";
import {
  getCars,
  getCarbyid,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/carController.js";

const router = express.Router();

router.get("/", getCars);
router.get("/:car_id", getCarbyid);
router.post("/", createCar);
router.put("/:car_id", updateCar);
router.delete("/:car_id", deleteCar);
export default router;
