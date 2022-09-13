import Team from "../model/Team.js";

// API call to register teams
const insertTeam = async (req, res, next) => {
  try {
    const team = await Team.create(req.body);
    res.status(200).json({
      data: team,
    });
  } catch (e) {
    res.status(400);
    next(e);
  }
};

// API call to get all the teams
const getAllTeams = async (req, res, next) => {
  try {
    const teams = await Team.find();
    res.status(200).json({
      data: teams,
    });
  } catch (e) {
    res.status(400);
    next(e);
  }
};

// API call to reset the Team Schema
const deleteAllTeams = async (req, res, next) => {
  try {
    await Team.remove({});
    res.status(200).json({
      data: "Deleted All teams registration!",
    });
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export { insertTeam, getAllTeams, deleteAllTeams };
