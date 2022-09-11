import React, { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Registration from "./modules/Registration";
import soccerBG from "./assets/soccer.png";
import RecordScore from "./modules/RecordScore";

function App() {
  const [value, setValue] = new useState("2");
  const [hasTwelveTeams, setHasTwelveTeams] = new useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${soccerBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Registration" value="1" />
              <Tab disabled={!hasTwelveTeams} label="Record Score" value="2" />
              <Tab disabled={!hasTwelveTeams} label="Match Results" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Registration />
          </TabPanel>
          <TabPanel value="2">
            <RecordScore />
          </TabPanel>
          <TabPanel value="3">
            <div />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default App;
