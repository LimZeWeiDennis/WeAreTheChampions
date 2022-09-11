import mongoose from "mongoose";
import Goals from "./model/Goals.js";
import Team from "./model/Team.js";
import { getAllGoals, insertGoal } from "./services/GoalsController.js";
import { insertTeam, getAllTeams } from "./services/TeamController.js";

const url =
  "mongodb+srv://Cluster74625:fVNSZ1lEbEdW@cluster74625.f2vnm3n.mongodb.net/myFirstDataBase?retryWrites=true&w=majority";

mongoose.connect(url);
