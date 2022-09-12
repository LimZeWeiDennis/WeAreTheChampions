import axios from "axios";
import { uri } from "../config/config.js";
import handleResponse from "./handleResponse.js";

const altScoresUri = `${uri}/api/altScores`;

export const getAllAltScores = async () => {
  try {
    let data = await axios.get(altScoresUri);
    data = handleResponse(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const insertAltScore = async (altScoresObject) => {
  try {
    let data = await axios.post(altScoresUri, altScoresObject);
    data = handleResponse(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};

const getTeamAltScoresUri = `${altScoresUri}/getAltScores`;

export const getTeamAltScores = async (teamNameObject) => {
  try {
    let data = await axios.post(getTeamAltScoresUri, teamNameObject);
    data = handleResponse(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};
