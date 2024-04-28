//@@viewOn:imports
import { Utils, createVisualComponent, useSession, useContext, useEffect, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";

import SensorContext from "../bricks/sensor/sensor-context.js";

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
    //const sensorContext = useContext(SensorContext);

    useEffect(() => {
      //gatewayContext.callsMap.gatewayList();
      //sensorContext.callsMap.sensorList();
    }, []);

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    const attrs = Utils.VisualComponent.getAttrs(props);

    return (
      <div {...attrs}>
        <RouteBar />
        <div className={Css.box()}>
          <h1>Sensor {props.params.id}</h1>
          <div>todo nějaké detaily, edit, grafy</div>
        </div>
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
