"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { Profile, AppClientTokenService, UuAppWorkspace, UuAppWorkspaceError } = require("uu_appg01_server").Workspace;
const { UriBuilder } = require("uu_appg01_server").Uri;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const { AppClient } = require("uu_appg01_server");
const Errors = require("../api/errors/onlyhot-main-error.js");
const OnlyhotMainMongo = require("../dao/temp-mongo.js");

const logger = LoggerFactory.get("OnlyhotMainAbl");
const validator = Validator.load();

async function temp(awid, dtoIn) {
  try {
    // Validace dtoIn
    let validationResult = validator.validate("tempDtoInType", dtoIn);
    ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Errors.Temp.InvalidDtoIn
    );

    const { data } = dtoIn;
    const temperatureData = {
      awid: awid,
      temperatures: data.map(item => parseFloat(item.temperature)),
      timestamp: new Date()
    };

    // Vytvoření instance OnlyhotMainMongo
    const onlyhotMainMongo = new OnlyhotMainMongo();

    // Volání metody create na objektu OnlyhotMainMongo
    await onlyhotMainMongo.create(awid, temperatureData);

    const itemCount = data.length;

    const dtoOut = {
      message: `Dostala jsem pole, počet položek ${itemCount}, teploty: ${temperatureData.temperatures.join(", ")}`
    };
    return dtoOut;
  } catch (error) {
    logger.error("Error occurred while processing the request:", error);
    return { error: "An error occurred while processing the request." };
  }
}

module.exports = {
  temp
};
