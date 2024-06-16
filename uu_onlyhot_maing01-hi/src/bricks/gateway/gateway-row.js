import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SensorCard from '../sensor/sensor-card.js'
import Button from '@mui/material/Button';

import Config from '../config/config.js';

const Css = {
  row: () =>
    Config.Css.css({
      paddingLeft: '25px',
      marginBottom: '50px',
      paddingBottom: '20px',
    }),
  id: () =>
    Config.Css.css({
      paddingLeft: '25px',
    })  
};

const GatewayRow = ({ gateway, sensors, onEdit, onDelete }) => {
  return (
    <Box className={Css.row()}>
      <Typography variant="h5" component="h2" sx={{margin:'7px', color: '#0D3133'}}>
        {gateway.name} 
        <Button onClick={() => onEdit(gateway)} color="secondary" sx={{alignItems:'center', margin:'auto'}}>Edit</Button>
        <Button onClick={() => onDelete(gateway)} color="secondary" sx={{alignItems:'center', margin:'auto'}}>Delete</Button>
      </Typography>
      <div className={Css.id()}>
        ID: {gateway.id}
      </div>
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
