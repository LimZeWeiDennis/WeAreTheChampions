import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";

import "./Registration.css";
import { getAllTeams } from "../logic/RegistrationAPI";
import { getAllGoals, getTeamGoals } from "../logic/GoalsAPI.js";
import { getAllScores, getTeamScores } from "../logic/ScoresAPI.js";
import { getAllAltScores, getTeamAltScores } from "../logic/AltScoresAPI.js";

const MatchResults = () => {
  const [teams, setTeams] = useState([]);
  const [goals, setGoals] = useState([]);
  const [scores, setScores] = useState([]);
  const [altScores, setAltScores] = useState([]);
  const [fullTeamInfo, setFullTeamInfo] = useState([]);
  const [loadedTeams, setLoadedTeams] = useState(false);

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
        setLoadedTeams(true);
      }
    };
    loadAllTeams();
    loadAllGoals();
    loadAllScores();
    loadAllAltScores();
  }, []);

  useEffect(() => {
    const loadFullTeamInfo = async () => {
      const tempArray = [];
      for (let i = 0; i < teams.length; i++) {
        let tempTeamObject = {
          teamName: teams[i].teamName,
          registrationDate: teams[i].registrationDate,
          groupNumber: teams[i].groupNumber,
        };

        const altScore = altScores.find(
          (element) => (element.teamName = teams[i].teamName)
        );
        const goal = goals.find(
          (element) => (element.teamName = teams[i].teamName)
        );
        const score = scores.find(
          (element) => (element.teamName = teams[i].teamName)
        );

        tempTeamObject.altScores = altScore.scores;
        tempTeamObject.goals = goal.goals;
        tempTeamObject.scores = score.scores;

        tempArray.push(tempTeamObject);
      }
      setFullTeamInfo(tempArray);
    };

    loadFullTeamInfo();
  }, [loadedTeams]);

  const loadTeamAltScore = async () => {
    console.log(fullTeamInfo);
  };

  // on submit handler for submit button
  const onSubmitHandler = async () => {
    loadTeamAltScore();
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
          disabled={teams.length !== 12}
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
