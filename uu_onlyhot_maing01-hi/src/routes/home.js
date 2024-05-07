// Home.js

import { Utils, createVisualComponent, BackgroundProvider, useSession, useContext, useEffect, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { withRoute } from "uu_plus4u5g02-app";
import Button from '@mui/material/Button';
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";
import GatewayContext from "../bricks/gateway/gateway-context.js";
import SensorContext from "../bricks/sensor/sensor-context.js";
import GatewayRow from "../bricks/gateway/gateway-row.js";
import Form from "../bricks/form.js";

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
      "& > *": { display: "block", width: "100%" },
      "& h1": { marginBottom: "45px" }
    })
};

let Home = createVisualComponent({
  uu5Tag: Config.TAG + "Home",

  render(props) {
    const { identity } = useSession();
    const gatewayContext = useContext(GatewayContext);
    const sensorContext = useContext(SensorContext);
    const [isFormVisible, setIsFormVisible] = useState(false); // Modal is closed by default

    useEffect(() => {
      gatewayContext.callsMap.gatewayList();
      sensorContext.callsMap.sensorList();
    }, []);

    const renderGateways = (data, sensorData) => {
      if (!data.itemList || data.itemList.length === 0) {
        return <div>No data...</div>;
      }
      return (
        <div>
          {data.itemList.map((gateway) => {
            const sensors = sensorData.itemList ? sensorData.itemList.filter((sen) => sen.gatewayId === gateway.id) : [];
            return <GatewayRow key={gateway.id} gateway={gateway} sensors={sensors} />;
          })}
        </div>
      );
    };

    const handleFormClose = () => {
      setIsFormVisible(false);
    };

    const attrs = Utils.VisualComponent.getAttrs(props);

    return (
      <div {...attrs} style={{ background: "linear-gradient(150deg, #FAF6FF, #FAF0F2, #FAF6FF)", minHeight: "100vh" }}>
        <BackgroundProvider background="dark">
          <RouteBar />
          <div className={Css.box()}>
            <h1 style={{
              fontSize: '50px',
              color: 'transparent',
              backgroundImage: 'linear-gradient(45deg, #2E0F15, #F3ECFB)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text'
            }}>Gateways</h1>
            {renderGateways(gatewayContext.listData, sensorContext.listData)}

            <Button onClick={() => setIsFormVisible(true)} color="secondary" sx={{width:"180px", alignItems:'center', margin:'auto'}}>Create Form Here</Button>
          </div>
          
          <Uu5Elements.Modal open={isFormVisible} onClose={handleFormClose}>
            <Form onClose={handleFormClose} />
          </Uu5Elements.Modal>
        </BackgroundProvider>
      </div>
    );
  }
});

Home = withRoute(Home, { authenticated: true });

export { Home };
export default Home;
