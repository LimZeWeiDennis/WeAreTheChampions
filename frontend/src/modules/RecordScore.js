import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./Registration.css";
import { getAllTeams } from "../logic/RegistrationAPI";
import { insertGoal } from "../logic/GoalsAPI.js";
import { insertScore } from "../logic/ScoresAPI.js";
import { insertAltScore } from "../logic/AltScoresAPI.js";

const RecordScore = () => {
  const [inputText, setInputText] = useState("");
  const [teamNames, setTeamNames] = useState(new Set());
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadAllTeams = async () => {
      const data = await getAllTeams();
      if (data.data.data) {
        setTeamNames(new Set(data.data.data.map((team) => team.teamName)));
      }
    };

    loadAllTeams();
  }, []);

  // on change handler for text field
  const onChangeHandler = (event) => {
    setInputText(event.target.value);
  };

  // To input goals into database;
  const inputGoals = async (teams, goalList) => {
    for (let i = 0; i < teams.length; i++) {
      const newGoalObject = { teamName: teams[i], goals: goalList[i] };
      await insertGoal(newGoalObject);
    }
  };

  // to handle logic and input scores and altScores into database
  const inputScores = async (team1, team2, goals1, goals2) => {
    if (goals1 > goals2) {
      const newScoreObject = { teamName: team1, scores: 3 };
      const newAltScoreObject = { teamName: team1, scores: 5 };
      const newAltScoreObject2 = { teamName: team2, scores: 1 };

      await insertScore(newScoreObject);
      await insertAltScore(newAltScoreObject);
      await insertAltScore(newAltScoreObject2);
    } else if (goals2 > goals1) {
      const newScoreObject = { teamName: team2, scores: 3 };
      const newAltScoreObject = { teamName: team2, scores: 5 };
      const newAltScoreObject2 = { teamName: team1, scores: 1 };

      await insertScore(newScoreObject);
      await insertAltScore(newAltScoreObject);
      await insertAltScore(newAltScoreObject2);
    } else {
      const newScoreObject = { teamName: team1, scores: 1 };
      const newScoreObject2 = { teamName: team2, scores: 1 };

      const newAltScoreObject = { teamName: team1, scores: 3 };
      const newAltScoreObject2 = { teamName: team2, scores: 3 };

      await insertScore(newScoreObject);
      await insertScore(newScoreObject2);
      await insertAltScore(newAltScoreObject);
      await insertAltScore(newAltScoreObject2);
    }
  };

  // function to handle the input of goals, scores and alt scores into the database
  const handleScores = async (input) => {
    const scores = input.split("\n");
    let isError = false;

    for (let i = 0; i < scores.length; i++) {
      const currGame = scores[i].split(" ");
      const firstTeam = currGame[0];
      const secondTeam = currGame[1];
      const firstTeamGoal = parseInt(currGame[2]);
      const secondTeamGoal = parseInt(currGame[3]);

      if (!teamNames.has(firstTeam) || !teamNames.has(secondTeam)) {
        isError = true;
        setErrorMessage("Input only registered teams!!");
      }

      if (!isError) {
        await inputGoals(
          [firstTeam, secondTeam],
          [firstTeamGoal, secondTeamGoal]
        );
        await inputScores(firstTeam, secondTeam, firstTeamGoal, secondTeamGoal);
      }
    }
    setHasError(isError);
  };

  // on submit handler for submit button
  const onSubmitHandler = () => {
    handleScores(inputText);
    setInputText("");
  };

  return (
    <div className="Registration">
      <h1>Record the scores!</h1>
      <div className="Instructions">
        <p>
          {" "}
          Please input the scores in the following format: <br />
          <br />
          Team1_Name (space) Team2_Name (space) Team1_Goals (space) Team2_Goals{" "}
          <br />
          <br />
          e.g TeamA TeamB 1 2 <br />
          <br />
          Each input can be separated by a new line(i.e Enter) <br />
          <br />
          Please only enter two teams that are in the same group!
        </p>
      </div>

      <TextField
        className="Text-Field"
        id="outlined-multiline-static"
        label="Team1 Team2 Goals1 Goal2"
        multiline
        minRows={5}
        maxRows={5}
        value={inputText}
        onChange={onChangeHandler}
        variant="outlined"
      />

      {hasError ? (
        <div className="Error-Message">{errorMessage}</div>
      ) : (
        <div></div>
      )}

      <div className="Buttons">
        <Button
          className="Submit"
          variant="contained"
          onClick={onSubmitHandler}
        >
          {" "}
          Submit{" "}
        </Button>
      </div>
    </div>
  );
};

export default RecordScore;
