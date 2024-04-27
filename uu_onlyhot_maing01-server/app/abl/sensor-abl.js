"use strict";
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

class SensorAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("sensor");
    this.gatewayDao = DaoFactory.getDao("gateway");
  }


  async create(awid, session, dtoIn) {

    let validationResult = this.validator.validate("sensorCreateDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
        dtoIn,
        validationResult,
        {},
        WARNINGS.Create.UnsupportedKeys.code,
        Errors.Create.InvalidDtoIn
        );

    let dtoOut;

    const existing = await this.dao.getByCode(awid, dtoIn.code);
    if (existing !== null){
      throw new Errors.Create.SensorDuplicateCode({ uuAppErrorMap });
    }

    const gateway = await this.gatewayDao.get(awid, dtoIn.gatewayId);
    if (gateway === null){
      throw new Errors.Create.GatewayNotExist({ uuAppErrorMap });
    } 

    try {
        dtoIn.awid = awid;
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

  async get(awid, session, dtoIn) {
    
    const validationResult = this.validator.validate("sensorGetDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut = await this.dao.get(awid, dtoIn.id);

    if (!dtoOut) {
      throw new Errors.Get.SensorNotPresent({ uuAppErrorMap });
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async update(awid, session, dtoIn) {

    const validationResult = this.validator.validate("sensorUpdateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let entity = await this.dao.get(awid, dtoIn.id);
    if (!entity){
      throw new Errors.Update.SensorNotPresent({ uuAppErrorMap });  
    }

    const existing = await this.dao.getByCode(awid, dtoIn.code);
    if ((existing !== null) && (existing.id.toString() !== dtoIn.id)){
      throw new Errors.Update.SensorDuplicateCode({ uuAppErrorMap });
    }  

    let dtoOut;
    try {
      dtoOut = await this.dao.update(awid, dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.UpdateDaoFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async delete(awid, session, dtoIn) {
    
    const validationResult = this.validator.validate("sensorDeleteDtoInType", dtoIn);

    let uuAppErrorMap = {};
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    let entity = await this.dao.get(awid, dtoIn.id);
    if (!entity){
      throw new Errors.Delete.SensorNotPresent({ uuAppErrorMap });  
    }

    // todo delete also graph data

    await this.dao.remove(awid, dtoIn.id);

    let dtoOut = {
        awid,
        id: dtoIn.id,
        uuAppErrorMap: uuAppErrorMap
    };

    return dtoOut;
  }

  async list(awid, session, dtoIn) {

    const validationResult = this.validator.validate("sensorListDtoInType", dtoIn);

    let uuAppErrorMap = {};
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.List.UnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    let filter = {
      // todo owner or public
      //ownerId : session.getIdentity().getUuIdentity()
    };

    let dtoOut;
    try {
      dtoOut = await this.dao.listByFilter(awid, filter);

    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.List.ListDaoFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
   
  }

}

module.exports = new SensorAbl();
