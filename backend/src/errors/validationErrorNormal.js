
module.exports = class ValidationErrorNormal extends Error {
  constructor(messageCode) {
    let message = messageCode;
    super(message);
    this.code = 400;
  }
};
