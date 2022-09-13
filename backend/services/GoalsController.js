import Goals from "../model/Goals.js";
import Team from "../model/Team.js";

// API call to insert Goal
const insertGoal = async (req, res, next) => {
  try {
    const content = req.body;
    const results = [];
    for (let i = 0; i < content.length; i++) {
      const query = { teamName: content[i].teamName };
      const update = { goals: content[i].goals };

      const currGoal = await Goals.findOneAndUpdate(query, update, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      });
      results.push(currGoal);
    }
    res.status(200).json({
      data: results,
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
