import axios from "axios";
import { uri } from "../config/config.js";
import handleResponse from "./handleResponse.js";

const goalsUri = `${uri}/api/goals`;

export const getAllGoals = async () => {
  try {
    let data = await axios.get(goalsUri);
    data = handleResponse(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const insertGoal = async (goalObject) => {
  try {
    let data = await axios.post(goalsUri, goalObject);
    data = handleResponse(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};

const getTeamGoalsUri = `${goalsUri}/getGoal`;

export const getTeamGoals = async (teamNameObject) => {
  try {
    let data = await axios.post(getTeamGoalsUri, teamNameObject);
    data = handleResponse(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};
