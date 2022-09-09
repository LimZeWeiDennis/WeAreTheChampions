import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Registration = () => {
    const [inputText, setInputText] = new useState("");
    const [teamObject, setTeamObject] = new useState({teamName: "", registrationDate: "", groupNumber: ""});

    const onChangeHandler = (event) => {
        setInputText(event.target.value);
    }

    const registerInput = (input) => {
        const inputArray = input.split("\n");  // split the input string by new space, since string is from input textbox, no need to check if it is string

        for(var i = 0; i < inputArray.length; i ++){
            const currString = inputArray[i].split(" ");
            // Check for currString[0]
            // Check for currString[1] DateTime
            // Check for currString[2] group number( shouldnt have more than 2 groups )
            setTeamObject({teamName: currString[0], registrationDate: currString[1], groupNumber: currString[2]});
            console.log(teamObject);
            //some function to store the team object;
        }
    }

    const onSubmitHandler = () => {
        registerInput(inputText);
        // setInputText("");
    }



    return (
        <div>
            <TextField className="Text-Field" id="outlined-multiline-flexible" label="Multiline" multiline maxRows={5} value={inputText} onChange={onChangeHandler} variant="standard" />
            <Button variant="outlined" onClick={onSubmitHandler}> Submit </Button>
        </div>
        
    )
} 

export default Registration;