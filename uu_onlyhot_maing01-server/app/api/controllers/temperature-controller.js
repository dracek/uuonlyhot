"use strict";
const TemperatureAbl = require("../../abl/temperature-abl.js");
const { temperature } = require("../../abl/temperature-abl.js")

class TemperatureController {

  list(ucEnv) {
    return TemperatureAbl.list(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return TemperatureAbl.get(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return TemperatureAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return TemperatureAbl.update(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return TemperatureAbl.create(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }
  temperature(ucEnv) {
    return temperature(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new TemperatureController();
