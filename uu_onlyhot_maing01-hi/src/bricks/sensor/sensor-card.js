// SensorCard.js

import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'uu5g05-elements';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import Tooltip from '@mui/material/Tooltip';



const SensorCard = ({ sensor }) => {
  const temperature = sensor.lastTemperature ? `${sensor.lastTemperature.toFixed(1)}°C` : 'N/A';

  return (
    <Card sx={{
        minWidth: 275,
        maxWidth:275,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: 5, 
        boxShadow: 3,
        margin: '10px 20px',
      }}>
      <CardContent >
        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
          Sensor Details
        </Typography>
        <Typography variant="h5" component="div" color='white'>
          {sensor.name || sensor.code}
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: '60px', textAlign:'center' }} color="#00FFE5">
           {temperature}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Link href={`sensor?id=${sensor.id}`}>
        <Tooltip title="DETAIL" placement="top">
          <Button sx={{
            alignItems: 'center',
            margin: 'auto',
            color: '#E50099',
            mx: 1, 
            '&:hover': { color: '#00FFE5' },
            '&:active': { transform: 'scale(1.2)' },
          }}>
              <InfoRoundedIcon fontSize="large"/>nfo
            </Button>
            </Tooltip>
        </Link>
      </CardActions>
    </Card>
  );
};

export default SensorCard;
