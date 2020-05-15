/* eslint-disable max-classes-per-file */
/**
 * Create a new error of type 404 not found
 */
class NotFoundError extends Error {
  constructor(message = 'not found', status = 404) {
    super(message);
    this.name = 'Not Found';
    this.status = status;
  }
}

/**
 * Create a new error of type 400 all fields are required
 */
class FieldsRequiredError extends Error {
  constructor(message = 'the fields are required', status = 400) {
    super(message);
    this.name = 'Fields Required Error';
    this.status = status;
  }
}

/**
 * Create a new error of type 500
 */
class ServerError extends Error {
  constructor(message = 'error in the server', status = 500) {
    super(message);
    this.name = 'Server Error';
    this.status = status;
  }
}

class FileNotValid extends Error {
  constructor(message = 'file is not valid', status = 400) {
    super(message);
    this.name = 'File not valid';
    this.status = status;
  }
}

module.exports = {
  NotFoundError,
  FieldsRequiredError,
  ServerError,
  FileNotValid,
};
