import AltScores from "../model/AlternativeScores.js";
import Team from "../model/Team.js";

// API call to insert Score
const insertAltScore = async (req, res, next) => {
  try {
    const currTeam = await Team.findOne({ teamName: req.body.teamName }).exec();

    let currScore = await AltScores.findOne({ teamId: currTeam._id }).exec();

    if (currScore !== null) {
      currScore.scores += req.body.scores;
      await currScore.save();
    } else {
      currScore = await AltScores.create({
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

// API call to get all the scores
const getAllAltScores = async (req, res, next) => {
  try {
    const scores = await AltScores.find();
    res.status(200).json({
      data: scores,
    });
  } catch (e) {
    res.status(400);
    next(e);
  }
};

const deleteAllAltScores = async (req, res, next) => {
  try {
    await AltScores.remove({});
    res.status(200).json({
      data: "Deleted All teams scores!",
    });
  } catch (e) {
    res.status(400);
    next(e);
  }
};
export { insertAltScore, getAllAltScores, deleteAllAltScores };
