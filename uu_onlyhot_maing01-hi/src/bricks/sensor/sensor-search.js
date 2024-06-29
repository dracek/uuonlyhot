import React, { useState, useContext } from "react";
import { SensorContext } from "./sensor-context";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SensorCard from "./sensor-card";
import Tooltip from '@mui/material/Tooltip';


const SensorSearch = () => {
  const { findSensorByNameOrId } = useContext(SensorContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sensor, setSensor] = useState(null);

  const handleSearch = () => {
    const foundSensor = findSensorByNameOrId(searchTerm);
    setSensor(foundSensor);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 4,
        }}
      >
         <TextField
          id="outlined-basic"
          label="Search for a sensor by name or ID"
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a sensor by name or ID"
          value={searchTerm}
          size="small"
          autoComplete="off"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#00FFE5",
              },
              "&:hover fieldset": {
                borderColor: "#00FFE5",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00FFE5",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#00FFE5",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#00FFE5",
            },
            "& .MuiInputBase-input": {
              color: "white",
            }
          }}
          InputLabelProps={{
            style: { color: '#00FFE5' },
          }}
          inputProps={{
            style: { color: 'white' },
          }}
        />
        <Tooltip title="SEARCH" placement="top">
        <Button
          onClick={handleSearch}
          sx={{
            alignItems: "center",
            color: "#E50099",
            '&:hover': { color: "#00FFE5" },
            '&:active': { transform: "scale(1.2)" },
          }}
        >
          <SearchRoundedIcon fontSize="large"/>
        </Button>
        </Tooltip>
      </Box>
      {sensor ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <SensorCard sensor={sensor} />
        </Box>
      ) : (
        searchTerm && <p style={{color:'white', textAlign:'center'}}>No sensor found.</p>
      )}
    </div>
  );
};

export default SensorSearch;
