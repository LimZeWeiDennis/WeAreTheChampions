import express from "express";
import {
  insertScore,
  getAllScores,
  getTeamScore,
  deleteAllScores,
} from "./ScoresController.js";

const scoresRouter = express.Router();

scoresRouter.route("/").get(getAllScores).post(insertScore);

scoresRouter.route("/delete").post(deleteAllScores);

scoresRouter.route("/getScore").post(getTeamScore);

export default scoresRouter;
