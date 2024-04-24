"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/gateway-error.js");


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

class GatewayAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("gateway");
  }

  async update(awid, session, dtoIn) {

    const validationResult = this.validator.validate("gatewayUpdateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let entity = await this.dao.get(awid, dtoIn.id);
    if (!entity){
      throw new Errors.Update.GatewayNotPresent({ uuAppErrorMap });  
    }

    const existing = await this.dao.getByName(awid, dtoIn.name);
    if ((existing !== null) && (existing.id.toString() !== dtoIn.id)){
      console.log(existing);
      console.log(dtoIn);
      throw new Errors.Update.DuplicateName({ uuAppErrorMap });
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
    
    const validationResult = this.validator.validate("gatewayDeleteDtoInType", dtoIn);

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
      throw new Errors.Delete.GatewayNotPresent({ uuAppErrorMap });  
    }

    // todo delete also sensors and data!

    await this.dao.remove(awid, dtoIn.id);

    let dtoOut = {
        awid,
        id: dtoIn.id,
        uuAppErrorMap: uuAppErrorMap
    };

    return dtoOut;
  }

  async create(awid, session, dtoIn) {

    let validationResult = this.validator.validate("gatewayCreateDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
        dtoIn,
        validationResult,
        {},
        WARNINGS.Create.UnsupportedKeys.code,
        Errors.Create.InvalidDtoIn
        );

    let dtoOut;

    const existing = await this.dao.getByName(awid, dtoIn.name);
    if (existing !== null){
      throw new Errors.Create.DuplicateName({ uuAppErrorMap });
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
    
    const validationResult = this.validator.validate("gatewayGetDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut = await this.dao.get(awid, dtoIn.id);

    if (!dtoOut) {
      throw new Errors.Get.GatewayNotPresent({ uuAppErrorMap });
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async list(awid, session, dtoIn) {

    const validationResult = this.validator.validate("gatewayListDtoInType", dtoIn);

    let uuAppErrorMap = {};
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.List.UnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    let filter = {};

    let dtoOut;
    try {
      dtoOut = await this.dao.listByFilter(awid, filter); // pagination not included yet

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

module.exports = new GatewayAbl();
