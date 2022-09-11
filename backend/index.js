import express from "express";
import cors from "cors";
import teamRouter from "./services/TeamRoutes.js";
import goalsRouter from "./services/GoalsRoutes.js";
import scoresRouter from "./services/ScoresRoutes.js";
import init from "./db/db.js";

init();

const app = express();
const port = 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/team", teamRouter);
app.use("/api/goals", goalsRouter);
app.use("/api/scores", scoresRouter);

app.listen(port, () => {
  console.log(`App has started listening at ${port}`);
});
