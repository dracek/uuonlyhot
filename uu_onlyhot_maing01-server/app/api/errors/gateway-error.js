"use strict";

const OnlyhotMainUseCaseError = require("./onlyhot-main-use-case-error.js");
const GATEWAY_ERROR_PREFIX = `${OnlyhotMainUseCaseError.ERROR_PREFIX}gateway/`;

const DUPLICATE_NAME = "Gateway name already exists.";
const INVALID_DTOIN = "DtoIn is not valid.";
const NOT_PRESENT = "Gateway is not present.";

const Get = {
  UC_CODE: `${GATEWAY_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = INVALID_DTOIN;
    }
  },

  GatewayNotPresent: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}gatewayNotPresent`;
      this.message = NOT_PRESENT;
    }
  },
  
};

const Create = {
  UC_CODE: `${GATEWAY_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = INVALID_DTOIN;
    }
  },

  DuplicateName: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}gatewayDuplicateName`;
      this.message = DUPLICATE_NAME;
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

const Delete = {
  UC_CODE: `${GATEWAY_ERROR_PREFIX}delete/`,

  InvalidDtoIn: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = INVALID_DTOIN;
    }
  },

  GatewayNotPresent: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}gatewayNotPresent`;
      this.message = NOT_PRESENT;
    }
  },
  
};

const Update = {
  UC_CODE: `${GATEWAY_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = INVALID_DTOIN;
    }
  },

  GatewayNotPresent: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}gatewayNotPresent`;
      this.message = NOT_PRESENT;
    }
  },

  DuplicateName: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}gatewayDuplicateName`;
      this.message = DUPLICATE_NAME;
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

const List = {
  UC_CODE: `${GATEWAY_ERROR_PREFIX}list/`,

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
  Update,
  List,
  Delete,
  Create,
  Get
};
