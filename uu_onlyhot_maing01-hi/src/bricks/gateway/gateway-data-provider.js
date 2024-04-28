//@@viewOn:imports
import { createComponent, useSession, useState } from "uu5g05";
import Config from "../config/config.js";
import Calls from "calls";
import GatewayContext from "../gateway/gateway-context.js";
import { useAlertBus } from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const STATUS_DONE = "DONE";
const STATUS_WAITING = "WAITING";
const STATUS_ERROR = "ERROR";

const GatewayDataProvider = createComponent({
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

    async function gatewayCreate(dtoIn) {
      try {
          setStatus(STATUS_WAITING);
          let res = await Calls.gatewayCreate(dtoIn);
          setStatus(STATUS_DONE);
          setData(res);
      } catch (error) {
          setStatus(STATUS_ERROR);
          alertMsg({message: 'Cannot create gateway.'})
          //console.error("NOT GOOD", error);
      }
    }  

    async function gatewayGet(dtoIn) {
      try {
          setStatus(STATUS_WAITING);
          let res = await Calls.gatewayGet(dtoIn);
          setStatus(STATUS_DONE);
          setData(res);
      } catch (error) {
          setStatus(STATUS_ERROR);
          alertMsg({message: 'Cannot get gateway.'})
          //console.error("NOT GOOD", error);
      }
    }
    
    async function gatewayUpdate(dtoIn) {
      try {
          setStatus(STATUS_WAITING);
          let res = await Calls.gatewayUpdate(dtoIn);
          setStatus(STATUS_DONE);
          setData(res);
      } catch (error) {
          setStatus(STATUS_ERROR);
          alertMsg({message: 'Cannot update gateway.'})
          //console.error("NOT GOOD", error);
      }
    }
    
    async function gatewayDelete(dtoIn) {
      try {
          setStatus(STATUS_WAITING);
          let res = await Calls.gatewayDelete(dtoIn);
          setStatus(STATUS_DONE);
          setData(res);
      } catch (error) {
          setStatus(STATUS_ERROR);
          alertMsg({message: 'Cannot delete gateway.'})
          //console.error("NOT GOOD", error);
      }
    }  

    async function gatewayList() {
        try {
          setStatus(STATUS_WAITING);
          let res = await Calls.gatewayList({});
          setStatus(STATUS_DONE);
          setListData(res);
        } catch (error) {
          setStatus(STATUS_ERROR);
          alertMsg({message: 'Cannot list gateway.'})
          //console.error("NOT GOOD", error);
        }
      }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const newValue = {
      status: status, 
      data,
      listData,
      callsMap: {
        gatewayList,
        gatewayCreate,
        gatewayGet,
        gatewayUpdate,
        gatewayDelete
      }
    };

    return (<GatewayContext.Provider value={ newValue }>
      {children}
    </GatewayContext.Provider>);

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { GatewayDataProvider };
export default GatewayDataProvider;
//@@viewOff:exports
