import Scores from "../model/Scores.js";
import Team from "../model/Team.js";

// API call to insert Score
const insertScore = async (req, res, next) => {
  try {
    const currTeam = await Team.findOne({ teamName: req.body.teamName }).exec();

    let currScore = await Scores.findOne({ teamId: currTeam._id }).exec();

    if (currScore !== null) {
      currScore.scores += req.body.scores;
      await currScore.save();
    } else {
      currScore = await Scores.create({
        teamId: currTeam._id,
        scores: req.body.scores,
      });
      console.log(currScore);
    }
    res.status(200).json({
      data: currScore,
    });
  } catch (e) {
    res.status(400);
    next(e);
  }
};

// API to get one team's score
const getTeamScore = async (req, res, next) => {
  try {
    const team = await Team.findOne({ teamName: req.body.teamName }).exec();
    const teamScores = await Scores.findOne({ teamId: currTeam._id }).exec();
    res.status(200).json({
      data: teamScores,
    });
  } catch (e) {
    res.status(400);
    next(e);
  }
};

// API call to get all the scores
const getAllScores = async (req, res, next) => {
  try {
    const scores = await Scores.find();
    res.status(200).json({
      data: scores,
    });
  } catch (e) {
    res.status(400);
    next(e);
  }
};

const deleteAllScores = async (req, res, next) => {
  try {
    await Scores.remove({});
    res.status(200).json({
      data: "Deleted All teams scores!",
    });
  } catch (e) {
    res.status(400);
    next(e);
  }
};
export { insertScore, getAllScores, getTeamScore, deleteAllScores };
