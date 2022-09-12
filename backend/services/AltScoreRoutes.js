import express from "express";
import {
  insertAltScore,
  getAllAltScores,
  getTeamAltScores,
  deleteAllAltScores,
} from "./AltScoresController.js";

const altScoreRouter = express.Router();

altScoreRouter.route("/").get(getAllAltScores).post(insertAltScore);

altScoreRouter.route("/delete").post(deleteAllAltScores);
altScoreRouter.route("/getAltScores").post(getTeamAltScores);

export default altScoreRouter;
