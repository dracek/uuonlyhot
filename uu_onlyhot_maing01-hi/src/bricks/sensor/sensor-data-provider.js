//@@viewOn:imports
import { createComponent, useSession, useState } from "uu5g05";
import Config from "../config/config.js";
import Calls from "calls";
import SensorContext from "./sensor-context.js";
import { useAlertBus } from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const STATUS_DONE = "DONE";
const STATUS_WAITING = "WAITING";
const STATUS_ERROR = "ERROR";

const SensorDataProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SensorDataProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;

    const { identity } = useSession(); //{ id: identity.uuIdentity }
    const [status, setStatus] = useState(STATUS_DONE);
    const [data, setData] = useState({});
    const [listData, setListData] = useState({});
    const [sensorData, setSensorData] = useState({});
    const [sensorAggregatedData, setSensorAggregatedData] = useState({});
    const { addAlert } = useAlertBus();

    function infoMsg(msg){
      addAlert(Object.assign({
        priority: "success",
        durationMs: 3000,
      }, msg));
    }

    function alertMsg(msg){
      addAlert(Object.assign({
        header: "Error",
        priority: "error",
      }, msg));
    }

    async function sensorCreate(dtoIn) {
      try {
          setStatus(STATUS_WAITING);
          let res = await Calls.sensorCreate(dtoIn);
          setStatus(STATUS_DONE);
          setData(res);
      } catch (error) {
          setStatus(STATUS_ERROR);
          alertMsg({message: 'Cannot create sensor.'})
          //console.error("NOT GOOD", error);
      }
    }  

    async function sensorGet(dtoIn) {
      try {
          setStatus(STATUS_WAITING);
          let res = await Calls.sensorGet(dtoIn);
          setStatus(STATUS_DONE);
          setData(res);
      } catch (error) {
          setStatus(STATUS_ERROR);
          alertMsg({message: 'Cannot get sensor.'})
          //console.error("NOT GOOD", error);
      }
    }
    
    async function sensorUpdate(dtoIn) {
      try {
          setStatus(STATUS_WAITING);
          let res = await Calls.sensorUpdate(dtoIn);
          setStatus(STATUS_DONE);
          setData(res);
          infoMsg({message:`Sensor ${dtoIn.name ? dtoIn.name : "" } edited.`});
      } catch (error) {
          setStatus(STATUS_ERROR);
          alertMsg({message: 'Cannot update sensor.'})
          //console.error("NOT GOOD", error);
      }
    }
    
    async function sensorDelete(dtoIn) {
      try {
          setStatus(STATUS_WAITING);
          let res = await Calls.sensorDelete(dtoIn);
          setStatus(STATUS_DONE);
          setData(res);
          infoMsg({message:`Sensor deleted.`});
      } catch (error) {
          setStatus(STATUS_ERROR);
          alertMsg({message: 'Cannot delete sensor.'})
          //console.error("NOT GOOD", error);
      }
    }  

    async function sensorList() {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.sensorList({});
        setStatus(STATUS_DONE);
        setListData(res);
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({message: 'Cannot list sensors.'})
        //console.error("NOT GOOD", error);
      }
    }

    async function sensorGetData(dtoIn) {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.sensorGetData(dtoIn);
        setStatus(STATUS_DONE);
        setSensorData(res);
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({message: 'Cannot list sensor data.'})
        //console.error("NOT GOOD", error);
      }
    }

    async function sensorGetAggregatedData(dtoIn) {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.sensorGetData(dtoIn);
        setStatus(STATUS_DONE);
        setSensorAggregatedData(res);
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({message: 'Cannot list sensor aggregated data.'})
        //console.error("NOT GOOD", error);
      }
    }

    const findSensorByNameOrId = (input) => {
      const regex = new RegExp(input, "i");
      console.log(regex);
      return listData.itemList.find(sensor => 
        regex.test(sensor.name)
         || sensor.id === input
      );
    };

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const newValue = {
      status: status, 
      data,
      listData,
      sensorData,
      sensorAggregatedData,
      callsMap: {
        sensorList,
        sensorCreate,
        sensorGet,
        sensorUpdate,
        sensorDelete,
        sensorGetData,
        sensorGetAggregatedData
      },
      findSensorByNameOrId 
    };

    return (<SensorContext.Provider value={ newValue }>
      {children}
    </SensorContext.Provider>);

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SensorDataProvider };
export default SensorDataProvider;
//@@viewOff:exports
