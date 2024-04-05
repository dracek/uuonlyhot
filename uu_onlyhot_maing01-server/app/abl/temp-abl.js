"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { Profile, AppClientTokenService, UuAppWorkspace, UuAppWorkspaceError } = require("uu_appg01_server").Workspace;
const { UriBuilder } = require("uu_appg01_server").Uri;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const { AppClient } = require("uu_appg01_server");
const OnlyhotMainMongo = require("../dao/temp-mongo.js");
const Errors = require("../api/errors/onlyhot-main-error.js");
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;


const WARNINGS = {
  Temp: {
    UnsupportedKeys: {
      code: `${Errors.Temp.UC_CODE}unsupportedKeys`,
    },
  },
};

class Temp {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("temp");
  }

  async temp(awid, dtoIn) {
      const dao = this.dao;
      const result = []; 

    for (const item of dtoIn.data) {
      const temperatureData = {
        awid: awid,
        temperature: parseFloat(item.temperature),
        timestamp: item.timestamp,
      };
      
      let validationResult = this.validator.validate("tempDtoInType", item);
       let uuAppErrorMap = ValidationHelper.processValidationResult(
        item,
        validationResult,
        {},
        WARNINGS.Temp.UnsupportedKeys.code,
        Errors.Temp.InvalidDtoIn
        );
   
      let dtoOut;
      try {
        dtoOut = await dao.temp(temperatureData);
        dtoOut.uuAppErrorMap = uuAppErrorMap;
        result.push(dtoOut);
      } catch (e) {
        if (e instanceof ObjectStoreError) {
          throw new Errors.Temp.TempDaoFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }
    }
      return " ... huraaa ";
  };
}

module.exports = new Temp();