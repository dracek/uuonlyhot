//@@viewOn:imports
import { Utils, createVisualComponent, useSession, useContext, useEffect } from "uu5g05";

import Config from "../config/config.js";
import SensorContext from "./sensor-context.js";
import React from 'react';

import moment from "moment";
import 'chartjs-adapter-moment';

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
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

    let sensorId = props.sensor;

    const start = new Date();
    const end = new Date();
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    useEffect(() => {

      sensorContext.callsMap.sensorGet({ id: sensorId });

      sensorContext.callsMap.sensorGetData({
        sensorId: sensorId,
        from: start.getTime(),
        to: end.getTime(),
      });

    }, [props.params]);

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
                    //console.log("ctx",context);
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
        <Chart type="bar" options={options} data={data} />
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Sensor };
export default Sensor;
//@@viewOff:exports
