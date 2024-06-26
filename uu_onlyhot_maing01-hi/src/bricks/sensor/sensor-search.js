import React, { useState, useContext } from "react";
import { SensorContext } from "./sensor-context";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'uu5g05-elements';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

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
          }}
          InputLabelProps={{
            style: { color: '#00FFE5' },
          }}
          inputProps={{
            style: { color: 'white' },
          }}
        />
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
      </Box>
      {sensor ? (
        <Card sx={{
          minWidth: 275,
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: 5, 
          boxShadow: 3,
          margin: '10px 20px',
          color: 'white'
        }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
              Sensor Details
            </Typography>
            <Typography variant="h5" component="div" color='white'>
              {sensor.name || sensor.code}
            </Typography>
            <Typography sx={{ mb: 1.5, fontSize: '60px', textAlign:'center' }} color="#00FFE5">
              {sensor.lastTemperature ? `${sensor.lastTemperature.toFixed(1)}°C` : 'N/A'}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href={`sensor?id=${sensor.id}`}>
              <Button sx={{
                alignItems: 'center',
                margin: 'auto',
                color: '#E50099',
                mx: 1, 
                '&:hover': { color: '#00FFE5' },
                '&:active': { transform: 'scale(1.2)' },
              }}>
                <InfoRoundedIcon /> 
              </Button>
            </Link>
          </CardActions>
        </Card>
      ) : (
        searchTerm && <p style={{color:'white', textAlign:'center'}}>No sensor found.</p>
      )}
    </div>
  );
};

export default SensorSearch;
