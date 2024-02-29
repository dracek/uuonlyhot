"use strict";
const OnlyhotMainAbl = require("../../abl/onlyhot-main-abl.js");

class OnlyhotMainController {
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
