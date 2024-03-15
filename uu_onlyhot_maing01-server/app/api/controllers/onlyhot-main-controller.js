"use strict";
const OnlyhotMainAbl = require("../../abl/onlyhot-main-abl.js");
const { temp } = require("../../abl/temp-abl.js")
class OnlyhotMainController {

  test(ucEnv) {
    return OnlyhotMainAbl.test(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  temp(ucEnv) {
    return temp(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  init(ucEnv) {
    return OnlyhotMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return OnlyhotMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return OnlyhotMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new OnlyhotMainController();
