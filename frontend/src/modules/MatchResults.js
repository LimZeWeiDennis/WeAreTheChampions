import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";

import "./Registration.css";
import { getAllTeams } from "../logic/RegistrationAPI";
import { getAllGoals } from "../logic/GoalsAPI.js";
import { getAllScores } from "../logic/ScoresAPI.js";
import { getAllAltScores } from "../logic/AltScoresAPI.js";

const MatchResults = () => {
  const [teams, setTeams] = useState([]);
  const [goals, setGoals] = useState([]);
  const [scores, setScores] = useState([]);
  const [altScores, setAltScores] = useState([]);

  // useEffect to load all the required inputs
  useEffect(() => {
    const loadAllTeams = async () => {
      const data = await getAllTeams();
      if (data.data.data) {
        setTeams(data.data.data);
      }
    };

    const loadAllGoals = async () => {
      const data = await getAllGoals();
      if (data.data.data) {
        setGoals(data.data.data);
      }
    };

    const loadAllScores = async () => {
      const data = await getAllScores();
      if (data.data.data) {
        setScores(data.data.data);
      }
    };

    const loadAllAltScores = async () => {
      const data = await getAllAltScores();
      if (data.data.data) {
        setAltScores(data.data.data);
      }
    };

    loadAllTeams();
    loadAllGoals();
    loadAllScores();
    loadAllAltScores();
  }, []);

  // on submit handler for submit button
  const onSubmitHandler = async () => {
    // To create delete API calls for teams, goals, scores and altscores
  };

  return (
    <div className="Registration">
      <h1>Match Results!</h1>
      <div className="Instructions">
        {teams.length === 12 ? (
          <p>
            {" "}
            Here are the results of the qualifying round!
            <br />
            <br />
          </p>
        ) : (
          <p>
            {" "}
            Looks like there are some teams that have not registered!
            <br />
            <br />
          </p>
        )}
      </div>

      <div className="Buttons">
        <Button
          className="Submit"
          disabled={teams.length === 12}
          variant="contained"
          onClick={onSubmitHandler}
        >
          {" "}
          Clear Data{" "}
        </Button>
      </div>
    </div>
  );
};

export default MatchResults;
