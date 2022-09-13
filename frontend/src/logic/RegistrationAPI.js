import axios from "axios";
import { uri } from "../config/config.js";
import handleResponse from "./handleResponse.js";

const teamRegistrationUri = `${uri}/api/team`;

export const getAllTeams = async () => {
  try {
    let data = await axios.get(teamRegistrationUri);
    data = handleResponse(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const registerTeam = async (teamObject) => {
  try {
    let data = await axios.post(teamRegistrationUri, teamObject);
    data = handleResponse(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};

const deleteTeamUri = `${teamRegistrationUri}/delete`;

export const deleteAllTeams = async () => {
  try {
    let data = await axios.post(deleteTeamUri);
    data = handleResponse(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};
