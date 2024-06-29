//@@viewOn:imports
import { Utils, createVisualComponent, BackgroundProvider, useSession, useContext, useEffect, useState, useRoute } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Typography from '@mui/material/Typography';
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import SensorContext from "../bricks/sensor/sensor-context.js";
import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Confirm from "../bricks/confirm.js";
import SensorEditForm from "../bricks/sensor/sensor-edit-form.js";
import DayChart from "../bricks/sensor/day-chart.js";
import MonthChart from "../bricks/sensor/month-chart.js";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      background: "#23226e",
      minHeight: "100vh",
      color: "white",
    }),
  box: () =>
    Config.Css.css({
      display: "flex",
      maxWidth: 624,
      minWidth: 480,
      padding: "24px",
      margin: "0 auto",
      flexWrap: "wrap",
      flexDirection: "column",
      color: "black",
      "& > *": {
        display: "block",
        width: "100%",
      },
      "& h1": {
        marginBottom: "45px",
      },
    }),
  header: () =>
    Config.Css.css({
      fontSize: "50px",
      color: "transparent",
      backgroundImage: "linear-gradient(30deg, #E50099, #FFA7A7)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
};

const StyledDateCalendar = styled(DateCalendar)(({ theme }) => ({
  backgroundColor: 'white',
  '& .MuiPickersDay-root': {
    color: 'black',
  },
  '& .MuiPickersDay-root.Mui-selected': {
    backgroundColor: '#E50099',
    color: 'white',
  },
  '& .MuiPickersDay-root.Mui-selected:hover': {
    backgroundColor: '#E50099',
    color: 'white',
  },
  '& .MuiPickersDay-root:hover': {
    backgroundColor: '#f0f0f0',
  },
  '& .MuiPickersCalendarHeader-root': {
    backgroundColor: '#00FFE5',
    color: 'black',
  },
}));
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Sensor = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Sensor",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();
    const sensorContext = useContext(SensorContext);
    const [, setRoute] = useRoute();

    const [editSensor, setEditSensor] = useState(false);
    const [deleteSensor, setDeleteSensor] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [chartData, setChartData] = useState([]);
    const [isCalendarVisible, setCalendarVisibility] = useState(false);

    let sensorId = props.params && props.params.id;
    let sensorName = sensorId || "N/A";
    if (sensorContext.data) {
      sensorName = sensorContext.data.name
        ? sensorContext.data.name
        : sensorContext.data.code;
    }

    const temperature = sensorContext.data && sensorContext.data.lastTemperature ? (sensorContext.data.lastTemperature + "°C") : "N/A";

    useEffect(() => {
      sensorContext.callsMap.sensorGet({ id: props.params.id });
    }, [props.params]);

    useEffect(() => {
      fetchData(selectedDate);
    }, [selectedDate]);

    const fetchData = (date) => {
      const start = date.startOf('day').toDate();
      const end = date.endOf('day').toDate();
      sensorContext.callsMap.sensorGetData({
        sensorId: sensorId,
        from: start.getTime(),
        to: end.getTime(),
      }).then((response) => {
        setChartData(response.itemList || []);
      });
    };

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const handleEditFormOpen = () => {
      setEditSensor(true);
    };

    const handleEditFormClose = () => {
      setEditSensor(false);
    };

    const handleEditFormSubmit = async (data) => {
      await sensorContext.callsMap.sensorUpdate({ id: sensorId, name: data.name });
      setEditSensor(false);
      sensorContext.callsMap.sensorGet({ id: props.params.id });
    };

    const handleDeleteFormOpen = () => {
      setDeleteSensor(true);
    };

    const handleDeleteFormClose = () => {
      setDeleteSensor(false);
    };

    const handleDeleteFormConfirm = async () => {
      await sensorContext.callsMap.sensorDelete({ id: sensorId });
      setDeleteSensor(false);
      setRoute('home');
    };

    const toggleCalendarVisibility = () => {
      setCalendarVisibility(!isCalendarVisible);
    };

    const attrs = Utils.VisualComponent.getAttrs(props);

    let chartdata =
      (sensorContext.sensorData && sensorContext.sensorData.itemList) || [];

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          display: false,
        },
        title: {
          display: true,
          text: "Teploty - denní graf",
          color: "white",
        },
      },
      scales: {
        x: {
          ticks: {
            color: "white",
          },
          grid: {
            color: "rgba(255, 255, 255, 0.2)",
          },
        },
        y: {
          ticks: {
            color: "white",
          },
          grid: {
            color: "rgba(255, 255, 255, 0.2)",
          },
        },
      },
    };

    const formatter = new Intl.DateTimeFormat("cs-CZ", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const labels = chartdata.map((row) => {
      const d = new Date(row.timestamp);
      return formatter.format(d);
    });

    const data = {
      labels,
      datasets: [
        {
          data: chartdata.map((row) => row.temperature.toFixed(1)),
          backgroundColor: "#E50099",
        },
      ],
    };

    return (
      <div {...attrs} style={{ background: "#23226e", minHeight: "100vh" }}>
        <BackgroundProvider background="dark">
          <RouteBar />
          <div className={Css.box()}>
            <h1 className={Css.header()}>
              Sensor {sensorName}
              <Button
                onClick={handleEditFormOpen}
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
                onClick={handleDeleteFormOpen}
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

             </h1>
            {isCalendarVisible && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledDateCalendar value={selectedDate} onChange={handleDateChange} />
              </LocalizationProvider>
            )}
            <Typography variant="h5" component="h2" sx={{ margin: '10px', color: 'white', textAlign: 'center' }}>
            current temperature: {temperature} <IconButton onClick={toggleCalendarVisibility} sx={{ color: '#E50099', ml: 2 }}>
                <CalendarTodayIcon fontSize="large" />
              </IconButton>
            </Typography>
          

            <DayChart sensor={sensorId} />
            <MonthChart sensor={sensorId} />

          </div>

          {deleteSensor && <Confirm header={`Delete ${sensorName}?`} info="All data will be erased." onClose={handleDeleteFormClose} onConfirm={handleDeleteFormConfirm} buttonTitle="DELETE"></Confirm>}
          {editSensor && <SensorEditForm onSubmit={handleEditFormSubmit} onClose={handleEditFormClose} sensor={sensorName} />}
        </BackgroundProvider>
      </div>
    );
  },
});

Sensor = withRoute(Sensor, { authenticated: true });

//@@viewOn:exports
export { Sensor };
export default Sensor;
//@@viewOff:exports
