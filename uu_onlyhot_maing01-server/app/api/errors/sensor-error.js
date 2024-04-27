"use strict";

const OnlyhotMainUseCaseError = require("./onlyhot-main-use-case-error.js");
const SENSOR_ERROR_PREFIX = `${OnlyhotMainUseCaseError.ERROR_PREFIX}sensor/`;

const INVALID_DTOIN = "DtoIn is not valid.";
const NOT_PRESENT = "Sensor is not present.";
const DUPLICATE_SENSOR_CODE = "Sensor code already exists.";

const Create = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = INVALID_DTOIN;
    }
  },

  SensorDuplicateCode: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}sensorDuplicateCode`;
      this.message = DUPLICATE_SENSOR_CODE;
    }
  },

  GatewayNotExist: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}gatewayNotExist`;
      this.message = "Gateway does not exist.";
    }
  },

  CreateDaoFailed: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}createDaoFailed`;
      this.message = "Create failed in DAO";
    }
  },
  
};

const Update = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = INVALID_DTOIN;
    }
  },

  SensorNotPresent: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}sensorNotPresent`;
      this.message = NOT_PRESENT;
    }
  },

  SensorDuplicateCode: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}sensorDuplicateCode`;
      this.message = DUPLICATE_SENSOR_CODE;
    }
  },

  UpdateDaoFailed: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}updateDaoFailed`;
      this.message = "Update failed in DAO";
    }
  },
  
};

const Delete = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}delete/`,

  InvalidDtoIn: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = INVALID_DTOIN;
    }
  },

  SensorNotPresent: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}sensorNotPresent`;
      this.message = NOT_PRESENT;
    }
  },
  
};

const Get = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = INVALID_DTOIN;
    }
  },

  SensorNotPresent: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}sensorNotPresent`;
      this.message = NOT_PRESENT;
    }
  },
  
};

const List = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}list/`,

  InvalidDtoIn: class extends OnlyhotMainUseCaseError {
    constructor(n) {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ListDaoFailed: class extends OnlyhotMainUseCaseError {
    constructor(n) {
      super(...arguments);
      this.code = `${List.UC_CODE}listDaoFailed`;
      this.message = "List failed in DAO";
    }
  },
  
};

module.exports = {
  List,
  Get,
  Delete,
  Update,
  Create
};
