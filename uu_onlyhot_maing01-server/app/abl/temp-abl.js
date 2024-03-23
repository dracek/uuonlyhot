"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const { AppClient } = require("uu_appg01_server");
const Errors = require("../api/errors/onlyhot-main-error.js");
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;

const logger = LoggerFactory.get("OnlyhotMainAbl");
const validator = Validator.load();
const WARNINGS = {
  Temp: {
    UnsupportedKeys: {
      code: `${Errors.Temp.UC_CODE}unsupportedKeys`,
    },
  },
};

async function temp(awid, dtoIn) {
  const dao = DaoFactory.getDao("temp");

  for (const item of dtoIn.data) {
    let validationResult = validator.validate("tempDtoInType", item);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      item,
      validationResult,
      {},
      WARNINGS.Temp.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // Přidělení ownerId do temperatureData pro každou položku
    const temperatureData = {
      awid: awid,
      temperature: parseFloat(item.temperature),
      timestamp: item.timestamp,
      ownerId: session.getIdentity().getUuIdentity() // Přidělení ownerId
    };

    let dtoOut;
    try {
      dtoOut = await dao.temp(temperatureData);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.TempDaoFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
  return " ... huraaa ";
}

module.exports = {
  temp
};
