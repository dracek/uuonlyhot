//@@viewOn:imports
import { Utils, createVisualComponent, BackgroundProvider, useSession, useContext, useEffect, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";
import Typography from '@mui/material/Typography';

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";

import SensorContext from "../bricks/sensor/sensor-context.js";

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
        width: "100%"
      },
      "& h1": {
        marginBottom: "45px"  
      }
    }),
    header: () =>
    Config.Css.css({
      fontSize: '50px',
      color: 'transparent',
      backgroundImage: 'linear-gradient(30deg, #E50099, #FFA7A7)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text'
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

    useEffect(() => {
      sensorContext.callsMap.sensorGet({"id": props.params.id}); // todo params

      const start = new Date(); // todo some neat calendar
      const end = new Date();
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      sensorContext.callsMap.sensorGetData(
        { 
          "sensorId": props.params.id,
          "from": start.getTime(),
          "to": end.getTime()
        }
      );
    }, []);

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    const attrs = Utils.VisualComponent.getAttrs(props);


    let chartdata = sensorContext.sensorData && sensorContext.sensorData.itemList || [];

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          display: false
        },
        title: {
          display: true,
          text: 'Teploty - denní graf',
          color: 'white'
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'white'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        y: {
          ticks: {
            color: 'white'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        }
      }
    };


    const formatter = new Intl.DateTimeFormat('cs-CZ', { hour: '2-digit', minute: '2-digit'});

    const labels = chartdata.map(row => {
      const d = new Date(row.timestamp);
      return formatter.format(d);
    });    
    
    const data = {
      labels,
      datasets: [
        {
          data: chartdata.map(row => row.temperature.toFixed(1)),
          backgroundColor: '#E50099'
        }
      ]
    };

    let sensorName = props.params && props.params.id || "N/A";
    if(sensorContext.data){
      sensorName = sensorContext.data.name ? sensorContext.data.name : sensorContext.data.code;
    }

    return (
      <div {...attrs} style={{ background: "#23226e", minHeight: "100vh" }}>
       <BackgroundProvider background="dark">
        <RouteBar />
        <div className={Css.box()}>
        <h1 className={Css.header()}>
         Sensor {sensorName}</h1>
          <div style={{ color: "white", margin: "20px" }}>todo nějaké detaily, edit, grafy...</div>
          <Chart type='bar' options={options} data={data} />
        </div>
        </BackgroundProvider> 
      </div>
    );
    //@@viewOff:render
  },
});

Sensor = withRoute(Sensor, { authenticated: true });

//@@viewOn:exports
export { Sensor };
export default Sensor;
//@@viewOff:exports
