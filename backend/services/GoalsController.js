import Goals from "../model/Goals.js";
import Team from "../model/Team.js";

// API call to insert Goal
const insertGoal = async (req, res, next) => {
  try {
    const currTeam = await Team.findOne({ teamName: req.body.teamName }).exec();
    let currGoal = await Goals.findOne({ teamId: currTeam._id }).exec();

    if (currGoal !== null) {
      currGoal.goals += req.body.goals;
      await currGoal.save();
    } else {
      currGoal = await Goals.create({
        teamId: currTeam._id,
        goals: req.body.goals,
      });
      console.log(currGoal);
    }
    res.status(200).json({
      data: currGoal,
    });
  } catch (e) {
    res.status(400);
    next(e);
  }
};

//API call to get single goals query
const getTeamGoals = async (req, res, next) => {
  try {
    const currTeam = await Team.findOne({ teamName: req.body.teamName }).exec();
    const teamGoals = await Goals.findOne({ teamId: currTeam._id }).exec();
    res.status(200).json({
      data: teamGoals,
    });
  } catch (e) {
    res.status(400);
    next(e);
  }
};

// API call to get all the goals
const getAllGoals = async (req, res, next) => {
  try {
    const goals = await Goals.find();
    res.status(200).json({
      data: goals,
    });
  } catch (e) {
    res.status(400);
    next(e);
  }
};

const deleteAllGoals = async (req, res, next) => {
  try {
    await Goals.remove({});
    res.status(200).json({
      data: "Deleted All teams goals!",
    });
  } catch (e) {
    res.status(400);
    next(e);
  }
};
export { insertGoal, getAllGoals, getTeamGoals, deleteAllGoals };
