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

    const updateCurrGoals = (teams, goals) => {
        const updateValue = {...currGoals};
        for(var i = 0; i < 2; i ++){
            if(updateValue[teams[i]] != null){
                console.log(updateValue[teams[i]]);
                updateValue[teams[i]] += goals[i];
            } else {
                updateValue[teams[i]] = goals[i];
            }
        }
        
        setCurrGoals({
            ...currGoals,
            ...updateValue
        });
    }

    const updateCurrScore = (teams, scores) => {
        const updateValue = {...currScores};
        for(var i = 0; i < teams.length; i ++){
            if(updateValue[teams[i]] != null){
                updateValue[teams[i]] += scores[i];
            } else {
                updateValue[teams[i]] = scores[i];
            }
        }
        
        setCurrScores({
            ...currScores,
            ...updateValue
        });
    }

    const handleScores = async(input) => {
        const scores = input.split("\n");

        for(var i = 0; i < scores.length; i ++){
            const currGame = scores[i].split(" ");
            const firstTeam = currGame[0];
            const secondTeam = currGame[1];
            const firstTeamGoal = parseInt(currGame[2]);
            const secondTeamGoal = parseInt(currGame[3]);

            await updateCurrGoals([firstTeam, secondTeam], [firstTeamGoal, secondTeamGoal]);

            if(firstTeamGoal > secondTeamGoal){
                await updateCurrScore([firstTeam], [3]);
            } else if(secondTeamGoal > firstTeamGoal){
                await updateCurrScore([secondTeam], [3]);
            } else {
                await updateCurrScore([firstTeam, secondTeam], [1 , 1]);
            }
        }
    }

    useEffect(() => {
        console.log("Current Goals");
        console.log(currGoals);
    }, [currGoals]);

    useEffect(() => {
        console.log("Current Scores");
        console.log(currScores);
    }, [currScores]);

    const onSubmitHandler = () => {
        handleScores(inputText);
    }


    return (
        <div className="Registration" >
            <h1>Record the scores!</h1>
            <div className="Instructions">
                
                <p> Please input the scores in the following format: <br/><br/>
                 Team1_Name (space) Team2_Name (space) Team1_Goals (space) Team2_Goals <br/><br/>
                 e.g TeamA TeamB 1 2 <br/><br/>
                 Each input can be separated by a new line(i.e Enter) <br/><br/>
                 Please only enter two teams that are in the same group!
                 </p>
            </div>
 
            <TextField className="Text-Field" 
                       id="outlined-multiline-static" 
                       label="Team1 Team2 Goals1 Goal2" 
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