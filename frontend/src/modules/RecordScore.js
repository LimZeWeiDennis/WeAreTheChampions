import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

import "./Registration.css";
import { getAllTeams } from "../logic/RegistrationAPI";
import { getAllGoals, insertGoal } from "../logic/GoalsAPI.js";
import { getAllScores, insertScore } from "../logic/ScoresAPI.js";
import { getAllAltScores, insertAltScore } from "../logic/AltScoresAPI.js";

const RecordScore = () => {
  const [inputText, setInputText] = useState("");
  const [teamNames, setTeamNames] = useState(new Set());
  const [allGoals, setAllGoals] = useState([]);
  const [allScores, setAllScores] = useState([]);
  const [allAltScores, setAllAltScores] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadAllTeams = async () => {
      const data = await getAllTeams();
      if (data) {
        setTeamNames(new Set(data.data.data.map((team) => team.teamName)));
      }
      const goalData = await getAllGoals();
      if (goalData) {
        setAllGoals(goalData.data.data);
      }
      const scoresData = await getAllScores();
      if (scoresData) {
        setAllScores(scoresData.data.data);
      }
      const altScoresData = await getAllAltScores();
      if (altScoresData) {
        setAllAltScores(altScoresData.data.data);
      }
    };

    loadAllTeams();
  }, []);

  // on change handler for text field
  const onChangeHandler = (event) => {
    setInputText(event.target.value);
  };

  // To input goals into goalsArray;
  const inputGoals = (teams, goalList, gArray) => {
    for (let i = 0; i < teams.length; i++) {
      const currIdx = gArray.findIndex((team) => {
        return team.teamName === teams[i];
      });
      if (currIdx === -1) {
        const newGoalObject = { teamName: teams[i], goals: goalList[i] };
        gArray.push(newGoalObject);
      } else {
        gArray[currIdx].goals += goalList[i];
      }
    }

    return gArray;
  };

  // to handle logic and input scores into scoresArray
  const inputScores = (team1, team2, goals1, goals2, scoresArray) => {
    let team1Scores = 0;
    let team2Scores = 0;
    if (goals1 > goals2) {
      team1Scores += 3;
    } else if (goals2 > goals1) {
      team2Scores += 3;
    } else {
      team1Scores += 1;
      team2Scores += 1;
    }

    let currIdx = scoresArray.findIndex((team) => {
      return team.teamName === team1;
    });
    if (currIdx === -1) {
      const newScoresObject = { teamName: team1, scores: team1Scores };
      scoresArray.push(newScoresObject);
    } else {
      scoresArray[currIdx].scores += team1Scores;
    }

    currIdx = scoresArray.findIndex((team) => {
      return team.teamName === team2;
    });
    if (currIdx === -1) {
      const newScoresObject = { teamName: team2, scores: team2Scores };
      scoresArray.push(newScoresObject);
    } else {
      scoresArray[currIdx].scores += team2Scores;
    }

    return scoresArray;
  };

  // to handle logic and input altScores into altScoresArray
  const inputAltScores = (team1, team2, goals1, goals2, altScoresArray) => {
    let team1Scores = 0;
    let team2Scores = 0;
    if (goals1 > goals2) {
      team1Scores += 5;
      team2Scores += 1;
    } else if (goals2 > goals1) {
      team2Scores += 5;
      team1Scores += 1;
    } else {
      team1Scores += 3;
      team2Scores += 3;
    }

    let currIdx = altScoresArray.findIndex((team) => {
      return team.teamName === team1;
    });
    if (currIdx === -1) {
      const newScoresObject = { teamName: team1, scores: team1Scores };
      altScoresArray.push(newScoresObject);
    } else {
      altScoresArray[currIdx].scores += team1Scores;
    }

    currIdx = altScoresArray.findIndex((team) => {
      return team.teamName === team2;
    });
    if (currIdx === -1) {
      const newScoresObject = { teamName: team2, scores: team2Scores };
      altScoresArray.push(newScoresObject);
    } else {
      altScoresArray[currIdx].scores += team2Scores;
    }

    return altScoresArray;
  };

  // function to handle the input of goals, scores and alt scores into the database
  const handleScores = async (input) => {
    input = input.trim();
    setIsLoading(true);
    const scores = input.split("\n");

    let goalsArray = allGoals;
    let scoresArray = allScores;
    let altScoresArray = allAltScores;

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
        console.log(firstTeam + "," + secondTeam + "," + firstTeamGoal);
        goalsArray = inputGoals(
          [firstTeam, secondTeam],
          [firstTeamGoal, secondTeamGoal],
          goalsArray
        );
        scoresArray = inputScores(
          firstTeam,
          secondTeam,
          firstTeamGoal,
          secondTeamGoal,
          scoresArray
        );
        altScoresArray = inputAltScores(
          firstTeam,
          secondTeam,
          firstTeamGoal,
          secondTeamGoal,
          altScoresArray
        );
      }
    }

    if (!isError) {
      await insertGoal(goalsArray);
      await insertScore(scoresArray);
      await insertAltScore(altScoresArray);
    }
    setHasError(isError);
    setIsLoading(false);
  };

  // on submit handler for submit button
  const onSubmitHandler = () => {
    handleScores(inputText);
    setInputText("");
  };

  const LoadingUI = () => {
    return (
      <div className="Registration">
        <h1>Record the scores!</h1>
        <div className="Instructions">
          <p>Recording Scores ...</p>
        </div>
        <CircularProgress />
      </div>
    );
  };

  if (isLoading) {
    return <LoadingUI />;
  }

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
          disabled={isLoading}
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
