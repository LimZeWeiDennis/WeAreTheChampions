import React from 'react';
import './App.css';
import Registration from './modules/Registration';
import soccerBG from './assets/soccer.png';
import RecordScore from './modules/RecordScore';

function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${soccerBG})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}>
        <Registration/>
        {/* <RecordScore/> */}


    </div>
  );
}

export default App;
