//@@viewOn:imports
import { Utils, createVisualComponent, useSession, useContext, useEffect, useState } from "uu5g05";

import Config from "../config/config.js";
import SensorContext from "./sensor-context.js";
import React from 'react';

import moment from "moment";
import 'chartjs-adapter-moment';

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

import IconButton from '@mui/material/IconButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Typography from '@mui/material/Typography';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { styled } from '@mui/material/styles';

import dayjs from "dayjs";

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

let DayChart = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DayChart",
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

    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [isCalendarVisible, setCalendarVisibility] = useState(false);

    let sensorId = props.sensor;

    const start = selectedDate.startOf('day').unix() * 1000;
    const end = selectedDate.endOf('day').unix() * 1000;

    useEffect(() => {
      sensorContext.callsMap.sensorGetData({
        sensorId: sensorId,
        from: start,
        to: end,
      });

    }, [props.sensor, selectedDate]);

    let handleDateChange = (data) => {
      setSelectedDate(data);
      setCalendarVisibility(false);
    } 

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);

    let chartdata = (sensorContext.sensorData && sensorContext.sensorData.itemList) || [];

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          display: false,
        },
        title: {
          display: true,
          text: "Daily data",
          color: "white",
        },
        tooltip: {
            callbacks: {
                title: (context) => {
                    let date = moment(context[0].parsed.x);
                    return date.format("HH:mm");
                },
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += context.parsed.y.toFixed(1);
                    }
                    return label;
                }
            }
        }
      },
      parsing: {
        xAxisKey: 'timestamp',
        yAxisKey: 'temperature'
      },
      scales: {
        x: {
            min: start,
            max: end,
            type: 'time',
            ticks: {
                color: "white",
                callback: function(value, index, ticks) {
                  return moment(value).format("HH:mm");
                }
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

    let data = {
        datasets: [{
            data: chartdata,
            backgroundColor: "#E50099",
        }],
      }

    return (
      <div>
        <div>
          <Typography variant="h5" component="h2" sx={{ margin: '10px', color: 'white', textAlign: 'center' }}>
          selected date: {selectedDate.format("DD.MM.")} 
          
          <IconButton onClick={() => setCalendarVisibility(true)} sx={{ color: '#E50099', ml: 2 }}>
            <CalendarTodayIcon fontSize="large" />
          </IconButton>
          </Typography>
        </div>
          {isCalendarVisible && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledDateCalendar value={dayjs(selectedDate)} onChange={handleDateChange} />
              </LocalizationProvider>
            )}
        <Chart type="bar" options={options} data={data} />
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DayChart };
export default DayChart;
//@@viewOff:exports
