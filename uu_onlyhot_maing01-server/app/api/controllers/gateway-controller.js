"use strict";
const GatewayAbl = require("../../abl/gateway-abl.js");

class GatewayController {

  update(ucEnv) {
    return GatewayAbl.update(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return GatewayAbl.list(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return GatewayAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return GatewayAbl.create(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return GatewayAbl.get(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

}

module.exports = new GatewayController();
