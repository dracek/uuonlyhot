//@@viewOn:imports
import { Utils, createVisualComponent, BackgroundProvider, useSession, useContext, useEffect, useState } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import SensorCard from "../bricks/sensor/sensor-card.js";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import SensorContext from "../bricks/sensor/sensor-context.js";
import SensorSearch from "../bricks/sensor/sensor-search.js";

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
//@@viewOff:imports

//@@viewOn:constants
const SENSORS_PER_PAGE = 5;
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
const paginate = (array, page_size, page_number) =>
  array.slice((page_number - 1) * page_size, page_number * page_size);
//@@viewOff:helpers

let SensorList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SensorList",
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
    const [page, setPage] = useState(1);

    useEffect(() => {
      sensorContext.callsMap.sensorList();
      // todo call some magic filtered paginated backend maybe
    }, []);

    //@@viewOff:private

    //@@viewOn:interface
    const handlePageChange = (event, value) => {
      setPage(value);
    };
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);


    const sensors = sensorContext.listData.itemList || [];
    const paginatedSensors = paginate(sensors, SENSORS_PER_PAGE, page);

    return (
      <div {...attrs} style={{ background: "#23226e", minHeight: "100vh" }}>
        <BackgroundProvider background="dark">
          <RouteBar />
          <div className={Css.box()}>
            <h1 className={Css.header()}>Search for a Sensor</h1>
            <p style={{color:'white', textAlign:'center', margin: 'auto', }}>Use sensor's name or ID</p>
            <SensorSearch />
            <h2 className={Css.header()}>All Sensors</h2>
            {paginatedSensors.map((sensor) => (
              <SensorCard key={sensor.id} sensor={sensor} />
            ))}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Pagination
                count={Math.ceil(sensors.length / SENSORS_PER_PAGE)}
                page={page}
                onChange={handlePageChange}
                sx={{"& .MuiPaginationItem-root": {
                      color: 'white',
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                      color: 'white',
                      backgroundColor: '#E50099',
                    },
                  }}
              />
            </Box>
          </div>
        </BackgroundProvider>
      </div>
    );

    //@@viewOff:render
  },
});

SensorList = withRoute(SensorList, { authenticated: true });

//@@viewOn:exports
export { SensorList };
export default SensorList;
//@@viewOff:exports
