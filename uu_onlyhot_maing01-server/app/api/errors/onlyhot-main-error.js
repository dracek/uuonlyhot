"use strict";
const OnlyhotMainUseCaseError = require("./onlyhot-main-use-case-error.js");
const TEMP_ERROR_PREFIX = `${OnlyhotMainUseCaseError.ERROR_PREFIX}temp/`;
const Init = {
  UC_CODE: `${OnlyhotMainUseCaseError.ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  },

  CreateAwscFailed: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Create uuAwsc failed.";
    }
  },
};

const test = {
  UC_CODE: `${OnlyhotMainUseCaseError.ERROR_PREFIX}test/`,
  InvalidDtoIn: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${test.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Temp = {
  UC_CODE: `${OnlyhotMainUseCaseError.ERROR_PREFIX}temp/`,

  InvalidDtoIn: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Temp.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid for temperature operation.";
    }
  },

  TempDaoFailed: class extends OnlyhotMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500; // Můžete nastavit status podle vašich potřeb
      this.code = `${Temp.UC_CODE}tempDaoFailed`;
      this.message = "Failed to create temperature data in the database.";
    }
  },

  // Další chybové třídy pro další případy chyb v operacích s teplotními daty
};

module.exports = {
  test,
  Init,
  Temp
};
