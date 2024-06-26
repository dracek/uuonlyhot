//@@viewOn:imports
import { Utils, createVisualComponent, BackgroundProvider, useSession, useContext, useEffect, useState } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import { Link } from 'uu5g05-elements';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

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
    const [page, setPage] = useState(1);

    useEffect(() => {
      if (props.params && props.params.id) {
        sensorContext.callsMap.sensorGet({ id: props.params.id });

        const start = new Date();
        const end = new Date();
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        sensorContext.callsMap.sensorGetData({
          sensorId: props.params.id,
          from: start.getTime(),
          to: end.getTime(),
        });
      } else {
        sensorContext.callsMap.sensorList();
      }
    }, [props.params]);

    //@@viewOff:private

    //@@viewOn:interface
    const handlePageChange = (event, value) => {
      setPage(value);
    };
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);

    if (!props.params || !props.params.id) {
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
                <Card
                  key={sensor.id}
                  sx={{
                    minWidth: 275,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 5,
                    boxShadow: 3,
                    margin: "10px 0",
                    color: "white",
                  }}
                >
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                      Sensor Details
                    </Typography>
                    <Typography variant="h5" component="div" color="white">
                      {sensor.name || sensor.code}
                    </Typography>
                    <Typography
                      sx={{ mb: 1.5, fontSize: "20px", textAlign: "center" }}
                      color="#00FFE5"
                    >
                      {sensor.lastTemperature
                        ? `${sensor.lastTemperature.toFixed(1)}°C`
                        : "N/A"}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link href={`sensor?id=${sensor.id}`}>
                      <Button
                        sx={{
                          alignItems: "center",
                          margin: "auto",
                          color: "#E50099",
                          mx: 1,
                          "&:hover": { color: "#00FFE5" },
                          "&:active": { transform: "scale(1.2)" },
                        }}
                      >
                        <InfoRoundedIcon />nfo
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
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
    }

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

    let sensorName = (props.params && props.params.id) || "N/A";
    if (sensorContext.data) {
      sensorName = sensorContext.data.name
        ? sensorContext.data.name
        : sensorContext.data.code;
    }

    return (
      <div {...attrs} style={{ background: "#23226e", minHeight: "100vh" }}>
        <BackgroundProvider background="dark">
          <RouteBar />
          <div className={Css.box()}>
            <h1 className={Css.header()}>Sensor {sensorName}</h1>
            <div style={{ color: "white", margin: "20px" }}>
              todo nějaké detaily, edit, grafy...
            </div>
            <Chart type="bar" options={options} data={data} />
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
