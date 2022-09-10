import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./Registration.css";

const RecordScore = () => {
  const [inputText, setInputText] = useState("");
  const [teamNames, setTeamNames] = useState(new Set());
  const [hasError, setHasError] = useState(false);
  const [currGoals, setCurrGoals] = useState({});
  const [currScores, setCurrScores] = useState({});

  const localStorageGoals = "goals";
  const localStorageScores = "scores";
  const localStorageKey = "team";

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem(localStorageKey));
    if (items) {
      setTeamNames(new Set(items.map((item) => item.teamName)));
    }
  }, []);

  const onChangeHandler = (event) => {
    setInputText(event.target.value);
  };

  const inputGoals = (teams, goals, goalsObject) => {
    for (let i = 0; i < teams.length; i++) {
      if (goalsObject[teams[i]] != null) {
        goalsObject[teams[i]] += goals[i];
      } else {
        goalsObject[teams[i]] = goals[i];
      }
    }

    return goalsObject;
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
    let goalsObject = { ...currGoals };
    let scoresObject = { ...currScores };

    for (let i = 0; i < scores.length; i++) {
      const currGame = scores[i].split(" ");
      const firstTeam = currGame[0];
      const secondTeam = currGame[1];
      const firstTeamGoal = parseInt(currGame[2]);
      const secondTeamGoal = parseInt(currGame[3]);

      goalsObject = inputGoals(
        [firstTeam, secondTeam],
        [firstTeamGoal, secondTeamGoal],
        goalsObject
      );

      scoresObject = inputScores(
        firstTeam,
        secondTeam,
        firstTeamGoal,
        secondTeamGoal,
        scoresObject
      );
    }

    const newGoals = { ...currGoals, ...goalsObject };
    setCurrGoals(newGoals);

    const newScores = { ...currScores, ...scoresObject };
    setCurrScores(newScores);

    const newGoalsData = JSON.stringify(newGoals);
    const newScoresData = JSON.stringify(newScores);

    localStorage.setItem(localStorageGoals, newGoalsData);
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

      {hasError ? <p>problem la</p> : <div></div>}
    </div>
  );
};

export default RecordScore;
