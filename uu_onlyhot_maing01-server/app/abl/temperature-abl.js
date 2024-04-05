  /*"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/sensor-error.js");

const WARNINGS = {
  Create: {
    UnsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    },
  },
  Get: {
    UnsupportedKeys: {
      code: `${Errors.Get.UC_CODE}unsupportedKeys`,
    },
  },
  Update: {
    UnsupportedKeys: {
      code: `${Errors.Update.UC_CODE}unsupportedKeys`,
    },
  },
  Delete: {
    UnsupportedKeys: {
      code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
    },
  },
  List: {
    UnsupportedKeys: {
      code: `${Errors.List.UC_CODE}unsupportedKeys`,
    },
  }
};

class TemperatureAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("temperature");
  }

  async create(awid, session, dtoIn) {
    let validationResult = this.validator.validate("temperatureCreateDtoInType", dtoIn);
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
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.CreateDaoFailed({ uuAppErrorMap }, e)
      }
      throw e;
    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async temperature(awid, dtoIn) {
    for (const item of dtoIn.data) {
      const temperatureData = {
        awid: awid,
        temperature: parseFloat(item.temperature),
        timestamp: item.timestamp
      };
      const dao = DaoFactory.getDao("temperature");
      await dao.create(temperatureData);
    }
    return " ... huraaa ";
  }


}

module.exports = new TemperatureAbl();
*/