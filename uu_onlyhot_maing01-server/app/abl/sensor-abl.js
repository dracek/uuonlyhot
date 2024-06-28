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
  },

  ImportData: {
    UnsupportedKeys: {
      code: `${Errors.ImportData.UC_CODE}unsupportedKeys`,
    },
  }
};

class SensorAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("sensor");
    this.gatewayDao = DaoFactory.getDao("gateway");
    this.dataDao = DaoFactory.getDao("data");
  }

  async getData(awid, session, dtoIn) {

    // todo validace!

    // todo sensor exist!

    //console.log(dtoIn);

    let filter = { $and: [
        { "sensorId": { $eq: dtoIn.sensorId }},
        { "timestamp": { $gte: Number(dtoIn.from) }},  // fix number to string  FE calls auto conversion!
        { "timestamp": { $lt: Number(dtoIn.to) }}
      ]};

    let dtoOut;
    try {
      dtoOut = await this.dataDao.listByFilter(awid, filter, {}, { timestamp: 1}) ;

    } catch (e) {
      if (e instanceof ObjectStoreError) {
        //todo another error
        //throw new Errors.List.ListDaoFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    dtoOut.itemList = dtoOut.itemList.map(item => ({ "timestamp": item.timestamp, "temperature": item.temperature }));

    //dtoOut.uuAppErrorMap = {};

    return dtoOut;
   
  }

  async importData(awid, session, dtoIn) {

    // todo: gateway a autorizace bude řešená přes middleware

    let validationResult = this.validator.validate("sensorImportDataDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
        dtoIn,
        validationResult,
        {},
        WARNINGS.ImportData.UnsupportedKeys.code,
        Errors.ImportData.InvalidDtoIn
        );

    let gw = await this.gatewayDao.get(awid, dtoIn.gatewayId);
    if (!gw || gw.password !== dtoIn.password){
      //throw new Error("Invalid login/password.");
    }
     
    let sensor = await this.dao.getByCode(awid, dtoIn.gatewayId, dtoIn.code);
    if (sensor === null){
      //todo try catch
      sensor = await this.dao.create({awid, gatewayId: dtoIn.gatewayId, code: dtoIn.code});
    }

    let dtoOut = {
      code: dtoIn.code,
      lastTimestamp: null,
      uuAppErrorMap: uuAppErrorMap
    };

    dtoIn.data.forEach(element => {
      const item = {
        awid: awid,
        sensorId: sensor.id.toString(),
        timestamp : element.timestamp,
        temperature: element.temperature
      };
      //todo try catch + error
      this.dataDao.upsert(item); 
    });


    if (dtoIn.data.length > 0){
      const latestData = dtoIn.data.reduce((prev, current) => (prev.y > current.y) ? prev : current);

      await this.dao.update(awid, {id: sensor.id, lastTemperature: latestData.temperature });

      dtoOut.lastTimestamp = latestData.timestamp;
    }

    return dtoOut;
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

    const existing = await this.dao.getByCode(awid, dtoIn.gatewayId, dtoIn.code);
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

    const existing = await this.dao.getByCode(awid, dtoIn.gatewayId, dtoIn.code);
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

    await this.dataDao.removeMany(awid, { sensorId: entity.id.toString() });

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
