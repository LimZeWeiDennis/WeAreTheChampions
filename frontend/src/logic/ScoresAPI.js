import axios from "axios";
import { uri } from "../config/config.js";
import handleResponse from "./handleResponse.js";

const scoresUri = `${uri}/api/scores`;

export const getAllScores = async () => {
  try {
    let data = await axios.get(scoresUri);
    data = handleResponse(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const insertScore = async (scoresObject) => {
  try {
    let data = await axios.post(scoresUri, scoresObject);
    data = handleResponse(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};

const getTeamScoresUri = `${scoresUri}/getScore`;

export const getTeamScores = async (teamNameObject) => {
  try {
    let data = await axios.post(getTeamScoresUri, teamNameObject);
    data = handleResponse(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};

const deleteTeamScoresUri = `${scoresUri}/delete`;

export const deleteAllTeamScores = async () => {
  try {
    let data = await axios.post(deleteTeamScoresUri);
    data = handleResponse(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};
