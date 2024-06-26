"use strict";
const SensorAbl = require("../../abl/sensor-abl.js");

class SensorController {

  getData(ucEnv) {
    return SensorAbl.getData(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  importData(ucEnv) {
    return SensorAbl.importData(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return SensorAbl.list(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return SensorAbl.get(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return SensorAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return SensorAbl.update(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return SensorAbl.create(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

}

module.exports = new SensorController();
