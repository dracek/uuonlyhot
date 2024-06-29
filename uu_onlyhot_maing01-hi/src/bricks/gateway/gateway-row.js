import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SensorCard from '../sensor/sensor-card.js';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import Config from '../config/config.js';
import Tooltip from '@mui/material/Tooltip';
import FormComponent from '../form.js'; 

const Css = {
  row: () =>
    Config.Css.css({
      paddingLeft: '25px',
      marginBottom: '50px',
      paddingBottom: '20px',
      marginTop: '50px',
      "@media (min-width: 600px)": {
        fontSize: "30px",
        padding: '0',
      },
    }),
  id: () =>
    Config.Css.css({
      fontSize: "12px",
      paddingLeft: '25px',
      color: '#00FFE5',
    }),
  header: () =>
    Config.Css.css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      "@media (min-width: 600px)": {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    }),
  buttonGroup: () =>
    Config.Css.css({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '10px',
      "@media (min-width: 600px)": {
        marginTop: '0',
      },
      "& button": {
        margin: '5px',
      },
    }),
};

const GatewayRow = ({ gateway, sensors, onEdit, onPswd, onDelete }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(gateway.notificationsEnabled || false);

  return (
    <Box className={Css.row()}>
      <div className={Css.header()}>
        <Badge
          badgeContent={
            notificationsEnabled ? (
              <NotificationsActiveRoundedIcon
                style={{ color: '#00FFE5', cursor: 'pointer' }}
                onClick={handleToggleNotifications}
              />
            ) : null
          }
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Typography variant="h5" component="h2" sx={{ margin: '10px', color: 'white' }}>
            {gateway.name}
          </Typography>
        </Badge>
        <div className={Css.buttonGroup()}>
          <Tooltip title="EDIT" placement="top">
            <Button
              onClick={() => onEdit(gateway)}
              sx={{
                alignItems: 'center',
                color: '#E50099',
                '&:hover': { color: '#00FFE5' },
                '&:active': { transform: 'scale(1.2)' },
              }}
            >
              <EditNoteRoundedIcon fontSize="large" />
            </Button>
          </Tooltip>

          <Tooltip title="PASSWORD" placement="top">
            <Button
              onClick={() => onPswd(gateway)}
              sx={{
                alignItems: 'center',
                color: '#E50099',
                '&:hover': { color: '#00FFE5' },
                '&:active': { transform: 'scale(1.2)' },
              }}
            >
              <VpnKeyRoundedIcon fontSize="large" />
            </Button>
          </Tooltip>

          <Tooltip title="DELETE" placement="top">
            <Button
              onClick={() => onDelete(gateway)}
              sx={{
                alignItems: 'center',
                color: '#E50099',
                '&:hover': { color: '#00FFE5' },
                '&:active': { transform: 'scale(1.2)' },
              }}
            >
              <HighlightOffRoundedIcon fontSize="large" />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className={Css.id()}>ID: {gateway.id}</div>
      <Grid container spacing={4} justifyContent="center">
        {sensors.map((sensor) => (
          <Grid item xs={12} md={6} lg={4} key={sensor.id}>
            <SensorCard sensor={sensor} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GatewayRow;
