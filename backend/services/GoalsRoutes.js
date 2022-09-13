import express from "express";
import {
  insertGoal,
  getAllGoals,
  getTeamGoals,
  deleteAllGoals,
} from "./GoalsController.js";

const goalsRouter = express.Router();

goalsRouter.route("/").get(getAllGoals).post(insertGoal);

goalsRouter.route("/delete").post(deleteAllGoals);

goalsRouter.route("/getGoal").post(getTeamGoals);

export default goalsRouter;
