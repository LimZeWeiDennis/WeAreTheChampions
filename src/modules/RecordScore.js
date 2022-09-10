import React, { useState, useEffect } from 'react';
import './Registration.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const RecordScore = () => {

    const [inputText, setInputText] = new useState("");
    const [hasError, setHasError] = new useState(false);
    const [currGoals, setCurrGoals] = new useState({});
    const [currScores, setCurrScores] = new useState({});

    const onChangeHandler = (event) => {
        setInputText(event.target.value);
    }

    const updateCurrGoals = (team, score) => {
        const updateValue = {...currGoals};
        updateValue[team] += score;
        setCurrGoals({
            ...currGoals,
            ...updateValue
        });
    }

    const updateCurrScore = (team, score) => {
        const updateValue = {...currScores};
        updateValue[team] += score;
        setCurrScores({
            ...currScores,
            ...updateValue
        });
    }

    const handleScores = (input) => {
        const scores = input.split("\n");

        for(var i = 0; i < scores.length; i ++){
            const currGame = scores[i].split(" ");
            const firstTeam = currGame[0];
            const secondTeam = currGame[1];
            const firstTeamGoal = parseInt(currGame[2]);
            const secondTeamGoal = parseInt(currGame[3]);

            updateCurrGoals(firstTeam, firstTeamGoal);
            updateCurrGoals(secondTeam, secondTeamGoal);

            if(firstTeamGoal > secondTeamGoal){
                updateCurrScore(firstTeam, 3);
            } else if(secondTeamGoal > firstTeamGoal){
                updateCurrScore(secondTeam, 3);
            } else {
                updateCurrScore(firstTeam, 1);
                updateCurrScore(secondTeam, 1);
            }

        }
    }

    const onSubmitHandler = () => {
        handleScores(inputText);
        console.log(currGoals);
        console.log(currScores);
    }



    return (
        <div className="Registration" >
            <h1>Record the scores!</h1>
            <div className="Instructions">
                
                <p> Please input the scores in the following format: <br/><br/>
                 First_Team_Name (space) Second_Team_Name (space) First_Team_Goals (space) Second_Team_Goals <br/><br/>
                 e.g TeamA TeamB 1 2 <br/><br/>
                 Each input can be separated by a new line(i.e Enter) <br/><br/>
                 Please only enter two teams that are in the same group!
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
                    <div>
                        
                    </div>
            }
        </div>

    )

}

export default RecordScore;