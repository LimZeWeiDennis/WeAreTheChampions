import express from "express";
import {
  insertAltScore,
  getAllAltScores,
  deleteAllAltScores,
} from "./ScoresController.js";

const scoresRouter = express.Router();

scoresRouter.route("/").get(getAllAltScores).post(insertAltScore);

scoresRouter.route("/delete").post(deleteAllAltScores);

export default scoresRouter;
