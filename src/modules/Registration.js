import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Registration.css';
// import {fs} from 'fs';


const Registration = () => {
    const [inputText, setInputText] = new useState("");
    const [teamObjects, setTeamObjects] = new useState([]);
    const [hasError, setHasError] = new useState(false);
    const localStorageKey = "team";

    const onChangeHandler = (event) => {
        setInputText(event.target.value);
    }

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem(localStorageKey));
        if(items){
            setTeamObjects(items);
        }
    }, [])
    
    const insertTeamObject = (newObject) => {
        // check if the current array contains the team
        for(var i = 0; i < teamObjects.length; i ++){
            if(teamObjects[i].teamName === newObject.teamName){
                return false;
            }
        }
        setTeamObjects(prevState => (
            [...prevState, newObject]
        ))
    }

    const registerInput = async(input) => {
        const inputArray = input.split("\n");  // split the input string by new space, since string is from input textbox, no need to check if it is string

        // example input
        // teamA 02/12 1
        // teamb 02/12 2
        // teamc 03/12 2
        for(var i = 0; i < inputArray.length; i ++){
            const currString = inputArray[i].split(" "); // split subsequent string by space

            // No need to check for teamName, as there should not be any restrictions on the name

            // Check for currString[1] DateTime
            // try{
            //     const dateTime = currString[1].split("/");
            // } catch (e){
            //     setHasError(true);
            // }
            
            // Check for currString[2] group number( shouldnt have more than 2 groups )
            const groupNumber = parseInt(currString[2]);
            if(groupNumber <= 0 || groupNumber > 2 || isNaN(groupNumber)) {
                setHasError(true);
                console.log(groupNumber);
                throw Error("Input only 1 or 2 for the group number!");
            }

            if(!hasError){
                await insertTeamObject({teamName: currString[0], registrationDate: currString[1], groupNumber: currString[2]});
            }

            //some function to store the team object;
        }
    }

    useEffect(() => {
        const teamObjectsUpdatedNotif = async() => {
                console.log(teamObjects);
                const newData = JSON.stringify(teamObjects);
                await localStorage.setItem(localStorageKey, newData);
        }
        teamObjectsUpdatedNotif();
    }, [teamObjects])

    const onSubmitHandler = async () => {
        await registerInput(inputText);

        // if(!hasError){
        //     const newData = JSON.stringify(teamObjects);
        //     console.log(newData);
        //     await localStorage.setItem("knn", newData);

        // }
        setInputText("");
    }

    return (
        <div className="Registration" >
            <h1>Register Teams</h1>
            <div className="Instructions">
                
                <p> Please input the teams in the following format: <br/><br/>
                 Team_Name (space) Registration_Date DD/MM (space) Group_Number <br/><br/>
                 e.g TeamA 06/19 1 <br/><br/>           
                 Each input can be separated by a new line(i.e Enter)
                 </p>
            </div>

            <TextField className="Text-Field" 
                       id="outlined-multiline-static" 
                       label="Teams Date Group Number" 
                       multiline 
                       minRows={5}
                       maxRows={5} 
                       value={inputText} 
                       onChange={onChangeHandler} 
                       variant="outlined" />

            <div className="Buttons">
                <Button className="Submit" variant="contained" onClick={onSubmitHandler}> Submit </Button>
            </div>

            {hasError 
                ?
                    <p>problem la</p>
                
                :
                    <div></div>
            }
        </div>
        
    )
} 

export default Registration;