import express from "express";
import { insertGoal, getAllGoals, deleteAllGoals } from "./GoalsController.js";

const goalsRouter = express.Router();

goalsRouter.route("/").get(getAllGoals).post(insertGoal);

goalsRouter.route("/delete").post(deleteAllGoals);

export default goalsRouter;
