import Team from "../model/Team.js";

const insertTeam = async (teamObject) => {
  const team = await Team.create(teamObject);
  console.log(team);
};

const getAllTeams = async () => {
  const teams = await Team.find();
  console.log(teams);
};

export { insertTeam, getAllTeams };
