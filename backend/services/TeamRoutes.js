import express from "express";
import { insertTeam, getAllTeams, deleteAllTeams } from "./TeamController.js";

const teamRouter = express.Router();

teamRouter.route("/").get(getAllTeams).post(insertTeam);

teamRouter.route("/delete").post(deleteAllTeams);

export default teamRouter;
