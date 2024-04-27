"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SensorMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, id: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
  
  async get(awid, id) {
    let filter = {
      awid: awid,
      id: id,
    };
    return await super.findOne(filter);
  }

  async getByCode(awid, code) {
    let filter = {
      awid: awid,
      code: code,
    };
    return await super.findOne(filter);
  }

  async update(awid, uuObject) {
    let filter = {
      awid: awid,
      id: uuObject.id,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async remove(awid, id) {
    let filter = {
      awid: awid,
      id: id,
    };
    return await super.deleteOne(filter);
  }

  async listByFilter(awid, filter, pageInfo = {}, sortBy = {}, projection = {}) {
    return await super.find({ awid, ...filter}, pageInfo, sortBy, projection);
  }

}

module.exports = SensorMongo;
