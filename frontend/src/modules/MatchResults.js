import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import PriorityQueue from "../util/PriorityQueue.js";

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
  const [groupOneRanking, setGroupOneRanking] = useState([]);
  const [groupTwoRanking, setGroupTwoRanking] = useState([]);

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

  const loadFullTeamInfo = () => {
    const tempArray = [];
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

      tempTeamObject.altScores = altScore[0].scores;
      tempTeamObject.goals = goal[0].goals;
      tempTeamObject.scores = score[0].scores; // TODO: insert into registration scores of 0;

      tempArray.push(tempTeamObject);
    }
    setFullTeamInfo(tempArray);
    generateRanking(tempArray);
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
    const groupOne = [];
    const pq1 = new PriorityQueue(teamComparator);
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].groupNumber === 1) {
        pq1.push(tempArray[i]);
      }
    }

    while (!pq1.isEmpty()) {
      groupOne.push(pq1.pop());
    }

    const groupTwo = [];
    const pq2 = new PriorityQueue(teamComparator);
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].groupNumber === 2) {
        pq2.push(tempArray[i]);
      }
    }

    while (!pq2.isEmpty()) {
      groupTwo.push(pq2.pop());
    }

    setGroupOneRanking(groupOne);
    setGroupTwoRanking(groupTwo);
  };

  // on generate handler to generate the results
  const onGenerateHandler = async () => {
    loadFullTeamInfo();
  };

  // on submit handler for submit button
  const onSubmitHandler = async () => {
    // To create delete API calls for teams, goals, scores and altscores
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
                {groupOneRanking.map((element) => {
                  return <p key={element.teamName}>{element.teamName}</p>;
                })}
              </div>

              <div className="Ranking">
                <p>Group 2</p>
                {groupTwoRanking.map((element) => {
                  return <p key={element.teamName}>{element.teamName}</p>;
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
