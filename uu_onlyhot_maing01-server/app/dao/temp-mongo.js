"use strict";

const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class OnlyhotMainMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, timestamp: 1 }, { unique: true });
  }

  async create(awid, temperatureData) {
    return await super.insertOne(temperatureData, "temperatureData");
  }

  // Pokud budete potřebovat další CRUD operace, jako je get, update a remove,
  // můžete je přidat zde podle potřeby.

}

module.exports = OnlyhotMainMongo;
