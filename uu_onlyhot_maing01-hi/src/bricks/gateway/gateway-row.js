import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SensorCard from '../sensor/sensor-card.js';
import Button from '@mui/material/Button';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import Config from '../config/config.js';


const Css = {
  row: () =>
    Config.Css.css({
      paddingLeft: '25px',
      marginBottom: '50px',
      paddingBottom: '20px',
      marginTop: '50px',
    }),
  id: () =>
    Config.Css.css({
      paddingLeft: '25px',
      color: '#00FFE5'
    }),
};

const GatewayRow = ({ gateway, sensors, onEdit, onPswd, onDelete }) => {
  return (
    <Box className={Css.row()}>
      <Typography variant="h5" component="h2" sx={{ margin: '10px', color: 'white' }}>
        {gateway.name}
        <Button
          onClick={() => onEdit(gateway)}
          sx={{
            alignItems: 'center',
            margin: 'auto',
            color: '#E50099',
            mx: 1, 
            '&:hover': { color: '#00FFE5' },
            '&:active': { transform: 'scale(1.2)' },
          }}
        >
          <EditNoteRoundedIcon fontSize="large" />
        </Button>

        <Button
          onClick={() => onPswd(gateway)}
          sx={{
            alignItems: 'center',
            margin: 'auto',
            color: '#E50099',
            mx: 1, 
            '&:hover': { color: '#00FFE5' },
            '&:active': { transform: 'scale(1.2)' },
          }}
        >
          <PasswordRoundedIcon fontSize="large" />
        </Button>

        <Button
          onClick={() => onDelete(gateway)}
          sx={{
            alignItems: 'center',
            margin: 'auto',
            color: '#E50099',
            mx: 1, 
            '&:hover': { color: '#00FFE5' },
            '&:active': { transform: 'scale(1.2)' },
          }}
        >
          <HighlightOffRoundedIcon fontSize="large" />
        </Button>
      </Typography>
      <div className={Css.id()}>ID: {gateway.id}</div>
      <Grid container spacing={4}>
        {sensors.map((sensor) => (
          <Grid item sm={12} md={6} key={sensor.id}>
            <SensorCard sensor={sensor} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GatewayRow;
