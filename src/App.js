import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';
import Registration from './modules/Registration';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Registration/>
        <p>Eh!</p>
        
      </header>
    </div>
  );
}

export default App;
