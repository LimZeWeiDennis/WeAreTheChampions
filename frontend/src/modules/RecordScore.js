import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./Registration.css";
import { getAllTeams } from "../logic/RegistrationAPI";
import { insertGoal } from "../logic/GoalsAPI.js";

const RecordScore = () => {
  const [inputText, setInputText] = useState("");
  const [teamNames, setTeamNames] = useState(new Set());
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [currScores, setCurrScores] = useState({});
  const localStorageScores = "scores";

  useEffect(() => {
    const loadAllTeams = async () => {
      const data = await getAllTeams();
      if (data.data.data) {
        setTeamNames(new Set(data.data.data.map((team) => team.teamName)));
      }
    };

    loadAllTeams();
  }, []);

  const onChangeHandler = (event) => {
    setInputText(event.target.value);
  };

  // To input goals into database;
  const inputGoals = (teams, goalList) => {
    for (let i = 0; i < teams.length; i++) {
      const newGoalObject = { teamName: teams[i], goals: goalList[i] };
      insertGoal(newGoalObject);
    }
  };

  const inputScores = (team1, team2, goals1, goals2, scoresObject) => {
    console.log(team1, team2, goals1, goals2);
    if (goals1 > goals2) {
      if (scoresObject[team1] != null) {
        scoresObject[team1] += 3;
      } else {
        scoresObject[team1] = 3;
      }
    } else if (goals2 > goals1) {
      if (scoresObject[team2] != null) {
        scoresObject[team2] += 3;
      } else {
        scoresObject[team2] = 3;
      }
    } else {
      console.log(team1, team2);
      console.log(scoresObject[team1]);
      if (scoresObject[team1] != null) {
        scoresObject[team1] += 1;
      } else {
        scoresObject[team1] = 1;
      }

      if (scoresObject[team2] != null) {
        scoresObject[team2] += 1;
      } else {
        scoresObject[team2] = 1;
      }
    }

    return scoresObject;
  };

  const handleScores = (input) => {
    const scores = input.split("\n");
    let scoresObject = { ...currScores };
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
        inputGoals([firstTeam, secondTeam], [firstTeamGoal, secondTeamGoal]);

        scoresObject = inputScores(
          firstTeam,
          secondTeam,
          firstTeamGoal,
          secondTeamGoal,
          scoresObject
        );
      }
    }
    setHasError(isError);
    const newScores = { ...currScores, ...scoresObject };
    setCurrScores(newScores);
    const newScoresData = JSON.stringify(newScores);
    localStorage.setItem(localStorageScores, newScoresData);
  };

  const onSubmitHandler = () => {
    handleScores(inputText);
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

      {hasError ? <p>{errorMessage}</p> : <div></div>}
    </div>
  );
};

export default RecordScore;
