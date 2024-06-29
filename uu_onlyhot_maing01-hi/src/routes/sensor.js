//@@viewOn:imports
import { Utils, createVisualComponent, BackgroundProvider, useSession, useContext, useEffect, useState, useRoute } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Typography from '@mui/material/Typography';
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import SensorContext from "../bricks/sensor/sensor-context.js";
import React from 'react';
import Button from '@mui/material/Button';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import Confirm from "../bricks/confirm.js";
import SensorEditForm from "../bricks/sensor/sensor-edit-form.js";
import DayChart from "../bricks/sensor/day-chart.js";

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
    const [, setRoute] = useRoute();

    const [editSensor, setEditSensor] = useState(false);
    const [deleteSensor, setDeleteSensor] = useState(false);

    let sensorId = props.params && props.params.id;
    let sensorName = sensorId || "N/A";
    if (sensorContext.data) {
      sensorName = sensorContext.data.name
        ? sensorContext.data.name
        : sensorContext.data.code;
    }

    useEffect(() => {
      sensorContext.callsMap.sensorGet({ id: props.params.id });
    }, [props.params]);


    const handleEditFormOpen = () => {
      setEditSensor(true);
    };

    const handleEditFormClose = () => {
      setEditSensor(false);
    };
    
    const handleEditFormSubmit = async (data) => {
      await sensorContext.callsMap.sensorUpdate({id: sensorId, name: data.name});
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
      await sensorContext.callsMap.sensorDelete({id: sensorId});
      setDeleteSensor(false);
      setRoute('home');
    };


    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);

    return (
      <div {...attrs} style={{ background: "#23226e", minHeight: "100vh" }}>
        <BackgroundProvider background="dark">
          <RouteBar />
          <div className={Css.box()}>
            <h1 className={Css.header()}>Sensor {sensorName}<Button
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
            <Typography variant="h5" component="h2" sx={{ margin: '10px', color: 'white', textAlign:'center' }}>
               ... info or somethung!
            </Typography>
            
            <div style={{ color: "white", margin: "20px" }}>
              ...todo ...
            </div>

            <DayChart sensor={sensorId} />

          </div>

          {deleteSensor && <Confirm header={`Delete ${sensorName}?`} info="All data will be erased." onClose={handleDeleteFormClose} onConfirm={handleDeleteFormConfirm} buttonTitle="DELETE"></Confirm>}
          {editSensor && <SensorEditForm onSubmit={handleEditFormSubmit} onClose={handleEditFormClose} sensor={sensorName} />}

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
