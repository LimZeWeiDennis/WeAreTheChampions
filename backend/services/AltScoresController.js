import AltScores from "../model/AlternativeScores.js";
import Team from "../model/Team.js";

// API call to insert Score
const insertAltScore = async (req, res, next) => {
  try {
    const content = req.body;
    const results = [];
    for (let i = 0; i < content.length; i++) {
      console.log(content[i]);
      const query = { teamName: content[i].teamName };
      const update = { scores: content[i].scores };

      const currScore = await AltScores.findOneAndUpdate(query, update, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      });
      results.push(currScore);
    }
    res.status(200).json({
      data: results,
    });
  } catch (e) {
    res.status(400);
    next(e);
  }
};

// API call to get single query one alt scores
const getTeamAltScores = async (req, res, next) => {
  try {
    const currTeam = await Team.findOne({ teamName: req.body.teamName }).exec();
    const currScore = await AltScores.findOne({ teamId: currTeam._id }).exec();
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
export {
  insertAltScore,
  getAllAltScores,
  getTeamAltScores,
  deleteAllAltScores,
};
