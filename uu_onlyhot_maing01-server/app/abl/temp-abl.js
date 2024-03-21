"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { Profile, AppClientTokenService, UuAppWorkspace, UuAppWorkspaceError } = require("uu_appg01_server").Workspace;
const { UriBuilder } = require("uu_appg01_server").Uri;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const { AppClient } = require("uu_appg01_server");
const Errors = require("../api/errors/onlyhot-main-error.js");
const OnlyhotMainMongo = require("../dao/temp-mongo.js");
const { DaoFactory,ObjectStoreError } = require("uu_appg01_server").ObjectStore;

const logger = LoggerFactory.get("OnlyhotMainAbl");
const validator = Validator.load();

async function temp(awid, dtoIn) {

  for (const item of dtoIn.data) {
    // Vytvoření objektu s teplotními daty pro aktuální položku
    let validationResult = this.validator.validate("tempDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    let dtoOut;
    try {
      dtoIn.awid = awid;
      dtoIn.ownerId = session.getIdentity().getUuIdentity();
      dtoOut = await this.dao.temp(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.TempDaoFailed({ uuAppErrorMap }, e)
      }
      throw e;
    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
    const temperatureData = {
        awid: awid,
        temperature: parseFloat(item.temperature),
        timestamp: item.timestamp
    };

    const dao = DaoFactory.getDao("temp");

    await dao.create(temperatureData);
  }
    return " ... huraaa ";



module.exports = {
  temp
};
