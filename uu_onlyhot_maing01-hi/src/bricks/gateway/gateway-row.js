import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SensorCard from '../sensor/sensor-card.js'

import Config from '../config/config.js';

const Css = {
  row: () =>
    Config.Css.css({
      paddingLeft: '25px',
      marginBottom: '20px'
    })
};

const GatewayRow = ({ gateway, sensors }) => {
  return (
    <Box className={Css.row()}>
      <Typography variant="h5" component="h2" sx={{margin:'7px', color: '#0D3133'}}>
        {gateway.name}
      </Typography>
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
