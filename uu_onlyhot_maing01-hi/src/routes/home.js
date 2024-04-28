//@@viewOn:imports
import { Utils, createVisualComponent, useSession, useContext, useEffect, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";

import GatewayContext from "../bricks/gateway/gateway-context.js";
import SensorContext from "../bricks/sensor/sensor-context.js";
import GatewayRow from "../bricks/gateway/gateway-row.js";
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

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
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

    const gatewayContext = useContext(GatewayContext);
    const sensorContext = useContext(SensorContext);

    useEffect(() => {
      gatewayContext.callsMap.gatewayList();
      sensorContext.callsMap.sensorList();
    }, []);

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    const renderGateways = (data, sensorData) => {
      if (!data.itemList || data.itemList.length === 0){
        return <div>no data ...</div>;
      }
      return (<div>{
        data.itemList.map((gateway) => {
          const sensors = sensorData.itemList ? sensorData.itemList.filter(sen => sen.gatewayId === gateway.id) : [];
          return <GatewayRow gateway={gateway} sensors={sensors}/>
        })
      }</div>);
    };

    const attrs = Utils.VisualComponent.getAttrs(props);

    return (
      <div {...attrs}>
        <RouteBar />
        <div className={Css.box()}>
          <h1>Gateways</h1>
          {renderGateways(gatewayContext.listData, sensorContext.listData)}
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
