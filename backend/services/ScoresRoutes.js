import express from "express";
import {
  insertScore,
  getAllScores,
  deleteAllScores,
} from "./ScoresController.js";

const scoresRouter = express.Router();

scoresRouter.route("/").get(getAllScores).post(insertScore);

scoresRouter.route("/delete").post(deleteAllScores);

export default scoresRouter;
