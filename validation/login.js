const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if(Validator.isEmpty(data.username)) {
    errors.username = "Username is required"
  }

  if(!Validator.isLength(data.username, {min: 2, max: 26})) {
    errors.username = "Username must be between 2 and 26 characters";
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if(!Validator.isLength(data.password, {min: 5, max: 30})) {
    errors.password = "Password must be between 5 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}