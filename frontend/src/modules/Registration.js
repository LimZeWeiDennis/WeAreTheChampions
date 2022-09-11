import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { isExists } from "date-fns";

import "./Registration.css";

const Registration = () => {
  const [inputText, setInputText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [teamObjects, setTeamObjects] = useState([]);
  const [hasError, setHasError] = useState(false);
  const localStorageKey = "team";

  // onChange handler for text field
  const onChangeHandler = (event) => {
    setInputText(event.target.value);
  };

  // useEffect to load localstorage into teamObjects first
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem(localStorageKey));
    if (items) {
      setTeamObjects(items);
    }
  }, []);

  const registerInput = (input) => {
    const inputArray = input.split("\n"); // split the input string by new space, since string is from input textbox, no need to check if it is string
    const teamsArray = [];
    let teamNames = new Set(
      teamObjects.map((teamObject) => teamObject.teamName)
    );
    let isErrorInput = false;
    // example input
    // teamA 02/12 1
    // teamb 02/12 2
    // teamc 03/12 2
    for (let i = 0; i < inputArray.length; i++) {
      const currString = inputArray[i].split(" "); // split subsequent string by space

      // No need to check for teamName, as there should not be any restrictions on the name

      // Check for currString[1] DateTime

      const dateTime = currString[1].split("/");
      const date = parseInt(dateTime[0]);
      const month = parseInt(dateTime[1]);
      const year = 2022;

      console.log(year + "-" + month + "-" + date);

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

      if (!isErrorInput && !teamNames.has(currString[0])) {
        teamsArray.push({
          teamName: currString[0],
          registrationDate: registrationDate,
          groupNumber: groupNumber,
        });
      }

      //some function to store the team object;
    }
    setHasError(isErrorInput);
    const newTeamObjects = [...teamObjects, ...teamsArray];
    setTeamObjects(newTeamObjects);

    const newData = JSON.stringify(newTeamObjects);
    localStorage.setItem(localStorageKey, newData);
  };

  // useEffect(() => {
  //     const teamObjectsUpdatedNotif = async() => {
  //         console.log(teamObjects);
  //         const newData = JSON.stringify(teamObjects);
  //         await localStorage.setItem(localStorageKey, newData);
  //     }
  //     teamObjectsUpdatedNotif();
  // }, [teamObjects])

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

export default Registration;
