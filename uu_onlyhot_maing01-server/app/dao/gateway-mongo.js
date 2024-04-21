"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class GatewayMongo extends UuObjectDao {

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

  async getByName(awid, name) {
    let filter = {
      awid: awid,
      name: name,
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

module.exports = GatewayMongo;
