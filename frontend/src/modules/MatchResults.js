import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import PriorityQueue from "../util/PriorityQueue.js";

import "./Registration.css";
import { getAllTeams, deleteAllTeams } from "../logic/RegistrationAPI";
import { getAllGoals, deleteAllTeamGoals } from "../logic/GoalsAPI.js";
import { getAllScores, deleteAllTeamScores } from "../logic/ScoresAPI.js";
import {
  getAllAltScores,
  deleteAllTeamAltScores,
} from "../logic/AltScoresAPI.js";

const MatchResults = () => {
  const [teams, setTeams] = useState([]);
  const [goals, setGoals] = useState([]);
  const [scores, setScores] = useState([]);
  const [altScores, setAltScores] = useState([]);
  const [groupOneQualified, setGroupOneQualified] = useState([]);
  const [groupOneNotQualified, setGroupOneNotQualified] = useState([]);
  const [groupTwoQualified, setGroupTwoQualified] = useState([]);
  const [groupTwoNotQualified, setGroupTwoNotQualified] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect to load all the required inputs
  useEffect(() => {
    const loadAllTeams = async () => {
      const data = await getAllTeams();
      if (data) {
        setTeams(data.data.data);
      }
    };

    const loadAllGoals = async () => {
      const data = await getAllGoals();
      if (data) {
        setGoals(data.data.data);
      }
    };

    const loadAllScores = async () => {
      const data = await getAllScores();
      if (data) {
        setScores(data.data.data);
      }
    };

    const loadAllAltScores = async () => {
      const data = await getAllAltScores();
      if (data) {
        setAltScores(data.data.data);
      }
    };
    loadAllTeams();
    loadAllGoals();
    loadAllScores();
    loadAllAltScores();
  }, []);

  // Creates a temp array of team Objects that contains teamName, registrationDate, groupNumber, goals, scores and altScores.
  const loadFullTeamInfo = () => {
    const tempArray = [];
    let hasError = false;

    for (let i = 0; i < teams.length; i++) {
      let tempTeamObject = {
        teamName: teams[i].teamName,
        registrationDate: teams[i].registrationDate,
        groupNumber: teams[i].groupNumber,
      };

      const altScore = altScores.filter((obj) => {
        return obj.teamId === teams[i]._id;
      });

      const goal = goals.filter((obj) => {
        return obj.teamId === teams[i]._id;
      });

      const score = scores.filter((obj) => {
        return obj.teamId === teams[i]._id;
      });

      try {
        tempTeamObject.altScores = altScore[0].scores;
        tempTeamObject.goals = goal[0].goals;
        tempTeamObject.scores = score[0].scores;
      } catch (e) {
        hasError = true;
        setErrorMessage(
          "Oops! Seems like there are still some matches ongoing!"
        );
      }

      tempArray.push(tempTeamObject);
    }
    setIsError(true);
    if (!hasError) {
      generateRanking(tempArray);
    }
  };

  // Team comparator for constructor of priorityqueue to rank the teams
  const teamComparator = (team1, team2) => {
    if (team1.scores === team2.scores) {
      if (team1.goals === team2.goals) {
        if (team1.altScores === team2.altScores) {
          return team1.registrationDate < team2.registrationDate;
        }
        return team1.altScores > team2.altScores;
      }
      return team1.goals > team2.goals;
    }
    return team1.scores > team2.scores;
  };

  // Function to generate the ranking of the qualifying round
  const generateRanking = (tempArray) => {
    const groupOnePassed = [];
    const groupOneFailed = [];
    const pq1 = new PriorityQueue(teamComparator);
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].groupNumber === 1) {
        pq1.push(tempArray[i]);
      }
    }

    for (let i = 0; i < 4; i++) {
      groupOnePassed.push(pq1.pop());
    }
    while (!pq1.isEmpty()) {
      groupOneFailed.push(pq1.pop());
    }

    const groupTwoPassed = [];
    const groupTwoFailed = [];
    const pq2 = new PriorityQueue(teamComparator);
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].groupNumber === 2) {
        pq2.push(tempArray[i]);
        console.log(tempArray[i]);
      }
    }

    for (let i = 0; i < 4; i++) {
      groupTwoPassed.push(pq2.pop());
    }
    while (!pq2.isEmpty()) {
      groupTwoFailed.push(pq2.pop());
    }

    setGroupOneQualified(groupOnePassed);
    setGroupOneNotQualified(groupOneFailed);
    setGroupTwoQualified(groupTwoPassed);
    setGroupTwoNotQualified(groupTwoFailed);
  };

  // on generate handler to generate the results
  const onGenerateHandler = () => {
    loadFullTeamInfo();
  };

  const reset = async () => {
    await deleteAllTeamAltScores();
    await deleteAllTeamGoals();
    await deleteAllTeamScores();
    await deleteAllTeams();

    setTeams([]);
    setGoals([]);
    setScores([]);
    setAltScores([]);
    setGroupOneQualified([]);
    setGroupOneNotQualified([]);
    setGroupTwoQualified([]);
    setGroupTwoNotQualified([]);
  };

  // on submit handler for submit button
  const onSubmitHandler = async () => {
    reset();
  };

  return (
    <div className="Registration">
      <h1>Match Results!</h1>
      <div className="Instructions">
        {teams.length === 12 ? (
          <div>
            <p>
              {" "}
              Here are the rankings of the qualifying round!
              <br />
              Top 4 teams of each group will move to the next round!
            </p>

            <div className="Results">
              <div className="Ranking">
                <p>Group 1</p>
                {groupOneQualified.map((element) => {
                  return (
                    <p className="Qualified" key={element.teamName}>
                      {element.teamName}
                    </p>
                  );
                })}
                {groupOneNotQualified.map((element) => {
                  return (
                    <p className="NotQualified" key={element.teamName}>
                      {element.teamName}
                    </p>
                  );
                })}
              </div>

              <div className="Ranking">
                <p>Group 2</p>
                {groupTwoQualified.map((element) => {
                  return (
                    <p className="Qualified" key={element.teamName}>
                      {element.teamName}
                    </p>
                  );
                })}
                {groupTwoNotQualified.map((element) => {
                  return (
                    <p className="NotQualified" key={element.teamName}>
                      {element.teamName}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <p>
            {" "}
            Looks like there are some teams that have not registered!
            <br />
            <br />
          </p>
        )}
      </div>
      {isError ? (
        <div>
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div></div>
      )}

      <div className="Buttons">
        <Button
          className="Submit"
          disabled={teams.length !== 12}
          variant="contained"
          onClick={onGenerateHandler}
        >
          {" "}
          Generate Results{" "}
        </Button>
        <Button
          className="Submit"
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
