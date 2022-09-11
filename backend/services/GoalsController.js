import Goals from "../model/Goals.js";
import Team from "../model/Team.js";

const insertGoal = async (team, goal) => {
  const currTeam = await Team.findOne({ teamName: team }).exec();
  const currGoal = await Goals.findOne({ teamId: currTeam._id }).exec();
  console.log(currGoal);

  if (currGoal !== null) {
    currGoal.goals += goal;
    await currGoal.save();
    console.log(currGoal);
  } else {
    const goalTemp = await Goals.create({ teamId: currTeam._id, goals: goal });
    console.log(goalTemp);
  }
};

const getAllGoals = async () => {
  const goals = await Goals.find();
  console.log("Getting all goals");
  console.log(goals);
};

export { insertGoal, getAllGoals };
