import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// NOTE During frontend development it's possible to redirect uuApp command calls elsewhere, e.g. to production/staging
// backend, by configuring it in *-hi/env/development.json:
//   "uu5Environment": {
//     "callsBaseUri": "https://uuapp-dev.plus4u.net/vnd-app/awid"
//   }

const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  // // example for mock calls
  // loadDemoContent(dtoIn) {
  //   const commandUri = Calls.getCommandUri("loadDemoContent");
  //   return Calls.call("get", commandUri, dtoIn);
  // },

  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri);
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  gatewayCreate(dtoIn) {
    let commandUri = Calls.getCommandUri("gateway/create");
    return Calls.call("post", commandUri, dtoIn);
  },

  gatewayGet(dtoIn) {
    let commandUri = Calls.getCommandUri("gateway/get");
    return Calls.call("get", commandUri, dtoIn);
  },

  gatewayUpdate(dtoIn) {
    let commandUri = Calls.getCommandUri("gateway/update");
    return Calls.call("post", commandUri, dtoIn);
  },

  gatewayDelete(dtoIn) {
    let commandUri = Calls.getCommandUri("gateway/delete");
    return Calls.call("post", commandUri, dtoIn);
  },

  gatewayList(dtoIn) {
    let commandUri = Calls.getCommandUri("gateway/list");
    return Calls.call("get", commandUri, dtoIn);
  },

  sensorCreate(dtoIn) {
    let commandUri = Calls.getCommandUri("sensor/create");
    return Calls.call("post", commandUri, dtoIn);
  },

  sensorGet(dtoIn) {
    let commandUri = Calls.getCommandUri("sensor/get");
    return Calls.call("get", commandUri, dtoIn);
  },

  sensorUpdate(dtoIn) {
    let commandUri = Calls.getCommandUri("sensor/update");
    return Calls.call("post", commandUri, dtoIn);
  },

  sensorDelete(dtoIn) {
    let commandUri = Calls.getCommandUri("sensor/delete");
    return Calls.call("post", commandUri, dtoIn);
  },

  sensorList(dtoIn) {
    let commandUri = Calls.getCommandUri("sensor/list");
    return Calls.call("get", commandUri, dtoIn);
  },


  getCommandUri(useCase, baseUri = Environment.appBaseUri) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },
};

export default Calls;
