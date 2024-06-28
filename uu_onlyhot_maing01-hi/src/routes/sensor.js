//@@viewOn:imports
import { Utils, createVisualComponent, BackgroundProvider, useSession, useContext, useEffect, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";

import SensorContext from "../bricks/sensor/sensor-context.js";

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import moment from "moment";
import 'chartjs-adapter-moment';


//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
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
        },
      },
      parsing: {
        xAxisKey: 'timestamp',
        yAxisKey: 'temperature'
      },
      
        scales: {
            x: {
                //min: '2021-11-06 12:00:00',
                //max: '2021-11-07 12:00:00',
                type: 'time',
                time: {
                    displayFormats: {
                        quarter: 'MMM YYYY'
                    }
                },
                ticks: {
                  callback: function(value, index, ticks) {
                      //console.log(value);
                      //console.log(typeof value);
                      return moment(value).format("HH:mm");

                  }
              }
            }
        }
    
      
    };

    const formatter = new Intl.DateTimeFormat('cs-CZ', { hour: '2-digit', minute: '2-digit'});

    //


    let data = {
      datasets: [{
          data: chartdata
      }],
    }

    let sensorName = props.params && props.params.id || "N/A";
    if(sensorContext.data){
      sensorName = sensorContext.data.name ? sensorContext.data.name : sensorContext.data.code;
    }

    return (
      <div {...attrs} style={{ background: "linear-gradient(150deg, #FAF6FF, #FAF0F2, #FAF6FF)", minHeight: "100vh" }}>
       <BackgroundProvider background="dark">
        <RouteBar />
        <div className={Css.box()}>
          <h1>Sensor {sensorName}</h1>
          <div>todo nějaké detaily, edit, grafy...</div>
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
