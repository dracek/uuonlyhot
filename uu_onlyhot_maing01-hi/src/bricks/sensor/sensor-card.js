// SensorCard.js

import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'uu5g05-elements';

const SensorCard = ({ sensor }) => {
  const temperature = sensor.temperature ? `${sensor.temperature.toFixed(1)}°C` : 'N/A';

  return (
    <Card sx={{
        minWidth: 275,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: 5, 
        boxShadow: 3,
        margin: '10px 20px',
      }}>
      <CardContent >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Sensor Details
        </Typography>
        <Typography variant="h5" component="div" color='#0D3133'>
          {sensor.name || sensor.code}
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: '60px', textAlign:'center' }} color="#30263E">
           {temperature}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`sensor?id=${sensor.id}`}>
          <Button size="small" color="secondary">
              View Details
            </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default SensorCard;
