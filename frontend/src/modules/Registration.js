import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { isExists } from "date-fns";

import "./Registration.css";
import { getAllTeams, registerTeam } from "../logic/RegistrationAPI";
import { insertScore } from "../logic/ScoresAPI";

const Registration = () => {
  const [inputText, setInputText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [teamObjects, setTeamObjects] = useState([]);
  const [hasError, setHasError] = useState(false);

  // onChange handler for text field
  const onChangeHandler = (event) => {
    setInputText(event.target.value);
  };

  // useEffect to load localstorage into teamObjects first
  useEffect(() => {
    const loadAllTeams = async () => {
      const data = await getAllTeams();
      if (data.data) {
        setTeamObjects(data.data.data);
      }
    };
    loadAllTeams();
  }, []);

  // method to register teams in the current text input
  const registerInput = async (input) => {
    input = input.trim();
    const inputArray = input.split("\n"); // split the input string by new space, since string is from input textbox, no need to check if it is string
    const teamsArray = [];
    let teamNames = new Set( // Set to storet he current set of teamNames, to check for duplicates
      teamObjects.map((teamObject) => teamObject.teamName)
    );
    let isErrorInput = false;
    // example input
    // teamA 02/12 1
    // teamb 02/12 2
    // teamc 03/12 2
    for (let i = 0; i < inputArray.length; i++) {
      const currString = inputArray[i].split(" "); // split subsequent string by space

      // Check if teamName already exists
      if (teamNames.has(currString[0])) {
        isErrorInput = true;
        setErrorMessage("Current Team has already been registered!");
      }

      // Check for currString[1] DateTime
      let date = 31;
      let month = 2;
      let year = 2022;

      try {
        const dateTime = currString[1].split("/");
        date = parseInt(dateTime[0]);
        month = parseInt(dateTime[1]);
        year = 2022;
      } catch (e) {
        isErrorInput = true;
        setErrorMessage("Please follow the input format!");
      }

      if (!isExists(year, month - 1, date)) {
        isErrorInput = true;
        setErrorMessage("Input a proper date!");
      }

      const registrationDate = new Date(year + "-" + month + "-" + date);

      // Check for currString[2] group number( shouldnt have more than 2 groups )
      const groupNumber = parseInt(currString[2]);

      if (groupNumber <= 0 || groupNumber > 2 || isNaN(groupNumber)) {
        isErrorInput = true;
        setErrorMessage("Input only 1 or 2 for the group number!");
      }

      if (!isErrorInput) {
        const newTeamObject = {
          teamName: currString[0],
          registrationDate: registrationDate,
          groupNumber: groupNumber,
        };

        const newScoreObject = {
          teamName: currString[0],
          scores: 0,
        };
        teamsArray.push(newTeamObject);
        await registerTeam(newTeamObject);
        await insertScore(newScoreObject); // this is to ensure that every team has a score in the end;
      }

      //some function to store the team object;
    }
    setHasError(isErrorInput);
    const newTeamObjects = [...teamObjects, ...teamsArray];
    setTeamObjects(newTeamObjects);
  };

  // submit handler for the submit button
  const onSubmitHandler = () => {
    registerInput(inputText);
    setInputText("");
  };

  return (
    <div className="Registration">
      <h1>Register Teams</h1>
      <div className="Instructions">
        <p>
          {" "}
          Please input the teams in the following format: <br />
          <br />
          Team_Name (space) Registration_Date DD/MM (space) Group_Number <br />
          <br />
          e.g TeamA 06/19 1 <br />
          <br />
          Each input can be separated by a new line(i.e Enter)
        </p>
      </div>

      <TextField
        className="Text-Field"
        id="outlined-multiline-static"
        label="Teams Date Group Number"
        multiline
        minRows={5}
        maxRows={10}
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
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Registration;
